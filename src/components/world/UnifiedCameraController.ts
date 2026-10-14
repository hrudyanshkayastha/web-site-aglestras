import * as THREE from "three";
import { WorldDestinationId, WORLD_DESTINATIONS, DestinationWaypoint } from "./WorldConfig";
import { GraphNode } from "@/data/entityGraphData";
import { ServiceItem } from "@/data/services";

export interface CameraControllerCallbacks {
  onDestinationChange: (dest: WorldDestinationId) => void;
  onNodeSelect: (node: GraphNode | null) => void;
  onServiceSelect: (service: ServiceItem | null) => void;
  onMethodologyStageSelect?: (stage: number | null) => void;
  onNodeHover: (node: GraphNode | null) => void;
  onServiceHover: (service: ServiceItem | null) => void;
}

export class UnifiedCameraController {
  private camera: THREE.PerspectiveCamera;
  private domElement: HTMLElement;
  private callbacks: CameraControllerCallbacks;

  // Camera targets
  private currentCameraPos: THREE.Vector3;
  private targetCameraPos: THREE.Vector3;
  private currentLookAt: THREE.Vector3;
  private targetLookAt: THREE.Vector3;
  private currentFov: number;
  private targetFov: number;

  // Active state
  private activeDestination: WorldDestinationId = "ENTRANCE";
  private selectedNode: GraphNode | null = null;
  private selectedService: ServiceItem | null = null;
  private selectedMethodologyStage: number | null = null;

  // Orbit & Parallax
  private isDragging = false;
  private previousPointerPos = { x: 0, y: 0 };
  private rotationAngle = { yaw: 0, pitch: 0 };
  private targetRotationAngle = { yaw: 0, pitch: 0 };
  private pointerNorm = { x: 0, y: 0 };
  private isHovering = false;

  // Raycasting
  private raycaster = new THREE.Raycaster();
  private pointerCoords = new THREE.Vector2();

  // Reduced motion
  public isReducedMotion = false;
  private scene: THREE.Scene;

  constructor(
    camera: THREE.PerspectiveCamera,
    domElement: HTMLElement,
    scene: THREE.Scene,
    callbacks: CameraControllerCallbacks
  ) {
    this.camera = camera;
    this.domElement = domElement;
    this.scene = scene;
    this.callbacks = callbacks;

    const initialWp = WORLD_DESTINATIONS.ENTRANCE;
    this.currentCameraPos = new THREE.Vector3(...initialWp.cameraPos);
    this.targetCameraPos = new THREE.Vector3(...initialWp.cameraPos);
    this.currentLookAt = new THREE.Vector3(...initialWp.lookAt);
    this.targetLookAt = new THREE.Vector3(...initialWp.lookAt);
    this.currentFov = initialWp.fov || 44;
    this.targetFov = initialWp.fov || 44;

    this.camera.position.copy(this.currentCameraPos);
    this.camera.lookAt(this.currentLookAt);
    this.camera.fov = this.currentFov;
    this.camera.updateProjectionMatrix();

    this.bindEvents();
  }

  private bindEvents() {
    this.domElement.addEventListener("pointerdown", this.handlePointerDown);
    window.addEventListener("pointermove", this.handlePointerMove);
    window.addEventListener("pointerup", this.handlePointerUp);
    this.domElement.addEventListener("pointerleave", this.handlePointerLeave);
  }

  public dispose() {
    this.domElement.removeEventListener("pointerdown", this.handlePointerDown);
    window.removeEventListener("pointermove", this.handlePointerMove);
    window.removeEventListener("pointerup", this.handlePointerUp);
    this.domElement.removeEventListener("pointerleave", this.handlePointerLeave);
  }

  private handlePointerDown = (e: PointerEvent) => {
    if (e.button !== 0) return;
    this.isDragging = true;
    this.previousPointerPos = { x: e.clientX, y: e.clientY };
  };

