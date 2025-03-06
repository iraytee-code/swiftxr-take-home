import { useState, useEffect } from "react";
import FileUpload from "@/components/file-upload/file-upload";
import { useModel } from "@/hooks/model-context";
import Control from "@/components/hot-spot/control";
import { saveSceneState } from "@/utils/hot-spot-utils";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Save, Trash, Info, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import ModelViewer from "../model-viewer/model-viewer";
import AddHotspotForm from "../hot-spot/hot-spot-form";

export default function MainEditor() {
    const {
        hotspots,
        model,
        setModel,
        setSelectedHotspot,
        modelPosition,
        modelRotation,
        modelScale,
    } = useModel();

    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
        setIsAnimated(true);
    }, []);
    const handleSave = () => {
        saveSceneState({ hotspots, modelPosition, modelRotation, modelScale });
        toast.success("Your hotspots and model configuration have been saved");
    };

    const handleReset = () => {
        if (
            window.confirm(
                "Are you sure you want to clear all hotspots? This cannot be undone."
            )
        ) {
            setModel(null);
            setSelectedHotspot(null);
            toast.error("All hotspots and model have been removed");
        }
    };
    const hasContent = model !== null || hotspots.length > 0;

    return (
        <div
            className={cn(
                " w-full h-screen transition-all duration-700 ease-out flex flex-col items-center mt-28",
                isAnimated ? "opacity-100" : "opacity-0 translate-y-4"
            )}
        >
            <main className="w-full max-w-7xl flex-1 px-6 pb-20">
                <div className="flex flex-col lg:flex-row gap-8 h-full">
                    <div className="w-full lg:w-3/4 h-[60vh] lg:h-[80vh] rounded-lg overflow-hidden glass-panel border">
                        <ModelViewer />
                    </div>
                    <div className="w-full lg:w-1/4 flex flex-col gap-6">
                        {!model && (
                            <div className="animate-slide-in">
                                <FileUpload />
                            </div>
                        )}

                        {model && (
                            <div className="w-full lg:w-1/4 flex flex-col gap-6">
                                <AddHotspotForm />
                                <Control />
                            </div>
                        )}

                        {model && (
                            <div className="glass-panel rounded-lg p-4 text-sm animate-fade-in">
                                <div className="flex items-start gap-2">
                                    <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-muted-foreground mb-2">
                                            Click on the model to add new
                                            hotspots. Adjust position, and edit
                                            details in the panel above.
                                        </p>
                                        <div className="text-xs space-y-1 text-muted-foreground">
                                            <p>
                                                <ArrowRight className="inline h-3 w-3 mr-1" />{" "}
                                                Drag to rotate view
                                            </p>
                                            <p>
                                                <ArrowRight className="inline h-3 w-3 mr-1" />{" "}
                                                Scroll to zoom
                                            </p>
                                            <p>
                                                <ArrowRight className="inline h-3 w-3 mr-1" />{" "}
                                                Click hotspots to edit
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {hasContent && (
                            <>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleSave}
                                    className="flex items-center gap-1"
                                >
                                    <Save className="h-4 w-4" />
                                    Save
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleReset}
                                    className="flex items-center gap-1 text-destructive hover:text-destructive"
                                >
                                    <Trash className="h-4 w-4" />
                                    Reset
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
