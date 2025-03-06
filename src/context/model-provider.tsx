import { useState, ReactNode, useEffect } from "react";
import { Vector3, Euler } from "three";
import { HotspotType } from "@/types/hot-spot-types";
import ModelContext from "../hooks/model-context";
import { loadSceneState } from "@/utils/hot-spot-utils";

export default function ModelProvider({ children }: { children: ReactNode }) {
    const [model, setModel] = useState<File | null>(null);
    const [hotspots, setHotspots] = useState<HotspotType[]>([]);
    const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
    const [modelPosition, setModelPosition] = useState<Vector3>(
        new Vector3(0, 0, 0)
    );
    const [modelRotation, setModelRotation] = useState<Euler>(
        new Euler(0, 0, 0)
    );
    const [modelScale, setModelScale] = useState<number>(1);

    // New state for hotspot adding mode
    const [isAddingHotspot, setIsAddingHotspot] = useState<boolean>(false);
    const [newHotspotData, setNewHotspotData] = useState<{
        title: string;
        description: string;
    }>({
        title: "",
        description: "",
    });

    const addHotspot = (position: Vector3) => {
        if (!isAddingHotspot) return;
        const newHotspot: HotspotType = {
            id: `hotspot-${Date.now()}`,
            position,
            title: newHotspotData.title || ``,
            description: newHotspotData.description || "",
        };
        setHotspots([...hotspots, newHotspot]);
        setSelectedHotspot(newHotspot.id);

        // Exit hotspot adding mode after adding
        setIsAddingHotspot(false);
        // Reset the form data
        setNewHotspotData({ title: "", description: "" });
    };

    const updateHotspot = (
        id: string,
        data: Partial<Omit<HotspotType, "id" | "position">>
    ) => {
        setHotspots(
            hotspots.map((hotspot) =>
                hotspot.id === id ? { ...hotspot, ...data } : hotspot
            )
        );
    };

    const removeHotspot = (id: string) => {
        setHotspots(hotspots.filter((hotspot) => hotspot.id !== id));
        if (selectedHotspot === id) {
            setSelectedHotspot(null);
        }
    };

    useEffect(() => {
        const savedState = loadSceneState();
        if (savedState) {
            setHotspots(savedState.hotspots);
            setModelPosition(savedState.modelPosition);
            setModelRotation(savedState.modelRotation);
            setModelScale(savedState.modelScale);
        }
    }, []);

    return (
        <ModelContext.Provider
            value={{
                model,
                setModel,
                modelPosition,
                setModelPosition,
                modelRotation,
                setModelRotation,
                modelScale,
                setModelScale,
                addHotspot,
                updateHotspot,
                removeHotspot,
                selectedHotspot,
                setSelectedHotspot,
                hotspots,
                isAddingHotspot,
                setIsAddingHotspot,
                newHotspotData,
                setNewHotspotData,
            }}
        >
            {children}
        </ModelContext.Provider>
    );
}
