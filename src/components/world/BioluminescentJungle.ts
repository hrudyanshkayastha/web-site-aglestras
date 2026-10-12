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

  // PBR Materials
  // 1. Terrain Dark Moss Basalt Material
  const terrainMaterial = new THREE.MeshStandardMaterial({
    color: 0x031814,
    roughness: 0.88,
    metalness: 0.1,
  });
  disposables.push(terrainMaterial);

  // 2. Ancient Living Bark (Bio-conduit trunk)
  const barkMaterial = new THREE.MeshStandardMaterial({
    color: 0x052a22,
    roughness: 0.75,
    metalness: 0.15,
  });
  disposables.push(barkMaterial);

  // 3. Bioluminescent Vascular Filament (Mint/Emerald)
  const vascularMaterial = new THREE.MeshStandardMaterial({
    color: 0x2fa885,
    emissive: 0x1d6d56,
    emissiveIntensity: 0.7,
    roughness: 0.3,
    metalness: 0.2,
  });
  disposables.push(vascularMaterial);

  // 4. Ethereal Canopy Flora / Crystalline Leaves
  const floraMaterial = new THREE.MeshStandardMaterial({
    color: 0xb7e4d5,
    emissive: 0x155a47,
    emissiveIntensity: 0.5,
    roughness: 0.35,
    metalness: 0.15,
    transparent: true,
    opacity: 0.9,
  });
  disposables.push(floraMaterial);

  // -------------------------------------------------------------
  // A. LAYERED TERRAIN WITH GENTLE ORGANIC RIDGES
  // -------------------------------------------------------------
  const terrainGeo = new THREE.PlaneGeometry(36, 36, 48, 48);
  const posAttr = terrainGeo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i);
    const y = posAttr.getY(i);
    // Undulating terrain elevation with central clearing
    const dist = Math.sqrt(x * x + y * y);
    const elevation =
      Math.sin(x * 0.25) * Math.cos(y * 0.25) * 0.45 +
      Math.sin(dist * 0.4) * 0.25 -
      (dist < 4.0 ? 0.3 : 0);
    posAttr.setZ(i, elevation);
  }
  terrainGeo.computeVertexNormals();
  disposables.push(terrainGeo);

  const terrainMesh = new THREE.Mesh(terrainGeo, terrainMaterial);
  terrainMesh.rotation.x = -Math.PI / 2;
  terrainMesh.position.y = -1.2;
  terrainMesh.receiveShadow = true;
  group.add(terrainMesh);

  // -------------------------------------------------------------
  // B. MONUMENTAL BRAIDED LIVING TRUNK
  // Rises from subterranean root depths (-4.5) to canopy (+5.0)
  // -------------------------------------------------------------
  const trunkGroup = new THREE.Group();
  const numStrands = 6;
  const trunkHeight = 9.5;
  const trunkBaseY = -4.5;

  for (let i = 0; i < numStrands; i++) {
    const strandAngle = (i / numStrands) * Math.PI * 2;
    const strandPoints: THREE.Vector3[] = [];
    const segments = 40;

    for (let s = 0; s <= segments; s++) {
      const t = s / segments;
      const y = trunkBaseY + t * trunkHeight;

      // Spiral twist and organic waist
      const twist = t * Math.PI * 1.2 + strandAngle;
      // Radius: flaring at base (1.2), tapering at waist (0.45), fanning at canopy (1.4)
      const radius = 0.45 + Math.pow(t - 0.45, 2) * 2.8;

      const x = Math.cos(twist) * radius;
      const z = Math.sin(twist) * radius;
      strandPoints.push(new THREE.Vector3(x, y, z));
    }

    const strandCurve = new THREE.CatmullRomCurve3(strandPoints);
    const strandGeo = new THREE.TubeGeometry(strandCurve, 48, 0.09, 10, false);
    disposables.push(strandGeo);

    const strandMesh = new THREE.Mesh(strandGeo, barkMaterial);
    trunkGroup.add(strandMesh);

    // Add glowing vascular inner vein to every second strand
    if (i % 2 === 0) {
      const veinGeo = new THREE.TubeGeometry(strandCurve, 48, 0.024, 6, false);
      disposables.push(veinGeo);
      const veinMesh = new THREE.Mesh(veinGeo, vascularMaterial);
      veinMesh.scale.set(1.03, 1.0, 1.03);
      trunkGroup.add(veinMesh);
    }
  }
  group.add(trunkGroup);

  // Central pulsating crystal heart at trunk center [0, 0.8, 0]
  const heartGeo = new THREE.OctahedronGeometry(0.35, 2);
  disposables.push(heartGeo);
  const heartMat = new THREE.MeshStandardMaterial({
    color: 0xf4f2ea,
    emissive: 0xb7e4d5,
    emissiveIntensity: 0.85,
    roughness: 0.2,
    metalness: 0.5,
  });
  disposables.push(heartMat);
  const heartMesh = new THREE.Mesh(heartGeo, heartMat);
  heartMesh.position.set(0, 0.8, 0);
  group.add(heartMesh);

  const heartPointLight = new THREE.PointLight(0xb7e4d5, 3.2, 14, 2);
  heartPointLight.position.set(0, 0.8, 0);
  group.add(heartPointLight);

  // -------------------------------------------------------------
  // C. MONUMENTAL ROOT ARCHES & LIVING BRIDGES
  // Roots connecting the center to the Services (West), Methodology (Down), and Atlas (East)
  // -------------------------------------------------------------
  const rootArchesGroup = new THREE.Group();

  // Root directions connecting world regions along the terrain floor
  const rootVectors = [
    // Toward Services Pavilion (West)
    { dir: new THREE.Vector3(-6.2, 0.1, 1.8), midY: 0.35, archR: 0.09 },
    { dir: new THREE.Vector3(-5.0, -0.3, -2.2), midY: 0.25, archR: 0.08 },
    // Toward Methodology subterranean portal (South / Down)
    { dir: new THREE.Vector3(0.0, -3.8, 3.2), midY: -2.2, archR: 0.11 },
    { dir: new THREE.Vector3(1.4, -3.6, -1.8), midY: -2.0, archR: 0.09 },
    // Toward Atlas Observatory (East)
    { dir: new THREE.Vector3(5.6, 0.2, 2.4), midY: 0.4, archR: 0.09 },
    { dir: new THREE.Vector3(4.8, -0.2, -3.2), midY: 0.25, archR: 0.08 },
    // Toward Contact Overlook (North)
    { dir: new THREE.Vector3(0.0, 0.1, -8.4), midY: 0.3, archR: 0.1 },
  ];

  rootVectors.forEach((rv, idx) => {
    const pStart = new THREE.Vector3(0, 0.2, 0);
    const pEnd = rv.dir;
    const pMid = new THREE.Vector3()
      .addVectors(pStart, pEnd)
      .multiplyScalar(0.5);
    pMid.y = rv.midY;
    // Add horizontal organic bow
    pMid.x += (idx % 2 === 0 ? 0.6 : -0.6);

    const rootCurve = new THREE.CatmullRomCurve3([pStart, pMid, pEnd]);
    const rootGeo = new THREE.TubeGeometry(rootCurve, 32, rv.archR, 8, false);
    disposables.push(rootGeo);

    const rootMesh = new THREE.Mesh(rootGeo, barkMaterial);
    rootArchesGroup.add(rootMesh);

    // Glowing conduit on primary arches
    if (idx < 5) {
      const conduitGeo = new THREE.TubeGeometry(rootCurve, 32, 0.02, 6, false);
      disposables.push(conduitGeo);
      const conduitMesh = new THREE.Mesh(conduitGeo, vascularMaterial);
      conduitMesh.scale.set(1.04, 1.0, 1.04);
      rootArchesGroup.add(conduitMesh);
    }
  });
  group.add(rootArchesGroup);

  // -------------------------------------------------------------
  // D. BIOLUMINESCENT FLORA & CRYSTALLINE CANOPY CLUSTERS
  // -------------------------------------------------------------
  const floraGroup = new THREE.Group();
  const numFlora = 28;
  const floraMeshes: THREE.Mesh[] = [];

  for (let i = 0; i < numFlora; i++) {
    const angle = (i / numFlora) * Math.PI * 2;
    const dist = 2.2 + Math.random() * 6.8;
    const x = Math.cos(angle) * dist;
    const z = Math.sin(angle) * dist;
    const y = -1.1 + Math.sin(x * 0.3) * 0.2;

    const fGeo = new THREE.DodecahedronGeometry(0.14 + Math.random() * 0.12, 1);
    disposables.push(fGeo);

    const fMesh = new THREE.Mesh(fGeo, floraMaterial);
    fMesh.position.set(x, y, z);
    floraGroup.add(fMesh);
    floraMeshes.push(fMesh);
  }
  group.add(floraGroup);

  // -------------------------------------------------------------
  // E. VOLUMETRIC DRIFTING FIREFLY SPORES
  // -------------------------------------------------------------
  const sporeCount = 220;
  const sporeGeo = new THREE.BufferGeometry();
  const sporePositions = new Float32Array(sporeCount * 3);
  const sporeDrifts: { x: number; y: number; z: number; phase: number }[] = [];

  for (let i = 0; i < sporeCount; i++) {
    const r = 1.2 + Math.random() * 9.5;
    const theta = Math.random() * Math.PI * 2;
    const y = -4.0 + Math.random() * 9.5;

    sporePositions[i * 3] = Math.cos(theta) * r;
    sporePositions[i * 3 + 1] = y;
    sporePositions[i * 3 + 2] = Math.sin(theta) * r;

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
    color: 0xb7e4d5,
    size: 0.065,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending,
  });
  disposables.push(sporeMat);

  const sporePoints = new THREE.Points(sporeGeo, sporeMat);
  group.add(sporePoints);

  // Animation update
  const update = (delta: number, elapsed: number) => {
    // Pulsation of vascular conduits
    const breath = 0.6 + Math.sin(elapsed * 1.5) * 0.3;
    vascularMaterial.emissiveIntensity = breath;
    floraMaterial.emissiveIntensity = 0.4 + Math.sin(elapsed * 1.8 + 0.8) * 0.25;

    // Heart crystal rotation & light pulse
    heartMesh.rotation.y = elapsed * 0.3;
    heartMesh.rotation.z = elapsed * 0.2;
    heartPointLight.intensity = 2.6 + Math.sin(elapsed * 1.6) * 1.0;

    // Flora gentle scale breathing
    floraMeshes.forEach((mesh, idx) => {
      mesh.scale.setScalar(1.0 + Math.sin(elapsed * 2.2 + idx * 0.7) * 0.15);
    });

    // Spores drift
    const posAttr = sporeGeo.attributes.position as THREE.BufferAttribute;
    const posArr = posAttr.array as Float32Array;

    for (let i = 0; i < sporeCount; i++) {
      const idx = i * 3;
      const d = sporeDrifts[i];

      posArr[idx] += d.x + Math.sin(elapsed * 0.5 + d.phase) * 0.001;
      posArr[idx + 1] += d.y;
      posArr[idx + 2] += d.z + Math.cos(elapsed * 0.5 + d.phase) * 0.001;

      // Wrap around vertically
      if (posArr[idx + 1] > 6.0) {
        posArr[idx + 1] = -4.2;
      }
    }
    posAttr.needsUpdate = true;
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
