import * as THREE from "three";
import { SERVICE_PYLONS, ServicePylonConfig, WorldDestinationId } from "./WorldConfig";

export interface ArchitectureElements {
  group: THREE.Group;
  pylonMeshes: Map<string, THREE.Group>;
  update: (delta: number, elapsed: number, activeDestination?: WorldDestinationId) => void;
  setPylonHovered: (serviceId: string | null) => void;
  setPylonSelected: (serviceId: string | null) => void;
  setMethodologyStage: (stage: number | null) => void;
  setAboutStage: (stage: number | null) => void;
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

  // 6 Distinctive Architectural Service Stations with unique geometry & motifs
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

    // 1. Unique Architectural Stele Body & Plinth per Service
    let bodyGeo: THREE.BufferGeometry;
    let height = 1.6;

    if (cfg.service.id === "osint-investigative-research") {
      // Station 01: Slender fluted hexagonal stele (Astrolabe plinth)
      height = 1.7;
      bodyGeo = new THREE.CylinderGeometry(0.12, 0.24, height, 6);
    } else if (cfg.service.id === "business-due-diligence") {
      // Station 02: Quad-faceted corporate pedestal
      height = 1.5;
      bodyGeo = new THREE.BoxGeometry(0.34, height, 0.34);
    } else if (cfg.service.id === "recruitment-verification") {
      // Station 03: Tapered triangular epistemic obelisk
      height = 1.8;
      bodyGeo = new THREE.CylinderGeometry(0.06, 0.26, height, 3);
    } else if (cfg.service.id === "brand-impersonation-research") {
      // Station 04: Parabolic flared radar pylon
      height = 1.4;
      bodyGeo = new THREE.CylinderGeometry(0.24, 0.14, height, 16);
    } else if (cfg.service.id === "external-threat-intelligence") {
      // Station 05: Heavy 8-sided polygonal defense bastion
      height = 2.0;
      bodyGeo = new THREE.CylinderGeometry(0.22, 0.32, height, 8);
    } else {
      // Station 06: Cylindrical stepped reactor column with cooling conduits
      height = 1.6;
      bodyGeo = new THREE.CylinderGeometry(0.18, 0.22, height, 12);
    }
    disposables.push(bodyGeo);

    const bodyMesh = new THREE.Mesh(bodyGeo, basaltMat);
    bodyMesh.position.y = height / 2;
    bodyMesh.userData = pylonGroup.userData;
    pylonGroup.add(bodyMesh);

    // Decorative stepped collar ring between body and core
    const collarGeo = new THREE.TorusGeometry(0.22, 0.02, 8, 24);
    disposables.push(collarGeo);
    const collarMesh = new THREE.Mesh(collarGeo, brassMat);
    collarMesh.rotation.x = Math.PI / 2;
    collarMesh.position.y = height + 0.02;
    collarMesh.userData = pylonGroup.userData;
    pylonGroup.add(collarMesh);

    // 2. Distinctive Luminous Kinetic Service Emblem / Aperture Core
    let coreGeo: THREE.BufferGeometry;
    let ringGeo: THREE.BufferGeometry;