  private handlePointerMove = (e: PointerEvent) => {
    const rect = this.domElement.getBoundingClientRect();
    if (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    ) {
      this.isHovering = true;
      this.pointerNorm.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.pointerNorm.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      this.pointerCoords.set(this.pointerNorm.x, this.pointerNorm.y);
    } else {
      this.isHovering = false;
    }

    if (this.isDragging) {
      const deltaX = e.clientX - this.previousPointerPos.x;
      const deltaY = e.clientY - this.previousPointerPos.y;
      this.previousPointerPos = { x: e.clientX, y: e.clientY };

      // Bounded yaw and pitch so orientation stays natural
      this.targetRotationAngle.yaw += deltaX * 0.005;
      this.targetRotationAngle.pitch = Math.max(
        -0.45,
        Math.min(0.45, this.targetRotationAngle.pitch + deltaY * 0.004)
      );
    }
  };

  private handlePointerUp = (e: PointerEvent) => {
    if (!this.isDragging) return;
    const wasSmallDrag =
      Math.abs(e.clientX - this.previousPointerPos.x) < 4 &&
      Math.abs(e.clientY - this.previousPointerPos.y) < 4;

    this.isDragging = false;

    if (wasSmallDrag && this.isHovering) {
      this.checkClickRaycast();
    }
  };

  private handlePointerLeave = () => {
    this.isHovering = false;
    this.pointerNorm = { x: 0, y: 0 };
    this.callbacks.onNodeHover(null);
    this.callbacks.onServiceHover(null);
  };

  public checkHoverRaycast(scene: THREE.Scene) {
    if (!this.isHovering) return;

    this.raycaster.setFromCamera(this.pointerCoords, this.camera);
    const hits = this.raycaster.intersectObjects(scene.children, true);

    let hoveredNode: GraphNode | null = null;
    let hoveredService: ServiceItem | null = null;

    for (const hit of hits) {
      let cur: THREE.Object3D | null = hit.object;
      while (cur) {
        if (cur.userData?.isAtlasNode && cur.userData.node) {
          hoveredNode = cur.userData.node as GraphNode;
          break;
        }
        if (cur.userData?.isServicePylon && cur.userData.service) {
          hoveredService = cur.userData.service as ServiceItem;
          break;
        }
        cur = cur.parent;
      }
      if (hoveredNode || hoveredService) break;
    }

    this.callbacks.onNodeHover(hoveredNode);
    this.callbacks.onServiceHover(hoveredService);
  }

  private checkClickRaycast() {
    this.raycaster.setFromCamera(this.pointerCoords, this.camera);
    const hits = this.raycaster.intersectObjects(this.scene.children, true);

    for (const hit of hits) {
      let cur: THREE.Object3D | null = hit.object;
      while (cur) {
        if (cur.userData?.isAtlasNode && cur.userData.node) {
          this.focusAtlasNode(cur.userData.node as GraphNode);
          return;
        }
        if (cur.userData?.isServicePylon && cur.userData.service) {
          this.focusServicePylon(cur.userData.service as ServiceItem);
          return;
        }
        if (cur.userData?.isMethodologyStage && cur.userData.stageNumber) {
          this.focusMethodologyStage(cur.userData.stageNumber as number);
          return;
        }
        cur = cur.parent;
      }
    }

    // Clicked into empty space
    if (this.selectedNode || this.selectedService || this.selectedMethodologyStage) {
      this.clearFocus();
    }
  }

  public setDestination(destId: WorldDestinationId) {
    this.activeDestination = destId;
    this.selectedNode = null;
    this.selectedService = null;
    this.selectedMethodologyStage = null;
    this.callbacks.onDestinationChange(destId);
    this.callbacks.onNodeSelect(null);
    this.callbacks.onServiceSelect(null);
    this.callbacks.onMethodologyStageSelect?.(null);

    const wp = WORLD_DESTINATIONS[destId];
    this.targetCameraPos.set(...wp.cameraPos);
    this.targetLookAt.set(...wp.lookAt);
    this.targetFov = wp.fov || 44;
    this.targetRotationAngle = { yaw: 0, pitch: 0 };
  }

