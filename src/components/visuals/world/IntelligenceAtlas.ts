import * as THREE from "three";
import { GraphNode, ILLUSTRATIVE_GRAPH_NODES, ENTITY_CATEGORIES } from "@/data/entityGraphData";

export interface AtlasBeaconObject {
  node: GraphNode;
  group: THREE.Group;
  coreMesh: THREE.Mesh;
  outerRing?: THREE.Mesh;
  labelSprite: THREE.Sprite;
  baseY: number;
  highlighted: boolean;
  selected: boolean;
}

export interface AtlasElements {
  group: THREE.Group;
  beacons: Map<string, AtlasBeaconObject>;
  update: (delta: number, elapsed: number, camera: THREE.Camera) => void;
  setHovered: (id: string | null) => void;
  setSelected: (id: string | null) => void;
  dispose: () => void;
}

// Helper to create sharp canvas billboard sprite for entity label
function createEntityLabelSprite(node: GraphNode): THREE.Sprite {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    // Background pill container
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

    // Category indicator dot
    const categoryInfo = ENTITY_CATEGORIES[node.category];
    ctx.fillStyle = categoryInfo?.color || "#2FA885";
    ctx.beginPath();
    ctx.arc(36, 44, 10, 0, Math.PI * 2);
    ctx.fill();

    // Node Name
    ctx.fillStyle = "#F4F2EA";
    ctx.font = "bold 26px sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    let displayName = node.name;
    if (displayName.length > 24) displayName = displayName.substring(0, 23) + "…";
    ctx.fillText(displayName, 58, 44);

    // Subtitle category & epistemic tier
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
    opacity: 0.92,
    depthTest: false,
  });

  const sprite = new THREE.Sprite(spriteMat);
  sprite.scale.set(1.4, 0.35, 1);
  return sprite;
}

