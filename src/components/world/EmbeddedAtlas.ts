import * as THREE from "three";
import {
  GraphNode,
  GraphEdge,
  ILLUSTRATIVE_GRAPH_NODES,
  ILLUSTRATIVE_GRAPH_EDGES,
  ENTITY_CATEGORIES,
} from "@/data/entityGraphData";

export interface AtlasObject {
  node: GraphNode;
  group: THREE.Group;
  coreMesh: THREE.Mesh;
  outerRing?: THREE.Mesh;
  labelSprite: THREE.Sprite;
  baseY: number;
}

export interface EmbeddedAtlasElements {
  group: THREE.Group;
  nodeMeshes: Map<string, AtlasObject>;
  update: (delta: number, elapsed: number, camera: THREE.Camera) => void;
  setHoveredNode: (id: string | null) => void;
  setSelectedNode: (id: string | null) => void;
  dispose: () => void;
}

function createAtlasLabelSprite(node: GraphNode): THREE.Sprite {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    // Background container
    ctx.fillStyle = "rgba(3, 23, 20, 0.88)";
    ctx.strokeStyle = "rgba(183, 228, 213, 0.4)";
    ctx.lineWidth = 3;

    const roundRect = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    };

    roundRect(8, 8, 496, 112, 24);
    ctx.fill();
    ctx.stroke();

    // Category dot
    const categoryInfo = ENTITY_CATEGORIES[node.category];
    ctx.fillStyle = categoryInfo?.color || "#2FA885";
    ctx.beginPath();
    ctx.arc(36, 44, 10, 0, Math.PI * 2);
    ctx.fill();

    // Display Name
    ctx.fillStyle = "#F4F2EA";
    ctx.font = "bold 26px sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    let displayName = node.name;
    if (displayName.length > 24) displayName = displayName.substring(0, 23) + "…";
    ctx.fillText(displayName, 58, 44);

    // Epistemic subtitle
    ctx.fillStyle = "#B7E4D5";
    ctx.font = "16px monospace";
    ctx.fillText(`${node.categoryLabel} // [${node.epistemicTier}]`, 36, 88);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  const spriteMat = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 0.9,
    depthTest: false,
  });

  const sprite = new THREE.Sprite(spriteMat);
  sprite.scale.set(1.4, 0.35, 1);
  return sprite;
}

export function createEmbeddedAtlas(): EmbeddedAtlasElements {
  const group = new THREE.Group();
  group.name = "EmbeddedAtlas";

  const disposables: (THREE.BufferGeometry | THREE.Material | THREE.Texture)[] = [];
  const nodeMeshes = new Map<string, AtlasObject>();

  // Shift nodes naturally into the Eastern Atlas Observatory sector of the world
  // Offset: x + 3.2, y + 0.4, z unchanged
  const atlasNodes = ILLUSTRATIVE_GRAPH_NODES.map((n) => ({
    ...n,
    worldPos: [n.position[0] * 0.9 + 3.4, n.position[1] * 0.9 + 0.6, n.position[2] * 0.9] as [number, number, number],
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
      const cGeo = new THREE.OctahedronGeometry(0.38, 2);
      disposables.push(cGeo);
      const cMat = new THREE.MeshStandardMaterial({
        color: 0x2fa885,
        emissive: 0x145a46,
        emissiveIntensity: 0.7,
        roughness: 0.25,
        metalness: 0.75,
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
    } else {
      const cGeo =
        node.category === "DOMAIN"
          ? new THREE.ConeGeometry(0.24, 0.45, 6)
          : node.category === "INFRASTRUCTURE"
          ? new THREE.BoxGeometry(0.28, 0.42, 0.28)
          : node.category === "DIGITAL_IDENTITY"
          ? new THREE.DodecahedronGeometry(0.24, 0)
          : new THREE.CylinderGeometry(0.24, 0.24, 0.12, 8);

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

      const rGeo = new THREE.TorusGeometry(0.38, 0.015, 16, 32);
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

    const labelSprite = createAtlasLabelSprite(node);
    labelSprite.position.set(0, 0.5, 0);
    labelSprite.userData = bGroup.userData;
    disposables.push((labelSprite.material as THREE.SpriteMaterial).map as THREE.Texture);
    disposables.push(labelSprite.material as THREE.Material);
    bGroup.add(labelSprite);

    group.add(bGroup);

    nodeMeshes.set(node.id, {
      node,
      group: bGroup,
      coreMesh,
      outerRing,
      labelSprite,
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

  const photonGeo = new THREE.SphereGeometry(0.04, 8, 8);
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
      opacity: 0.45,
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
        opacity: 0.9,
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

  const update = (delta: number, elapsed: number, camera: THREE.Camera) => {
    // Update beacons
    nodeMeshes.forEach((item, id) => {
      const isHovered = id === activeHoverId;
      const isSelected = id === activeSelectId;

      // Vertical oscillation
      const floatOffset = Math.sin(elapsed * 1.8 + item.node.position[0]) * 0.05;
      item.group.position.y = item.baseY + floatOffset;

      // Rotations
      item.coreMesh.rotation.y = elapsed * 0.4;
      if (item.outerRing) {
        item.outerRing.rotation.z = elapsed * 0.6;
        item.outerRing.rotation.x = Math.PI / 3 + Math.sin(elapsed * 0.8) * 0.15;
      }

      // Scale lerp
      const targetScale = isSelected ? 1.35 : isHovered ? 1.2 : 1.0;
      item.group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 8);

      // Emissive boost
      const coreMat = item.coreMesh.material as THREE.MeshStandardMaterial;
      const baseEmissive = isSelected ? 0.95 : isHovered ? 0.8 : 0.5;
      coreMat.emissiveIntensity = THREE.MathUtils.lerp(coreMat.emissiveIntensity, baseEmissive, delta * 6);
    });

    // Update pathways
    pathwaysList.forEach((pw) => {
      const isConnected =
        !activeSelectId && !activeHoverId
          ? true
          : pw.sourceId === activeSelectId ||
            pw.targetId === activeSelectId ||
            pw.sourceId === activeHoverId ||
            pw.targetId === activeHoverId;

      const targetOpacity = !activeSelectId && !activeHoverId ? 0.45 : isConnected ? 0.9 : 0.12;
      pw.lineMat.opacity = THREE.MathUtils.lerp(pw.lineMat.opacity, targetOpacity, delta * 6);

      pw.photons.forEach((photon) => {
        const speedMultiplier = isConnected ? 1.4 : 0.8;
        photon.progress = (photon.progress + delta * photon.speed * speedMultiplier) % 1.0;

        const pos = pw.curve.getPointAt(photon.progress);
        photon.mesh.position.copy(pos);

        const edgeFade = Math.sin(photon.progress * Math.PI);
        const pMat = photon.mesh.material as THREE.MeshBasicMaterial;
        pMat.opacity = isConnected ? edgeFade * 0.95 : edgeFade * 0.25;
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
