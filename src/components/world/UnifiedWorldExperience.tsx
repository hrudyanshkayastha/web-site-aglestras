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
  const [methodologyStage, setMethodologyStage] = useState<number>(1);

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <UnifiedWorldCanvas
      selectedService={selectedService}
      onSelectService={setSelectedService}
      selectedNode={selectedNode}
      onSelectNode={setSelectedNode}
      selectedMethodologyStage={methodologyStage}
      onSelectMethodologyStage={setMethodologyStage}
    >
      {/* Destination A: Entrance */}
      <EntranceOverlay
        onExploreServices={() => scrollToSection("destination-services")}
        onExploreMethodology={() => scrollToSection("destination-methodology")}
        onExploreAtlas={() => scrollToSection("destination-atlas")}
      />

      {/* Destination B: Services Pavilion */}
      <ServicesOverlay
        selectedService={selectedService}
        onSelectService={setSelectedService}
      />

      {/* Destination C: Methodology Conduits */}
      <MethodologyOverlay
        activeStage={methodologyStage}
        onSelectStage={setMethodologyStage}
      />

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
