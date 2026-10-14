import * as THREE from "three";
import { SERVICE_PYLONS, ServicePylonConfig, WorldDestinationId } from "./WorldConfig";

export interface ArchitectureElements {
  group: THREE.Group;
  pylonMeshes: Map<string, THREE.Group>;
  update: (delta: number, elapsed: number, activeDestination?: WorldDestinationId) => void;
  setPylonHovered: (serviceId: string | null) => void;
  setPylonSelected: (serviceId: string | null) => void;
  setMethodologyStage: (stage: number) => void;
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
  // -------------------------------------------------------------
  // A. ENTRANCE GATEWAY MONOLITHS (FLANKING ARCHITECTURAL PORTAL)
  // Monumental vertical stelae situated strictly on the far flanks (|X| >= 7.4),
  // leaving the entire central frustum completely open and clear for hero text.
  // -------------------------------------------------------------
  const entranceRibsGroup = new THREE.Group();

  // Left and Right colonnade positions: [x, z, height, width]
  const colonnadeConfigs = [
    // Left Flank (Pushed wide to |X| >= 7.4)
    { x: -7.5, z: 6.5, h: 2.8, w: 0.32 },
    { x: -8.2, z: 8.2, h: 2.4, w: 0.28 },
    { x: -7.8, z: 9.8, h: 2.0, w: 0.26 },
    // Right Flank (Pushed wide to |X| >= 7.4)
    { x: 7.5, z: 6.5, h: 2.8, w: 0.32 },
    { x: 8.2, z: 8.2, h: 2.4, w: 0.28 },
    { x: 7.8, z: 9.8, h: 2.0, w: 0.26 },
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
  // B. SERVICES PAVILION & 6 MONUMENTAL SERVICE STATIONS (WEST)
  // Suspended stone plaza with 6 distinctive architectural beacons
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

  // 6 Distinctive Service Stations with unique geometric motifs
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
    const height = cfg.service.isPrimary ? 2.0 : 1.5;
    const bodyGeo = new THREE.CylinderGeometry(0.12, 0.22, height, 6);
    disposables.push(bodyGeo);
    const bodyMesh = new THREE.Mesh(bodyGeo, basaltMat);
    bodyMesh.position.y = height / 2;
    bodyMesh.userData = pylonGroup.userData;
    pylonGroup.add(bodyMesh);

    // 2. Distinctive Luminous Service Emblem / Aperture Core
    let coreGeo: THREE.BufferGeometry;
    let ringGeo: THREE.BufferGeometry;

    if (cfg.service.id === "osint-investigative-research") {
      // Dual-gimbal astrolabe with octahedral core
      coreGeo = new THREE.OctahedronGeometry(0.2, 1);
      ringGeo = new THREE.TorusGeometry(0.32, 0.016, 16, 32);
    } else if (cfg.service.id === "business-due-diligence") {
      // Interlocking corporate hierarchy cubes
      coreGeo = new THREE.BoxGeometry(0.25, 0.25, 0.25);
      ringGeo = new THREE.TorusGeometry(0.34, 0.018, 4, 4);
    } else if (cfg.service.id === "recruitment-verification") {
      // Faceted verification crystal obelisk
      coreGeo = new THREE.ConeGeometry(0.2, 0.4, 6);
      ringGeo = new THREE.TorusGeometry(0.3, 0.016, 16, 32);
    } else if (cfg.service.id === "brand-impersonation-research") {
      // Radar sensor disk
      coreGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.06, 24);
      ringGeo = new THREE.TorusGeometry(0.35, 0.014, 16, 32);
    } else if (cfg.service.id === "external-threat-intelligence") {
      // Multi-faceted defense shield core
      coreGeo = new THREE.IcosahedronGeometry(0.22, 0);
      ringGeo = new THREE.TorusGeometry(0.36, 0.02, 6, 6);
    } else {
      // research-automation: continuous pipeline knot
      coreGeo = new THREE.TorusKnotGeometry(0.13, 0.04, 32, 8, 2, 3);
      ringGeo = new THREE.TorusGeometry(0.32, 0.015, 16, 32);
    }
    disposables.push(coreGeo);
    disposables.push(ringGeo);

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

    // 3. Floating Orbital Ring over Aperture
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

    // 4. Vertical Light Beacon (Ignites when selected)
    const beaconGeo = new THREE.CylinderGeometry(0.08, 0.28, 5.5, 16, 1, true);
    disposables.push(beaconGeo);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: cfg.color,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    disposables.push(beaconMat);
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    beaconMesh.position.y = height + 2.8;
    pylonGroup.add(beaconMesh);

    // 5. Ground Energy Halo on Plaza Floor
    const haloGeo = new THREE.RingGeometry(0.35, 0.55, 32);
    disposables.push(haloGeo);
    const haloMat = new THREE.MeshBasicMaterial({
      color: cfg.color,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    disposables.push(haloMat);
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.rotation.x = -Math.PI / 2;
    haloMesh.position.y = 0.02;
    pylonGroup.add(haloMesh);

    servicesPlazaGroup.add(pylonGroup);
    pylonMeshes.set(cfg.service.id, pylonGroup);
  });
  group.add(servicesPlazaGroup);

  // -------------------------------------------------------------
  // C. METHODOLOGY SUBTERRANEAN CONDUIT PORTALS (SOUTH-DOWN)
  // 6 sequential stepped arch portals: Define -> Collect -> Verify -> Correlate -> Analyze -> Deliver
  // -------------------------------------------------------------
  const methodologyPortalsGroup = new THREE.Group();
  const portalPositions = [
    new THREE.Vector3(-2.4, -3.4, 4.4), // 01 Define
    new THREE.Vector3(-1.4, -3.6, 3.2), // 02 Collect
    new THREE.Vector3(-0.4, -3.8, 2.0), // 03 Verify
    new THREE.Vector3(0.6, -4.0, 0.8),  // 04 Correlate
    new THREE.Vector3(1.6, -4.2, -0.4), // 05 Analyze
    new THREE.Vector3(2.6, -4.4, -1.6), // 06 Deliver
  ];