export function createIntelligenceAtlas(): AtlasElements {
  const group = new THREE.Group();
  group.name = "IntelligenceAtlas";

  const disposables: (THREE.BufferGeometry | THREE.Material | THREE.Texture)[] = [];
  const beacons = new Map<string, AtlasBeaconObject>();

  let activeHoverId: string | null = null;
  let activeSelectId: string | null = null;

  ILLUSTRATIVE_GRAPH_NODES.forEach((node) => {
    const beaconGroup = new THREE.Group();
    beaconGroup.name = `Beacon_${node.id}`;
    beaconGroup.position.set(...node.position);
    beaconGroup.userData = { nodeId: node.id, isBeacon: true, node };

    const colorHex = parseInt(node.color.replace("#", "0x"), 16);

    let coreMesh: THREE.Mesh;
    let outerRing: THREE.Mesh | undefined;

    // A. CENTRAL ANCHOR ENTITY (Acme Global Enterprise)
    if (node.id === "target-enterprise") {
      // Faceted Core
      const coreGeo = new THREE.OctahedronGeometry(0.38, 2);
      disposables.push(coreGeo);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x2fa885,
        emissive: 0x145a46,
        emissiveIntensity: 0.65,
        roughness: 0.25,
        metalness: 0.75,
      });
      disposables.push(coreMat);
      coreMesh = new THREE.Mesh(coreGeo, coreMat);
      beaconGroup.add(coreMesh);

      // Dual Gimbal Rings
      const ring1Geo = new THREE.TorusGeometry(0.58, 0.02, 16, 48);
      disposables.push(ring1Geo);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        roughness: 0.3,
        metalness: 0.85,
      });
      disposables.push(ringMat);
      outerRing = new THREE.Mesh(ring1Geo, ringMat);
      outerRing.rotation.x = Math.PI / 3;
      beaconGroup.add(outerRing);

      const ring2Geo = new THREE.TorusGeometry(0.72, 0.018, 16, 48);
      disposables.push(ring2Geo);
      const ring2Mesh = new THREE.Mesh(ring2Geo, ringMat);
      ring2Mesh.rotation.y = Math.PI / 4;
      beaconGroup.add(ring2Mesh);

    // B. DOMAIN ASSET (acme-portal-sso[.]net)
    } else if (node.category === "DOMAIN") {
      const coreGeo = new THREE.ConeGeometry(0.24, 0.45, 6);
      disposables.push(coreGeo);
      const coreMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        emissive: colorHex,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.8,
      });
      disposables.push(coreMat);
      coreMesh = new THREE.Mesh(coreGeo, coreMat);
      beaconGroup.add(coreMesh);

      const ringGeo = new THREE.TorusGeometry(0.38, 0.015, 16, 32);
      disposables.push(ringGeo);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0xb7e4d5,
        roughness: 0.2,
        metalness: 0.8,
      });
      disposables.push(ringMat);
      outerRing = new THREE.Mesh(ringGeo, ringMat);
      outerRing.rotation.x = Math.PI / 2;
      beaconGroup.add(outerRing);

    // C. INFRASTRUCTURE & NETWORK (IP & Mail Servers)
    } else if (node.category === "INFRASTRUCTURE") {
      const coreGeo = new THREE.BoxGeometry(0.28, 0.42, 0.28);
      disposables.push(coreGeo);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x60a5fa,
        emissive: 0x1d4ed8,
        emissiveIntensity: 0.5,
        roughness: 0.4,
        metalness: 0.6,
      });
      disposables.push(coreMat);
      coreMesh = new THREE.Mesh(coreGeo, coreMat);
      beaconGroup.add(coreMesh);

      const ringGeo = new THREE.TorusGeometry(0.36, 0.015, 16, 32);
      disposables.push(ringGeo);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0x60a5fa,
        roughness: 0.3,
        metalness: 0.7,
      });
      disposables.push(ringMat);
      outerRing = new THREE.Mesh(ringGeo, ringMat);
      outerRing.rotation.x = Math.PI / 2;
      beaconGroup.add(outerRing);

    // D. DIGITAL PERSONAS (Registrant handle & Nominee director)
    } else if (node.category === "DIGITAL_IDENTITY") {
      const coreGeo = new THREE.DodecahedronGeometry(0.24, 0);
      disposables.push(coreGeo);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0xfbbf24,
        emissive: 0xb45309,
        emissiveIntensity: 0.55,
        roughness: 0.25,
        metalness: 0.75,
      });
      disposables.push(coreMat);
      coreMesh = new THREE.Mesh(coreGeo, coreMat);
      beaconGroup.add(coreMesh);

      const ringGeo = new THREE.TorusGeometry(0.38, 0.016, 16, 32);
      disposables.push(ringGeo);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0xfbbf24,
        roughness: 0.3,
        metalness: 0.8,
      });
      disposables.push(ringMat);
      outerRing = new THREE.Mesh(ringGeo, ringMat);
      outerRing.rotation.y = Math.PI / 3;
      beaconGroup.add(outerRing);

    // E. EVIDENCE RECORDS (TLS cert & Gazette record)
    } else {
      const coreGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.12, 8);
      disposables.push(coreGeo);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0xc084fc,
        emissive: 0x7e22ce,
        emissiveIntensity: 0.55,
        roughness: 0.3,
        metalness: 0.7,
      });
      disposables.push(coreMat);
      coreMesh = new THREE.Mesh(coreGeo, coreMat);
      beaconGroup.add(coreMesh);

      const ringGeo = new THREE.TorusGeometry(0.36, 0.015, 16, 32);
      disposables.push(ringGeo);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0xc084fc,
        roughness: 0.3,
        metalness: 0.7,
      });
      disposables.push(ringMat);
      outerRing = new THREE.Mesh(ringGeo, ringMat);
      outerRing.rotation.x = Math.PI / 2;
      beaconGroup.add(outerRing);
    }

    // Set raycasting userData directly on core and ring
    coreMesh.userData = { nodeId: node.id, isBeacon: true, node };
    if (outerRing) outerRing.userData = { nodeId: node.id, isBeacon: true, node };

    // Billboard Label Sprite positioned above beacon
    const labelSprite = createEntityLabelSprite(node);
    labelSprite.position.set(0, 0.48, 0);
    labelSprite.userData = { nodeId: node.id, isBeacon: true, node };
    disposables.push((labelSprite.material as THREE.SpriteMaterial).map as THREE.Texture);
    disposables.push(labelSprite.material as THREE.Material);
    beaconGroup.add(labelSprite);

    group.add(beaconGroup);

    beacons.set(node.id, {
      node,
      group: beaconGroup,
      coreMesh,
      outerRing,
      labelSprite,
      baseY: node.position[1],
      highlighted: false,
      selected: false,
    });
  });

  const setHovered = (id: string | null) => {
    activeHoverId = id;
  };

  const setSelected = (id: string | null) => {
    activeSelectId = id;
    beacons.forEach((beacon, beaconId) => {
      beacon.selected = beaconId === id;
    });
  };

  const update = (delta: number, elapsed: number, camera: THREE.Camera) => {
    beacons.forEach((beacon, id) => {
      const isHovered = id === activeHoverId;
      const isSelected = id === activeSelectId;

      // Gentle floating vertical oscillation
      const floatOffset = Math.sin(elapsed * 1.8 + beacon.node.position[0]) * 0.05;
      beacon.group.position.y = beacon.baseY + floatOffset;

      // Rotation of core & outer rings
      beacon.coreMesh.rotation.y = elapsed * 0.4;
      if (beacon.outerRing) {
        beacon.outerRing.rotation.z = elapsed * 0.6;
        beacon.outerRing.rotation.x = Math.PI / 3 + Math.sin(elapsed * 0.8) * 0.15;
      }

      // Hover / Selection scale animation
      const targetScale = isSelected ? 1.35 : isHovered ? 1.2 : 1.0;
      beacon.group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 8);

      // Emissive brightness boost
      const coreMat = beacon.coreMesh.material as THREE.MeshStandardMaterial;
      const baseEmissive = isSelected ? 0.95 : isHovered ? 0.8 : 0.5;
      coreMat.emissiveIntensity = THREE.MathUtils.lerp(coreMat.emissiveIntensity, baseEmissive, delta * 6);

      // Label opacity & scale adjustment
      const labelMat = beacon.labelSprite.material as THREE.SpriteMaterial;
      const targetOpacity = isSelected ? 1.0 : isHovered ? 0.95 : 0.85;
      labelMat.opacity = THREE.MathUtils.lerp(labelMat.opacity, targetOpacity, delta * 6);
    });
  };

  const dispose = () => {
    disposables.forEach((item) => item.dispose());
  };

  return {
    group,
    beacons,
    update,
    setHovered,
    setSelected,
    dispose,
  };
}
