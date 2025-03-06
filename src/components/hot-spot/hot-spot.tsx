import React from "react";
import { Html } from "@react-three/drei";
import { useModel } from "@/hooks/model-context";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { HotspotType } from "@/types/hot-spot-types";
import { Info } from "lucide-react";

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
        <Html position={position} center>
            <div
                onClick={handleClick}
                className={cn(
                    "relative flex items-center justify-center cursor-pointer",
                    "w-8 h-8 rounded-full transition-all duration-200",
                    isSelected
                        ? "bg-primary text-primary-foreground scale-125"
                        : "bg-white text-primary hover:scale-110"
                )}
            >
                <Info size={8} />
                {isSelected && (
                    <Badge
                        className="absolute -top-8 px-2 py-1 whitespace-nowrap"
                        variant="secondary"
                    >
                        {title}
                    </Badge>
                )}
            </div>
        </Html>
    );
}