  public focusAtlasNode(node: GraphNode) {
    this.selectedNode = node;
    this.selectedService = null;
    this.callbacks.onNodeSelect(node);
    this.callbacks.onServiceSelect(null);

    const ATLAS_NODE_COORDINATES: Record<string, [number, number, number]> = {
      "target-enterprise": [3.6, 1.0, 0.0],
      "lookalike-domain": [1.9, 1.9, 0.8],
      "tls-cert": [0.8, 2.6, -0.4],
      "ip-cluster": [1.3, 0.4, -1.8],
      "mail-infrastructure": [1.6, -0.9, 1.1],
      "registrant-proxy": [2.3, -0.4, -2.5],
      "shell-company": [5.3, 0.5, 1.2],
      "nominee-director": [5.7, 2.0, -0.8],
      "gazette-record": [4.9, -1.1, -1.8],
    };

    const coords = ATLAS_NODE_COORDINATES[node.id] || [3.6, 1.0, 0.0];
    const nx = coords[0];
    const ny = coords[1];
    const nz = coords[2];

    // Frame node with lateral offset so it appears in the left-center of viewport,
    // backed up sufficiently to keep radiating conduits and connected neighboring nodes clearly in view,
    // leaving the right side 100% free of obstruction for the compact Evidence Inspector dossier.
    this.targetCameraPos.set(nx + 1.8, ny + 1.1, nz + 4.6);
    this.targetLookAt.set(nx + 0.5, ny + 0.1, nz);
    this.targetFov = 42;
    this.targetRotationAngle = { yaw: 0, pitch: 0 };
  }

  public focusServicePylon(service: ServiceItem) {
    this.selectedService = service;
    this.selectedNode = null;
    this.callbacks.onServiceSelect(service);
    this.callbacks.onNodeSelect(null);

    const SERVICE_PYLON_COORDS: Record<string, [number, number, number]> = {
      "external-threat-intelligence": [-5.2, 0.6, 1.6],
      "business-due-diligence": [-4.0, 0.4, 2.8],
      "recruitment-verification": [-2.8, 0.2, 3.6],
      "brand-impersonation-research": [-5.6, 0.5, -0.6],
      "research-automation": [-4.2, 0.3, -1.8],
      "osint-investigative-research": [-2.9, 0.2, -2.6],
    };

    const coords = SERVICE_PYLON_COORDS[service.id] || [-4.5, 0.8, 1.0];
    const px = coords[0];
    const py = coords[1];
    const pz = coords[2];

    // Frame camera so that the pylon (body, glowing collar, kinetic aperture, and vertical beacon)
    // is positioned majestically in the left/center-left of the 3D space,
    // leaving ample room on the right for the station briefing dossier.
    this.targetCameraPos.set(px + 2.4, py + 1.5, pz + 4.2);
    this.targetLookAt.set(px + 0.7, py + 1.1, pz);
    this.targetFov = 40;
    this.targetRotationAngle = { yaw: 0, pitch: 0 };
  }

  public focusMethodologyStage(stage: number | null) {
    if (stage === null) {
      this.selectedMethodologyStage = null;
      this.callbacks.onMethodologyStageSelect?.(null);
      const wp = WORLD_DESTINATIONS.METHODOLOGY;
      this.targetCameraPos.set(...wp.cameraPos);
      this.targetLookAt.set(...wp.lookAt);
      this.targetFov = wp.fov || 44;
      this.targetRotationAngle = { yaw: 0, pitch: 0 };
      return;
    }

    const stagePositions = [
      [-2.4, -3.4, 4.4], // 01 Define
      [-1.4, -3.6, 3.2], // 02 Collect
      [-0.4, -3.8, 2.0], // 03 Verify
      [0.6, -4.0, 0.8],  // 04 Correlate
      [1.6, -4.2, -0.4], // 05 Analyze
      [2.6, -4.4, -1.6], // 06 Deliver
    ];
    const s = Math.max(1, Math.min(6, stage));
    this.selectedMethodologyStage = s;
    this.selectedNode = null;
    this.selectedService = null;
    this.callbacks.onMethodologyStageSelect?.(s);
    this.callbacks.onNodeSelect(null);
    this.callbacks.onServiceSelect(null);

    const targetPortal = stagePositions[s - 1];
    const px = targetPortal[0];
    const py = targetPortal[1];
    const pz = targetPortal[2];

    // Frame camera so that the stage monument is positioned in the left-center of viewport,
    // backed up enough to clearly see incoming and outgoing glowing conduits,
    // leaving the right ~440px free for the compact stage explanation panel.
    this.targetCameraPos.set(px + 1.8, py + 1.2, pz + 4.2);
    this.targetLookAt.set(px + 0.4, py + 0.2, pz);
    this.targetFov = 40;
    this.targetRotationAngle = { yaw: 0, pitch: 0 };
  }

