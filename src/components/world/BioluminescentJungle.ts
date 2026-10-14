import * as THREE from "three";

export interface JungleElements {
  group: THREE.Group;
  update: (delta: number, elapsed: number) => void;
  dispose: () => void;
}

export function createBioluminescentJungle(): JungleElements {
  const group = new THREE.Group();
  group.name = "BioluminescentJungle";

  const disposables: (THREE.BufferGeometry | THREE.Material)[] = [];

  // -------------------------------------------------------------
  // 1. PBR MATERIALS (Matched to Cinematic Emerald Art Reference)
  // -------------------------------------------------------------
  // Dark Reflective Water / Slate Terrain
  const waterTerrainMaterial = new THREE.MeshStandardMaterial({
    color: 0x02110d,
    roughness: 0.22,
    metalness: 0.58,
  });
  disposables.push(waterTerrainMaterial);

  // Concentric Burnished Gold Dais Rings
  const goldenDaisMaterial = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    emissive: 0x8a6d25,
    emissiveIntensity: 0.45,
    roughness: 0.25,
    metalness: 0.88,
  });
  disposables.push(goldenDaisMaterial);

  // Central Core Nucleus (Glowing Cyan-White)
  const nucleusMaterial = new THREE.MeshStandardMaterial({
    color: 0xe6fff8,
    emissive: 0x00ffb2,
    emissiveIntensity: 2.8,
    roughness: 0.12,
    metalness: 0.1,
  });
  disposables.push(nucleusMaterial);

  // Neural Vascular Branch Fiber
  const neuralBranchMaterial = new THREE.MeshStandardMaterial({
    color: 0x0a3d31,
    emissive: 0x2fa885,
    emissiveIntensity: 0.85,
    roughness: 0.35,
    metalness: 0.25,
  });
  disposables.push(neuralBranchMaterial);

  // Synaptic Terminal Nodes (High Emissive Emerald)
  const synapticNodeMaterial = new THREE.MeshStandardMaterial({
    color: 0x88f9d4,
    emissive: 0x00ffb2,
    emissiveIntensity: 2.2,
    roughness: 0.15,
    metalness: 0.1,
  });
  disposables.push(synapticNodeMaterial);

  // -------------------------------------------------------------
  // 2. REFLECTIVE WATER BASIN & STEPPED CIRCULAR DAIS
  // -------------------------------------------------------------
  const treeCenter = new THREE.Vector3(0, 1.05, -2.6);

  // Ground plane representing reflective wet basin
  const terrainGeo = new THREE.PlaneGeometry(42, 42, 32, 32);
  disposables.push(terrainGeo);
  const terrainMesh = new THREE.Mesh(terrainGeo, waterTerrainMaterial);
  terrainMesh.rotation.x = -Math.PI / 2;
  terrainMesh.position.y = -1.2;
  terrainMesh.receiveShadow = true;
  group.add(terrainMesh);

  // Stepped Circular Dais (Basalt base + concentric glowing golden rings)
  const daisBaseGeo = new THREE.CylinderGeometry(5.4, 5.6, 0.18, 48);
  disposables.push(daisBaseGeo);
  const daisBaseMesh = new THREE.Mesh(
    daisBaseGeo,
    new THREE.MeshStandardMaterial({
      color: 0x031814,
      roughness: 0.75,
      metalness: 0.2,
    })
  );
  daisBaseMesh.position.set(treeCenter.x, -1.2 + 0.09, treeCenter.z);
  daisBaseMesh.receiveShadow = true;
  group.add(daisBaseMesh);

  // Concentric Golden Rings radiating along the dais
  const ringRadii = [1.8, 2.8, 3.9, 5.1];
  ringRadii.forEach((radius) => {
    const ringGeo = new THREE.TorusGeometry(radius, 0.024, 8, 64);
    disposables.push(ringGeo);
    const ringMesh = new THREE.Mesh(ringGeo, goldenDaisMaterial);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.set(treeCenter.x, -1.2 + 0.19, treeCenter.z);
    group.add(ringMesh);
  });

  // -------------------------------------------------------------
  // 3. LUMINOUS NEURAL TREE: NUCLEUS & RADIATING HALO
  // -------------------------------------------------------------
  const nucleusGroup = new THREE.Group();
  nucleusGroup.position.copy(treeCenter);

  // Central Heart Sphere
  const nucleusGeo = new THREE.SphereGeometry(0.32, 32, 32);
  disposables.push(nucleusGeo);
  const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMaterial);
  nucleusGroup.add(nucleusMesh);

  // Dynamic Point Light Radiating Emerald Glow
  const nucleusLight = new THREE.PointLight(0x00ffb2, 3.4, 16);
  nucleusGroup.add(nucleusLight);

  // Multi-layered Concentric Corona Rings (Billboards)
  const coronaRings: THREE.Mesh[] = [];
  [0.55, 0.95].forEach((radius, idx) => {
    const coronaGeo = new THREE.RingGeometry(radius * 0.92, radius, 32);
    disposables.push(coronaGeo);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: idx === 0 ? 0x88f9d4 : 0x00ffb2,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6 - idx * 0.25,
      blending: THREE.AdditiveBlending,
    });
    disposables.push(coronaMat);
    const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    coronaMesh.rotation.y = idx * Math.PI * 0.25;
    nucleusGroup.add(coronaMesh);
    coronaRings.push(coronaMesh);
  });
  group.add(nucleusGroup);

  // -------------------------------------------------------------
  // 4. ORGANIC NEURAL TRUNK & VAULTED CANOPY ARCHES
  // (Frames the central viewing aperture cleanly without lines crossing the hero text)
  // -------------------------------------------------------------
  const branchCurves: THREE.CatmullRomCurve3[] = [];
  const branchGroup = new THREE.Group();
  group.add(branchGroup);

  const nodeGroup = new THREE.Group();
  group.add(nodeGroup);

  // A. Organic Central Trunk Cables (Rising from Dais at Y = -1.18 to Nucleus at Y = 1.05)
  const numTrunkCables = 6;
  for (let i = 0; i < numTrunkCables; i++) {
    const angle = (i / numTrunkCables) * Math.PI * 2;
    const baseRadius = 0.55;
    const waistRadius = 0.22;
    const topRadius = 0.32;

    const startX = treeCenter.x + Math.cos(angle) * baseRadius;
    const startY = -1.18;
    const startZ = treeCenter.z + Math.sin(angle) * baseRadius;

    const midAngle = angle + 0.45; // Gentle organic twist
    const midX = treeCenter.x + Math.cos(midAngle) * waistRadius;
    const midY = (treeCenter.y - 1.18) * 0.45;
    const midZ = treeCenter.z + Math.sin(midAngle) * waistRadius;

    const topAngle = angle + 0.8;
    const endX = treeCenter.x + Math.cos(topAngle) * topRadius;
    const endY = treeCenter.y - 0.15;
    const endZ = treeCenter.z + Math.sin(topAngle) * topRadius;

    const trunkCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(startX, startY, startZ),
      new THREE.Vector3(midX, midY, midZ),
      new THREE.Vector3(endX, endY, endZ),
      treeCenter.clone(),
    ]);
    branchCurves.push(trunkCurve);

    const trunkGeo = new THREE.TubeGeometry(trunkCurve, 24, 0.045, 6, false);
    disposables.push(trunkGeo);
    const trunkMesh = new THREE.Mesh(trunkGeo, neuralBranchMaterial);
    branchGroup.add(trunkMesh);
  }

  // B. Upper Canopy Arches (Gracefully sweep to Left Flank, Right Flank, and Rear Vault)
  // Strict aperture rule: For Z > treeCenter.z + 0.2, |X| must be >= 2.4.
  // Left Flank Arches (8 branches)
  const leftConfigs = [
    { targetX: -2.8, targetY: 2.4, targetZ: -1.2, midSpread: 1.6 },
    { targetX: -3.6, targetY: 2.9, targetZ: -1.8, midSpread: 2.1 },
    { targetX: -4.4, targetY: 3.3, targetZ: -2.4, midSpread: 2.6 },
    { targetX: -3.8, targetY: 3.8, targetZ: -3.2, midSpread: 2.3 },
    { targetX: -2.9, targetY: 4.1, targetZ: -3.8, midSpread: 1.8 },
    { targetX: -4.6, targetY: 2.6, targetZ: -0.8, midSpread: 2.7 },
    { targetX: -3.2, targetY: 3.4, targetZ: -2.0, midSpread: 2.0 },
    { targetX: -5.0, targetY: 3.7, targetZ: -2.8, midSpread: 3.0 },
  ];

  // Right Flank Arches (8 branches)
  const rightConfigs = [
    { targetX: 2.8, targetY: 2.4, targetZ: -1.2, midSpread: 1.6 },
    { targetX: 3.6, targetY: 2.9, targetZ: -1.8, midSpread: 2.1 },
    { targetX: 4.4, targetY: 3.3, targetZ: -2.4, midSpread: 2.6 },
    { targetX: 3.8, targetY: 3.8, targetZ: -3.2, midSpread: 2.3 },
    { targetX: 2.9, targetY: 4.1, targetZ: -3.8, midSpread: 1.8 },
    { targetX: 4.6, targetY: 2.6, targetZ: -0.8, midSpread: 2.7 },
    { targetX: 3.2, targetY: 3.4, targetZ: -2.0, midSpread: 2.0 },
    { targetX: 5.0, targetY: 3.7, targetZ: -2.8, midSpread: 3.0 },
  ];

  // High Rear Cathedral Vault Arches (6 branches rising behind and above)
  const rearConfigs = [
    { targetX: -1.4, targetY: 4.4, targetZ: -4.4, midSpread: 1.0 },
    { targetX: 0.0, targetY: 4.7, targetZ: -4.8, midSpread: 0.2 },
    { targetX: 1.4, targetY: 4.4, targetZ: -4.4, midSpread: 1.0 },
    { targetX: -2.0, targetY: 4.0, targetZ: -4.2, midSpread: 1.4 },
    { targetX: 2.0, targetY: 4.0, targetZ: -4.2, midSpread: 1.4 },
    { targetX: 0.0, targetY: 4.2, targetZ: -5.2, midSpread: 0.3 },
  ];

  const allCanopyConfigs = [...leftConfigs, ...rightConfigs, ...rearConfigs];

  allCanopyConfigs.forEach((cfg) => {
    const midX = treeCenter.x + (cfg.targetX - treeCenter.x) * 0.45;
    const midY = treeCenter.y + (cfg.targetY - treeCenter.y) * 0.55 + 0.35;
    const midZ = treeCenter.z + (cfg.targetZ - treeCenter.z) * 0.4;

    const curve = new THREE.CatmullRomCurve3([
      treeCenter.clone(),
      new THREE.Vector3(midX, midY, midZ),
      new THREE.Vector3(cfg.targetX, cfg.targetY, cfg.targetZ),
    ]);
    branchCurves.push(curve);

    const tubeGeo = new THREE.TubeGeometry(curve, 22, 0.024, 6, false);
    disposables.push(tubeGeo);
    const branchMesh = new THREE.Mesh(tubeGeo, neuralBranchMaterial);
    branchGroup.add(branchMesh);

    // Terminal Synaptic Node
    const nodeGeo = new THREE.SphereGeometry(0.062, 12, 12);
    disposables.push(nodeGeo);
    const nodeMesh = new THREE.Mesh(nodeGeo, synapticNodeMaterial);
    nodeMesh.position.set(cfg.targetX, cfg.targetY, cfg.targetZ);
    nodeGroup.add(nodeMesh);

    // Secondary Delicate Twig
    const twigSign = cfg.targetX >= 0 ? 1 : -1;
    const twigX = cfg.targetX + twigSign * 0.7;
    const twigY = cfg.targetY + 0.4;
    const twigZ = cfg.targetZ - 0.3;

    const twigCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(midX, midY, midZ),
      new THREE.Vector3(twigX, twigY, twigZ),
    ]);
    branchCurves.push(twigCurve);

    const twigGeo = new THREE.TubeGeometry(twigCurve, 14, 0.014, 5, false);
    disposables.push(twigGeo);
    const twigMesh = new THREE.Mesh(twigGeo, neuralBranchMaterial);
    branchGroup.add(twigMesh);

    const twigNodeGeo = new THREE.SphereGeometry(0.042, 10, 10);
    disposables.push(twigNodeGeo);
    const twigNodeMesh = new THREE.Mesh(twigNodeGeo, synapticNodeMaterial);
    twigNodeMesh.position.set(twigX, twigY, twigZ);
    nodeGroup.add(twigNodeMesh);
  });

  // C. Lower Neural Roots (Radiates downward across the dais floor, hugging Y = -1.18)
  const numLowerRoots = 14;
  for (let i = 0; i < numLowerRoots; i++) {
    const angle = (i / numLowerRoots) * Math.PI * 2;
    const spread = 2.4 + ((i % 4) * 0.7);
    const endX = treeCenter.x + Math.cos(angle) * spread;
    const endY = -1.18;
    const endZ = treeCenter.z + Math.sin(angle) * (spread * 0.9);

    const midX = treeCenter.x + Math.cos(angle) * (spread * 0.45);
    const midY = -0.95;
    const midZ = treeCenter.z + Math.sin(angle) * (spread * 0.4);

    const curve = new THREE.CatmullRomCurve3([
      treeCenter.clone(),
      new THREE.Vector3(midX, midY, midZ),
      new THREE.Vector3(endX, endY, endZ),
    ]);
    branchCurves.push(curve);

    const tubeGeo = new THREE.TubeGeometry(curve, 20, 0.03, 6, false);
    disposables.push(tubeGeo);
    const rootMesh = new THREE.Mesh(tubeGeo, neuralBranchMaterial);
    branchGroup.add(rootMesh);

    // Root Terminal Contact Node
    const nodeGeo = new THREE.SphereGeometry(0.05, 10, 10);
    disposables.push(nodeGeo);
    const nodeMesh = new THREE.Mesh(nodeGeo, synapticNodeMaterial);
    nodeMesh.position.set(endX, endY, endZ);
    nodeGroup.add(nodeMesh);
  }

  // -------------------------------------------------------------
  // 5. ANIMATED NEURAL SIGNAL PULSES (TRAVELLING PACKETS)
  // -------------------------------------------------------------
  const signalCount = 54;
  const signalGeo = new THREE.BufferGeometry();
  const signalPositions = new Float32Array(signalCount * 3);
  const signalData: { curveIndex: number; progress: number; speed: number }[] = [];

  for (let i = 0; i < signalCount; i++) {
    const curveIndex = i % branchCurves.length;
    const progress = Math.random();
    const speed = 0.25 + Math.random() * 0.35;

    const pt = branchCurves[curveIndex].getPointAt(progress);
    signalPositions[i * 3] = pt.x;
    signalPositions[i * 3 + 1] = pt.y;
    signalPositions[i * 3 + 2] = pt.z;

    signalData.push({ curveIndex, progress, speed });
  }

  signalGeo.setAttribute("position", new THREE.BufferAttribute(signalPositions, 3));
  disposables.push(signalGeo);

  const signalMat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.085,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
  });
  disposables.push(signalMat);

  const signalPoints = new THREE.Points(signalGeo, signalMat);
  group.add(signalPoints);

  // -------------------------------------------------------------
  // 6. VOLUMETRIC DRIFTING FIREFLY SPORES
  // -------------------------------------------------------------
  const sporeCount = 200;
  const sporeGeo = new THREE.BufferGeometry();
  const sporePositions = new Float32Array(sporeCount * 3);
  const sporeDrifts: { x: number; y: number; z: number; phase: number }[] = [];

  for (let i = 0; i < sporeCount; i++) {
    const r = 1.4 + Math.random() * 9.5;
    const theta = Math.random() * Math.PI * 2;
    const y = -1.2 + Math.random() * 7.5;

    sporePositions[i * 3] = Math.cos(theta) * r;
    sporePositions[i * 3 + 1] = y;
    sporePositions[i * 3 + 2] = Math.sin(theta) * r - 2.0;

    sporeDrifts.push({
      x: (Math.random() - 0.5) * 0.003,
      y: 0.002 + Math.random() * 0.004,
      z: (Math.random() - 0.5) * 0.003,
      phase: Math.random() * Math.PI * 2,
    });
  }

  sporeGeo.setAttribute("position", new THREE.BufferAttribute(sporePositions, 3));
  disposables.push(sporeGeo);

  const sporeMat = new THREE.PointsMaterial({
    color: 0x88f9d4,
    size: 0.065,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending,
  });
  disposables.push(sporeMat);

  const sporePoints = new THREE.Points(sporeGeo, sporeMat);
  group.add(sporePoints);

  // -------------------------------------------------------------
  // 7. ANIMATION LOOP & LIFECYCLE
  // -------------------------------------------------------------
  const update = (delta: number, elapsed: number) => {
    // 1. Nucleus breathing pulse
    const breath = Math.sin(elapsed * 2.2);
    nucleusMaterial.emissiveIntensity = 2.4 + breath * 0.8;
    nucleusLight.intensity = 3.2 + breath * 1.2;

    // Corona rings gentle rotation & pulsation
    coronaRings.forEach((ring, idx) => {
      ring.rotation.z = elapsed * (0.2 + idx * 0.15);
      const s = 1.0 + Math.sin(elapsed * 2.5 + idx * 1.2) * 0.12;
      ring.scale.set(s, s, s);
    });

    // 2. Neural branch & node pulsation
    neuralBranchMaterial.emissiveIntensity = 0.75 + Math.sin(elapsed * 1.8) * 0.25;
    synapticNodeMaterial.emissiveIntensity = 1.8 + Math.sin(elapsed * 2.4 + 0.5) * 0.6;
    goldenDaisMaterial.emissiveIntensity = 0.4 + Math.sin(elapsed * 1.5) * 0.15;

    // 3. Travel Signal Packets along branch curves
    const sigPosAttr = signalGeo.attributes.position as THREE.BufferAttribute;
    const sigArr = sigPosAttr.array as Float32Array;

    for (let i = 0; i < signalCount; i++) {
      const s = signalData[i];
      s.progress += delta * s.speed;
      if (s.progress > 1.0) s.progress = 0.0;

      const curve = branchCurves[s.curveIndex];
      const pt = curve.getPointAt(s.progress);
      sigArr[i * 3] = pt.x;
      sigArr[i * 3 + 1] = pt.y;
      sigArr[i * 3 + 2] = pt.z;
    }
    sigPosAttr.needsUpdate = true;

    // 4. Firefly spores drift
    const sporePosAttr = sporeGeo.attributes.position as THREE.BufferAttribute;
    const sporeArr = sporePosAttr.array as Float32Array;

    for (let i = 0; i < sporeCount; i++) {
      const idx = i * 3;
      const d = sporeDrifts[i];

      sporeArr[idx] += d.x + Math.sin(elapsed * 0.5 + d.phase) * 0.001;
      sporeArr[idx + 1] += d.y;
      sporeArr[idx + 2] += d.z + Math.cos(elapsed * 0.5 + d.phase) * 0.001;

      // Wrap around vertically
      if (sporeArr[idx + 1] > 6.2) {
        sporeArr[idx + 1] = -1.2;
      }
    }
    sporePosAttr.needsUpdate = true;
  };

  const dispose = () => {
    disposables.forEach((d) => d.dispose());
  };

  return {
    group,
    update,
    dispose,
  };
}
