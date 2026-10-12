import * as THREE from "three";
import { SERVICE_PYLONS, ServicePylonConfig, WorldDestinationId } from "./WorldConfig";

export interface ArchitectureElements {
  group: THREE.Group;
  pylonMeshes: Map<string, THREE.Group>;
  update: (delta: number, elapsed: number, activeDestination?: WorldDestinationId) => void;
  setPylonHovered: (serviceId: string | null) => void;
  setPylonSelected: (serviceId: string | null) => void;
  dispose: () => void;
}

export function createFuturisticArchitecture(): ArchitectureElements {
  const group = new THREE.Group();
  group.name = "FuturisticArchitecture";

  const disposables: (THREE.BufferGeometry | THREE.Material)[] = [];
  const pylonMeshes = new Map<string, THREE.Group>();

  // PBR Materials
  // 1. Honed Basalt Mineral Material
  const basaltMat = new THREE.MeshStandardMaterial({
    color: 0x031814,
    roughness: 0.84,
    metalness: 0.15,
  });
  disposables.push(basaltMat);

  // 2. Stepped Slate Platform Edge
  const slateMat = new THREE.MeshStandardMaterial({
    color: 0x072e27,
    roughness: 0.65,
    metalness: 0.22,
  });
  disposables.push(slateMat);

  // 3. Warm Burnished Brass / Bronze Inlay
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    roughness: 0.28,
    metalness: 0.88,
    emissive: 0x6e5218,
    emissiveIntensity: 0.2,
  });
  disposables.push(brassMat);

  // 4. Muted Mint Accent Inlay
  const mintTrimMat = new THREE.MeshStandardMaterial({
    color: 0xb7e4d5,
    roughness: 0.32,
    metalness: 0.75,
    emissive: 0x2fa885,
    emissiveIntensity: 0.3,
  });
  disposables.push(mintTrimMat);

  // -------------------------------------------------------------
  // A. ENTRANCE GATEWAY MONOLITHS (FLANKING ARCHITECTURAL PORTAL)
  // Monumental vertical stelae situated strictly on the far flanks (|X| >= 6.0),
  // leaving the entire central frustum (|X| < 5.5) completely open and clear for hero text.
  // -------------------------------------------------------------
  const entranceRibsGroup = new THREE.Group();

  // Left and Right colonnade positions: [x, z, height, width]
  const colonnadeConfigs = [
    // Left Flank
    { x: -6.4, z: 6.2, h: 3.2, w: 0.38 },
    { x: -7.2, z: 8.0, h: 2.8, w: 0.34 },
    { x: -6.8, z: 9.8, h: 2.4, w: 0.32 },
    // Right Flank
    { x: 6.4, z: 6.2, h: 3.2, w: 0.38 },
    { x: 7.2, z: 8.0, h: 2.8, w: 0.34 },
    { x: 6.8, z: 9.8, h: 2.4, w: 0.32 },
  ];

  colonnadeConfigs.forEach((cfg) => {
    const steleGroup = new THREE.Group();
    steleGroup.position.set(cfg.x, -1.2 + cfg.h / 2, cfg.z);

    // 1. Honed Basalt Stele Body
    const bodyGeo = new THREE.BoxGeometry(cfg.w, cfg.h, cfg.w);
    disposables.push(bodyGeo);
    const bodyMesh = new THREE.Mesh(bodyGeo, basaltMat);
    steleGroup.add(bodyMesh);

    // 2. Vertical Burnished Brass Inlay Edge
    const inlayGeo = new THREE.BoxGeometry(cfg.w * 0.15, cfg.h * 0.95, cfg.w * 1.02);
    disposables.push(inlayGeo);
    const inlayMesh = new THREE.Mesh(inlayGeo, brassMat);
    steleGroup.add(inlayMesh);

    // 3. Top Mint Accent Ring
    const topCapGeo = new THREE.BoxGeometry(cfg.w * 1.05, 0.04, cfg.w * 1.05);
    disposables.push(topCapGeo);
    const topCapMesh = new THREE.Mesh(topCapGeo, mintTrimMat);
    topCapMesh.position.y = cfg.h / 2;
    steleGroup.add(topCapMesh);

    entranceRibsGroup.add(steleGroup);
  });

  // Ceremonial Ground Threshold Disc (flush with ground at Y = -1.18, Z = 6.0)
  const thresholdGeo = new THREE.RingGeometry(3.6, 3.75, 48);
  disposables.push(thresholdGeo);
  const thresholdMesh = new THREE.Mesh(thresholdGeo, brassMat);
  thresholdMesh.rotation.x = -Math.PI / 2;
  thresholdMesh.position.set(0, -1.18, 6.5);
  entranceRibsGroup.add(thresholdMesh);

  group.add(entranceRibsGroup);

  // -------------------------------------------------------------
  // B. SERVICES PAVILION & 6 MONUMENTAL SERVICE PYLONS (WEST)
  // Suspended stone plaza with 6 architectural beacons
  // -------------------------------------------------------------
  const servicesPlazaGroup = new THREE.Group();

  // Plaza foundation disk at [-4.6, -0.6, 1.0]
  const plazaGeo = new THREE.CylinderGeometry(4.2, 4.6, 0.4, 48);
  disposables.push(plazaGeo);
  const plazaMesh = new THREE.Mesh(plazaGeo, slateMat);
  plazaMesh.position.set(-4.6, -0.6, 1.0);
  servicesPlazaGroup.add(plazaMesh);

  // Brass plaza boundary ring
  const plazaRingGeo = new THREE.TorusGeometry(4.2, 0.03, 16, 48);
  disposables.push(plazaRingGeo);
  const plazaRingMesh = new THREE.Mesh(plazaRingGeo, brassMat);
  plazaRingMesh.rotation.x = Math.PI / 2;
  plazaRingMesh.position.set(-4.6, -0.39, 1.0);
  servicesPlazaGroup.add(plazaRingMesh);

  // 6 Service Pylons
  SERVICE_PYLONS.forEach((cfg) => {
    const pylonGroup = new THREE.Group();
    pylonGroup.name = `Pylon_${cfg.service.id}`;
    pylonGroup.position.set(...cfg.position);
    pylonGroup.userData = {
      isServicePylon: true,
      serviceId: cfg.service.id,
      serviceCode: cfg.service.code,
      service: cfg.service,
    };

    // 1. Tapered Basalt Stele Body
    const height = cfg.service.isPrimary ? 2.2 : 1.6;
    const bodyGeo = new THREE.CylinderGeometry(0.12, 0.22, height, 6);
    disposables.push(bodyGeo);
    const bodyMesh = new THREE.Mesh(bodyGeo, basaltMat);
    bodyMesh.position.y = height / 2;
    bodyMesh.userData = pylonGroup.userData;
    pylonGroup.add(bodyMesh);

    // 2. Luminous Service Aperture Core
    const coreGeo = new THREE.OctahedronGeometry(0.18, 1);
    disposables.push(coreGeo);
    const coreMat = new THREE.MeshStandardMaterial({
      color: cfg.color,
      emissive: cfg.color,
      emissiveIntensity: cfg.service.isPrimary ? 0.85 : 0.65,
      roughness: 0.2,
      metalness: 0.8,
    });
    disposables.push(coreMat);
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.y = height + 0.22;
    coreMesh.userData = pylonGroup.userData;
    pylonGroup.add(coreMesh);

    // 3. Floating Astrolabe Ring over Aperture
    const ringGeo = new THREE.TorusGeometry(0.3, 0.016, 16, 32);
    disposables.push(ringGeo);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.3,
      metalness: 0.85,
    });
    disposables.push(ringMat);
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.y = height + 0.22;
    ringMesh.rotation.x = Math.PI / 3;
    ringMesh.userData = pylonGroup.userData;
    pylonGroup.add(ringMesh);

    servicesPlazaGroup.add(pylonGroup);
    pylonMeshes.set(cfg.service.id, pylonGroup);
  });
  group.add(servicesPlazaGroup);

  // -------------------------------------------------------------
  // C. METHODOLOGY SUBTERRANEAN CONDUIT PORTALS (SOUTH-DOWN)
  // 6 sequential stepped arch portals: Define -> Collect -> Validate -> Correlate -> Analyze -> Report
  // -------------------------------------------------------------
  const methodologyPortalsGroup = new THREE.Group();
  const portalPositions = [
    new THREE.Vector3(-2.2, -3.6, 4.8), // 01 Define
    new THREE.Vector3(-1.3, -3.8, 3.6), // 02 Collect
    new THREE.Vector3(-0.4, -4.0, 2.4), // 03 Validate
    new THREE.Vector3(0.5, -4.2, 1.2),  // 04 Correlate
    new THREE.Vector3(1.4, -4.4, 0.0),  // 05 Analyze
    new THREE.Vector3(2.3, -4.6, -1.2), // 06 Report
  ];

  const methodologyThresholdMeshes: THREE.Mesh[] = [];

  portalPositions.forEach((pos, idx) => {
    const portalSubGroup = new THREE.Group();
    portalSubGroup.position.copy(pos);

    // Stepped Arch Frame
    const frameGeo = new THREE.TorusGeometry(0.85, 0.065, 12, 32, Math.PI);
    disposables.push(frameGeo);
    const frameMesh = new THREE.Mesh(frameGeo, slateMat);
    frameMesh.rotation.y = Math.PI / 4;
    portalSubGroup.add(frameMesh);

    // Glowing Inner Threshold Ring
    const innerRingGeo = new THREE.TorusGeometry(0.72, 0.02, 12, 32, Math.PI);
    disposables.push(innerRingGeo);
    const innerRingMat = new THREE.MeshStandardMaterial({
      color: 0xb7e4d5,
      roughness: 0.3,
      metalness: 0.7,
      emissive: 0x2fa885,
      emissiveIntensity: 0.2,
    });
    disposables.push(innerRingMat);
    const innerRingMesh = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRingMesh.rotation.y = Math.PI / 4;
    portalSubGroup.add(innerRingMesh);
    methodologyThresholdMeshes.push(innerRingMesh);

    methodologyPortalsGroup.add(portalSubGroup);
  });
  group.add(methodologyPortalsGroup);

  // -------------------------------------------------------------
  // D. OBSERVATORY ASTROLABE RINGS (EAST)
  // Rotating astrolabe gimbal rings framing the Intelligence Atlas
  // -------------------------------------------------------------
  const astrolabeGroup = new THREE.Group();
  astrolabeGroup.position.set(3.4, 0.8, 0.0);

  const astrolabeRadii = [3.0, 4.0, 4.8];
  const astrolabeRings: THREE.Mesh[] = [];

  astrolabeRadii.forEach((r, idx) => {
    const rGeo = new THREE.TorusGeometry(r, 0.022, 16, 64);
    disposables.push(rGeo);
    const rMesh = new THREE.Mesh(rGeo, idx % 2 === 0 ? brassMat : mintTrimMat);
    rMesh.rotation.x = Math.PI / 3 + idx * 0.2;
    astrolabeGroup.add(rMesh);
    astrolabeRings.push(rMesh);
  });
  group.add(astrolabeGroup);

  // -------------------------------------------------------------
  // E. OVERLOOK TERRACE (NORTH / CONTACT DESTINATION)
  // Minimalist cantilevered observation terrace extending over misty horizon
  // -------------------------------------------------------------
  const overlookGroup = new THREE.Group();
  overlookGroup.position.set(0, 0.2, -8.6);

  const terraceGeo = new THREE.BoxGeometry(6.4, 0.35, 4.2);
  disposables.push(terraceGeo);
  const terraceMesh = new THREE.Mesh(terraceGeo, basaltMat);
  overlookGroup.add(terraceMesh);

  // Inlaid brass terrace edge
  const terraceEdgeGeo = new THREE.BoxGeometry(6.42, 0.04, 0.08);
  disposables.push(terraceEdgeGeo);
  const terraceEdgeMesh = new THREE.Mesh(terraceEdgeGeo, brassMat);
  terraceEdgeMesh.position.set(0, 0.18, 2.08);
  overlookGroup.add(terraceEdgeMesh);

  group.add(overlookGroup);

  // Hover and selection state management
  let hoveredServiceId: string | null = null;
  let selectedServiceId: string | null = null;

  const setPylonHovered = (serviceId: string | null) => {
    hoveredServiceId = serviceId;
  };

  const setPylonSelected = (serviceId: string | null) => {
    selectedServiceId = serviceId;
  };

  // Animation update
  const update = (
    delta: number,
    elapsed: number,
    activeDestination?: WorldDestinationId
  ) => {
    const isServicesDest = activeDestination === "SERVICES";
    const isMethodologyDest = activeDestination === "METHODOLOGY";
    const isAtlasDest = activeDestination === "ATLAS";
    const isEntranceDest = activeDestination === "ENTRANCE";

    // Destination-aware structure visibility
    astrolabeGroup.visible = isAtlasDest;
    entranceRibsGroup.visible = isEntranceDest || activeDestination === undefined;

    // Astrolabe rings counter-rotation (when active)
    if (isAtlasDest) {
      astrolabeRings.forEach((ring, idx) => {
        ring.rotation.z = (idx % 2 === 0 ? 1 : -1) * elapsed * 0.04 * (idx + 1);
      });
    }

    // Methodology threshold rings emissive intensity
    methodologyThresholdMeshes.forEach((mesh) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      const targetEmissive = isMethodologyDest ? 0.85 : 0.15;
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, targetEmissive, delta * 6);
    });

    // Pylon animations
    pylonMeshes.forEach((pGroup, sId) => {
      const isHovered = sId === hoveredServiceId;
      const isSelected = sId === selectedServiceId;

      const core = pGroup.children[1] as THREE.Mesh | undefined;
      const ring = pGroup.children[2] as THREE.Mesh | undefined;

      if (core) {
        core.rotation.y = elapsed * 0.5;
        const targetScale = isSelected ? 1.35 : isHovered ? 1.2 : 1.0;
        core.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 6);

        // Core emissive brightness based on destination state
        const coreMat = core.material as THREE.MeshStandardMaterial;
        const baseEmissive = isServicesDest
          ? (isSelected ? 1.0 : isHovered ? 0.85 : 0.6)
          : 0.15;
        coreMat.emissiveIntensity = THREE.MathUtils.lerp(coreMat.emissiveIntensity, baseEmissive, delta * 6);
      }

      if (ring) {
        ring.rotation.z = elapsed * 0.8;
      }
    });
  };

  const dispose = () => {
    disposables.forEach((d) => d.dispose());
  };

  return {
    group,
    pylonMeshes,
    update,
    setPylonHovered,
    setPylonSelected,
    dispose,
  };
}