  public focusOperationalStage(stage: "investigate" | "verify" | "operationalize" | null) {
    if (!stage) {
      this.selectedNode = null;
      this.selectedService = null;
      const wp = WORLD_DESTINATIONS[this.activeDestination];
      this.targetCameraPos.set(...wp.cameraPos);
      this.targetLookAt.set(...wp.lookAt);
      this.targetFov = wp.fov || 44;
      this.targetRotationAngle = { yaw: 0, pitch: 0 };
      return;
    }

    this.selectedNode = null;
    this.selectedService = null;

    if (stage === "investigate") {
      // Slanted high-angle perspective looking at the peripheral branches and source ingestion
      this.targetCameraPos.set(2.4, 2.2, 7.6);
      this.targetLookAt.set(0.8, 1.2, -1.8);
      this.targetFov = 43;
    } else if (stage === "verify") {
      // Front-on view framing the central glowing nucleus and golden dais rings
      this.targetCameraPos.set(0.0, 1.5, 5.8);
      this.targetLookAt.set(0.0, 1.05, -2.6);
      this.targetFov = 40;
    } else if (stage === "operationalize") {
      // Perspective framing the architectural colonnade pylons on the left flank
      this.targetCameraPos.set(-2.8, 2.4, 7.2);
      this.targetLookAt.set(-4.2, 1.0, 0.4);
      this.targetFov = 44;
    }

    this.targetRotationAngle = { yaw: 0, pitch: 0 };
  }

  public clearFocus() {
    this.selectedNode = null;
    this.selectedService = null;
    this.selectedMethodologyStage = null;
    this.callbacks.onNodeSelect(null);
    this.callbacks.onServiceSelect(null);
    this.callbacks.onMethodologyStageSelect?.(null);
    this.setDestination(this.activeDestination);
  }

  public getActiveDestination(): WorldDestinationId {
    return this.activeDestination;
  }

  public update(delta: number) {
    const lerpRate = this.isReducedMotion ? 1 : delta * 5;

    // Damped interpolation of orbit angles
    this.rotationAngle.yaw = THREE.MathUtils.lerp(
      this.rotationAngle.yaw,
      this.targetRotationAngle.yaw,
      lerpRate
    );
    this.rotationAngle.pitch = THREE.MathUtils.lerp(
      this.rotationAngle.pitch,
      this.targetRotationAngle.pitch,
      lerpRate
    );

    // Position and lookAt lerp
    this.currentCameraPos.lerp(this.targetCameraPos, lerpRate);
    this.currentLookAt.lerp(this.targetLookAt, lerpRate);

    // FOV lerp
    if (Math.abs(this.currentFov - this.targetFov) > 0.1) {
      this.currentFov = THREE.MathUtils.lerp(this.currentFov, this.targetFov, lerpRate);
      this.camera.fov = this.currentFov;
      this.camera.updateProjectionMatrix();
    }

    const camPos = this.currentCameraPos.clone();

    // Apply orbit yaw around lookAt
    if (Math.abs(this.rotationAngle.yaw) > 0.001 || Math.abs(this.rotationAngle.pitch) > 0.001) {
      const offset = camPos.clone().sub(this.currentLookAt);
      const radius = offset.length();
      let theta = Math.atan2(offset.x, offset.z) + this.rotationAngle.yaw;
      let phi = Math.acos(THREE.MathUtils.clamp(offset.y / radius, -1, 1)) - this.rotationAngle.pitch;
      phi = THREE.MathUtils.clamp(phi, 0.2, Math.PI - 0.2);

      offset.x = radius * Math.sin(phi) * Math.sin(theta);
      offset.y = radius * Math.cos(phi);
      offset.z = radius * Math.sin(phi) * Math.cos(theta);

      camPos.copy(this.currentLookAt).add(offset);
    }

    // Pointer Parallax
    if (!this.isDragging && !this.isReducedMotion) {
      camPos.x += this.pointerNorm.x * 0.45;
      camPos.y += this.pointerNorm.y * 0.35;
    }

    this.camera.position.copy(camPos);
    this.camera.lookAt(this.currentLookAt);
  }
}