    if (cfg.service.id === "osint-investigative-research") {
      // Dual-gimbal astrolabe with octahedral core
      coreGeo = new THREE.OctahedronGeometry(0.22, 1);
      ringGeo = new THREE.TorusGeometry(0.36, 0.016, 16, 32);
    } else if (cfg.service.id === "business-due-diligence") {
      // Interlocking corporate hierarchy cubes
      coreGeo = new THREE.BoxGeometry(0.26, 0.26, 0.26);
      ringGeo = new THREE.TorusGeometry(0.36, 0.018, 4, 4);
    } else if (cfg.service.id === "recruitment-verification") {
      // Faceted verification crystal obelisk lens
      coreGeo = new THREE.ConeGeometry(0.2, 0.42, 6);
      ringGeo = new THREE.TorusGeometry(0.32, 0.016, 16, 32);
    } else if (cfg.service.id === "brand-impersonation-research") {
      // Radar sensor disk
      coreGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.07, 24);
      ringGeo = new THREE.TorusGeometry(0.36, 0.014, 16, 32);
    } else if (cfg.service.id === "external-threat-intelligence") {
      // Multi-faceted defense shield icosahedron
      coreGeo = new THREE.IcosahedronGeometry(0.25, 0);
      ringGeo = new THREE.TorusGeometry(0.38, 0.022, 6, 6);
    } else {
      // Continuous pipeline torus knot
      coreGeo = new THREE.TorusKnotGeometry(0.14, 0.045, 36, 8, 2, 3);
      ringGeo = new THREE.TorusGeometry(0.34, 0.016, 16, 32);
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
    coreMesh.position.y = height + 0.24;
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
    ringMesh.position.y = height + 0.24;
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
  // -------------------------------------------------------------
  // C. 6 DISTINCT ARCHITECTURAL METHODOLOGY MONUMENTS & SPATIAL PATHWAY
  // Sequential descending investigation journey:
  // 01 Define -> 02 Collect -> 03 Verify -> 04 Correlate -> 05 Analyze -> 06 Deliver
  // -------------------------------------------------------------
  const methodologyPortalsGroup = new THREE.Group();
  methodologyPortalsGroup.name = "MethodologyConduitSanctuary";

  const stagePositions = [
    new THREE.Vector3(-2.4, -3.4, 4.4), // 01 Define
    new THREE.Vector3(-1.4, -3.6, 3.2), // 02 Collect
    new THREE.Vector3(-0.4, -3.8, 2.0), // 03 Verify
    new THREE.Vector3(0.6, -4.0, 0.8),  // 04 Correlate
    new THREE.Vector3(1.6, -4.2, -0.4), // 05 Analyze
    new THREE.Vector3(2.6, -4.4, -1.6), // 06 Deliver
  ];

  interface StageStructure {
    group: THREE.Group;
    stageIndex: number;
    coreMesh: THREE.Mesh;
    secondaryMesh?: THREE.Mesh;
    beaconMesh: THREE.Mesh;
    haloMesh: THREE.Mesh;
    color: number;
  }

  const stageStructures: StageStructure[] = [];

  // Stage 01: Define (Scope Stela & Directional Reticle Prism)
  {
    const idx = 0;
    const pos = stagePositions[idx];
    const sGroup = new THREE.Group();
    sGroup.position.copy(pos);
    sGroup.userData = { isMethodologyStage: true, stageNumber: 1 };

    // Stepped octagonal basalt plinth
    const plinthGeo = new THREE.CylinderGeometry(0.55, 0.65, 0.22, 8);
    disposables.push(plinthGeo);
    const plinthMesh = new THREE.Mesh(plinthGeo, basaltMat);
    plinthMesh.userData = sGroup.userData;
    sGroup.add(plinthMesh);

    // Brass perimeter ring
    const rimGeo = new THREE.TorusGeometry(0.55, 0.02, 12, 32);
    disposables.push(rimGeo);
    const rimMesh = new THREE.Mesh(rimGeo, brassMat);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = 0.11;
    rimMesh.userData = sGroup.userData;
    sGroup.add(rimMesh);

    // Twin flanking scope boundary stelae
    [-0.42, 0.42].forEach((xOffset) => {
      const stelaGeo = new THREE.BoxGeometry(0.06, 1.25, 0.06);
      disposables.push(stelaGeo);
      const stelaMesh = new THREE.Mesh(stelaGeo, basaltMat);
      stelaMesh.position.set(xOffset, 0.62, 0);
      stelaMesh.userData = sGroup.userData;
      sGroup.add(stelaMesh);

      const stelaInlayGeo = new THREE.BoxGeometry(0.02, 1.2, 0.07);
      disposables.push(stelaInlayGeo);
      const stelaInlay = new THREE.Mesh(stelaInlayGeo, brassMat);
      stelaInlay.position.set(xOffset, 0.62, 0);
      stelaInlay.userData = sGroup.userData;
      sGroup.add(stelaInlay);
    });

    // Precision calibration scope ring
    const scopeRingGeo = new THREE.TorusGeometry(0.36, 0.02, 16, 32);
    disposables.push(scopeRingGeo);
    const scopeRing = new THREE.Mesh(scopeRingGeo, brassMat);
    scopeRing.position.y = 0.65;
    scopeRing.userData = sGroup.userData;
    sGroup.add(scopeRing);

    // Directional Core Octahedron
    const coreGeo = new THREE.OctahedronGeometry(0.22, 0);
    disposables.push(coreGeo);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xb7e4d5,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x2fa885,
      emissiveIntensity: 0.75,
    });
    disposables.push(coreMat);
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.y = 0.65;
    coreMesh.userData = sGroup.userData;
    sGroup.add(coreMesh);

    // Vertical Beacon
    const beaconGeo = new THREE.CylinderGeometry(0.06, 0.22, 4.2, 16, 1, true);
    disposables.push(beaconGeo);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: 0x2fa885,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    disposables.push(beaconMat);
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    beaconMesh.position.y = 2.4;
    sGroup.add(beaconMesh);

    // Ground Target Halo
    const haloGeo = new THREE.RingGeometry(0.32, 0.52, 32);
    disposables.push(haloGeo);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x2fa885,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    disposables.push(haloMat);
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.rotation.x = -Math.PI / 2;
    haloMesh.position.y = 0.02;
    sGroup.add(haloMesh);

    methodologyPortalsGroup.add(sGroup);
    stageStructures.push({
      group: sGroup,
      stageIndex: 1,
      coreMesh,
      secondaryMesh: scopeRing,
      beaconMesh,
      haloMesh,
      color: 0x2fa885,
    });
  }

  // Stage 02: Collect (Telemetry Ingestion Funnel & Sensor Array)
  {
    const idx = 1;
    const pos = stagePositions[idx];
    const sGroup = new THREE.Group();
    sGroup.position.copy(pos);
    sGroup.userData = { isMethodologyStage: true, stageNumber: 2 };

    // Stepped circular slate plinth
    const plinthGeo = new THREE.CylinderGeometry(0.62, 0.72, 0.22, 24);
    disposables.push(plinthGeo);
    const plinthMesh = new THREE.Mesh(plinthGeo, slateMat);
    plinthMesh.userData = sGroup.userData;
    sGroup.add(plinthMesh);

    // Inverted sensor funnel cone
    const funnelGeo = new THREE.CylinderGeometry(0.44, 0.14, 0.48, 16, 1, true);
    disposables.push(funnelGeo);
    const funnelMesh = new THREE.Mesh(funnelGeo, basaltMat);
    funnelMesh.position.y = 0.42;
    funnelMesh.userData = sGroup.userData;
    sGroup.add(funnelMesh);

    // 4 vertical sensor intake needles
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const needleGeo = new THREE.CylinderGeometry(0.018, 0.018, 1.05, 8);
      disposables.push(needleGeo);
      const needleMesh = new THREE.Mesh(needleGeo, brassMat);
      needleMesh.position.set(Math.cos(angle) * 0.38, 0.52, Math.sin(angle) * 0.38);
      needleMesh.userData = sGroup.userData;
      sGroup.add(needleMesh);
    }

    // Ingestion Pulsing Torus Core
    const coreGeo = new THREE.TorusGeometry(0.3, 0.025, 16, 32);
    disposables.push(coreGeo);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x60a5fa,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x2563eb,
      emissiveIntensity: 0.75,
    });
    disposables.push(coreMat);
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.rotation.x = Math.PI / 2;
    coreMesh.position.y = 0.65;
    coreMesh.userData = sGroup.userData;
    sGroup.add(coreMesh);

    // Vertical Beacon
    const beaconGeo = new THREE.CylinderGeometry(0.06, 0.22, 4.2, 16, 1, true);
    disposables.push(beaconGeo);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    disposables.push(beaconMat);
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    beaconMesh.position.y = 2.4;
    sGroup.add(beaconMesh);

    // Ground Target Halo
    const haloGeo = new THREE.RingGeometry(0.32, 0.52, 32);
    disposables.push(haloGeo);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    disposables.push(haloMat);
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.rotation.x = -Math.PI / 2;
    haloMesh.position.y = 0.02;
    sGroup.add(haloMesh);

    methodologyPortalsGroup.add(sGroup);
    stageStructures.push({
      group: sGroup,
      stageIndex: 2,
      coreMesh,
      beaconMesh,
      haloMesh,
      color: 0x60a5fa,
    });
  }

  // Stage 03: Verify (Cryptographic Calibration Crucible)
  {
    const idx = 2;
    const pos = stagePositions[idx];
    const sGroup = new THREE.Group();
    sGroup.position.copy(pos);
    sGroup.userData = { isMethodologyStage: true, stageNumber: 3 };

    // Hexagonal basalt plinth with gold rim
    const plinthGeo = new THREE.CylinderGeometry(0.58, 0.68, 0.22, 6);
    disposables.push(plinthGeo);
    const plinthMesh = new THREE.Mesh(plinthGeo, basaltMat);
    plinthMesh.userData = sGroup.userData;
    sGroup.add(plinthMesh);

    // Protective twin vault arches
    const archGeo = new THREE.TorusGeometry(0.48, 0.026, 12, 32, Math.PI);
    disposables.push(archGeo);
    const arch1 = new THREE.Mesh(archGeo, brassMat);
    arch1.position.y = 0.15;
    arch1.userData = sGroup.userData;
    sGroup.add(arch1);

    const arch2 = new THREE.Mesh(archGeo, slateMat);
    arch2.rotation.y = Math.PI / 2;
    arch2.position.y = 0.15;
    arch2.userData = sGroup.userData;
    sGroup.add(arch2);

    // Dual counter-rotating cryptographic verification tetrahedrons
    const tetraGeo = new THREE.TetrahedronGeometry(0.32, 0);
    disposables.push(tetraGeo);
    const tetraMat = new THREE.MeshStandardMaterial({
      color: 0xb7e4d5,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x2fa885,
      emissiveIntensity: 0.75,
    });
    disposables.push(tetraMat);
    const coreMesh = new THREE.Mesh(tetraGeo, tetraMat);
    coreMesh.position.y = 0.62;
    coreMesh.userData = sGroup.userData;
    sGroup.add(coreMesh);

    const innerTetraGeo = new THREE.TetrahedronGeometry(0.18, 0);
    disposables.push(innerTetraGeo);
    const innerTetra = new THREE.Mesh(innerTetraGeo, brassMat);
    innerTetra.position.y = 0.62;
    innerTetra.userData = sGroup.userData;
    sGroup.add(innerTetra);

    // Vertical Beacon
    const beaconGeo = new THREE.CylinderGeometry(0.06, 0.22, 4.2, 16, 1, true);
    disposables.push(beaconGeo);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: 0x2fa885,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    disposables.push(beaconMat);
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    beaconMesh.position.y = 2.4;
    sGroup.add(beaconMesh);

    // Ground Target Halo
    const haloGeo = new THREE.RingGeometry(0.32, 0.52, 32);
    disposables.push(haloGeo);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x2fa885,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    disposables.push(haloMat);
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.rotation.x = -Math.PI / 2;
    haloMesh.position.y = 0.02;
    sGroup.add(haloMesh);

    methodologyPortalsGroup.add(sGroup);
    stageStructures.push({
      group: sGroup,
      stageIndex: 3,
      coreMesh,
      secondaryMesh: innerTetra,
      beaconMesh,
      haloMesh,
      color: 0x2fa885,
    });
  }

  // Stage 04: Correlate (Relational Topology Nexus & Orbital Rings)
  {
    const idx = 3;
    const pos = stagePositions[idx];
    const sGroup = new THREE.Group();
    sGroup.position.copy(pos);
    sGroup.userData = { isMethodologyStage: true, stageNumber: 4 };

    // Stepped square dais plinth
    const plinthGeo = new THREE.BoxGeometry(0.85, 0.22, 0.85);
    disposables.push(plinthGeo);
    const plinthMesh = new THREE.Mesh(plinthGeo, slateMat);
    plinthMesh.userData = sGroup.userData;
    sGroup.add(plinthMesh);

    // Faceted Dodecahedron Core
    const dodecGeo = new THREE.DodecahedronGeometry(0.26, 0);
    disposables.push(dodecGeo);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xb7e4d5,
      roughness: 0.25,
      metalness: 0.75,
      emissive: 0x2fa885,
      emissiveIntensity: 0.75,
    });
    disposables.push(coreMat);
    const coreMesh = new THREE.Mesh(dodecGeo, coreMat);
    coreMesh.position.y = 0.65;
    coreMesh.userData = sGroup.userData;
    sGroup.add(coreMesh);

    // Dual intersecting orbital brass rings
    const ringGeo = new THREE.TorusGeometry(0.44, 0.016, 16, 32);
    disposables.push(ringGeo);
    const ring1 = new THREE.Mesh(ringGeo, brassMat);
    ring1.position.y = 0.65;
    ring1.userData = sGroup.userData;
    sGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, mintTrimMat);
    ring2.rotation.x = Math.PI / 3;
    ring2.position.y = 0.65;
    ring2.userData = sGroup.userData;
    sGroup.add(ring2);

    // Vertical Beacon
    const beaconGeo = new THREE.CylinderGeometry(0.06, 0.22, 4.2, 16, 1, true);
    disposables.push(beaconGeo);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: 0x2fa885,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    disposables.push(beaconMat);
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    beaconMesh.position.y = 2.4;
    sGroup.add(beaconMesh);

    // Ground Target Halo
    const haloGeo = new THREE.RingGeometry(0.32, 0.52, 32);
    disposables.push(haloGeo);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x2fa885,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    disposables.push(haloMat);
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.rotation.x = -Math.PI / 2;
    haloMesh.position.y = 0.02;
    sGroup.add(haloMesh);

    methodologyPortalsGroup.add(sGroup);
    stageStructures.push({
      group: sGroup,
      stageIndex: 4,
      coreMesh,
      secondaryMesh: ring1,
      beaconMesh,
      haloMesh,
      color: 0x2fa885,
    });
  }

  // Stage 05: Analyze (Epistemic Spectrum Plinth)
  {
    const idx = 4;
    const pos = stagePositions[idx];
    const sGroup = new THREE.Group();
    sGroup.position.copy(pos);
    sGroup.userData = { isMethodologyStage: true, stageNumber: 5 };

    // Stepped pyramid plinth
    const plinth1Geo = new THREE.BoxGeometry(0.95, 0.11, 0.95);
    disposables.push(plinth1Geo);
    const p1 = new THREE.Mesh(plinth1Geo, basaltMat);
    p1.userData = sGroup.userData;
    sGroup.add(p1);

    const plinth2Geo = new THREE.BoxGeometry(0.75, 0.11, 0.75);
    disposables.push(plinth2Geo);
    const p2 = new THREE.Mesh(plinth2Geo, slateMat);
    p2.position.y = 0.11;
    p2.userData = sGroup.userData;
    sGroup.add(p2);

    // 4 vertical spectrum prism bars (Fact, Indicator, Inference, Unverified)
    const prismColors = [0x2fa885, 0x60a5fa, 0xfbbf24, 0xc084fc];
    prismColors.forEach((col, pIdx) => {
      const angle = (pIdx * Math.PI) / 3 - Math.PI / 3;
      const pGeo = new THREE.CylinderGeometry(0.035, 0.045, 0.55, 4);
      disposables.push(pGeo);
      const pMat = new THREE.MeshStandardMaterial({
        color: col,
        emissive: col,
        emissiveIntensity: 0.6,
        roughness: 0.2,
      });
      disposables.push(pMat);
      const pMesh = new THREE.Mesh(pGeo, pMat);
      pMesh.position.set(Math.cos(angle) * 0.32, 0.42, Math.sin(angle) * 0.32);
      pMesh.userData = sGroup.userData;
      sGroup.add(pMesh);
    });

    // Central Analytical Lens Core
    const coreGeo = new THREE.OctahedronGeometry(0.24, 1);
    disposables.push(coreGeo);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0xd97706,
      emissiveIntensity: 0.75,
    });
    disposables.push(coreMat);
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.y = 0.68;
    coreMesh.userData = sGroup.userData;
    sGroup.add(coreMesh);

    // Vertical Beacon
    const beaconGeo = new THREE.CylinderGeometry(0.06, 0.22, 4.2, 16, 1, true);
    disposables.push(beaconGeo);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    disposables.push(beaconMat);
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    beaconMesh.position.y = 2.4;
    sGroup.add(beaconMesh);

    // Ground Target Halo
    const haloGeo = new THREE.RingGeometry(0.32, 0.52, 32);
    disposables.push(haloGeo);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    disposables.push(haloMat);
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.rotation.x = -Math.PI / 2;
    haloMesh.position.y = 0.02;
    sGroup.add(haloMesh);

    methodologyPortalsGroup.add(sGroup);
    stageStructures.push({
      group: sGroup,
      stageIndex: 5,
      coreMesh,
      beaconMesh,
      haloMesh,
      color: 0xfbbf24,
    });
  }

  // Stage 06: Deliver (Crystalline Transmission Monolith & Ascending Beacon)
  {
    const idx = 5;
    const pos = stagePositions[idx];
    const sGroup = new THREE.Group();
    sGroup.position.copy(pos);
    sGroup.userData = { isMethodologyStage: true, stageNumber: 6 };

    // Stepped 12-sided dais
    const plinthGeo = new THREE.CylinderGeometry(0.62, 0.72, 0.24, 12);
    disposables.push(plinthGeo);
    const plinthMesh = new THREE.Mesh(plinthGeo, basaltMat);
    plinthMesh.userData = sGroup.userData;
    sGroup.add(plinthMesh);

    // Tall tapered basalt obelisk
    const obeliskGeo = new THREE.CylinderGeometry(0.18, 0.28, 1.4, 4);
    disposables.push(obeliskGeo);
    const obeliskMesh = new THREE.Mesh(obeliskGeo, basaltMat);
    obeliskMesh.position.y = 0.82;
    obeliskMesh.userData = sGroup.userData;
    sGroup.add(obeliskMesh);

    // Crystalline transmission pyramid capstone
    const capGeo = new THREE.ConeGeometry(0.24, 0.42, 4);
    disposables.push(capGeo);
    const capMat = new THREE.MeshStandardMaterial({
      color: 0xb7e4d5,
      roughness: 0.15,
      metalness: 0.85,
      emissive: 0x2fa885,
      emissiveIntensity: 0.85,
    });
    disposables.push(capMat);
    const coreMesh = new THREE.Mesh(capGeo, capMat);
    coreMesh.position.y = 1.72;
    coreMesh.userData = sGroup.userData;
    sGroup.add(coreMesh);

    // Vertical High-Power Transmission Beacon
    const beaconGeo = new THREE.CylinderGeometry(0.06, 0.24, 4.8, 16, 1, true);
    disposables.push(beaconGeo);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: 0x2fa885,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    disposables.push(beaconMat);
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    beaconMesh.position.y = 3.2;
    sGroup.add(beaconMesh);

    // Ground Target Halo
    const haloGeo = new THREE.RingGeometry(0.32, 0.52, 32);
    disposables.push(haloGeo);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x2fa885,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    disposables.push(haloMat);
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.rotation.x = -Math.PI / 2;
    haloMesh.position.y = 0.02;
    sGroup.add(haloMesh);

    methodologyPortalsGroup.add(sGroup);
    stageStructures.push({
      group: sGroup,
      stageIndex: 6,
      coreMesh,
      beaconMesh,
      haloMesh,
      color: 0x2fa885,
    });
  }

  // -------------------------------------------------------------
  // 5 CONNECTING CONDUIT SEGMENTS & SIGNAL TRAVEL PULSES
  // -------------------------------------------------------------
  const conduitMeshes: THREE.Mesh[] = [];
  const conduitCurves: THREE.CatmullRomCurve3[] = [];
  const conduitPulseMeshes: THREE.Mesh[] = [];

  for (let i = 0; i < stagePositions.length - 1; i++) {
    const pStart = stagePositions[i].clone();
    const pEnd = stagePositions[i + 1].clone();
    const pMid = pStart.clone().lerp(pEnd, 0.5);
    pMid.y -= 0.15; // Graceful downward curve

    const curve = new THREE.CatmullRomCurve3([pStart, pMid, pEnd]);
    conduitCurves.push(curve);

    const tubeGeo = new THREE.TubeGeometry(curve, 24, 0.032, 8, false);
    disposables.push(tubeGeo);

    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0x073b32,
      emissive: 0x2fa885,
      emissiveIntensity: 0.55,
      roughness: 0.35,
      metalness: 0.7,
      transparent: true,
      opacity: 0.75,
    });
    disposables.push(tubeMat);

    const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    methodologyPortalsGroup.add(tubeMesh);
    conduitMeshes.push(tubeMesh);

    // Traveling photon pulse sphere
    const pulseGeo = new THREE.SphereGeometry(0.065, 12, 12);
    disposables.push(pulseGeo);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: 0xe6fff8,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    disposables.push(pulseMat);
    const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
    methodologyPortalsGroup.add(pulseMesh);
    conduitPulseMeshes.push(pulseMesh);
  }

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
  // E. THE INTELLIGENCE INQUIRY CHAMBER (CONTACT DESTINATION)
  // Serene architectural sanctum featuring a calm central cryptographic monolith,
  // concentric burnished brass dais rings, and framing colonnade stelae.
  // -------------------------------------------------------------
  const inquiryChamberGroup = new THREE.Group();
  inquiryChamberGroup.name = "InquiryChamberSanctuary";
  inquiryChamberGroup.position.set(0, 0.2, -6.8);

  // 1. Tiered Basalt Sanctuary Dais
  const daisGeo = new THREE.CylinderGeometry(4.8, 5.4, 0.4, 32);
  disposables.push(daisGeo);
  const daisMesh = new THREE.Mesh(daisGeo, basaltMat);
  inquiryChamberGroup.add(daisMesh);

  // Concentric brass floor inlay rings
  [2.4, 3.6, 4.6].forEach((r) => {
    const ringGeo = new THREE.RingGeometry(r, r + 0.04, 48);
    disposables.push(ringGeo);
    const ringMesh = new THREE.Mesh(ringGeo, brassMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = 0.21;
    inquiryChamberGroup.add(ringMesh);
  });

  // 2. Central Cryptographic Inquiry Altar Base
  const altarGeo = new THREE.CylinderGeometry(0.85, 1.05, 0.6, 8);
  disposables.push(altarGeo);
  const altarMesh = new THREE.Mesh(altarGeo, slateMat);
  altarMesh.position.y = 0.5;
  inquiryChamberGroup.add(altarMesh);

  // Altar brass lip
  const altarLipGeo = new THREE.TorusGeometry(0.88, 0.025, 16, 32);
  disposables.push(altarLipGeo);
  const altarLipMesh = new THREE.Mesh(altarLipGeo, brassMat);
  altarLipMesh.rotation.x = Math.PI / 2;
  altarLipMesh.position.y = 0.8;
  inquiryChamberGroup.add(altarLipMesh);

  // 3. Floating Emerald Inquiry Cipher Core (Rhombic Dodecahedron)
  const inquiryCoreGeo = new THREE.DodecahedronGeometry(0.42, 0);
  disposables.push(inquiryCoreGeo);
  const inquiryCoreMat = new THREE.MeshStandardMaterial({
    color: 0x2fa885,
    emissive: 0x2fa885,
    emissiveIntensity: 0.95,
    roughness: 0.22,
    metalness: 0.8,
  });
  disposables.push(inquiryCoreMat);
  const inquiryCoreMesh = new THREE.Mesh(inquiryCoreGeo, inquiryCoreMat);
  inquiryCoreMesh.position.y = 1.45;
  inquiryChamberGroup.add(inquiryCoreMesh);

  // 4. Concentric Orbital Rings around Inquiry Core
  const ring1Geo = new THREE.TorusGeometry(0.68, 0.016, 16, 48);
  disposables.push(ring1Geo);
  const ring1Mesh = new THREE.Mesh(ring1Geo, brassMat);
  ring1Mesh.position.y = 1.45;
  ring1Mesh.rotation.x = Math.PI / 3;
  inquiryChamberGroup.add(ring1Mesh);

  const ring2Geo = new THREE.TorusGeometry(0.82, 0.014, 16, 48);
  disposables.push(ring2Geo);
  const ring2Mesh = new THREE.Mesh(ring2Geo, mintTrimMat);
  ring2Mesh.position.y = 1.45;
  ring2Mesh.rotation.y = Math.PI / 4;
  inquiryChamberGroup.add(ring2Mesh);

  // 5. Restrained Vertical Atmospheric Beacon (Confidential Communication Channel)
  const inquiryBeaconGeo = new THREE.CylinderGeometry(0.08, 0.35, 6.0, 16, 1, true);
  disposables.push(inquiryBeaconGeo);
  const inquiryBeaconMat = new THREE.MeshBasicMaterial({
    color: 0x2fa885,
    transparent: true,
    opacity: 0.35,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  disposables.push(inquiryBeaconMat);
  const inquiryBeaconMesh = new THREE.Mesh(inquiryBeaconGeo, inquiryBeaconMat);
  inquiryBeaconMesh.position.y = 4.2;
  inquiryChamberGroup.add(inquiryBeaconMesh);

  // 6. Flanking Perspective Colonnade Stelae
  const chamberColonnade = [
    { x: -4.4, z: -5.6, h: 2.8 },
    { x: -5.6, z: -7.2, h: 2.2 },
    { x: 4.4, z: -5.6, h: 2.8 },
    { x: 5.6, z: -7.2, h: 2.2 },
  ];
  chamberColonnade.forEach((col) => {
    const colGroup = new THREE.Group();
    colGroup.position.set(col.x, col.h / 2, col.z);
    const colGeo = new THREE.BoxGeometry(0.35, col.h, 0.35);
    disposables.push(colGeo);
    const colMesh = new THREE.Mesh(colGeo, basaltMat);
    colGroup.add(colMesh);

    const capGeo = new THREE.BoxGeometry(0.38, 0.04, 0.38);
    disposables.push(capGeo);
    const capMesh = new THREE.Mesh(capGeo, brassMat);
    capMesh.position.y = col.h / 2;
    colGroup.add(capMesh);

    inquiryChamberGroup.add(colGroup);
  });

  group.add(inquiryChamberGroup);

  // -------------------------------------------------------------
  // F. ABOUT INTELLIGENCE PHILOSOPHY QUAD-MONOLITH SANCTUM
  // 4 Visually distinct architectural monuments arrayed on an illuminated curved arc:
  // 01 Discover -> 02 Verify -> 03 Connect -> 04 Deliver
  // -------------------------------------------------------------
  const aboutSanctumGroup = new THREE.Group();
  aboutSanctumGroup.name = "AboutPhilosophySanctum";
  aboutSanctumGroup.position.set(0, 0, 0);

  const aboutStagePositions = [
    new THREE.Vector3(-3.3, 2.4, -2.4), // 01 Discover
    new THREE.Vector3(-1.1, 2.5, -2.8), // 02 Verify
    new THREE.Vector3(1.1, 2.5, -2.8),  // 03 Connect
    new THREE.Vector3(3.3, 2.4, -2.4),  // 04 Deliver
  ];

  interface AboutStageStructure {
    group: THREE.Group;
    stageIndex: number;
    coreMesh: THREE.Mesh;
    secondaryMesh?: THREE.Mesh;
    beaconMesh: THREE.Mesh;
    haloMesh: THREE.Mesh;
    color: number;
  }

  const aboutStageStructures: AboutStageStructure[] = [];

  // Stage 01: Discover (Sensor Obelisk & Ingestion Crucible)
  {
    const idx = 0;
    const pos = aboutStagePositions[idx];
    const sGroup = new THREE.Group();
    sGroup.position.copy(pos);
    sGroup.userData = { isAboutStage: true, stageNumber: 1 };

    // Plinth
    const plinthGeo = new THREE.CylinderGeometry(0.55, 0.65, 0.22, 8);
    disposables.push(plinthGeo);
    const plinthMesh = new THREE.Mesh(plinthGeo, basaltMat);
    plinthMesh.userData = sGroup.userData;
    sGroup.add(plinthMesh);

    // Sensor Obelisk
    const obeliskGeo = new THREE.CylinderGeometry(0.12, 0.24, 1.2, 4);
    disposables.push(obeliskGeo);
    const obeliskMesh = new THREE.Mesh(obeliskGeo, slateMat);
    obeliskMesh.position.y = 0.72;
    obeliskMesh.userData = sGroup.userData;
    sGroup.add(obeliskMesh);

    // Floating Sensor Ring
    const radarGeo = new THREE.TorusGeometry(0.38, 0.02, 16, 32);
    disposables.push(radarGeo);
    const radarMesh = new THREE.Mesh(radarGeo, brassMat);
    radarMesh.position.y = 1.35;
    radarMesh.rotation.x = Math.PI / 3;
    radarMesh.userData = sGroup.userData;
    sGroup.add(radarMesh);

    // Scanning Lens Core
    const lensGeo = new THREE.SphereGeometry(0.2, 16, 16);
    disposables.push(lensGeo);
    const lensMat = new THREE.MeshStandardMaterial({
      color: 0x2fa885,
      emissive: 0x2fa885,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.85,
    });
    disposables.push(lensMat);
    const coreMesh = new THREE.Mesh(lensGeo, lensMat);
    coreMesh.position.y = 1.35;
    coreMesh.userData = sGroup.userData;
    sGroup.add(coreMesh);

    // Vertical beacon
    const beaconGeo = new THREE.CylinderGeometry(0.04, 0.18, 4.2, 16, 1, true);
    disposables.push(beaconGeo);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: 0x2fa885,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    disposables.push(beaconMat);
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    beaconMesh.position.y = 2.8;
    sGroup.add(beaconMesh);

    // Ground Halo
    const haloGeo = new THREE.RingGeometry(0.28, 0.48, 32);
    disposables.push(haloGeo);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x2fa885,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    disposables.push(haloMat);
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.rotation.x = -Math.PI / 2;
    haloMesh.position.y = 0.02;
    sGroup.add(haloMesh);

    aboutSanctumGroup.add(sGroup);
    aboutStageStructures.push({
      group: sGroup,
      stageIndex: 1,
      coreMesh,
      secondaryMesh: radarMesh,
      beaconMesh,
      haloMesh,
      color: 0x2fa885,
    });
  }

  // Stage 02: Verify (Cryptographic Provenance Portal)
  {
    const idx = 1;
    const pos = aboutStagePositions[idx];
    const sGroup = new THREE.Group();
    sGroup.position.copy(pos);
    sGroup.userData = { isAboutStage: true, stageNumber: 2 };

    // Stepped plinth
    const plinthGeo = new THREE.CylinderGeometry(0.55, 0.65, 0.22, 6);
    disposables.push(plinthGeo);
    const plinthMesh = new THREE.Mesh(plinthGeo, basaltMat);
    plinthMesh.userData = sGroup.userData;
    sGroup.add(plinthMesh);

    // Twin Gateway Stelae
    [-0.32, 0.32].forEach((xOff) => {
      const steleGeo = new THREE.BoxGeometry(0.14, 1.2, 0.18);
      disposables.push(steleGeo);
      const steleMesh = new THREE.Mesh(steleGeo, slateMat);
      steleMesh.position.set(xOff, 0.72, 0);
      steleMesh.userData = sGroup.userData;
      sGroup.add(steleMesh);
    });

    // Central Floating Octahedron (Cryptographic Diamond)
    const diamondGeo = new THREE.OctahedronGeometry(0.28, 0);
    disposables.push(diamondGeo);
    const diamondMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8, // Cyan provenance
      emissive: 0x38bdf8,
      emissiveIntensity: 0.85,
      roughness: 0.18,
      metalness: 0.85,
    });
    disposables.push(diamondMat);
    const coreMesh = new THREE.Mesh(diamondGeo, diamondMat);
    coreMesh.position.y = 1.35;
    coreMesh.userData = sGroup.userData;
    sGroup.add(coreMesh);

    // Outer Reticle Ring
    const reticleGeo = new THREE.TorusGeometry(0.42, 0.018, 16, 32);
    disposables.push(reticleGeo);
    const reticleMesh = new THREE.Mesh(reticleGeo, brassMat);
    reticleMesh.position.y = 1.35;
    reticleMesh.userData = sGroup.userData;
    sGroup.add(reticleMesh);

    // Beacon
    const beaconGeo = new THREE.CylinderGeometry(0.04, 0.18, 4.2, 16, 1, true);
    disposables.push(beaconGeo);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    disposables.push(beaconMat);
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    beaconMesh.position.y = 2.8;
    sGroup.add(beaconMesh);

    // Ground Halo
    const haloGeo = new THREE.RingGeometry(0.28, 0.48, 32);
    disposables.push(haloGeo);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    disposables.push(haloMat);
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.rotation.x = -Math.PI / 2;
    haloMesh.position.y = 0.02;
    sGroup.add(haloMesh);

    aboutSanctumGroup.add(sGroup);
    aboutStageStructures.push({
      group: sGroup,
      stageIndex: 2,
      coreMesh,
      secondaryMesh: reticleMesh,
      beaconMesh,
      haloMesh,
      color: 0x38bdf8,
    });
  }

  // Stage 03: Connect (Synaptic Relational Cluster)
  {
    const idx = 2;
    const pos = aboutStagePositions[idx];
    const sGroup = new THREE.Group();
    sGroup.position.copy(pos);
    sGroup.userData = { isAboutStage: true, stageNumber: 3 };

    // Stepped plinth
    const plinthGeo = new THREE.CylinderGeometry(0.55, 0.65, 0.22, 8);
    disposables.push(plinthGeo);
    const plinthMesh = new THREE.Mesh(plinthGeo, basaltMat);
    plinthMesh.userData = sGroup.userData;
    sGroup.add(plinthMesh);

    // Central Pillar
    const pillarGeo = new THREE.CylinderGeometry(0.18, 0.24, 0.9, 12);
    disposables.push(pillarGeo);
    const pillarMesh = new THREE.Mesh(pillarGeo, slateMat);
    pillarMesh.position.y = 0.55;
    pillarMesh.userData = sGroup.userData;
    sGroup.add(pillarMesh);

    // Multifaceted Icosahedron Core
    const icoGeo = new THREE.IcosahedronGeometry(0.28, 0);
    disposables.push(icoGeo);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0xa78bfa, // Purple relational topology
      emissive: 0xa78bfa,
      emissiveIntensity: 0.85,
      roughness: 0.2,
      metalness: 0.8,
    });
    disposables.push(icoMat);
    const coreMesh = new THREE.Mesh(icoGeo, icoMat);
    coreMesh.position.y = 1.35;
    coreMesh.userData = sGroup.userData;
    sGroup.add(coreMesh);

    // Double Intersecting Gyro Rings
    const gyroGeo = new THREE.TorusGeometry(0.44, 0.016, 16, 32);
    disposables.push(gyroGeo);
    const gyroMesh = new THREE.Mesh(gyroGeo, mintTrimMat);
    gyroMesh.position.y = 1.35;
    gyroMesh.rotation.x = Math.PI / 4;
    gyroMesh.userData = sGroup.userData;
    sGroup.add(gyroMesh);

    // Beacon
    const beaconGeo = new THREE.CylinderGeometry(0.04, 0.18, 4.2, 16, 1, true);
    disposables.push(beaconGeo);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: 0xa78bfa,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    disposables.push(beaconMat);
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    beaconMesh.position.y = 2.8;
    sGroup.add(beaconMesh);

    // Ground Halo
    const haloGeo = new THREE.RingGeometry(0.28, 0.48, 32);
    disposables.push(haloGeo);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xa78bfa,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    disposables.push(haloMat);
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.rotation.x = -Math.PI / 2;
    haloMesh.position.y = 0.02;
    sGroup.add(haloMesh);

    aboutSanctumGroup.add(sGroup);
    aboutStageStructures.push({
      group: sGroup,
      stageIndex: 3,
      coreMesh,
      secondaryMesh: gyroMesh,
      beaconMesh,
      haloMesh,
      color: 0xa78bfa,
    });
  }

  // Stage 04: Deliver (Crystalline Decision Spire)
  {
    const idx = 3;
    const pos = aboutStagePositions[idx];
    const sGroup = new THREE.Group();
    sGroup.position.copy(pos);
    sGroup.userData = { isAboutStage: true, stageNumber: 4 };

    // Stepped plinth
    const plinthGeo = new THREE.CylinderGeometry(0.58, 0.68, 0.22, 12);
    disposables.push(plinthGeo);
    const plinthMesh = new THREE.Mesh(plinthGeo, basaltMat);
    plinthMesh.userData = sGroup.userData;
    sGroup.add(plinthMesh);

    // Flared Obelisk Column
    const colGeo = new THREE.CylinderGeometry(0.16, 0.25, 1.1, 4);
    disposables.push(colGeo);
    const colMesh = new THREE.Mesh(colGeo, slateMat);
    colMesh.position.y = 0.65;
    colMesh.userData = sGroup.userData;
    sGroup.add(colMesh);

    // Faceted Crystal Crown Spire
    const spireGeo = new THREE.ConeGeometry(0.22, 0.48, 4);
    disposables.push(spireGeo);
    const spireMat = new THREE.MeshStandardMaterial({
      color: 0xb7e4d5,
      emissive: 0x2fa885,
      emissiveIntensity: 0.9,
      roughness: 0.15,
      metalness: 0.85,
    });
    disposables.push(spireMat);
    const coreMesh = new THREE.Mesh(spireGeo, spireMat);
    coreMesh.position.y = 1.45;
    coreMesh.userData = sGroup.userData;
    sGroup.add(coreMesh);

    // Vertical Decision Beacon
    const beaconGeo = new THREE.CylinderGeometry(0.05, 0.22, 4.6, 16, 1, true);
    disposables.push(beaconGeo);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: 0x2fa885,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    disposables.push(beaconMat);
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    beaconMesh.position.y = 3.2;
    sGroup.add(beaconMesh);

    // Ground Halo
    const haloGeo = new THREE.RingGeometry(0.28, 0.48, 32);
    disposables.push(haloGeo);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x2fa885,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    disposables.push(haloMat);
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.rotation.x = -Math.PI / 2;
    haloMesh.position.y = 0.02;
    sGroup.add(haloMesh);

    aboutSanctumGroup.add(sGroup);
    aboutStageStructures.push({
      group: sGroup,
      stageIndex: 4,
      coreMesh,
      beaconMesh,
      haloMesh,
      color: 0x2fa885,
    });
  }

  // -------------------------------------------------------------
  // 3 ABOUT CONNECTING CONDUIT SEGMENTS & SIGNAL TRAVEL PULSES
  // -------------------------------------------------------------
  const aboutConduitMeshes: THREE.Mesh[] = [];
  const aboutConduitCurves: THREE.CatmullRomCurve3[] = [];
  const aboutConduitPulseMeshes: THREE.Mesh[] = [];

  for (let i = 0; i < aboutStagePositions.length - 1; i++) {
    const pStart = aboutStagePositions[i].clone();
    const pEnd = aboutStagePositions[i + 1].clone();
    const pMid = pStart.clone().lerp(pEnd, 0.5);
    pMid.y -= 0.12;

    const curve = new THREE.CatmullRomCurve3([pStart, pMid, pEnd]);
    aboutConduitCurves.push(curve);

    const tubeGeo = new THREE.TubeGeometry(curve, 20, 0.028, 8, false);
    disposables.push(tubeGeo);

    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0x073b32,
      emissive: 0x2fa885,
      emissiveIntensity: 0.55,
      roughness: 0.35,
      metalness: 0.7,
      transparent: true,
      opacity: 0.75,
    });
    disposables.push(tubeMat);

    const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    aboutSanctumGroup.add(tubeMesh);
    aboutConduitMeshes.push(tubeMesh);

    // Traveling photon pulse
    const pulseGeo = new THREE.SphereGeometry(0.06, 12, 12);
    disposables.push(pulseGeo);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: 0xe6fff8,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    disposables.push(pulseMat);
    const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
    aboutSanctumGroup.add(pulseMesh);
    aboutConduitPulseMeshes.push(pulseMesh);
  }

  group.add(aboutSanctumGroup);

  // Hover and selection state management
  let hoveredServiceId: string | null = null;
  let selectedServiceId: string | null = null;
  let currentMethodologyStage: number | null = null;
  let currentAboutStage: number | null = null;

  const setPylonHovered = (serviceId: string | null) => {
    hoveredServiceId = serviceId;
  };

  const setPylonSelected = (serviceId: string | null) => {
    selectedServiceId = serviceId;
  };

  const setMethodologyStage = (stage: number | null) => {
    if (stage === null) {
      currentMethodologyStage = null;
    } else {
      currentMethodologyStage = Math.max(1, Math.min(6, stage));
    }
  };

  const setAboutStage = (stage: number | null) => {
    if (stage === null) {
      currentAboutStage = null;
    } else {
      currentAboutStage = Math.max(1, Math.min(4, stage));
    }
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

    // Methodology monuments & conduit animations with selective illumination
    if (isMethodologyDest) {
      const hasStageSelected = currentMethodologyStage !== null;

      // Animate 6 stage structures
      stageStructures.forEach((st) => {
        const isCurrent = currentMethodologyStage === st.stageIndex;

        // Rotate kinetic core
        if (st.coreMesh) {
          st.coreMesh.rotation.y = elapsed * (isCurrent ? 1.2 : 0.4);
          if (st.stageIndex === 3) {
            // Verify tetrahedrons counter-rotate
            st.coreMesh.rotation.x = elapsed * 0.8;
          }
          if (st.secondaryMesh) {
            st.secondaryMesh.rotation.z = elapsed * (isCurrent ? 1.6 : 0.6);
          }

          let targetScale = 1.0;
          let targetEmissive = 0.75; // Ambient radiance in overview

          if (hasStageSelected) {
            if (isCurrent) {
              targetScale = 1.35;
              targetEmissive = 2.6; // High brilliance when selected
            } else {
              targetScale = 0.92;
              targetEmissive = 0.22; // Resting silhouette for unselected
            }
          }

          st.coreMesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 6);
          const mat = st.coreMesh.material as THREE.MeshStandardMaterial;
          mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, targetEmissive, delta * 6);
        }

        // Beacon light column
        if (st.beaconMesh) {
          const bMat = st.beaconMesh.material as THREE.MeshBasicMaterial;
          const targetBeaconOp = isCurrent ? 0.85 : 0.0;
          bMat.opacity = THREE.MathUtils.lerp(bMat.opacity, targetBeaconOp, delta * 8);
          if (isCurrent) {
            st.beaconMesh.rotation.y = elapsed * 0.5;
          }
        }

        // Floor halo
        if (st.haloMesh) {
          const hMat = st.haloMesh.material as THREE.MeshBasicMaterial;
          const targetHaloOp = isCurrent ? 0.9 : hasStageSelected ? 0.06 : 0.16;
          hMat.opacity = THREE.MathUtils.lerp(hMat.opacity, targetHaloOp, delta * 6);
          const targetHaloScale = isCurrent ? 1.45 : hasStageSelected ? 0.85 : 1.0;
          st.haloMesh.scale.lerp(new THREE.Vector3(targetHaloScale, targetHaloScale, targetHaloScale), delta * 6);
          st.haloMesh.rotation.z = elapsed * (isCurrent ? 0.8 : 0.2);
        }
      });

      // Animate 5 connecting conduit segments
      conduitMeshes.forEach((cMesh, idx) => {
        const cMat = cMesh.material as THREE.MeshStandardMaterial;
        // Segment idx connects stage (idx+1) to stage (idx+2)
        // Incoming to currentStage s: idx == s - 2
        // Outgoing from currentStage s: idx == s - 1
        const isIncoming = currentMethodologyStage !== null && idx === currentMethodologyStage - 2;
        const isOutgoing = currentMethodologyStage !== null && idx === currentMethodologyStage - 1;
        const isConnectedToActive = isIncoming || isOutgoing;

        let targetEmissive = 0.55;
        let targetOpacity = 0.75;

        if (hasStageSelected) {
          if (isConnectedToActive) {
            targetEmissive = 1.8;
            targetOpacity = 0.95;
          } else {
            targetEmissive = 0.18;
            targetOpacity = 0.35;
          }
        }

        cMat.emissiveIntensity = THREE.MathUtils.lerp(cMat.emissiveIntensity, targetEmissive, delta * 6);
        cMat.opacity = THREE.MathUtils.lerp(cMat.opacity, targetOpacity, delta * 6);

        // Traveling photon pulse on segment
        const pulseMesh = conduitPulseMeshes[idx];
        if (pulseMesh) {
          pulseMesh.visible = true;
          const speed = isConnectedToActive ? 0.9 : 0.45;
          const pT = ((elapsed * speed) + (idx * 0.2)) % 1.0;
          const curve = conduitCurves[idx];
          if (curve) {
            pulseMesh.position.copy(curve.getPointAt(pT));
          }
        }
      });
    } else {
      conduitPulseMeshes.forEach((p) => {
        p.visible = false;
      });
    }

    // Inquiry Chamber calm animation
    if (inquiryChamberGroup.visible) {
      inquiryCoreMesh.rotation.y = elapsed * 0.25;
      ring1Mesh.rotation.z = elapsed * 0.3;
      ring2Mesh.rotation.x = -elapsed * 0.2;
      const targetEmissive = activeDestination === "CONTACT" ? 1.4 : 0.75;
      inquiryCoreMat.emissiveIntensity = THREE.MathUtils.lerp(
        inquiryCoreMat.emissiveIntensity,
        targetEmissive + Math.sin(elapsed * 1.5) * 0.15,
        delta * 4
      );
      const targetBeaconOp = activeDestination === "CONTACT" ? 0.65 : 0.25;
      inquiryBeaconMat.opacity = THREE.MathUtils.lerp(inquiryBeaconMat.opacity, targetBeaconOp, delta * 4);
    }

    // About Philosophy Sanctum animations with selective illumination
    const isAboutDest = activeDestination === "ABOUT";
    aboutSanctumGroup.visible = isAboutDest;

    if (isAboutDest) {
      const hasAboutSelected = currentAboutStage !== null;

      // Animate 4 stage structures
      aboutStageStructures.forEach((st) => {
        const isCurrent = currentAboutStage === st.stageIndex;

        if (st.coreMesh) {
          st.coreMesh.rotation.y = elapsed * (isCurrent ? 1.2 : 0.4);
          if (st.secondaryMesh) {
            st.secondaryMesh.rotation.z = elapsed * (isCurrent ? 1.6 : 0.6);
          }

          let targetScale = 1.0;
          let targetEmissive = 0.75;

          if (hasAboutSelected) {
            if (isCurrent) {
              targetScale = 1.35;
              targetEmissive = 2.6;
            } else {
              targetScale = 0.92;
              targetEmissive = 0.22;
            }
          }

          st.coreMesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 6);
          const mat = st.coreMesh.material as THREE.MeshStandardMaterial;
          mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, targetEmissive, delta * 6);
        }

        // Beacon
        if (st.beaconMesh) {
          const bMat = st.beaconMesh.material as THREE.MeshBasicMaterial;
          const targetBeaconOp = isCurrent ? 0.85 : 0.0;
          bMat.opacity = THREE.MathUtils.lerp(bMat.opacity, targetBeaconOp, delta * 8);
          if (isCurrent) {
            st.beaconMesh.rotation.y = elapsed * 0.5;
          }
        }

        // Floor halo
        if (st.haloMesh) {
          const hMat = st.haloMesh.material as THREE.MeshBasicMaterial;
          const targetHaloOp = isCurrent ? 0.9 : hasAboutSelected ? 0.05 : 0.18;
          hMat.opacity = THREE.MathUtils.lerp(hMat.opacity, targetHaloOp, delta * 6);
          const targetHaloScale = isCurrent ? 1.4 : 1.0;
          st.haloMesh.scale.lerp(new THREE.Vector3(targetHaloScale, targetHaloScale, targetHaloScale), delta * 6);
        }
      });

      // Animate 3 connecting conduits
      aboutConduitMeshes.forEach((cMesh, idx) => {
        const cMat = cMesh.material as THREE.MeshStandardMaterial;
        const segmentStageA = idx + 1;
        const segmentStageB = idx + 2;

        const isConnectedToActive =
          currentAboutStage !== null &&
          (currentAboutStage === segmentStageA || currentAboutStage === segmentStageB);

        let targetEmissive = 0.55;
        let targetOpacity = 0.75;

        if (hasAboutSelected) {
          if (isConnectedToActive) {
            targetEmissive = 1.8;
            targetOpacity = 0.95;
          } else {
            targetEmissive = 0.18;
            targetOpacity = 0.35;
          }
        }

        cMat.emissiveIntensity = THREE.MathUtils.lerp(cMat.emissiveIntensity, targetEmissive, delta * 6);
        cMat.opacity = THREE.MathUtils.lerp(cMat.opacity, targetOpacity, delta * 6);

        // Traveling photon pulse
        const pulseMesh = aboutConduitPulseMeshes[idx];
        if (pulseMesh) {
          pulseMesh.visible = true;
          const speed = isConnectedToActive ? 0.9 : 0.45;
          const pT = ((elapsed * speed) + (idx * 0.25)) % 1.0;
          const curve = aboutConduitCurves[idx];
          if (curve) {
            pulseMesh.position.copy(curve.getPointAt(pT));
          }
        }
      });
    } else {
      aboutConduitPulseMeshes.forEach((p) => {
        p.visible = false;
      });
    }

    // Pylon animations with selective illumination
    pylonMeshes.forEach((pGroup, sId) => {
      const isHovered = sId === hoveredServiceId;
      const isSelected = sId === selectedServiceId;
      const hasAnySelected = Boolean(selectedServiceId);

      const core = pGroup.children[2] as THREE.Mesh | undefined;
      const ring = pGroup.children[3] as THREE.Mesh | undefined;
      const beacon = pGroup.children[4] as THREE.Mesh | undefined;
      const halo = pGroup.children[5] as THREE.Mesh | undefined;

      if (core) {
        core.rotation.y = elapsed * (isSelected ? 0.8 : 0.4);

        let targetScale = 1.0;
        let baseEmissive = 0.65;

        if (hasAnySelected) {
          if (isSelected) {
            targetScale = 1.45;
            baseEmissive = 2.6; // High-brilliance focal illumination
          } else {
            targetScale = 0.88;
            baseEmissive = 0.12; // Subtly dimmed unselected resting state
          }
        } else if (isHovered) {
          targetScale = 1.25;
          baseEmissive = 1.4;
        }

        core.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 6);
        const coreMat = core.material as THREE.MeshStandardMaterial;
        coreMat.emissiveIntensity = THREE.MathUtils.lerp(coreMat.emissiveIntensity, baseEmissive, delta * 6);
      }

      if (ring) {
        ring.rotation.z = elapsed * (isSelected ? 2.2 : 0.8);
      }

      if (beacon) {
        const beaconMat = beacon.material as THREE.MeshBasicMaterial;
        const targetBeaconOpacity = isSelected ? 0.85 : isHovered ? 0.25 : 0.0;
        beaconMat.opacity = THREE.MathUtils.lerp(beaconMat.opacity, targetBeaconOpacity, delta * 8);
        if (isSelected) {
          beacon.rotation.y = elapsed * 0.6;
        }
      }

      if (halo) {
        const haloMat = halo.material as THREE.MeshBasicMaterial;
        const targetHaloOpacity = isSelected ? 0.9 : isHovered ? 0.45 : (hasAnySelected ? 0.04 : 0.15);
        haloMat.opacity = THREE.MathUtils.lerp(haloMat.opacity, targetHaloOpacity, delta * 6);
        const targetHaloScale = isSelected ? 1.5 : (hasAnySelected ? 0.85 : 1.0);
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
    setAboutStage,
    dispose,
  };
}
