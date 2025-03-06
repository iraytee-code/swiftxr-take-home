import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, X } from "lucide-react";
import { useModel } from "@/hooks/model-context";

export default function Control() {
    const {
        hotspots,
        selectedHotspot,
        setSelectedHotspot,
        updateHotspot,
        removeHotspot,
    } = useModel();
    const selectedHotspotData = hotspots.find((h) => h.id === selectedHotspot);
    if (!selectedHotspot || !selectedHotspotData) {
        return (
            <Card className=" w-[300px] glass-panel animate-fade-in">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Hotspot Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-sm">
                        No hotspot selected. Click on a hotspot to edit its
                        details, or click on the model to create a new one.
                    </p>
                </CardContent>
            </Card>
        );
    }
    return (
        <>
            <Card className="w-[300px] glass-panel animate-fade-in">
                <CardHeader className="pb-4 flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Edit Hotspot</CardTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedHotspot(null)}
                        className="h-8 w-8"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={selectedHotspotData.title}
                            onChange={(e) =>
                                updateHotspot(selectedHotspot, {
                                    title: e.target.value,
                                })
                            }
                            placeholder="Hotspot title"
                            className="bg-background/50"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={selectedHotspotData.description}
                            onChange={(e) =>
                                updateHotspot(selectedHotspot, {
                                    description: e.target.value,
                                })
                            }
                            placeholder="Describe this hotspot..."
                            rows={4}
                            className="resize-none bg-background/50"
                        />
                    </div>
                    <div className="text-xs text-muted-foreground">
                        Position: x: {selectedHotspotData.position.x.toFixed(2)}
                        , y: {selectedHotspotData.position.y.toFixed(2)}, z:{" "}
                        {selectedHotspotData.position.z.toFixed(2)}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeHotspot(selectedHotspot)}
                        className="flex items-center gap-1"
                    >
                        <Trash2 className="h-4 w-4" />
                        Delete Hotspot
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
}
