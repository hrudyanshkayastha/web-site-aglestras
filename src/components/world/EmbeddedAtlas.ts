import * as THREE from "three";
import {
  GraphNode,
  GraphEdge,
  ILLUSTRATIVE_GRAPH_NODES,
  ILLUSTRATIVE_GRAPH_EDGES,
  ENTITY_CATEGORIES,
} from "@/data/entityGraphData";
import { WorldDestinationId } from "./WorldConfig";

export interface AtlasObject {
  node: GraphNode;
  group: THREE.Group;
  coreMesh: THREE.Mesh;
  outerRing?: THREE.Mesh;
  haloMesh?: THREE.Mesh;
  baseY: number;
}

export interface EmbeddedAtlasElements {
  group: THREE.Group;
  nodeMeshes: Map<string, AtlasObject>;
  update: (delta: number, elapsed: number, camera: THREE.Camera, activeDestination?: WorldDestinationId) => void;
  setHoveredNode: (id: string | null) => void;
  setSelectedNode: (id: string | null) => void;
  dispose: () => void;
}

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

export function createEmbeddedAtlas(): EmbeddedAtlasElements {
  const group = new THREE.Group();
  group.name = "EmbeddedAtlas";

  const disposables: (THREE.BufferGeometry | THREE.Material | THREE.Texture)[] = [];
  const nodeMeshes = new Map<string, AtlasObject>();

  // Shift nodes into spacious, non-overlapping positions in the Eastern Observatory sector
  const atlasNodes = ILLUSTRATIVE_GRAPH_NODES.map((n) => ({
    ...n,
    worldPos: ATLAS_NODE_COORDINATES[n.id] || ([3.6, 1.0, 0.0] as [number, number, number]),
  }));

  const nodeMap = new Map(atlasNodes.map((n) => [n.id, n]));

  atlasNodes.forEach((node) => {
    const bGroup = new THREE.Group();
    bGroup.name = `AtlasNode_${node.id}`;
    bGroup.position.set(...node.worldPos);
    bGroup.userData = { isAtlasNode: true, nodeId: node.id, node };

    const colorHex = parseInt(node.color.replace("#", "0x"), 16);

    let coreMesh: THREE.Mesh;
    let outerRing: THREE.Mesh | undefined;

    if (node.id === "target-enterprise") {
      // Primary Target: Faceted Octahedron Gem with Dual Orbital Rings
      const cGeo = new THREE.OctahedronGeometry(0.38, 2);
      disposables.push(cGeo);
      const cMat = new THREE.MeshStandardMaterial({
        color: 0x2fa885,
        emissive: 0x2fa885,
        emissiveIntensity: 0.75,
        roughness: 0.2,
        metalness: 0.8,
      });
      disposables.push(cMat);
      coreMesh = new THREE.Mesh(cGeo, cMat);
      bGroup.add(coreMesh);

      const rGeo = new THREE.TorusGeometry(0.58, 0.02, 16, 48);
      disposables.push(rGeo);
      const rMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        roughness: 0.3,
        metalness: 0.85,
      });
      disposables.push(rMat);
      outerRing = new THREE.Mesh(rGeo, rMat);
      outerRing.rotation.x = Math.PI / 3;
      bGroup.add(outerRing);

      // Secondary inclined ring for central target
      const r2Geo = new THREE.TorusGeometry(0.68, 0.012, 16, 48);
      disposables.push(r2Geo);
      const r2Mat = new THREE.MeshStandardMaterial({
        color: 0xb7e4d5,
        roughness: 0.3,
        metalness: 0.8,
      });
      disposables.push(r2Mat);
      const outerRing2 = new THREE.Mesh(r2Geo, r2Mat);
      outerRing2.rotation.y = Math.PI / 3;
      bGroup.add(outerRing2);
    } else {
      // Category-Specific Geometric Nodes
      let cGeo: THREE.BufferGeometry;
      switch (node.category) {
        case "DOMAIN":
          cGeo = new THREE.IcosahedronGeometry(0.28, 0); // Faceted multifaceted crystal
          break;
        case "INFRASTRUCTURE":
          cGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.38, 8); // Technical cylindrical pillar
          break;
        case "DIGITAL_IDENTITY":
          cGeo = new THREE.OctahedronGeometry(0.3, 0); // Sharp diamond persona
          break;
        case "EVIDENCE_RECORD":
        default:
          cGeo = new THREE.DodecahedronGeometry(0.24, 0); // Polyhedral documentary node
          break;
      }

      disposables.push(cGeo);
      const cMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        emissive: colorHex,
        emissiveIntensity: 0.6,
        roughness: 0.25,
        metalness: 0.75,
      });
      disposables.push(cMat);
      coreMesh = new THREE.Mesh(cGeo, cMat);
      bGroup.add(coreMesh);

      const rGeo = new THREE.TorusGeometry(0.42, 0.016, 16, 32);
      disposables.push(rGeo);
      const rMat = new THREE.MeshStandardMaterial({
        color: 0xb7e4d5,
        roughness: 0.3,
        metalness: 0.75,
      });
      disposables.push(rMat);
      outerRing = new THREE.Mesh(rGeo, rMat);
      outerRing.rotation.x = Math.PI / 2;
      bGroup.add(outerRing);
    }

    coreMesh.userData = bGroup.userData;
    if (outerRing) outerRing.userData = bGroup.userData;

    // Horizontal Energy Halo on Floor Plane below Node
    const haloGeo = new THREE.RingGeometry(0.28, 0.48, 32);
    disposables.push(haloGeo);
    const haloMat = new THREE.MeshBasicMaterial({
      color: colorHex,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    disposables.push(haloMat);
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.rotation.x = Math.PI / 2;
    haloMesh.position.y = -0.38;
    bGroup.add(haloMesh);

    group.add(bGroup);

    nodeMeshes.set(node.id, {
      node,
      group: bGroup,
      coreMesh,
      outerRing,
      haloMesh,
      baseY: node.worldPos[1],
    });
  });

  // Spatial Conduits & Traveling Signal Photons
  const pathwaysGroup = new THREE.Group();
  const pathwaysList: {
    edge: GraphEdge;
    curve: THREE.CatmullRomCurve3;
    line: THREE.Line;
    lineMat: THREE.LineBasicMaterial;
    photons: { mesh: THREE.Mesh; progress: number; speed: number }[];
    sourceId: string;
    targetId: string;
  }[] = [];

  const photonGeo = new THREE.SphereGeometry(0.045, 8, 8);
  disposables.push(photonGeo);

  ILLUSTRATIVE_GRAPH_EDGES.forEach((edge) => {
    const sNode = nodeMap.get(edge.source);
    const tNode = nodeMap.get(edge.target);
    if (!sNode || !tNode) return;

    const p1 = new THREE.Vector3(...sNode.worldPos);
    const p3 = new THREE.Vector3(...tNode.worldPos);
    const mid = new THREE.Vector3().addVectors(p1, p3).multiplyScalar(0.5);
    mid.y += 0.35; // Gentle upward arch

    const curve = new THREE.CatmullRomCurve3([p1, mid, p3]);
    const curvePoints = curve.getPoints(32);

    const lineGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
    disposables.push(lineGeo);

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x2fa885,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    disposables.push(lineMat);

    const line = new THREE.Line(lineGeo, lineMat);
    pathwaysGroup.add(line);

    const photons: { mesh: THREE.Mesh; progress: number; speed: number }[] = [];
    const photonCount = edge.directional ? 2 : 1;

    for (let i = 0; i < photonCount; i++) {
      const pMat = new THREE.MeshBasicMaterial({
        color: 0xb7e4d5,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
      });
      disposables.push(pMat);

      const pMesh = new THREE.Mesh(photonGeo, pMat);
      pathwaysGroup.add(pMesh);

      photons.push({
        mesh: pMesh,
        progress: (i / photonCount) * 0.5 + Math.random() * 0.5,
        speed: 0.12 + Math.random() * 0.08,
      });
    }

    pathwaysList.push({
      edge,
      curve,
      line,
      lineMat,
      photons,
      sourceId: edge.source,
      targetId: edge.target,
    });
  });
  group.add(pathwaysGroup);

  let activeHoverId: string | null = null;
  let activeSelectId: string | null = null;

  const setHoveredNode = (id: string | null) => {
    activeHoverId = id;
  };

  const setSelectedNode = (id: string | null) => {
    activeSelectId = id;
  };

  const update = (
    delta: number,
    elapsed: number,
    camera: THREE.Camera,
    activeDestination?: WorldDestinationId
  ) => {
    const isAtlasDestination = activeDestination === "ATLAS";
    group.visible = isAtlasDestination;
    if (!isAtlasDestination) return;

    // Identify connected nodes when one is selected
    const connectedNodeIds = new Set<string>();
    if (activeSelectId) {
      connectedNodeIds.add(activeSelectId);
      pathwaysList.forEach((pw) => {
        if (pw.sourceId === activeSelectId) connectedNodeIds.add(pw.targetId);
        if (pw.targetId === activeSelectId) connectedNodeIds.add(pw.sourceId);
      });
    }

    // Update nodes with selective illumination & connection hierarchy
    nodeMeshes.forEach((item, id) => {
      const isHovered = id === activeHoverId;
      const isSelected = id === activeSelectId;
      const isConnected = connectedNodeIds.has(id);
      const hasAnySelected = Boolean(activeSelectId);

      // Vertical floating oscillation
      const floatOffset = Math.sin(elapsed * 1.6 + item.node.position[0] * 1.5) * 0.04;
      item.group.position.y = item.baseY + floatOffset;

      // Rotations
      item.coreMesh.rotation.y = elapsed * (isSelected ? 0.9 : isConnected ? 0.6 : 0.3);
      if (item.outerRing) {
        item.outerRing.rotation.z = elapsed * (isSelected ? 1.4 : isConnected ? 0.8 : 0.4);
        item.outerRing.rotation.x = Math.PI / 3 + Math.sin(elapsed * 0.8) * 0.12;
      }

      // Selective scale & emissive illumination
      let targetScale = 1.0;
      let baseEmissive = 0.6;
      let haloOpacity = 0.15;
      let haloScale = 1.0;

      if (hasAnySelected) {
        if (isSelected) {
          targetScale = 1.4;
          baseEmissive = 2.4; // Radiant brilliant highlight
          haloOpacity = 0.85;
          haloScale = 1.6;
        } else if (isConnected) {
          targetScale = 1.15;
          baseEmissive = 1.25; // Clearly illuminated neighbor
          haloOpacity = 0.45;
          haloScale = 1.2;
        } else {
          targetScale = 0.88;
          baseEmissive = 0.12; // Dimmed resting silhouette
          haloOpacity = 0.03;
          haloScale = 0.8;
        }
      } else if (isHovered) {
        targetScale = 1.25;
        baseEmissive = 1.35;
        haloOpacity = 0.5;
        haloScale = 1.3;
      }

      item.group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 6);
      const coreMat = item.coreMesh.material as THREE.MeshStandardMaterial;
      coreMat.emissiveIntensity = THREE.MathUtils.lerp(coreMat.emissiveIntensity, baseEmissive, delta * 6);

      if (item.haloMesh) {
        const haloMat = item.haloMesh.material as THREE.MeshBasicMaterial;
        haloMat.opacity = THREE.MathUtils.lerp(haloMat.opacity, haloOpacity, delta * 6);
        item.haloMesh.scale.lerp(new THREE.Vector3(haloScale, haloScale, haloScale), delta * 6);
      }
    });

    // Update relationship conduits with selective signal propagation
    pathwaysList.forEach((pw) => {
      const isConnectedToSelected =
        activeSelectId ? pw.sourceId === activeSelectId || pw.targetId === activeSelectId : false;
      const isConnectedToHovered =
        activeHoverId ? pw.sourceId === activeHoverId || pw.targetId === activeHoverId : false;

      let targetOpacity = 0.35;
      let photonSpeedMultiplier = 1.0;
      let photonMaxOpacity = 0.4;

      if (activeSelectId) {
        if (isConnectedToSelected) {
          targetOpacity = 0.95; // Highly illuminated active pathway
          photonSpeedMultiplier = 2.0;
          photonMaxOpacity = 0.95;
        } else {
          targetOpacity = 0.05; // Dimmed away
          photonSpeedMultiplier = 0.5;
          photonMaxOpacity = 0.0;
        }
      } else if (activeHoverId && isConnectedToHovered) {
        targetOpacity = 0.8;
        photonSpeedMultiplier = 1.5;
        photonMaxOpacity = 0.8;
      }

      pw.lineMat.opacity = THREE.MathUtils.lerp(pw.lineMat.opacity, targetOpacity, delta * 6);

      pw.photons.forEach((photon) => {
        photon.mesh.visible = photonMaxOpacity > 0.02;
        photon.progress = (photon.progress + delta * photon.speed * photonSpeedMultiplier) % 1.0;

        const pos = pw.curve.getPointAt(photon.progress);
        photon.mesh.position.copy(pos);

        const edgeFade = Math.sin(photon.progress * Math.PI);
        const pMat = photon.mesh.material as THREE.MeshBasicMaterial;
        pMat.opacity = edgeFade * photonMaxOpacity;
      });
    });
  };

  const dispose = () => {
    disposables.forEach((d) => d.dispose());
  };

  return {
    group,
    nodeMeshes,
    update,
    setHoveredNode,
    setSelectedNode,
    dispose,
  };
}