  const methodologyThresholdMeshes: THREE.Mesh[] = [];

  portalPositions.forEach((pos, idx) => {
    const portalSubGroup = new THREE.Group();
    portalSubGroup.position.copy(pos);
    portalSubGroup.userData = { isMethodologyPortal: true, stageIndex: idx + 1 };

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

  // Connecting Pathway Conduit Curve between portals
  const pathwayCurve = new THREE.CatmullRomCurve3(portalPositions);
  const pathwayTubeGeo = new THREE.TubeGeometry(pathwayCurve, 48, 0.035, 8, false);
  disposables.push(pathwayTubeGeo);
  const pathwayTubeMat = new THREE.MeshStandardMaterial({
    color: 0x073B32,
    emissive: 0x2FA885,
    emissiveIntensity: 0.35,
    roughness: 0.4,
    metalness: 0.6,
  });
  disposables.push(pathwayTubeMat);
  const pathwayTubeMesh = new THREE.Mesh(pathwayTubeGeo, pathwayTubeMat);
  methodologyPortalsGroup.add(pathwayTubeMesh);

  // Traveling Pathway Signal Pulse
  const pathwayPulseGeo = new THREE.SphereGeometry(0.08, 12, 12);
  disposables.push(pathwayPulseGeo);
  const pathwayPulseMat = new THREE.MeshBasicMaterial({
    color: 0xE6FFF8,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
  });
  disposables.push(pathwayPulseMat);
  const pathwayPulseMesh = new THREE.Mesh(pathwayPulseGeo, pathwayPulseMat);
  methodologyPortalsGroup.add(pathwayPulseMesh);

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
  let currentMethodologyStage = 1;

  const setPylonHovered = (serviceId: string | null) => {
    hoveredServiceId = serviceId;
  };

  const setPylonSelected = (serviceId: string | null) => {
    selectedServiceId = serviceId;
  };

  const setMethodologyStage = (stage: number) => {
    currentMethodologyStage = Math.max(1, Math.min(6, stage));
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

    // Methodology pathway signal pulse and threshold rings emissive intensity
    if (isMethodologyDest) {
      const pulseT = (elapsed * 0.35) % 1.0;
      const maxT = (currentMethodologyStage - 0.5) / 5.0;
      const clampedPulseT = Math.min(pulseT, maxT);
      const pulsePt = pathwayCurve.getPointAt(clampedPulseT);
      pathwayPulseMesh.position.copy(pulsePt);
      pathwayPulseMesh.visible = true;
    } else {
      pathwayPulseMesh.visible = false;
    }

    methodologyThresholdMeshes.forEach((mesh, idx) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      const stageNum = idx + 1;
      const isCurrent = stageNum === currentMethodologyStage;
      const isPast = stageNum < currentMethodologyStage;
      const targetEmissive = isMethodologyDest
        ? (isCurrent ? 2.2 : isPast ? 0.9 : 0.25)
        : 0.15;
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, targetEmissive, delta * 6);
      if (isCurrent && isMethodologyDest) {
        mesh.rotation.z = elapsed * 0.5;
      }
    });

    // Pylon animations
    pylonMeshes.forEach((pGroup, sId) => {
      const isHovered = sId === hoveredServiceId;
      const isSelected = sId === selectedServiceId;

      const core = pGroup.children[1] as THREE.Mesh | undefined;
      const ring = pGroup.children[2] as THREE.Mesh | undefined;
      const beacon = pGroup.children[3] as THREE.Mesh | undefined;
      const halo = pGroup.children[4] as THREE.Mesh | undefined;

      if (core) {
        core.rotation.y = elapsed * 0.5;
        const targetScale = isSelected ? 1.45 : isHovered ? 1.2 : 1.0;
        core.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 6);

        // Core emissive brightness based on destination state
        const coreMat = core.material as THREE.MeshStandardMaterial;
        const baseEmissive = isServicesDest
          ? (isSelected ? 2.2 : isHovered ? 1.1 : 0.6)
          : 0.15;
        coreMat.emissiveIntensity = THREE.MathUtils.lerp(coreMat.emissiveIntensity, baseEmissive, delta * 6);
      }

      if (ring) {
        ring.rotation.z = elapsed * (isSelected ? 2.0 : 0.8);
      }

      if (beacon) {
        const beaconMat = beacon.material as THREE.MeshBasicMaterial;
        const targetBeaconOpacity = isSelected ? 0.72 : isHovered ? 0.22 : 0.0;
        beaconMat.opacity = THREE.MathUtils.lerp(beaconMat.opacity, targetBeaconOpacity, delta * 8);
        if (isSelected) {
          beacon.rotation.y = elapsed * 0.6;
        }
      }

      if (halo) {
        const haloMat = halo.material as THREE.MeshBasicMaterial;
        const targetHaloOpacity = isSelected ? 0.85 : isHovered ? 0.45 : (isServicesDest ? 0.15 : 0.05);
        haloMat.opacity = THREE.MathUtils.lerp(haloMat.opacity, targetHaloOpacity, delta * 6);
        const targetHaloScale = isSelected ? 1.4 : 1.0;
        halo.scale.lerp(new THREE.Vector3(targetHaloScale, targetHaloScale, targetHaloScale), delta * 6);
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
    setMethodologyStage,
    dispose,
  };
}
