import { HotspotType } from "./hot-spot-types";
import { Vector3, Euler } from "three";

export interface ModelContextType {
    model: File | null;
    setModel: (model: File | null) => void;
    hotspots: HotspotType[];
    addHotspot: (position: Vector3) => void;
    updateHotspot: (
        id: string,
        data: Partial<Omit<HotspotType, "id" | "position">>
    ) => void;
    removeHotspot: (id: string) => void;
    selectedHotspot: string | null;
    setSelectedHotspot: (id: string | null) => void;
    modelPosition: Vector3;
    setModelPosition: (position: Vector3) => void;
    modelRotation: Euler;
    setModelRotation: (rotation: Euler) => void;
    modelScale: number;
    setModelScale: (scale: number) => void;
    isAddingHotspot: boolean;
    setIsAddingHotspot: (isAdding: boolean) => void;
    newHotspotData: {
        title: string;
        description: string;
    };
    setNewHotspotData: (data: { title: string; description: string }) => void;
}
