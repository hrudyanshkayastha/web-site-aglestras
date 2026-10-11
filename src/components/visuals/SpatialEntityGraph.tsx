"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import {
  GraphNode,
  GraphEdge,
  EntityCategory,
  ENTITY_CATEGORIES,
  ILLUSTRATIVE_GRAPH_NODES,
  ILLUSTRATIVE_GRAPH_EDGES,
} from "@/data/entityGraphData";
import { EntityDetailsPanel } from "./EntityDetailsPanel";
import { AccessibleGraphFallback } from "./AccessibleGraphFallback";
import { RotateCcw, Shield } from "lucide-react";

interface SpatialEntityGraphProps {
  className?: string;
  onNodeSelect?: (node: GraphNode | null) => void;
}

export function SpatialEntityGraph({
  className = "",
  onNodeSelect,
}: SpatialEntityGraphProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<EntityCategory | "ALL">("ALL");
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [cameraMode, setCameraMode] = useState<"orbit" | "focus">("orbit");

  // Three.js instance references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const nodeMeshesRef = useRef<Map<string, THREE.Group>>(new Map());
  const edgeMeshesRef = useRef<Map<string, { line: THREE.Line; curve: THREE.CatmullRomCurve3 }>>(new Map());
  const photonParticlesRef = useRef<{ mesh: THREE.Mesh; curve: THREE.CatmullRomCurve3; speed: number; progress: number }[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);
  const isIntersectingRef = useRef<boolean>(true);

  // Target camera position for smooth interpolation
  const defaultCameraPos = new THREE.Vector3(1.6, 1.8, 7.6);
  const targetCameraPosRef = useRef<THREE.Vector3>(defaultCameraPos.clone());
  const targetLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const currentLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  // Pointer parallax tracking
  const pointerNormRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDraggingRef = useRef<boolean>(false);
  const previousPointerPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotationAnglesRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Currently selected node object
  const selectedNode = ILLUSTRATIVE_GRAPH_NODES.find((n) => n.id === selectedNodeId) || null;

  // Handle node selection
  const handleSelectNode = useCallback(
    (id: string | null) => {
      setSelectedNodeId(id);
      const node = ILLUSTRATIVE_GRAPH_NODES.find((n) => n.id === id) || null;
      if (onNodeSelect) onNodeSelect(node);

      if (node && cameraRef.current) {
        setCameraMode("focus");
        // Frame camera toward selected node with depth offset
        const [nx, ny, nz] = node.position;
        targetCameraPosRef.current.set(nx + 0.8, ny + 0.4, nz + 4.2);
        targetLookAtRef.current.set(nx, ny, nz);
      } else {
        setCameraMode("orbit");
        // Reset camera to angled 3D perspective
        targetCameraPosRef.current.copy(defaultCameraPos);
        targetLookAtRef.current.set(0, 0, 0);
      }
    },
    [onNodeSelect]
  );

  const handleResetOverview = useCallback(() => {
    handleSelectNode(null);
    rotationAnglesRef.current = { x: 0, y: 0 };
  }, [handleSelectNode]);

  // Check WebGL and reduced-motion on mount
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(motionQuery.matches);
    const motionListener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener("change", motionListener);
    return () => motionQuery.removeEventListener("change", motionListener);
  }, []);

  // Three.js scene setup and lifecycle
  useEffect(() => {
    if (!hasWebGL || isReducedMotion || !mountRef.current) return;

    const container = mountRef.current;
    let width = container.clientWidth || 900;
    let height = container.clientHeight || 640;

    // 1. Scene with atmospheric depth fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x041f1b, 0.052);
    sceneRef.current = scene;

    // 2. Camera with 42° FOV for natural spatial depth perspective
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.copy(targetCameraPosRef.current);
    cameraRef.current = camera;

    // 3. High-performance WebGL Renderer with alpha transparency
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Sophisticated Multi-Tier Lighting
    const ambientLight = new THREE.AmbientLight(0x073b32, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xe2f4ee, 2.8);
    keyLight.position.set(6, 10, 8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x2fa885, 2.0);
    rimLight.position.set(-8, -4, 5);
    scene.add(rimLight);

    // Central interior point radiance
    const centerRadiance = new THREE.PointLight(0xb7e4d5, 2.4, 14);
    centerRadiance.position.set(0, 0, 0);
    scene.add(centerRadiance);

    // Floor coordinate reference latitude circles
    const floorGroup = new THREE.Group();
    floorGroup.position.y = -3.2;
    for (let r = 2; r <= 8; r += 2) {
      const ringGeom = new THREE.RingGeometry(r - 0.015, r + 0.015, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x2fa885,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.08,
      });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.rotation.x = Math.PI / 2;
      floorGroup.add(ring);
    }
    scene.add(floorGroup);

    // 5. Build Spatial Graph Nodes
    const nodeMeshes = new Map<string, THREE.Group>();
    nodeMeshesRef.current = nodeMeshes;

    ILLUSTRATIVE_GRAPH_NODES.forEach((node) => {
      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(...node.position);
      nodeGroup.userData = { nodeId: node.id, nodeData: node };

      const baseColor = new THREE.Color(node.color);
      const isCentral = node.id === "target-enterprise";

      // Core Polyhedron Geometry based on Category Semantics
      let coreGeometry: THREE.BufferGeometry;
      switch (node.category) {
        case "ORGANIZATION":
          coreGeometry = isCentral
            ? new THREE.DodecahedronGeometry(0.44)
            : new THREE.DodecahedronGeometry(0.32);
          break;
        case "DOMAIN":
          coreGeometry = new THREE.IcosahedronGeometry(0.3);
          break;
        case "INFRASTRUCTURE":
          coreGeometry = new THREE.CylinderGeometry(0.24, 0.24, 0.42, 8);
          break;
        case "DIGITAL_IDENTITY":
          coreGeometry = new THREE.OctahedronGeometry(0.32);
          break;
        case "EVIDENCE_RECORD":
        default:
          coreGeometry = new THREE.OctahedronGeometry(0.26);
          break;
      }

      const coreMaterial = new THREE.MeshStandardMaterial({
        color: baseColor,
        roughness: 0.2,
        metalness: 0.8,
        emissive: baseColor,
        emissiveIntensity: isCentral ? 0.6 : 0.35,
      });

      const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
      nodeGroup.add(coreMesh);

      // Primary Orbital Ring
      const ringGeom = new THREE.TorusGeometry(isCentral ? 0.68 : 0.48, 0.015, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: baseColor,
        transparent: true,
        opacity: isCentral ? 0.75 : 0.45,
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.rotation.x = isCentral ? Math.PI / 4 : Math.PI / 2;
      nodeGroup.add(ringMesh);

      // Secondary inclined ring for central target entity
      if (isCentral) {
        const ring2Geom = new THREE.TorusGeometry(0.78, 0.012, 16, 64);
        const ring2Mat = new THREE.MeshBasicMaterial({
          color: 0xf4f2ea,
          transparent: true,
          opacity: 0.5,
        });
        const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
        ring2.rotation.y = Math.PI / 3;
        nodeGroup.add(ring2);
      }

      scene.add(nodeGroup);
      nodeMeshes.set(node.id, nodeGroup);
    });

    // 6. Build Curved 3D Spline Edges and Active Signal Photons
    const edgeMeshes = new Map<string, { line: THREE.Line; curve: THREE.CatmullRomCurve3 }>();
    edgeMeshesRef.current = edgeMeshes;
    const photons: { mesh: THREE.Mesh; curve: THREE.CatmullRomCurve3; speed: number; progress: number }[] = [];

    ILLUSTRATIVE_GRAPH_EDGES.forEach((edge) => {
      const sourceNode = ILLUSTRATIVE_GRAPH_NODES.find((n) => n.id === edge.source);
      const targetNode = ILLUSTRATIVE_GRAPH_NODES.find((n) => n.id === edge.target);
      if (!sourceNode || !targetNode) return;

      const p1 = new THREE.Vector3(...sourceNode.position);
      const p2 = new THREE.Vector3(...targetNode.position);

      // Deflect midpoint outward and upward for true 3D volumetric curve
      const midPoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      const normal = new THREE.Vector3().crossVectors(p1, p2).normalize();
      if (normal.length() === 0) normal.set(0, 1, 0);
      midPoint.addScaledVector(normal, 0.55);
      midPoint.y += 0.2;

      const curve = new THREE.CatmullRomCurve3([p1, midPoint, p2]);
      const points = curve.getPoints(48);
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xb7e4d5,
        transparent: true,
        opacity: 0.35,
      });

      const line = new THREE.Line(lineGeometry, lineMaterial);
      line.userData = { edgeId: edge.id, edgeData: edge };
      scene.add(line);
      edgeMeshes.set(edge.id, { line, curve });

      // Signal Flow Photon traveling along this spline
      const photonGeom = new THREE.SphereGeometry(0.045, 12, 12);
      const photonMat = new THREE.MeshBasicMaterial({
        color: 0x2fa885,
        transparent: true,
        opacity: 0.85,
      });
      const photonMesh = new THREE.Mesh(photonGeom, photonMat);
      scene.add(photonMesh);
      photons.push({
        mesh: photonMesh,
        curve,
        speed: 0.18 + Math.random() * 0.12,
        progress: Math.random(),
      });
    });

    photonParticlesRef.current = photons;

    // 7. Raycasting & Interaction Listeners
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      pointer.set(x, y);

      pointerNormRef.current = { x, y };
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });

      // Drag Orbit
      if (isDraggingRef.current) {
        const deltaX = e.clientX - previousPointerPosRef.current.x;
        const deltaY = e.clientY - previousPointerPosRef.current.y;
        previousPointerPosRef.current = { x: e.clientX, y: e.clientY };

        rotationAnglesRef.current.y += deltaX * 0.005;
        rotationAnglesRef.current.x = Math.max(
          -0.35,
          Math.min(0.35, rotationAnglesRef.current.x + deltaY * 0.005)
        );
      }

      // Check hover on nodes
      raycaster.setFromCamera(pointer, camera);
      const hitCandidates: THREE.Object3D[] = [];
      nodeMeshes.forEach((g) => hitCandidates.push(...g.children));

      const intersects = raycaster.intersectObjects(hitCandidates, false);
      if (intersects.length > 0) {
        const group = intersects[0].object.parent;
        if (group && group.userData.nodeData) {
          setHoveredNode(group.userData.nodeData as GraphNode);
          container.style.cursor = "pointer";
          return;
        }
      }
      setHoveredNode(null);
      container.style.cursor = isDraggingRef.current ? "grabbing" : "default";
    };

    const handlePointerDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousPointerPosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = (e: MouseEvent) => {
      isDraggingRef.current = false;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      pointer.set(x, y);

      raycaster.setFromCamera(pointer, camera);
      const hitCandidates: THREE.Object3D[] = [];
      nodeMeshes.forEach((g) => hitCandidates.push(...g.children));

      const intersects = raycaster.intersectObjects(hitCandidates, false);
      if (intersects.length > 0) {
        const group = intersects[0].object.parent;
        if (group && group.userData.nodeId) {
          handleSelectNode(group.userData.nodeId);
          return;
        }
      }
    };

    container.addEventListener("mousemove", handlePointerMove);
    container.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mouseup", handlePointerUp);

    // 8. Responsive resize with ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries[0]) return;
      const { width: newWidth, height: newHeight } = entries[0].contentRect;
      if (newWidth > 0 && newHeight > 0) {
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }
    });
    resizeObserver.observe(container);

    // 9. IntersectionObserver to throttle render loop when offscreen
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isIntersectingRef.current = entry.isIntersecting;
    });
    intersectionObserver.observe(container);

    // 10. Main Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      if (!isIntersectingRef.current) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Camera Smooth Interpolation & Dynamic Parallax
      if (cameraMode === "orbit") {
        // Physical parallax based on pointer position
        const parallaxX = pointerNormRef.current.x * 0.45;
        const parallaxY = pointerNormRef.current.y * 0.35;
        const targetPos = new THREE.Vector3(
          defaultCameraPos.x + parallaxX,
          defaultCameraPos.y + parallaxY,
          defaultCameraPos.z
        );
        camera.position.lerp(targetPos, 0.05);
      } else {
        camera.position.lerp(targetCameraPosRef.current, 0.06);
      }

      currentLookAtRef.current.lerp(targetLookAtRef.current, 0.06);
      camera.lookAt(currentLookAtRef.current);

      // Autonomous breathing & rotation for nodes
      nodeMeshes.forEach((group, id) => {
        const core = group.children[0] as THREE.Mesh;
        const ring1 = group.children[1] as THREE.Mesh;
        const ring2 = group.children[2] as THREE.Mesh;

        if (core) {
          core.rotation.y += 0.006;
          core.rotation.x += 0.003;
        }
        if (ring1) {
          ring1.rotation.z += 0.009;
        }
        if (ring2) {
          ring2.rotation.x += 0.007;
        }
      });

      // Update traveling signal photons along splines
      photonParticlesRef.current.forEach((photon) => {
        photon.progress = (photon.progress + photon.speed * delta * 0.3) % 1.0;
        const pt = photon.curve.getPointAt(photon.progress);
        photon.mesh.position.copy(pt);
      });

      // Scene gentle idle drift when in overview mode
      if (!isDraggingRef.current && cameraMode === "orbit") {
        scene.rotation.y = rotationAnglesRef.current.y + Math.sin(elapsedTime * 0.15) * 0.06;
        scene.rotation.x = rotationAnglesRef.current.x + Math.cos(elapsedTime * 0.2) * 0.03;
      } else {
        scene.rotation.y = rotationAnglesRef.current.y;
        scene.rotation.x = rotationAnglesRef.current.x;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Clean resource disposal
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      container.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mouseup", handlePointerUp);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      nodeMeshes.forEach((group) => {
        group.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            obj.geometry?.dispose();
            if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
            else obj.material?.dispose();
          }
        });
      });

      edgeMeshes.forEach(({ line }) => {
        line.geometry?.dispose();
        if (Array.isArray(line.material)) line.material.forEach((m) => m.dispose());
        else line.material?.dispose();
      });

      photonParticlesRef.current.forEach((p) => {
        p.mesh.geometry?.dispose();
        if (Array.isArray(p.mesh.material)) p.mesh.material.forEach((m) => m.dispose());
        else p.mesh.material?.dispose();
      });

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [hasWebGL, isReducedMotion, handleSelectNode, cameraMode]);

  // Update visual focus highlighting on selection
  useEffect(() => {
    if (!sceneRef.current) return;

    const connectedNodeIds = new Set<string>();
    if (selectedNodeId) {
      connectedNodeIds.add(selectedNodeId);
      ILLUSTRATIVE_GRAPH_EDGES.forEach((edge) => {
        if (edge.source === selectedNodeId) connectedNodeIds.add(edge.target);
        if (edge.target === selectedNodeId) connectedNodeIds.add(edge.source);
      });
    }

    // Nodes opacity & scale
    nodeMeshesRef.current.forEach((group, id) => {
      const isSelected = id === selectedNodeId;
      const isConnected = connectedNodeIds.has(id);
      const isFiltered =
        activeCategoryFilter === "ALL" ||
        group.userData.nodeData.category === activeCategoryFilter;

      const coreMesh = group.children[0] as THREE.Mesh;
      const ringMesh = group.children[1] as THREE.Mesh;

      if (!isFiltered) {
        group.visible = false;
        return;
      }
      group.visible = true;

      if (coreMesh && coreMesh.material instanceof THREE.MeshStandardMaterial) {
        if (!selectedNodeId) {
          coreMesh.scale.set(1, 1, 1);
          coreMesh.material.transparent = false;
          coreMesh.material.opacity = 1.0;
          coreMesh.material.emissiveIntensity = id === "target-enterprise" ? 0.6 : 0.35;
          if (ringMesh && ringMesh.material instanceof THREE.MeshBasicMaterial) {
            ringMesh.material.opacity = id === "target-enterprise" ? 0.75 : 0.45;
          }
        } else if (isSelected) {
          coreMesh.scale.set(1.4, 1.4, 1.4);
          coreMesh.material.transparent = false;
          coreMesh.material.opacity = 1.0;
          coreMesh.material.emissiveIntensity = 1.1;
          if (ringMesh && ringMesh.material instanceof THREE.MeshBasicMaterial) {
            ringMesh.material.opacity = 0.95;
          }
        } else if (isConnected) {
          coreMesh.scale.set(1.15, 1.15, 1.15);
          coreMesh.material.transparent = false;
          coreMesh.material.opacity = 0.9;
          coreMesh.material.emissiveIntensity = 0.65;
          if (ringMesh && ringMesh.material instanceof THREE.MeshBasicMaterial) {
            ringMesh.material.opacity = 0.6;
          }
        } else {
          coreMesh.scale.set(0.82, 0.82, 0.82);
          coreMesh.material.transparent = true;
          coreMesh.material.opacity = 0.12;
          coreMesh.material.emissiveIntensity = 0.05;
          if (ringMesh && ringMesh.material instanceof THREE.MeshBasicMaterial) {
            ringMesh.material.opacity = 0.06;
          }
        }
      }
    });

    // Edges opacity & color
    edgeMeshesRef.current.forEach(({ line }, edgeId) => {
      const edgeData = line.userData.edgeData as GraphEdge;
      const isConnected =
        selectedNodeId &&
        (edgeData.source === selectedNodeId || edgeData.target === selectedNodeId);

      const mat = line.material as THREE.LineBasicMaterial;
      if (!selectedNodeId) {
        mat.color.setHex(0xb7e4d5);
        mat.opacity = 0.35;
      } else if (isConnected) {
        mat.color.setHex(0x2fa885);
        mat.opacity = 0.95;
      } else {
        mat.color.setHex(0xb7e4d5);
        mat.opacity = 0.06;
      }
    });
  }, [selectedNodeId, activeCategoryFilter]);

  // Fallback for non-WebGL / reduced-motion
  if (!hasWebGL || isReducedMotion) {
    return (
      <div className={`space-y-6 ${className}`}>
        <AccessibleGraphFallback
          selectedNodeId={selectedNodeId}
          onSelectNode={handleSelectNode}
          activeCategoryFilter={activeCategoryFilter}
          onSelectCategoryFilter={setActiveCategoryFilter}
        />
        {selectedNode && (
          <EntityDetailsPanel
            node={selectedNode}
            onClose={() => handleSelectNode(null)}
            onSelectNode={handleSelectNode}
          />
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none ${className}`}
      aria-label="Interactive 3D OSINT Spatial Intelligence Network"
    >
      {/* Top Floating Controls: Clean & Unobtrusive */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#031714]/80 border border-[#B7E4D5]/20 backdrop-blur-md text-[11px] font-mono pointer-events-auto">
          <button
            type="button"
            onClick={() => setActiveCategoryFilter("ALL")}
            className={`px-3 py-1 rounded-full transition-all ${
              activeCategoryFilter === "ALL"
                ? "bg-[#2FA885] text-[#041F1B] font-semibold"
                : "text-[#8DA99E] hover:text-[#FFFFFF]"
            }`}
          >
            All ({ILLUSTRATIVE_GRAPH_NODES.length})
          </button>
          {(Object.keys(ENTITY_CATEGORIES) as EntityCategory[]).map((cat) => {
            const meta = ENTITY_CATEGORIES[cat];
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                  activeCategoryFilter === cat
                    ? "bg-[#2FA885] text-[#041F1B] font-semibold"
                    : "text-[#8DA99E] hover:text-[#FFFFFF]"
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: meta.color }}
                />
                <span className="hidden md:inline">{meta.label}</span>
              </button>
            );
          })}
        </div>

        {/* Reset Overview Button (Appears only when node is focused) */}
        {selectedNodeId && (
          <button
            type="button"
            onClick={handleResetOverview}
            className="px-3.5 py-1.5 rounded-full bg-[#073B32] hover:bg-[#0A4D3F] border border-[#B7E4D5]/40 text-xs font-mono text-[#F4F2EA] flex items-center gap-1.5 shadow-md transition-all pointer-events-auto"
          >
            <RotateCcw size={12} className="text-[#2FA885]" />
            <span>Reset Overview</span>
          </button>
        )}
      </div>

      {/* Main 3D Canvas Mount Container with Seamless Radial Vignette */}
      <div
        ref={mountRef}
        className="w-full h-[580px] sm:h-[660px] lg:h-[720px] select-none"
        style={{
          maskImage: "radial-gradient(ellipse at center, black 65%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 65%, transparent 100%)",
        }}
        role="region"
        aria-label="3D Spatial Intelligence Network Canvas"
      />

      {/* Floating Hover Tooltip */}
      {hoveredNode && !selectedNode && (
        <div
          className="absolute z-30 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-3 px-3 py-1.5 rounded-xl bg-[#031714]/95 border border-[#B7E4D5]/30 shadow-3d-card backdrop-blur-md transition-opacity"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y - 12}px`,
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: hoveredNode.color }}
            />
            <span className="font-mono text-xs text-[#F4F2EA] font-medium">
              {hoveredNode.name}
            </span>
          </div>
          <span className="font-mono text-[9px] text-[#8DA99E] uppercase block mt-0.5">
            {hoveredNode.categoryLabel} • {hoveredNode.epistemicTier}
          </span>
        </div>
      )}

      {/* Floating Entity Details Inspector Panel */}
      {selectedNode && (
        <div className="absolute top-4 right-4 bottom-4 z-40 max-w-sm flex items-start overflow-y-auto">
          <EntityDetailsPanel
            node={selectedNode}
            onClose={() => handleSelectNode(null)}
            onSelectNode={handleSelectNode}
          />
        </div>
      )}

      {/* Bottom Status & Methodology Disclaimer */}
      <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between pointer-events-none text-[10px] font-mono text-[#718E84]">
        <div className="flex items-center gap-1.5 bg-[#031714]/80 px-2.5 py-1 rounded-full border border-[#B7E4D5]/10 backdrop-blur-sm pointer-events-auto">
          <Shield size={11} className="text-[#2FA885]" />
          <span>Demonstration Topology — Fictitious Entities</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-[#031714]/80 px-2.5 py-1 rounded-full border border-[#B7E4D5]/10 backdrop-blur-sm pointer-events-auto">
          <span>Click node to inspect relationships</span>
        </div>
      </div>
    </div>
  );
}
