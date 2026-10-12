import * as THREE from "three";
import { WorldVantage, WORLD_VANTAGES } from "./WorldTypes";
import { GraphNode } from "@/data/entityGraphData";

export interface InteractionControllerCallbacks {
  onNodeHover: (node: GraphNode | null) => void;
  onNodeSelect: (node: GraphNode | null) => void;
  onVantageChange: (vantage: WorldVantage) => void;
}

export class WorldInteractionController {
  private camera: THREE.PerspectiveCamera;
  private domElement: HTMLElement;
  private callbacks: InteractionControllerCallbacks;

  // Camera targets for smooth cinematic interpolation
  private currentCameraPos: THREE.Vector3;
  private targetCameraPos: THREE.Vector3;
  private currentLookAt: THREE.Vector3;
  private targetLookAt: THREE.Vector3;

  // Orbit state
  private isDragging = false;
  private previousPointerPos = { x: 0, y: 0 };
  private rotationAngle = { yaw: 0, pitch: 0 };
  private targetRotationAngle = { yaw: 0, pitch: 0 };

  // Parallax state
  private pointerNorm = { x: 0, y: 0 };
  private isHovering = false;

  // Active state
  private activeVantage: WorldVantage = "OVERVIEW";
  private selectedNode: GraphNode | null = null;
  private hoveredNode: GraphNode | null = null;

  // Raycasting
  private raycaster = new THREE.Raycaster();
  private pointerCoords = new THREE.Vector2();

  // Reduced motion flag
  public isReducedMotion = false;

  constructor(
    camera: THREE.PerspectiveCamera,
    domElement: HTMLElement,
    callbacks: InteractionControllerCallbacks
  ) {
    this.camera = camera;
    this.domElement = domElement;
    this.callbacks = callbacks;

    const defaultVantage = WORLD_VANTAGES.OVERVIEW;
    this.currentCameraPos = new THREE.Vector3(...defaultVantage.cameraPos);
    this.targetCameraPos = new THREE.Vector3(...defaultVantage.cameraPos);
    this.currentLookAt = new THREE.Vector3(...defaultVantage.lookAt);
    this.targetLookAt = new THREE.Vector3(...defaultVantage.lookAt);

    this.camera.position.copy(this.currentCameraPos);
    this.camera.lookAt(this.currentLookAt);

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
    // Only primary button
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

      // Orbit yaw and bounded pitch
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

    // If it was a click/tap without dragging, trigger raycasting selection
    if (wasSmallDrag && this.isHovering) {
      this.checkClickSelection();
    }
  };

  private handlePointerLeave = () => {
    this.isHovering = false;
    this.pointerNorm = { x: 0, y: 0 };
    if (this.hoveredNode) {
      this.hoveredNode = null;
      this.callbacks.onNodeHover(null);
    }
  };

  private checkClickSelection() {
    this.raycaster.setFromCamera(this.pointerCoords, this.camera);
    // Find beacon object intersections
    const hits = this.raycaster.intersectObjects(this.camera.parent?.children || [], true);
    for (const hit of hits) {
      let cur: THREE.Object3D | null = hit.object;
      while (cur) {
        if (cur.userData?.node) {
          const clickedNode = cur.userData.node as GraphNode;
          this.focusNode(clickedNode);
          return;
        }
        cur = cur.parent;
      }
    }

    // Clicked into empty space -> clear selection
    if (this.selectedNode) {
      this.clearSelection();
    }
  }

  public checkHoverIntersection(scene: THREE.Scene) {
    if (!this.isHovering) {
      if (this.hoveredNode) {
        this.hoveredNode = null;
        this.callbacks.onNodeHover(null);
      }
      return;
    }

    this.raycaster.setFromCamera(this.pointerCoords, this.camera);
    const hits = this.raycaster.intersectObjects(scene.children, true);
    let foundNode: GraphNode | null = null;

    for (const hit of hits) {
      let cur: THREE.Object3D | null = hit.object;
      while (cur) {
        if (cur.userData?.node) {
          foundNode = cur.userData.node as GraphNode;
          break;
        }
        cur = cur.parent;
      }
      if (foundNode) break;
    }

    if (foundNode?.id !== this.hoveredNode?.id) {
      this.hoveredNode = foundNode;
      this.callbacks.onNodeHover(foundNode);
    }
  }

  public focusNode(node: GraphNode) {
    this.selectedNode = node;
    this.callbacks.onNodeSelect(node);

    const [nx, ny, nz] = node.position;
    // Frame with depth offset, angled toward entity
    this.targetCameraPos.set(nx + 0.9, ny + 0.5, nz + 4.2);
    this.targetLookAt.set(nx, ny, nz);

    // Reset orbit angles during focus to avoid gimbal conflicts
    this.targetRotationAngle = { yaw: 0, pitch: 0 };
  }

  public clearSelection() {
    this.selectedNode = null;
    this.callbacks.onNodeSelect(null);
    this.setVantage(this.activeVantage);
  }

  public setVantage(vantage: WorldVantage) {
    this.activeVantage = vantage;
    this.selectedNode = null;
    this.callbacks.onVantageChange(vantage);
    this.callbacks.onNodeSelect(null);

    const config = WORLD_VANTAGES[vantage];
    this.targetCameraPos.set(...config.cameraPos);
    this.targetLookAt.set(...config.lookAt);
    this.targetRotationAngle = { yaw: 0, pitch: 0 };
  }

  public update(delta: number) {
    // Damped interpolation of orbit angles
    const orbitLerpRate = this.isReducedMotion ? 1 : delta * 6;
    this.rotationAngle.yaw = THREE.MathUtils.lerp(
      this.rotationAngle.yaw,
      this.targetRotationAngle.yaw,
      orbitLerpRate
    );
    this.rotationAngle.pitch = THREE.MathUtils.lerp(
      this.rotationAngle.pitch,
      this.targetRotationAngle.pitch,
      orbitLerpRate
    );

    // Damped interpolation of camera positions
    const posLerpRate = this.isReducedMotion ? 1 : delta * 4;
    this.currentCameraPos.lerp(this.targetCameraPos, posLerpRate);
    this.currentLookAt.lerp(this.targetLookAt, posLerpRate);

    // Base position
    const camPos = this.currentCameraPos.clone();

    // Apply orbit yaw around lookAt point
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

    // Apply subtle pointer parallax (when not dragging)
    if (!this.isDragging && !this.isReducedMotion) {
      const parallaxX = this.pointerNorm.x * 0.45;
      const parallaxY = this.pointerNorm.y * 0.35;
      camPos.x += parallaxX;
      camPos.y += parallaxY;
    }

    this.camera.position.copy(camPos);
    this.camera.lookAt(this.currentLookAt);
  }
}
