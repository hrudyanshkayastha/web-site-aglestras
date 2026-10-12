"use client";

import React, { useState, useCallback } from "react";
import { UnifiedWorldCanvas } from "./UnifiedWorldCanvas";
import { EntranceOverlay } from "./destinations/EntranceOverlay";
import { ServicesOverlay } from "./destinations/ServicesOverlay";
import { MethodologyOverlay } from "./destinations/MethodologyOverlay";
import { AtlasOverlay } from "./destinations/AtlasOverlay";
import { ResearchOverlay } from "./destinations/ResearchOverlay";
import { ContactOverlay } from "./destinations/ContactOverlay";
import { GraphNode } from "@/data/entityGraphData";
import { ServiceItem } from "@/data/services";

export function UnifiedWorldExperience() {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <UnifiedWorldCanvas>
      {/* Destination A: Entrance */}
      <EntranceOverlay
        onExploreServices={() => scrollToSection("destination-services")}
        onExploreMethodology={() => scrollToSection("destination-methodology")}
      />

      {/* Destination B: Services Pavilion */}
      <ServicesOverlay
        selectedService={selectedService}
        onSelectService={setSelectedService}
      />

      {/* Destination C: Methodology Conduits */}
      <MethodologyOverlay />

      {/* Destination D: Intelligence Atlas */}
      <AtlasOverlay
        selectedNode={selectedNode}
        onSelectNode={setSelectedNode}
      />

      {/* Destination E: Research Domains */}
      <ResearchOverlay />

      {/* Destination F: Contact Terminus */}
      <ContactOverlay />
    </UnifiedWorldCanvas>
  );
}
