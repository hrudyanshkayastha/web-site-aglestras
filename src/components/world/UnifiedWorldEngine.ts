import * as THREE from "three";
import { WorldDestinationId } from "./WorldConfig";
import { createBioluminescentJungle, JungleElements } from "./BioluminescentJungle";
import { createFuturisticArchitecture, ArchitectureElements } from "./FuturisticArchitecture";
import { createEmbeddedAtlas, EmbeddedAtlasElements } from "./EmbeddedAtlas";
import { UnifiedCameraController, CameraControllerCallbacks } from "./UnifiedCameraController";
import { GraphNode } from "@/data/entityGraphData";
import { ServiceItem } from "@/data/services";

export interface UnifiedWorldCallbacks {
  onDestinationChange: (dest: WorldDestinationId) => void;
  onNodeSelect: (node: GraphNode | null) => void;
  onServiceSelect: (service: ServiceItem | null) => void;
  onMethodologyStageSelect?: (stage: number | null) => void;
}

export class UnifiedWorldEngine {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  public controller: UnifiedCameraController;

  private jungle: JungleElements;
  private architecture: ArchitectureElements;
  private atlas: EmbeddedAtlasElements;

  private animationFrameId: number | null = null;
  private isRunning = false;
  private isVisible = true;
  private startTime = 0;
  private lastTime = 0;

  constructor(
    container: HTMLElement,
    callbacks: UnifiedWorldCallbacks,
    isReducedMotion = false
  ) {
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene with Deep Pine Atmospheric Fog
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x041f1b, 0.038);

    // 2. Camera with 44 deg FOV for natural spatial scale
    this.camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 120);

    // 3. WebGL Renderer with High-Fidelity ACES Filmic Tone Mapping
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;

    container.appendChild(this.renderer.domElement);

    document.addEventListener("visibilitychange", this.handleVisibilityChange);

    // 4. Cinematic Lighting Model
    const ambientLight = new THREE.AmbientLight(0x08251f, 1.4);
    this.scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xf4f2ea, 2.2);
    keyLight.position.set(6, 12, 6);
    this.scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x2fa885, 1.5);
    rimLight.position.set(-8, -2, -6);
    this.scene.add(rimLight);

    // 5. Environmental Subsystems
    this.jungle = createBioluminescentJungle();
    this.scene.add(this.jungle.group);

    this.architecture = createFuturisticArchitecture();
    this.scene.add(this.architecture.group);

    this.atlas = createEmbeddedAtlas();
    this.scene.add(this.atlas.group);

    // 6. Camera Controller
    const controllerCallbacks: CameraControllerCallbacks = {
      onDestinationChange: (dest) => callbacks.onDestinationChange(dest),
      onNodeSelect: (node) => {
        this.atlas.setSelectedNode(node?.id || null);
        callbacks.onNodeSelect(node);
      },
      onServiceSelect: (service) => {
        this.architecture.setPylonSelected(service?.id || null);
        callbacks.onServiceSelect(service);
      },
      onNodeHover: (node) => {
        this.atlas.setHoveredNode(node?.id || null);
      },
      onServiceHover: (service) => {
        this.architecture.setPylonHovered(service?.id || null);
      },
      onMethodologyStageSelect: (stage) => {
        this.architecture.setMethodologyStage(stage);
        callbacks.onMethodologyStageSelect?.(stage);
      },
    };

    this.controller = new UnifiedCameraController(
      this.camera,
      this.renderer.domElement,
      this.scene,
      controllerCallbacks
    );
    this.controller.isReducedMotion = isReducedMotion;

    this.start();
  }

  public setDestination(dest: WorldDestinationId) {
    this.controller.setDestination(dest);
    this.architecture.setPylonSelected(null);
    this.architecture.setMethodologyStage(null);
    this.atlas.setSelectedNode(null);
  }

  public focusNode(node: GraphNode) {
    this.controller.focusAtlasNode(node);
    this.atlas.setSelectedNode(node.id);
  }

  public focusService(service: ServiceItem) {
    this.controller.focusServicePylon(service);
    this.architecture.setPylonSelected(service.id);
  }

  public focusMethodologyStage(stage: number | null) {
    this.architecture.setMethodologyStage(stage);
    this.controller.focusMethodologyStage(stage);
  }

  public focusOperationalStage(stage: "investigate" | "verify" | "operationalize" | null) {
    this.controller.focusOperationalStage(stage);
    if (this.jungle) {
      this.jungle.setOperationalHighlight(stage);
    }
  }

  public resetToOverview() {
    this.controller.clearFocus();
    this.architecture.setPylonSelected(null);
    this.architecture.setMethodologyStage(null);
    this.atlas.setSelectedNode(null);
  }

  public setVisible(visible: boolean) {
    this.isVisible = visible;
  }

  public handleResize(width: number, height: number) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  public start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.startTime = performance.now();
    this.lastTime = this.startTime;
    this.loop();
  }

  private loop = () => {
    if (!this.isRunning) return;
    this.animationFrameId = requestAnimationFrame(this.loop);

    if (!this.isVisible) return;

    const now = performance.now();
    const delta = Math.min((now - this.lastTime) / 1000, 0.1);
    const elapsed = (now - this.startTime) / 1000;
    this.lastTime = now;
    const activeDest = this.controller.getActiveDestination();

    this.jungle.update(delta, elapsed);
    this.architecture.update(delta, elapsed, activeDest);
    this.atlas.update(delta, elapsed, this.camera, activeDest);
    this.controller.update(delta);
    this.controller.checkHoverRaycast(this.scene);

    this.renderer.render(this.scene, this.camera);
  };

  private handleVisibilityChange = () => {
    this.setVisible(!document.hidden);
  };

  public dispose() {
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }

    document.removeEventListener("visibilitychange", this.handleVisibilityChange);

    this.controller.dispose();
    this.jungle.dispose();
    this.architecture.dispose();
    this.atlas.dispose();

    this.renderer.dispose();
    if (this.renderer.domElement.parentElement) {
      this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
    }
  }
}
