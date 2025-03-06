/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
    OrbitControls,
    Environment,
    ContactShadows,
    Html,
    Center,
    useBounds,
} from "@react-three/drei";
import * as THREE from "three";
import { useModel } from "@/hooks/model-context";
import HotSpot from "../hot-spot/hot-spot";
import { Cuboid } from "lucide-react";

import { DRACOLoader } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

const ModelLoader = () => {
    const {
        model,
        addHotspot,
        hotspots,
        modelPosition,
        modelRotation,
        modelScale,
        isAddingHotspot,
    } = useModel();
    const modelRef = useRef<THREE.Group>(null);
    const bounds = useBounds();
    const [gltf, setGltf] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Load the model manually instead of using useGLTF for better control
    useEffect(() => {
        if (!model) return;

        setLoading(true);
        setError(null);

        const blobUrl = URL.createObjectURL(model);

        // Set up loaders with proper settings
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath(
            "https://www.gstatic.com/draco/versioned/decoders/1.5.5/"
        );

        const gltfLoader = new GLTFLoader();
        gltfLoader.setDRACOLoader(dracoLoader);

        console.log("Loading model from blob URL:", blobUrl);

        gltfLoader.load(
            blobUrl,
            (loadedGltf) => {
                console.log("Model loaded successfully:", loadedGltf);
                setGltf(loadedGltf);
                setLoading(false);

                // Clean up blob URL
                URL.revokeObjectURL(blobUrl);

                // Center model when loaded (in next render cycle)
                setTimeout(() => {
                    if (modelRef.current) {
                        bounds.refresh(modelRef.current).clip().fit();
                    }
                }, 100);
            },
            (progress) => {
                console.log(
                    "Loading progress:",
                    (progress.loaded / progress.total) * 100 + "%"
                );
            },
            (error) => {
                console.error("Error loading model:", error);
                setError("Failed to load model: " + (error as Error).message);
                setLoading(false);

                // Clean up blob URL
                URL.revokeObjectURL(blobUrl);
            }
        );

        return () => {
            URL.revokeObjectURL(blobUrl);
        };
    }, [model, bounds]);

    useEffect(() => {
        return () => {
            // GLTF cleanup code only when component unmounts
            if (gltf) {
                if (gltf.scene) {
                    gltf.scene.traverse((object: THREE.Object3D) => {
                        if (object instanceof THREE.Mesh) {
                            if (object.geometry) object.geometry.dispose();
                            if (object.material) {
                                if (Array.isArray(object.material)) {
                                    object.material.forEach((material) =>
                                        material.dispose()
                                    );
                                } else {
                                    object.material.dispose();
                                }
                            }
                        }
                    });
                }
            }
        };
    });

    const handleModelClick = (e: THREE.Intersection) => {
        if (!modelRef.current) return;
        if (isAddingHotspot) {
            const point = e.point.clone();
            addHotspot(point);
        }
    };

    // Only try to render when we have a loaded model
    if (loading) {
        return (
            <Html center>
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4 animate-pulse">
                        <Cuboid className="h-8 w-8 text-primary animate-spin" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">
                        Loading Model...
                    </h3>
                </div>
            </Html>
        );
    }

    if (error) {
        return (
            <Html center>
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-destructive/20 flex items-center justify-center mb-4">
                        <Cuboid className="h-8 w-8 text-destructive" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">
                        Error Loading Model
                    </h3>
                    <p className="text-sm text-muted-foreground">{error}</p>
                </div>
            </Html>
        );
    }

    return (
        <Center>
            <group
                ref={modelRef}
                position={[modelPosition.x, modelPosition.y, modelPosition.z]}
                rotation={modelRotation}
                scale={modelScale}
                onClick={(e) => handleModelClick(e.intersections[0])}
            >
                {gltf && <primitive object={gltf.scene} />}

                {/* Render hotspots */}
                {hotspots.map((hotspot) => (
                    <HotSpot key={hotspot.id} hotspot={hotspot} />
                ))}
            </group>
        </Center>
    );
};

const NoModelPlaceholder = () => {
    return (
        <Html center>
            <div className="text-center w-64 sm:w-80 md:w-96">
                <h3 className="text-lg font-medium mb-1">No 3D Model Loaded</h3>
                <p className="text-sm text-muted-foreground">
                    Upload a GLB file to get started
                </p>
            </div>
        </Html>
    );
};
export default function ModelViewer() {
    const { model } = useModel();
    return (
        <Canvas
            className="w-full h-full rounded-lg model-canvas"
            camera={{ position: [0, 0, 5], fov: 50 }}
            shadows
        >
            <ambientLight intensity={0.7} />
            <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                intensity={1}
                castShadow
            />
            <Suspense fallback={null}>
                <Environment preset="lobby" />
                {model ? <ModelLoader /> : <NoModelPlaceholder />}
                <ContactShadows
                    position={[0, -1, 0]}
                    opacity={0.4}
                    scale={10}
                    blur={1.5}
                    far={1}
                />
            </Suspense>
            <OrbitControls
                makeDefault
                enableDamping
                dampingFactor={0.05}
                minDistance={2}
                maxDistance={10}
            />
        </Canvas>
    );
}
