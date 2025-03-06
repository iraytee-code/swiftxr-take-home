/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from "react";
import { Upload, FileUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useModel } from "@/hooks/model-context";
import { toast } from "sonner";

export default function FileUpload() {
    const [isDragging, setIsDragging] = useState(false);
    const { setModel } = useModel();

    const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const onDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            setIsDragging(false);
            const files = e.dataTransfer.files;
            handleFiles(files);
        },
        [setModel]
    );

    const handleFileInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
                handleFiles(e.target.files);
            }
        },
        [setModel]
    );

    const handleFiles = (files: FileList) => {
        if (files.length === 0) return;

        const file = files[0];
        const fileType = file.name.split(".").pop()?.toLowerCase();

        if (fileType !== "glb") {
            toast.info("Error: Unsupported file format. Please upload a GLB");
            return;
        }

        setModel(file);
        toast.success(`Loaded ${file.name}`);
    };
    return (
        <div
            className={cn(
                "file-drop-area w-full p-10 border-2 border-dashed rounded-lg bg-secondary/30 transition-all duration-200 ease-in-out animate-fade-in",
                isDragging && "upload-drop-active scale-[1.02]"
            )}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
        >
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-primary" />
                </div>
                <div className="text-center">
                    <h3 className="text-lg font-medium mb-1">
                        Drag & Drop your 3D model
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Supports GLB
                    </p>
                    <label
                        htmlFor="model-upload"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
                    >
                        <FileUp className="w-4 h-4" />
                        <span>Browse Files</span>
                        <input
                            id="model-upload"
                            type="file"
                            accept=".glb"
                            className="hidden"
                            onChange={handleFileInput}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
}
