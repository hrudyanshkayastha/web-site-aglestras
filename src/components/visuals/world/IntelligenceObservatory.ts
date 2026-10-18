import * as THREE from "three";

export interface ObservatoryElements {
  group: THREE.Group;
  update: (delta: number, elapsed: number) => void;
  dispose: () => void;
}

export function createIntelligenceObservatory(): ObservatoryElements {
  const group = new THREE.Group();
  group.name = "IntelligenceObservatory";

  const disposables: (THREE.BufferGeometry | THREE.Material)[] = [];

  // PBR Materials
  // 1. Honed Dark Basalt Stone Material
  const basaltMaterial = new THREE.MeshStandardMaterial({
    color: 0x031714,
    roughness: 0.82,
    metalness: 0.12,
  });
  disposables.push(basaltMaterial);

  // 2. Stepped Plinth Edge Material (slightly lighter slate highlight)
  const slateMaterial = new THREE.MeshStandardMaterial({
    color: 0x062822,
    roughness: 0.65,
    metalness: 0.2,
  });
  disposables.push(slateMaterial);

  // 3. Inlaid Warm Astrolabe Brass / Bronze Material
  const brassMaterial = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    roughness: 0.28,
    metalness: 0.88,
    emissive: 0x6e5218,
    emissiveIntensity: 0.2,
  });
  disposables.push(brassMaterial);

  // 4. Muted Mint Inlay Accents
  const mintInlayMaterial = new THREE.MeshStandardMaterial({
    color: 0xb7e4d5,
    roughness: 0.35,
    metalness: 0.75,
    emissive: 0x2fa885,
    emissiveIntensity: 0.25,
  });
  disposables.push(mintInlayMaterial);

  // -------------------------------------------------------------
  // A. TIERED MONUMENTAL STONE PLINTHS (FOUNDATION)
  // -------------------------------------------------------------
  const plinthGroup = new THREE.Group();
  const tiers = [
    { radiusTop: 7.2, radiusBottom: 7.6, height: 0.3, y: -2.8 },
    { radiusTop: 5.6, radiusBottom: 6.0, height: 0.25, y: -2.55 },
    { radiusTop: 4.0, radiusBottom: 4.4, height: 0.2, y: -2.35 },
  ];

  tiers.forEach((tier, index) => {
    const geo = new THREE.CylinderGeometry(
      tier.radiusTop,
      tier.radiusBottom,
      tier.height,
      64
    );
    disposables.push(geo);

    const mesh = new THREE.Mesh(geo, index === 1 ? slateMaterial : basaltMaterial);
    mesh.position.y = tier.y;
    mesh.receiveShadow = true;
    plinthGroup.add(mesh);

    // Add brass trim ring at the lip of each tier
    const ringGeo = new THREE.TorusGeometry(tier.radiusTop, 0.022, 16, 64);
    disposables.push(ringGeo);
    const ringMesh = new THREE.Mesh(ringGeo, index % 2 === 0 ? brassMaterial : mintInlayMaterial);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = tier.y + tier.height / 2 + 0.005;
    plinthGroup.add(ringMesh);
  });

  // Concentric Astrolabe Floor Inlays on Upper Plinth
  const astrolabeRadii = [1.8, 2.6, 3.4, 3.85];
  const astrolabeRings: THREE.Mesh[] = [];

  astrolabeRadii.forEach((radius, i) => {
    const ringGeo = new THREE.RingGeometry(radius - 0.02, radius + 0.02, 64);
    disposables.push(ringGeo);
    const ringMesh = new THREE.Mesh(ringGeo, i % 2 === 0 ? brassMaterial : mintInlayMaterial);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = -2.245;
    plinthGroup.add(ringMesh);
    astrolabeRings.push(ringMesh);
  });

  // Radial Meridian Compass Lines on the Plinth
  const meridianGeo = new THREE.BufferGeometry();
  const meridianPositions: number[] = [];
  const numMeridians = 12;
  for (let i = 0; i < numMeridians; i++) {
    const angle = (i / numMeridians) * Math.PI * 2;
    const r1 = 1.8;
    const r2 = 3.85;
    meridianPositions.push(
      Math.cos(angle) * r1, -2.24, Math.sin(angle) * r1,
      Math.cos(angle) * r2, -2.24, Math.sin(angle) * r2
    );
  }
  meridianGeo.setAttribute("position", new THREE.Float32BufferAttribute(meridianPositions, 3));
  disposables.push(meridianGeo);

  const meridianMat = new THREE.LineBasicMaterial({
    color: 0xb7e4d5,
    transparent: true,
    opacity: 0.35,
  });
  disposables.push(meridianMat);

  const meridians = new THREE.LineSegments(meridianGeo, meridianMat);
  plinthGroup.add(meridians);

  group.add(plinthGroup);

  // -------------------------------------------------------------
  // B. MONUMENTAL ARCHITECTURAL FRAMING RIBS / MONOLITHS
  // Sweeping basalt monolith ribs that curve around perimeter,
  // framing the scene with impressive depth and parallax
  // -------------------------------------------------------------
  const ribsGroup = new THREE.Group();
  const numRibs = 4;
  const ribHeight = 7.5;
  const ribRadius = 5.8;

  for (let i = 0; i < numRibs; i++) {
    const angle = (i / numRibs) * Math.PI * 2 + Math.PI / 4;
    const curvePoints: THREE.Vector3[] = [];
    const segments = 24;

    for (let s = 0; s <= segments; s++) {
      const t = s / segments;
      // Arch curve: starts at base radius, bows inward/outward gracefully, arches overhead
      const currentY = -2.4 + t * ribHeight;
      const r = ribRadius - Math.sin(t * Math.PI * 0.9) * 0.75;
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      curvePoints.push(new THREE.Vector3(x, currentY, z));
    }

    const ribCurve = new THREE.CatmullRomCurve3(curvePoints);
    const ribGeo = new THREE.TubeGeometry(ribCurve, 32, 0.08, 12, false);
    disposables.push(ribGeo);

    const ribMesh = new THREE.Mesh(ribGeo, slateMaterial);
    ribsGroup.add(ribMesh);

    // Outer brass highlight strip running parallel along each rib
    const ribTrimGeo = new THREE.TubeGeometry(ribCurve, 32, 0.02, 8, false);
    disposables.push(ribTrimGeo);
    const ribTrimMesh = new THREE.Mesh(ribTrimGeo, brassMaterial);
    ribTrimMesh.scale.set(1.02, 1.0, 1.02);
    ribsGroup.add(ribTrimMesh);
  }

  group.add(ribsGroup);

  // -------------------------------------------------------------
  // C. ATMOSPHERIC SUSPENDED SPORES / DUST MOTES
  // Particles drifting gently in the volumetric observatory air
  // -------------------------------------------------------------
  const motesCount = 180;
  const motesGeo = new THREE.BufferGeometry();
  const motePositions = new Float32Array(motesCount * 3);
  const moteVelocities: { x: number; y: number; z: number; phase: number }[] = [];

  for (let i = 0; i < motesCount; i++) {
    // Distribute within cylindrical volume around scene
    const r = 1.0 + Math.random() * 5.2;
    const theta = Math.random() * Math.PI * 2;
    const y = -2.2 + Math.random() * 6.5;

    motePositions[i * 3] = Math.cos(theta) * r;
    motePositions[i * 3 + 1] = y;
    motePositions[i * 3 + 2] = Math.sin(theta) * r;

    moteVelocities.push({
      x: (Math.random() - 0.5) * 0.003,
      y: 0.002 + Math.random() * 0.004,
      z: (Math.random() - 0.5) * 0.003,
      phase: Math.random() * Math.PI * 2,
    });
  }

  motesGeo.setAttribute("position", new THREE.BufferAttribute(motePositions, 3));
  disposables.push(motesGeo);

  const motesMat = new THREE.PointsMaterial({
    color: 0xb7e4d5,
    size: 0.05,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending,
  });
  disposables.push(motesMat);

  const motesPoints = new THREE.Points(motesGeo, motesMat);
  group.add(motesPoints);

  // Update animation loop
  const update = (delta: number, elapsed: number) => {
    // Gentle rotation of the astrolabe rings in opposing directions
    astrolabeRings.forEach((ring, idx) => {
      ring.rotation.z = (idx % 2 === 0 ? 1 : -1) * elapsed * 0.035 * (idx + 1) * 0.4;
    });

    // Motes gentle vertical and Brownian drift
    const posAttr = motesGeo.attributes.position as THREE.BufferAttribute;
    const posArr = posAttr.array as Float32Array;

    for (let i = 0; i < motesCount; i++) {
      const idx = i * 3;
      const vel = moteVelocities[i];

      posArr[idx] += vel.x + Math.sin(elapsed * 0.6 + vel.phase) * 0.001;
      posArr[idx + 1] += vel.y;
      posArr[idx + 2] += vel.z + Math.cos(elapsed * 0.6 + vel.phase) * 0.001;

      // Wrap around vertically if motes ascend past upper boundary
      if (posArr[idx + 1] > 4.6) {
        posArr[idx + 1] = -2.2;
      }
    }
    posAttr.needsUpdate = true;
  };

  const dispose = () => {
    disposables.forEach((item) => item.dispose());
  };

  return {
    group,
    update,
    dispose,
  };
}
