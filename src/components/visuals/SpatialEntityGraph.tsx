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
import { RotateCcw, Shield, Layers, Eye, Info, Sparkles, Filter } from "lucide-react";

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

  // Three.js instance references held in ref to avoid React re-renders
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const nodeMeshesRef = useRef<Map<string, THREE.Group>>(new Map());
  const edgeMeshesRef = useRef<Map<string, { line: THREE.Line; curve: THREE.CatmullRomCurve3 }>>(new Map());
  const animationFrameIdRef = useRef<number | null>(null);
  const isIntersectingRef = useRef<boolean>(true);

  // Target camera position for smooth interpolation
  const targetCameraPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 7.8));
  const targetLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const currentLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  // Mouse orbit dragging tracking
  const isDraggingRef = useRef<boolean>(false);
  const previousPointerPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotationAnglesRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Currently selected node object
  const selectedNode = ILLUSTRATIVE_GRAPH_NODES.find((n) => n.id === selectedNodeId) || null;

  // Handle external node selection callback
  const handleSelectNode = useCallback(
    (id: string | null) => {
      setSelectedNodeId(id);
      const node = ILLUSTRATIVE_GRAPH_NODES.find((n) => n.id === id) || null;
      if (onNodeSelect) onNodeSelect(node);

      if (node && cameraRef.current) {
        setCameraMode("focus");
        // Frame camera smoothly toward selected node
        const [nx, ny, nz] = node.position;
        targetCameraPosRef.current.set(nx + 0.6, ny + 0.3, nz + 4.2);
        targetLookAtRef.current.set(nx, ny, nz);
      } else {
        setCameraMode("orbit");
        // Reset camera to default wide overview
        targetCameraPosRef.current.set(0, 0, 7.8);
        targetLookAtRef.current.set(0, 0, 0);
      }
    },
    [onNodeSelect]
  );

  // Reset view to default
  const handleResetOverview = useCallback(() => {
    handleSelectNode(null);
    rotationAnglesRef.current = { x: 0, y: 0 };
  }, [handleSelectNode]);

  // Check WebGL and reduced-motion on mount
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(motionQuery.matches);
    const motionListener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener("change", motionListener);
    return () => motionQuery.removeEventListener("change", motionListener);
  }, []);

  // Main Three.js setup and lifecycle
  useEffect(() => {
    if (!hasWebGL || isReducedMotion || !mountRef.current) return;

    const container = mountRef.current;
    let width = container.clientWidth || 800;
    let height = container.clientHeight || 560;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.copy(targetCameraPosRef.current);
    cameraRef.current = camera;

    // 3. Renderer with high-performance settings & transparent background
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting (Controlled, matte, architectural)
    const ambientLight = new THREE.AmbientLight(0xdcfce7, 0.9);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xb7e4d5, 2.0);
    directionalLight1.position.set(5, 8, 6);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0x2fa885, 1.2);
    directionalLight2.position.set(-6, -4, 4);
    scene.add(directionalLight2);

    // Deep subtle floor grid for spatial depth reference
    const gridHelper = new THREE.GridHelper(12, 16, 0x2fa885, 0x073b32);
    gridHelper.position.y = -3.2;
    // Set low opacity on grid lines
    if (Array.isArray(gridHelper.material)) {
      gridHelper.material.forEach((m) => {
        m.transparent = true;
        m.opacity = 0.15;
      });
    } else {
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.15;
    }
    scene.add(gridHelper);

    // 5. Build Graph Nodes
    const nodeMeshes = new Map<string, THREE.Group>();
    nodeMeshesRef.current = nodeMeshes;

    ILLUSTRATIVE_GRAPH_NODES.forEach((node) => {
      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(...node.position);
      nodeGroup.userData = { nodeId: node.id, nodeData: node };

      const baseColor = new THREE.Color(node.color);

      // Node core geometry based on category
      let coreGeometry: THREE.BufferGeometry;
      switch (node.category) {
        case "ORGANIZATION":
          coreGeometry = new THREE.DodecahedronGeometry(0.32);
          break;
        case "DOMAIN":
          coreGeometry = new THREE.IcosahedronGeometry(0.28);
          break;
        case "INFRASTRUCTURE":
          coreGeometry = new THREE.BoxGeometry(0.38, 0.38, 0.38);
          break;
        case "DIGITAL_IDENTITY":
          coreGeometry = new THREE.OctahedronGeometry(0.3);
          break;
        case "EVIDENCE_RECORD":
        default:
          coreGeometry = new THREE.ConeGeometry(0.26, 0.44, 5);
          break;
      }

      const coreMaterial = new THREE.MeshStandardMaterial({
        color: baseColor,
        roughness: 0.25,
        metalness: 0.8,
        emissive: baseColor,
        emissiveIntensity: 0.3,
      });

      const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
      nodeGroup.add(coreMesh);

      // Outer Orbital Halo Ring
      const ringGeometry = new THREE.RingGeometry(0.48, 0.52, 32);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: baseColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.45,
      });
      const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
      ringMesh.rotation.x = Math.PI / 2;
      nodeGroup.add(ringMesh);

      scene.add(nodeGroup);
      nodeMeshes.set(node.id, nodeGroup);
    });

    // 6. Build Connecting Edges (Smooth Curved 3D Arcs)
    const edgeMeshes = new Map<string, { line: THREE.Line; curve: THREE.CatmullRomCurve3 }>();
    edgeMeshesRef.current = edgeMeshes;

    ILLUSTRATIVE_GRAPH_EDGES.forEach((edge) => {
      const sourceNode = ILLUSTRATIVE_GRAPH_NODES.find((n) => n.id === edge.source);
      const targetNode = ILLUSTRATIVE_GRAPH_NODES.find((n) => n.id === edge.target);
      if (!sourceNode || !targetNode) return;

      const p1 = new THREE.Vector3(...sourceNode.position);
      const p2 = new THREE.Vector3(...targetNode.position);

      // Arc midpoint displaced slightly outward for 3D curved depth
      const midPoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      const normal = new THREE.Vector3().crossVectors(p1, p2).normalize();
      midPoint.addScaledVector(normal, 0.45);

      const curve = new THREE.CatmullRomCurve3([p1, midPoint, p2]);
      const points = curve.getPoints(40);
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xb7e4d5,
        transparent: true,
        opacity: 0.3,
      });

      const line = new THREE.Line(lineGeometry, lineMaterial);
      line.userData = { edgeId: edge.id, edgeData: edge };
      scene.add(line);
      edgeMeshes.set(edge.id, { line, curve });
    });

    // 7. Raycasting for Interaction
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      pointer.set(x, y);

      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });

      // Handle drag rotation
      if (isDraggingRef.current) {
        const deltaX = e.clientX - previousPointerPosRef.current.x;
        const deltaY = e.clientY - previousPointerPosRef.current.y;
        previousPointerPosRef.current = { x: e.clientX, y: e.clientY };

        rotationAnglesRef.current.y += deltaX * 0.005;
        rotationAnglesRef.current.x = Math.max(
          -0.4,
          Math.min(0.4, rotationAnglesRef.current.x + deltaY * 0.005)
        );
      }

      // Check hover intersections on node groups
      raycaster.setFromCamera(pointer, camera);
      const interactableMeshes: THREE.Object3D[] = [];
      nodeMeshes.forEach((group) => {
        interactableMeshes.push(...group.children);
      });

      const intersects = raycaster.intersectObjects(interactableMeshes, false);
      if (intersects.length > 0) {
        let parentGroup = intersects[0].object.parent;
        if (parentGroup && parentGroup.userData.nodeData) {
          setHoveredNode(parentGroup.userData.nodeData as GraphNode);
          container.style.cursor = "pointer";
          return;
        }
      }
      setHoveredNode(null);
      container.style.cursor = isDraggingRef.current ? "grabbing" : "grab";
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
      const interactableMeshes: THREE.Object3D[] = [];
      nodeMeshes.forEach((group) => {
        interactableMeshes.push(...group.children);
      });

      const intersects = raycaster.intersectObjects(interactableMeshes, false);
      if (intersects.length > 0) {
        const parentGroup = intersects[0].object.parent;
        if (parentGroup && parentGroup.userData.nodeId) {
          handleSelectNode(parentGroup.userData.nodeId);
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

    // 10. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      if (!isIntersectingRef.current) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation
      camera.position.lerp(targetCameraPosRef.current, 0.05);
      currentLookAtRef.current.lerp(targetLookAtRef.current, 0.05);
      camera.lookAt(currentLookAtRef.current);

      // Node autonomous subtle breathing & ring rotation
      nodeMeshes.forEach((group, id) => {
        const ring = group.children[1];
        if (ring) {
          ring.rotation.z += 0.008;
        }

        // Slight hover elevation
        const core = group.children[0] as THREE.Mesh;
        if (core) {
          core.rotation.y += 0.005;
          core.rotation.x += 0.003;
        }
      });

      // Subtle scene ambient rotation when not dragging and in overview mode
      if (!isDraggingRef.current && cameraMode === "orbit") {
        scene.rotation.y = rotationAnglesRef.current.y + Math.sin(elapsedTime * 0.2) * 0.08;
        scene.rotation.x = rotationAnglesRef.current.x + Math.cos(elapsedTime * 0.25) * 0.04;
      } else {
        scene.rotation.y = rotationAnglesRef.current.y;
        scene.rotation.x = rotationAnglesRef.current.x;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup resources cleanly on unmount
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      container.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mouseup", handlePointerUp);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      // Dispose Three.js objects
      nodeMeshes.forEach((group) => {
        group.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            obj.geometry?.dispose();
            if (Array.isArray(obj.material)) {
              obj.material.forEach((m) => m.dispose());
            } else {
              obj.material?.dispose();
            }
          }
        });
      });

      edgeMeshes.forEach(({ line }) => {
        line.geometry?.dispose();
        if (Array.isArray(line.material)) {
          line.material.forEach((m) => m.dispose());
        } else {
          line.material?.dispose();
        }
      });

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [hasWebGL, isReducedMotion, handleSelectNode, cameraMode]);

  // Update visual highlighting on selection changes
  useEffect(() => {
    if (!sceneRef.current) return;

    // Direct connected node IDs for the selected node
    const connectedNodeIds = new Set<string>();
    if (selectedNodeId) {
      connectedNodeIds.add(selectedNodeId);
      ILLUSTRATIVE_GRAPH_EDGES.forEach((edge) => {
        if (edge.source === selectedNodeId) connectedNodeIds.add(edge.target);
        if (edge.target === selectedNodeId) connectedNodeIds.add(edge.source);
      });
    }

    // Update nodes opacity & scale
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
          // Default unselected state
          coreMesh.scale.set(1, 1, 1);
          coreMesh.material.opacity = 1.0;
          coreMesh.material.transparent = false;
          coreMesh.material.emissiveIntensity = 0.3;
          if (ringMesh && ringMesh.material instanceof THREE.MeshBasicMaterial) {
            ringMesh.material.opacity = 0.45;
          }
        } else if (isSelected) {
          // Selected node: scaled up with high emissive boost
          coreMesh.scale.set(1.4, 1.4, 1.4);
          coreMesh.material.opacity = 1.0;
          coreMesh.material.transparent = false;
          coreMesh.material.emissiveIntensity = 1.0;
          if (ringMesh && ringMesh.material instanceof THREE.MeshBasicMaterial) {
            ringMesh.material.opacity = 0.9;
          }
        } else if (isConnected) {
          // Directly linked neighbor
          coreMesh.scale.set(1.15, 1.15, 1.15);
          coreMesh.material.opacity = 0.9;
          coreMesh.material.transparent = false;
          coreMesh.material.emissiveIntensity = 0.6;
          if (ringMesh && ringMesh.material instanceof THREE.MeshBasicMaterial) {
            ringMesh.material.opacity = 0.6;
          }
        } else {
          // Unconnected background node: softly dimmed
          coreMesh.scale.set(0.85, 0.85, 0.85);
          coreMesh.material.transparent = true;
          coreMesh.material.opacity = 0.15;
          coreMesh.material.emissiveIntensity = 0.05;
          if (ringMesh && ringMesh.material instanceof THREE.MeshBasicMaterial) {
            ringMesh.material.opacity = 0.08;
          }
        }
      }
    });

    // Update edges opacity & color
    edgeMeshesRef.current.forEach(({ line }, edgeId) => {
      const edgeData = line.userData.edgeData as GraphEdge;
      const isConnected =
        selectedNodeId &&
        (edgeData.source === selectedNodeId || edgeData.target === selectedNodeId);

      const mat = line.material as THREE.LineBasicMaterial;
      if (!selectedNodeId) {
        mat.color.setHex(0xb7e4d5);
        mat.opacity = 0.3;
      } else if (isConnected) {
        mat.color.setHex(0x2fa885);
        mat.opacity = 0.95;
      } else {
        mat.color.setHex(0xb7e4d5);
        mat.opacity = 0.08;
      }
    });
  }, [selectedNodeId, activeCategoryFilter]);

  // Fallback if WebGL unavailable or reduced-motion requested
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
      className={`relative w-full rounded-3xl bg-[#041F1B] border border-[#B7E4D5]/20 overflow-hidden shadow-3d-card ${className}`}
      aria-label="Interactive 3D OSINT Spatial Entity Graph"
    >
      {/* Top Overlay Bar: Category Filters & View Reset */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
        {/* Left: Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-full bg-[#031714]/80 border border-[#B7E4D5]/20 backdrop-blur-md text-[11px] font-mono">
          <button
            type="button"
            onClick={() => setActiveCategoryFilter("ALL")}
            className={`px-3 py-1 rounded-full transition-all ${
              activeCategoryFilter === "ALL"
                ? "bg-[#2FA885] text-[#041F1B] font-semibold shadow-sm"
                : "text-[#8DA99E] hover:text-[#FFFFFF]"
            }`}
          >
            All Nodes ({ILLUSTRATIVE_GRAPH_NODES.length})
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
                    ? "bg-[#2FA885] text-[#041F1B] font-semibold shadow-sm"
                    : "text-[#8DA99E] hover:text-[#FFFFFF]"
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: meta.color }}
                />
                <span className="hidden sm:inline">{meta.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Reset Overview Button */}
        <div className="flex items-center gap-2">
          {selectedNodeId && (
            <button
              type="button"
              onClick={handleResetOverview}
              className="px-3 py-1.5 rounded-full bg-[#073B32] hover:bg-[#0A4D3F] border border-[#B7E4D5]/30 text-xs font-mono text-[#F4F2EA] flex items-center gap-1.5 shadow-sm transition-all focus:outline-none focus:ring-1 focus:ring-[#2FA885]"
            >
              <RotateCcw size={12} className="text-[#2FA885]" />
              <span>Reset Overview</span>
            </button>
          )}

          <div className="px-2.5 py-1 rounded-full bg-[#021310]/70 border border-[#B7E4D5]/15 text-[10px] font-mono text-[#8DA99E] hidden md:flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885] animate-pulse" />
            <span>Click node to inspect</span>
          </div>
        </div>
      </div>

      {/* Main 3D WebGL Canvas Mount Container */}
      <div
        ref={mountRef}
        className="w-full h-[540px] sm:h-[620px] lg:h-[700px] select-none"
        role="region"
        aria-label="3D Spatial Intelligence Network Canvas"
      />

      {/* Floating Hover Tooltip (Tracks cursor position) */}
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

      {/* Slide-in / Floating Entity Details Inspector Panel */}
      {selectedNode && (
        <div className="absolute top-4 right-4 bottom-4 z-40 max-w-sm flex items-start overflow-y-auto">
          <EntityDetailsPanel
            node={selectedNode}
            onClose={() => handleSelectNode(null)}
            onSelectNode={handleSelectNode}
          />
        </div>
      )}

      {/* Bottom Status & Methodology Disclaimer Strip */}
      <div className="absolute bottom-3 left-4 right-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-2 pointer-events-none text-[10px] font-mono text-[#718E84]">
        <div className="flex items-center gap-2 bg-[#031714]/80 px-2.5 py-1 rounded-full border border-[#B7E4D5]/10 backdrop-blur-sm pointer-events-auto">
          <Shield size={11} className="text-[#2FA885]" />
          <span>Illustrative Demonstration — Fictitious Topology</span>
        </div>

        <div className="hidden md:flex items-center gap-2 bg-[#031714]/80 px-2.5 py-1 rounded-full border border-[#B7E4D5]/10 backdrop-blur-sm pointer-events-auto">
          <span>Click & Drag to Orbit</span>
          <span>•</span>
          <span>Click Node to Inspect</span>
        </div>
      </div>
    </div>
  );
}
