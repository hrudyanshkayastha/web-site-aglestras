import { GraphNode, GraphEdge, ILLUSTRATIVE_GRAPH_NODES, ILLUSTRATIVE_GRAPH_EDGES } from "@/data/entityGraphData";
import { servicesData, ServiceItem } from "@/data/services";

export type WorldDestinationId =
  | "ENTRANCE"
  | "SERVICES"
  | "METHODOLOGY"
  | "ATLAS"
  | "CONTACT";

export interface DestinationWaypoint {
  id: WorldDestinationId;
  label: string;
  sublabel: string;
  sectionId: string;
  cameraPos: [number, number, number];
  lookAt: [number, number, number];
  fov?: number;
}

export const WORLD_DESTINATIONS: Record<WorldDestinationId, DestinationWaypoint> = {
  ENTRANCE: {
    id: "ENTRANCE",
    label: "Entrance",
    sublabel: "Sanctuary Gateway & Identity",
    sectionId: "destination-entrance",
    cameraPos: [0.0, 2.0, 12.0],
    lookAt: [0.0, 1.4, 0.0],
    fov: 42,
  },
  SERVICES: {
    id: "SERVICES",
    label: "Capabilities",
    sublabel: "Six Verified Service Pavilions",
    sectionId: "destination-services",
    cameraPos: [-3.2, 2.2, 6.5],
    lookAt: [-4.6, 0.6, 1.0],
    fov: 46,
  },
  METHODOLOGY: {
    id: "METHODOLOGY",
    label: "Methodology",
    sublabel: "Four-Stage Epistemic Pathway",
    sectionId: "destination-methodology",
    cameraPos: [0.0, -2.6, 6.2],
    lookAt: [0.0, -3.8, 1.8],
    fov: 48,
  },
  ATLAS: {
    id: "ATLAS",
    label: "Intelligence Atlas",
    sublabel: "Dimensional Knowledge Topology",
    sectionId: "destination-atlas",
    cameraPos: [4.8, 3.0, 6.8],
    lookAt: [3.4, 0.8, 0.0],
    fov: 44,
  },
  CONTACT: {
    id: "CONTACT",
    label: "Sanctuary Terminus",
    sublabel: "Consultation & Engagement Scope",
    sectionId: "destination-contact",
    cameraPos: [0.0, 1.8, -8.6],
    lookAt: [0.0, 1.2, -18.0],
    fov: 45,
  },
};

export const ORDERED_DESTINATIONS: WorldDestinationId[] = [
  "ENTRANCE",
  "SERVICES",
  "METHODOLOGY",
  "ATLAS",
  "CONTACT",
];

export interface ServicePylonConfig {
  service: ServiceItem;
  position: [number, number, number];
  color: number;
}

export const SERVICE_PYLONS: ServicePylonConfig[] = [
  {
    service: servicesData[0], // AGL-ETI
    position: [-5.2, 0.6, 1.6],
    color: 0x2fa885, // Emerald
  },
  {
    service: servicesData[1], // AGL-BDD
    position: [-4.0, 0.4, 2.8],
    color: 0xb7e4d5, // Mint
  },
  {
    service: servicesData[2], // AGL-RVR
    position: [-2.8, 0.2, 3.6],
    color: 0xfbbf24, // Amber
  },
  {
    service: servicesData[3], // AGL-BIR
    position: [-5.6, 0.5, -0.6],
    color: 0x60a5fa, // Sky
  },
  {
    service: servicesData[4], // AGL-RAP
    position: [-4.2, 0.3, -1.8],
    color: 0xc084fc, // Epistemic Purple
  },
  {
    service: servicesData[5], // AGL-OIR
    position: [-2.9, 0.2, -2.6],
    color: 0xf4f2ea, // Ivory
  },
];
