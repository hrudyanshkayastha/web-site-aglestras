import { GraphNode, GraphEdge, EntityCategory } from "@/data/entityGraphData";

export type WorldVantage = "OVERVIEW" | "ROOTS" | "CANOPY";

export interface VantageConfig {
  id: WorldVantage;
  label: string;
  subtitle: string;
  cameraPos: [number, number, number];
  lookAt: [number, number, number];
}

export const WORLD_VANTAGES: Record<WorldVantage, VantageConfig> = {
  OVERVIEW: {
    id: "OVERVIEW",
    label: "Observatory Overview",
    subtitle: "Complete sanctuary vantage",
    cameraPos: [2.2, 2.2, 8.4],
    lookAt: [0, 0.3, 0],
  },
  ROOTS: {
    id: "ROOTS",
    label: "Foundation Roots",
    subtitle: "Subsurface infrastructure & records",
    cameraPos: [1.8, -1.6, 6.2],
    lookAt: [-0.4, -1.2, 0],
  },
  CANOPY: {
    id: "CANOPY",
    label: "Canopy Atlas",
    subtitle: "Perimeter domains & corporate web",
    cameraPos: [-1.4, 3.4, 6.8],
    lookAt: [0.2, 1.0, 0],
  },
};

export interface WorldEntityBeacon {
  node: GraphNode;
  group: any; // THREE.Group
  baseY: number;
  hoverOffset: number;
  highlighted: boolean;
}

export interface WorldPathwayConnection {
  edge: GraphEdge;
  line: any; // THREE.Line
  curve: any; // THREE.CatmullRomCurve3
  sourceId: string;
  targetId: string;
  points: any[]; // THREE.Vector3[]
}
