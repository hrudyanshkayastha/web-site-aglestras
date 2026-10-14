"use client";

import React, { useCallback } from "react";
import { useWorldContext } from "./WorldContext";
import { WORLD_DESTINATIONS } from "./WorldConfig";
import { WorldNavigatorHUD } from "./WorldNavigatorHUD";
import { EntranceOverlay } from "./destinations/EntranceOverlay";
import { ServicesOverlay } from "./destinations/ServicesOverlay";
import { MethodologyOverlay } from "./destinations/MethodologyOverlay";
import { AtlasOverlay } from "./destinations/AtlasOverlay";
import { ResearchOverlay } from "./destinations/ResearchOverlay";
import { ContactOverlay } from "./destinations/ContactOverlay";

export function UnifiedWorldExperience() {
  const {
    activeDestination,
    selectedNode,
    setSelectedNode,
    selectedService,
    setSelectedService,
    methodologyStage,
    setMethodologyStage,
    focusService,
    focusNode,
    resetToOverview,
  } = useWorldContext();

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Handle direct hash navigation on initial load (e.g. /#destination-contact)
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "auto", block: "start" });
          }, 80);
        }
      }
    }
  }, []);

  return (
    <div className="relative w-full">
      {/* Floating HUD Destination Waypoint Controller on Home */}
      <WorldNavigatorHUD
        activeDestination={activeDestination}
        hasActiveSelection={Boolean(selectedNode || selectedService)}
        onSelectDestination={(destId) => {
          scrollToSection(WORLD_DESTINATIONS[destId].sectionId);
        }}
        onResetSelection={resetToOverview}
      />

      {/* Destination A: Entrance */}
      <EntranceOverlay
        onExploreServices={() => scrollToSection("destination-services")}
        onExploreMethodology={() => scrollToSection("destination-methodology")}
        onExploreAtlas={() => scrollToSection("destination-atlas")}
      />

      {/* Destination B: Services Pavilion */}
      <ServicesOverlay
        selectedService={selectedService}
        onSelectService={focusService}
      />

      {/* Destination C: Methodology Conduits */}
      <MethodologyOverlay
        activeStage={methodologyStage}
        onSelectStage={setMethodologyStage}
      />

      {/* Destination D: Intelligence Atlas */}
      <AtlasOverlay
        selectedNode={selectedNode}
        onSelectNode={focusNode}
      />

      {/* Destination E: Research Domains */}
      <ResearchOverlay />

      {/* Destination F: Contact Terminus */}
      <ContactOverlay />
    </div>
  );
}
