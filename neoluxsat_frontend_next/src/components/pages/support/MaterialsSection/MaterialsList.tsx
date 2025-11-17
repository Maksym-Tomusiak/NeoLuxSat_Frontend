"use client";

import { useCallback, useState } from "react";
import MaterialsCard from "./MaterialsSectionCard";
import InfoModal from "./InfoModal";
import { materialsData } from "@/data/materialsContent";
import type { ModalData } from "@/types/materials";
import MaterialsCardWrapper from "./MaterialsCardsWrapper";

const MaterialsList = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<ModalData | null>(
    null
  );

  const handleOpenModal = useCallback((modalContent: ModalData) => {
    setSelectedMaterial(modalContent);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedMaterial(null);
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-center max-[1440px]:mx-auto max-[1440px]:max-w-[1000px]  min-[1440px]:justify-between max-[1440px]:items-start gap-[20px]">
        {materialsData.map(
          (
            item,
            index // <-- Use index here
          ) => (
            <div
              key={item.id}
              className={`
                            w-fit flex justify-center items-center
                            min-[1440px]:h-fit
                            ${
                              item.marginTop === "56px"
                                ? "min-[1440px]:mt-[56px]"
                                : ""
                            }
                            ${
                              item.marginTop === "220px"
                                ? "min-[1440px]:mt-[220px]"
                                : ""
                            }
                        `}
            >
              {/* 💥 WRAP THE CARD WITH THE ANIMATION COMPONENT 💥 */}
              <MaterialsCardWrapper index={index}>
                <MaterialsCard
                  icon={item.icon}
                  title={item.title}
                  points={item.points}
                  onPointClick={handleOpenModal}
                />
              </MaterialsCardWrapper>
            </div>
          )
        )}
      </div>

      <InfoModal
        isOpen={!!selectedMaterial}
        onClose={handleCloseModal}
        data={selectedMaterial}
      />
    </>
  );
};

export default MaterialsList;
