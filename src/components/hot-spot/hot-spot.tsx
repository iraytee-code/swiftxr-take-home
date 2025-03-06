import React from "react";
import { Html } from "@react-three/drei";
import { useModel } from "@/hooks/model-context";

import { cn } from "@/lib/utils";
import { HotspotType } from "@/types/hot-spot-types";

interface HotspotProps {
    hotspot: HotspotType;
}

export default function HotSpot({ hotspot }: HotspotProps) {
    const { id, position, title } = hotspot;
    const { selectedHotspot, setSelectedHotspot } = useModel();
    const isSelected = selectedHotspot === id;

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedHotspot(id);
    };

    return (
        <group position={[position.x, position.y, position.z]}>
            <Html
                center
                distanceFactor={8}
                zIndexRange={[100, 0]}
                className="pointer-events-auto"
            >
                <div
                    className={cn(
                        "hotspot transition-all duration-300 flex items-center justify-center",
                        isSelected ? "scale-125 ring-2 ring-white" : ""
                    )}
                    onClick={handleClick}
                >
                    <span className="text-xs font-bold">
                        {hotspot.id.split("-")[1].slice(0, 1)}
                    </span>
                </div>
                {isSelected && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-black/75 text-white text-xs px-2 py-1 rounded pointer-events-none animate-fade-in">
                        {title}
                    </div>
                )}
            </Html>
        </group>
    );
}
