import { Vector3, Euler } from "three";
import { HotspotType } from "@/types/hot-spot-types";

export interface SceneState {
    hotspots: HotspotType[];
    modelPosition: Vector3;
    modelRotation: Euler;
    modelScale: number;
}

export const saveSceneState = (state: SceneState): void => {
    try {
        const serializedState = JSON.stringify({
            hotspots: state.hotspots.map((hotspot) => ({
                ...hotspot,
                position: {
                    x: hotspot.position.x,
                    y: hotspot.position.y,
                    z: hotspot.position.z,
                },
            })),
            modelPosition: {
                x: state.modelPosition.x,
                y: state.modelPosition.y,
                z: state.modelPosition.z,
            },
            modelRotation: {
                x: state.modelRotation.x,
                y: state.modelRotation.y,
                z: state.modelRotation.z,
            },
            modelScale: state.modelScale,
        });

        localStorage.setItem("3d-hotspots-state", serializedState);
    } catch (error) {
        console.error("Failed to save scene state:", error);
    }
};

export const loadSceneState = (): SceneState | null => {
    try {
        const serializedState = localStorage.getItem("3d-hotspots-state");
        if (!serializedState) return null;

        const parsedState = JSON.parse(serializedState);

        return {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            hotspots: parsedState.hotspots.map((hotspot: any) => ({
                ...hotspot,
                position: new Vector3(
                    hotspot.position.x,
                    hotspot.position.y,
                    hotspot.position.z
                ),
            })),
            modelPosition: new Vector3(
                parsedState.modelPosition.x,
                parsedState.modelPosition.y,
                parsedState.modelPosition.z
            ),
            modelRotation: new Euler(
                parsedState.modelRotation.x,
                parsedState.modelRotation.y,
                parsedState.modelRotation.z
            ),
            modelScale: parsedState.modelScale,
        };
    } catch (error) {
        console.error("Failed to load scene state:", error);
        return null;
    }
};

export const exportSceneToJSON = (state: SceneState): string => {
    try {
        const exportData = {
            hotspots: state.hotspots.map((hotspot) => ({
                id: hotspot.id,
                title: hotspot.title,
                description: hotspot.description,
                position: {
                    x: hotspot.position.x,
                    y: hotspot.position.y,
                    z: hotspot.position.z,
                },
            })),
            modelPosition: {
                x: state.modelPosition.x,
                y: state.modelPosition.y,
                z: state.modelPosition.z,
            },
            modelRotation: {
                x: state.modelRotation.x,
                y: state.modelRotation.y,
                z: state.modelRotation.z,
            },
            modelScale: state.modelScale,
        };

        return JSON.stringify(exportData, null, 2);
    } catch (error) {
        console.error("Failed to export scene:", error);
        return "{}";
    }
};
