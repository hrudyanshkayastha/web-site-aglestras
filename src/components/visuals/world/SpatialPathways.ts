import * as THREE from "three";
import {
  GraphEdge,
  ILLUSTRATIVE_GRAPH_EDGES,
  ILLUSTRATIVE_GRAPH_NODES,
} from "@/data/entityGraphData";

interface PathwayObject {
  edge: GraphEdge;
  line: THREE.Line;
  curve: THREE.CatmullRomCurve3;
  sourceId: string;
  targetId: string;
  material: THREE.LineBasicMaterial;
  photons: {
    mesh: THREE.Mesh;
    progress: number;
    speed: number;
  }[];
}

export interface PathwaysElements {
  group: THREE.Group;
  update: (delta: number, elapsed: number) => void;
  setHighlightedEntity: (id: string | null) => void;
  dispose: () => void;
}

export function createSpatialPathways(): PathwaysElements {
  const group = new THREE.Group();
  group.name = "SpatialPathways";

  const disposables: (THREE.BufferGeometry | THREE.Material)[] = [];
  const pathways: PathwayObject[] = [];

  // Reusable photon geometry & material
  const photonGeo = new THREE.SphereGeometry(0.04, 8, 8);
  disposables.push(photonGeo);

  const nodeMap = new Map(ILLUSTRATIVE_GRAPH_NODES.map((n) => [n.id, n]));

  ILLUSTRATIVE_GRAPH_EDGES.forEach((edge) => {
    const sourceNode = nodeMap.get(edge.source);
    const targetNode = nodeMap.get(edge.target);

    if (!sourceNode || !targetNode) return;

    const p1 = new THREE.Vector3(...sourceNode.position);
    const p3 = new THREE.Vector3(...targetNode.position);

    // Calculate arched 3D midpoint: elevated slightly and bowed outward from origin
    const mid = new THREE.Vector3().addVectors(p1, p3).multiplyScalar(0.5);
    // Add radial bulge away from center
    const radial = new THREE.Vector3(mid.x, 0, mid.z).normalize().multiplyScalar(0.4);
    mid.add(radial);
    mid.y += 0.35; // Gentle upward arch

    const curve = new THREE.CatmullRomCurve3([p1, mid, p3]);
    const curvePoints = curve.getPoints(36);

    const lineGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
    disposables.push(lineGeo);

    // Base pathway material (translucent luminous mint)
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x2fa885,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    disposables.push(lineMat);

    const line = new THREE.Line(lineGeo, lineMat);
    group.add(line);

    // Create 1-2 traveling signal photons per pathway
    const pathwayPhotons: PathwayObject["photons"] = [];
    const photonCount = edge.directional ? 2 : 1;

    for (let i = 0; i < photonCount; i++) {
      const photonMat = new THREE.MeshBasicMaterial({
        color: 0xb7e4d5,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
      });
      disposables.push(photonMat);

      const photonMesh = new THREE.Mesh(photonGeo, photonMat);
      group.add(photonMesh);

      pathwayPhotons.push({
        mesh: photonMesh,
        progress: (i / photonCount) * 0.5 + Math.random() * 0.5,
        speed: 0.12 + Math.random() * 0.08,
      });
    }

    pathways.push({
      edge,
      line,
      curve,
      sourceId: edge.source,
      targetId: edge.target,
      material: lineMat,
      photons: pathwayPhotons,
    });
  });

  let activeEntityId: string | null = null;

  const setHighlightedEntity = (id: string | null) => {
    activeEntityId = id;
  };

  const update = (delta: number, elapsed: number) => {
    pathways.forEach((pathway) => {
      const isConnected =
        !activeEntityId ||
        pathway.sourceId === activeEntityId ||
        pathway.targetId === activeEntityId;

      // Opacity attenuation: brighten connected, dim non-connected
      const targetOpacity = !activeEntityId ? 0.45 : isConnected ? 0.9 : 0.12;
      pathway.material.opacity = THREE.MathUtils.lerp(
        pathway.material.opacity,
        targetOpacity,
        delta * 6
      );

      // Color tint shift on highlight
      if (activeEntityId && isConnected) {
        pathway.material.color.setHex(0xb7e4d5);
      } else {
        pathway.material.color.setHex(0x2fa885);
      }

      // Animate signal photons along the curve
      pathway.photons.forEach((photon) => {
        const speedMultiplier = isConnected ? 1.4 : 0.8;
        photon.progress = (photon.progress + delta * photon.speed * speedMultiplier) % 1.0;

        const pos = pathway.curve.getPointAt(photon.progress);
        photon.mesh.position.copy(pos);

        // Fade in and out at ends
        const edgeFade = Math.sin(photon.progress * Math.PI);
        const photonMat = photon.mesh.material as THREE.MeshBasicMaterial;
        photonMat.opacity = isConnected ? edgeFade * 0.95 : edgeFade * 0.25;

        const scale = isConnected ? 1.3 : 0.9;
        photon.mesh.scale.set(scale, scale, scale);
      });
    });
  };

  const dispose = () => {
    disposables.forEach((item) => item.dispose());
  };

  return {
    group,
    update,
    setHighlightedEntity,
    dispose,
  };
}
