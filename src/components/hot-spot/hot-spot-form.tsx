import { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, X } from "lucide-react";
import { useModel } from "@/hooks/model-context";
import { toast } from "sonner";

export default function AddHotspotForm() {
    const {
        isAddingHotspot,
        setIsAddingHotspot,
        newHotspotData,
        setNewHotspotData,
    } = useModel();
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleStartAdding = () => {
        setIsFormOpen(true);
    };

    const handleCancelAdding = () => {
        setIsFormOpen(false);
        setIsAddingHotspot(false);
        setNewHotspotData({ title: "", description: "" });
    };

    // Enable hotspot adding mode
    const handleAddHotspot = () => {
        setIsAddingHotspot(true);
        toast.info("Click on the model to place your hotspot");
    };

    if (!isFormOpen) {
        return (
            <Button
                size="sm"
                onClick={handleStartAdding}
                className="flex items-center gap-1 animate-fade-in w-[200px] cursor-pointer"
            >
                <PlusCircle className="h-4 w-4" />
                Add Hotspot
            </Button>
        );
    }

    return (
        <Card className="w-[300px] glass-panel animate-fade-in">
            <CardHeader className="pb-4 flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Add New Hotspot</CardTitle>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCancelAdding}
                    className="h-8 w-8"
                >
                    <X className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="newTitle">Title</Label>
                    <Input
                        id="newTitle"
                        value={newHotspotData.title}
                        onChange={(e) =>
                            setNewHotspotData({
                                ...newHotspotData,
                                title: e.target.value,
                            })
                        }
                        placeholder="Hotspot title"
                        className="bg-background/50"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="newDescription">Description</Label>
                    <Textarea
                        id="newDescription"
                        value={newHotspotData.description}
                        onChange={(e) =>
                            setNewHotspotData({
                                ...newHotspotData,
                                description: e.target.value,
                            })
                        }
                        placeholder="Describe this hotspot..."
                        rows={4}
                        className="resize-none bg-background/50"
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    variant="default"
                    onClick={handleAddHotspot}
                    className="flex items-center gap-1"
                    disabled={isAddingHotspot}
                >
                    {isAddingHotspot ? "Click on model..." : "Place on Model"}
                </Button>
            </CardFooter>
        </Card>
    );
}
