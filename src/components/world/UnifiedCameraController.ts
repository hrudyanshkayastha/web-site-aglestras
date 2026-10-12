import * as THREE from "three";
import { WorldDestinationId, WORLD_DESTINATIONS, DestinationWaypoint } from "./WorldConfig";
import { GraphNode } from "@/data/entityGraphData";
import { ServiceItem } from "@/data/services";

export interface CameraControllerCallbacks {
  onDestinationChange: (dest: WorldDestinationId) => void;
  onNodeSelect: (node: GraphNode | null) => void;
  onServiceSelect: (service: ServiceItem | null) => void;
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

  constructor(
    camera: THREE.PerspectiveCamera,
    domElement: HTMLElement,
    callbacks: CameraControllerCallbacks
  ) {
    this.camera = camera;
    this.domElement = domElement;
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
    const hits = this.raycaster.intersectObjects(this.camera.parent?.children || [], true);

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
        cur = cur.parent;
      }
    }

    // Clicked into empty space
    if (this.selectedNode || this.selectedService) {
      this.clearFocus();
    }
  }

  public setDestination(destId: WorldDestinationId) {
    this.activeDestination = destId;
    this.selectedNode = null;
    this.selectedService = null;
    this.callbacks.onDestinationChange(destId);
    this.callbacks.onNodeSelect(null);
    this.callbacks.onServiceSelect(null);

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

    // Frame node in Atlas with considered offset
    const nx = node.position[0] * 0.85 + 3.4;
    const ny = node.position[1] * 0.85 + 0.8;
    const nz = node.position[2] * 0.85;

    this.targetCameraPos.set(nx + 0.8, ny + 0.4, nz + 3.8);
    this.targetLookAt.set(nx, ny, nz);
    this.targetFov = 42;
    this.targetRotationAngle = { yaw: 0, pitch: 0 };
  }

  public focusServicePylon(service: ServiceItem) {
    this.selectedService = service;
    this.selectedNode = null;
    this.callbacks.onServiceSelect(service);
    this.callbacks.onNodeSelect(null);

    // Camera zooms close to service pavilion
    this.targetCameraPos.set(-4.0, 1.8, 4.4);
    this.targetLookAt.set(-4.5, 0.8, 1.0);
    this.targetFov = 40;
    this.targetRotationAngle = { yaw: 0, pitch: 0 };
  }

  public clearFocus() {
    this.selectedNode = null;
    this.selectedService = null;
    this.callbacks.onNodeSelect(null);
    this.callbacks.onServiceSelect(null);
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
