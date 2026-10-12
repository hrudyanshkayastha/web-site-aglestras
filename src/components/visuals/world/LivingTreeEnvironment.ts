import * as THREE from "three";

export interface LivingTreeElements {
  group: THREE.Group;
  update: (delta: number, elapsed: number) => void;
  dispose: () => void;
}

export function createLivingTreeEnvironment(): LivingTreeElements {
  const group = new THREE.Group();
  group.name = "LivingTreeEnvironment";

  const disposables: (THREE.BufferGeometry | THREE.Material)[] = [];

  // PBR Materials
  // 1. Organic Dark Pine Trunk Material (Deep living wood / bio-conduit)
  const trunkMaterial = new THREE.MeshStandardMaterial({
    color: 0x052a23,
    roughness: 0.78,
    metalness: 0.15,
  });
  disposables.push(trunkMaterial);

  // 2. Luminous Vascular Filament Material (Mint green bio-energy)
  const vascularMaterial = new THREE.MeshStandardMaterial({
    color: 0x2fa885,
    emissive: 0x2fa885,
    emissiveIntensity: 0.65,
    roughness: 0.3,
    metalness: 0.2,
  });
  disposables.push(vascularMaterial);

  // 3. Leaf / Neural Tendril Material (Translucent glowing botanical mint)
  const canopyFoliageMaterial = new THREE.MeshStandardMaterial({
    color: 0xb7e4d5,
    emissive: 0x145a46,
    emissiveIntensity: 0.45,
    roughness: 0.4,
    metalness: 0.1,
    transparent: true,
    opacity: 0.88,
  });
  disposables.push(canopyFoliageMaterial);

  // 4. Warm Ivory Filament Accent
  const ivoryAccentMaterial = new THREE.MeshStandardMaterial({
    color: 0xf4f2ea,
    emissive: 0xb7e4d5,
    emissiveIntensity: 0.35,
    roughness: 0.25,
    metalness: 0.6,
  });
  disposables.push(ivoryAccentMaterial);

  // -------------------------------------------------------------
  // A. CENTRAL TRUNK - MULTI-STRAND BIO-HELICAL CORE
  // Procedural fluted braided trunks rising from plinth (-2.2) to canopy (+1.8)
  // -------------------------------------------------------------
  const trunkStrands = 5;
  const trunkHeight = 4.2;
  const trunkBaseY = -2.3;

  for (let i = 0; i < trunkStrands; i++) {
    const baseAngle = (i / trunkStrands) * Math.PI * 2;
    const strandPoints: THREE.Vector3[] = [];
    const steps = 30;

    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      const y = trunkBaseY + t * trunkHeight;

      // Slight twist and organic taper/flaring
      const twist = t * Math.PI * 0.75 + baseAngle;
      // Radius: wide at base (0.75), narrow at waist (0.32), spreading at canopy (0.85)
      const radius = 0.32 + Math.pow(t - 0.45, 2) * 1.6;
      const x = Math.cos(twist) * radius;
      const z = Math.sin(twist) * radius;

      strandPoints.push(new THREE.Vector3(x, y, z));
    }

    const strandCurve = new THREE.CatmullRomCurve3(strandPoints);
    const strandGeo = new THREE.TubeGeometry(strandCurve, 36, 0.075, 10, false);
    disposables.push(strandGeo);

    const strandMesh = new THREE.Mesh(strandGeo, trunkMaterial);
    group.add(strandMesh);

    // Add luminous vascular bio-strip along selected trunk strands
    if (i % 2 === 0) {
      const vascGeo = new THREE.TubeGeometry(strandCurve, 36, 0.02, 6, false);
      disposables.push(vascGeo);
      const vascMesh = new THREE.Mesh(vascGeo, vascularMaterial);
      vascMesh.scale.set(1.03, 1.0, 1.03);
      group.add(vascMesh);
    }
  }

  // -------------------------------------------------------------
  // B. DIMENSIONAL ROOT SYSTEM (FOUNDATION ROOTS)
  // Roots anchor into the tiered stone floor plinth, curling outwards
  // -------------------------------------------------------------
  const numRoots = 6;
  const rootGroup = new THREE.Group();

  for (let i = 0; i < numRoots; i++) {
    const angle = (i / numRoots) * Math.PI * 2 + (i % 2) * 0.2;
    const rootPoints: THREE.Vector3[] = [];
    const rootSteps = 20;

    for (let s = 0; s <= rootSteps; s++) {
      const t = s / rootSteps;
      // Roots start at waist/base (y = -1.2 to -2.3), sprawl along floor out to radius 2.8 - 3.8
      const y = -1.2 - t * 1.1 + Math.sin(t * Math.PI) * 0.15;
      const r = 0.5 + t * 2.8 + Math.sin(t * 4.0) * 0.2;
      const spreadAngle = angle + (Math.sin(t * 3.0) * 0.35);

      const x = Math.cos(spreadAngle) * r;
      const z = Math.sin(spreadAngle) * r;
      rootPoints.push(new THREE.Vector3(x, y, z));
    }

    const rootCurve = new THREE.CatmullRomCurve3(rootPoints);
    // Root tapers from 0.09 at trunk to 0.025 at tip
    const rootGeo = new THREE.TubeGeometry(rootCurve, 24, 0.065, 8, false);
    disposables.push(rootGeo);

    const rootMesh = new THREE.Mesh(rootGeo, trunkMaterial);
    rootGroup.add(rootMesh);

    // Glowing root conduit on every second root
    if (i % 2 === 1) {
      const rootVascGeo = new THREE.TubeGeometry(rootCurve, 24, 0.018, 6, false);
      disposables.push(rootVascGeo);
      const rootVascMesh = new THREE.Mesh(rootVascGeo, vascularMaterial);
      rootVascMesh.scale.set(1.04, 1.0, 1.04);
      rootGroup.add(rootVascMesh);
    }
  }
  group.add(rootGroup);

  // -------------------------------------------------------------
  // C. BRANCHING NEURAL CANOPY (UPPER BRANCHES & TENDRILLARY FILAMENTS)
  // Branches arch outwards toward peripheral corporate & domain entities
  // -------------------------------------------------------------
  const numBranches = 7;
  const branchGroup = new THREE.Group();
  const foliageMeshes: THREE.Mesh[] = [];

  for (let i = 0; i < numBranches; i++) {
    const angle = (i / numBranches) * Math.PI * 2;
    const branchPoints: THREE.Vector3[] = [];
    const branchSteps = 24;

    for (let s = 0; s <= branchSteps; s++) {
      const t = s / branchSteps;
      // Branches emerge from upper trunk (y = 0.8) and arch up and outwards (y = 1.4 to 2.6)
      const y = 0.8 + t * 1.6 - Math.pow(t, 2) * 0.4;
      const r = 0.5 + t * 2.9;
      const archAngle = angle + Math.sin(t * 2.5) * 0.4;

      const x = Math.cos(archAngle) * r;
      const z = Math.sin(archAngle) * r;
      branchPoints.push(new THREE.Vector3(x, y, z));
    }

    const branchCurve = new THREE.CatmullRomCurve3(branchPoints);
    const branchGeo = new THREE.TubeGeometry(branchCurve, 24, 0.045, 8, false);
    disposables.push(branchGeo);

    const branchMesh = new THREE.Mesh(branchGeo, trunkMaterial);
    branchGroup.add(branchMesh);

    // Vascular inner glow
    const branchVascGeo = new THREE.TubeGeometry(branchCurve, 24, 0.016, 6, false);
    disposables.push(branchVascGeo);
    const branchVascMesh = new THREE.Mesh(branchVascGeo, vascularMaterial);
    branchGroup.add(branchVascMesh);

    // Botanical tendril / neural node at tip of branch
    const tipPos = branchPoints[branchPoints.length - 1];
    const foliageGeo = new THREE.IcosahedronGeometry(0.12, 1);
    disposables.push(foliageGeo);
    const foliageMesh = new THREE.Mesh(foliageGeo, canopyFoliageMaterial);
    foliageMesh.position.copy(tipPos);
    branchGroup.add(foliageMesh);
    foliageMeshes.push(foliageMesh);
  }
  group.add(branchGroup);

  // -------------------------------------------------------------
  // D. CENTRAL TRUNK CORE RADIANCE
  // A glowing inner crystal heart at [0, 0.2, 0]
  // -------------------------------------------------------------
  const coreHeartGeo = new THREE.OctahedronGeometry(0.28, 2);
  disposables.push(coreHeartGeo);
  const coreHeartMesh = new THREE.Mesh(coreHeartGeo, ivoryAccentMaterial);
  coreHeartMesh.position.set(0, 0.2, 0);
  group.add(coreHeartMesh);

  // Inner point light providing warm emerald illumination from trunk interior
  const corePointLight = new THREE.PointLight(0xb7e4d5, 2.8, 8, 2);
  corePointLight.position.set(0, 0.2, 0);
  group.add(corePointLight);

  // Update animation loop
  const update = (delta: number, elapsed: number) => {
    // Gentle pulsation of vascular materials (breathing bioluminescence)
    const breath = 0.55 + Math.sin(elapsed * 1.6) * 0.25;
    vascularMaterial.emissiveIntensity = breath;
    canopyFoliageMaterial.emissiveIntensity = 0.35 + Math.sin(elapsed * 1.8 + 1.0) * 0.2;
    corePointLight.intensity = 2.4 + Math.sin(elapsed * 1.4) * 0.8;

    // Slow organic rotation of central heart crystal
    coreHeartMesh.rotation.y = elapsed * 0.25;
    coreHeartMesh.rotation.x = elapsed * 0.15;

    // Foliage tip gentle floating
    foliageMeshes.forEach((mesh, idx) => {
      mesh.scale.setScalar(1.0 + Math.sin(elapsed * 2.0 + idx) * 0.12);
    });
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
