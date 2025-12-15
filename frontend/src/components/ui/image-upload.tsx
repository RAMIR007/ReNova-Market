
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ImagePlus, Trash } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

export default function ImageUpload({
    disabled,
    onChange,
    onRemove,
    value
}: ImageUploadProps) {
    const [isMounted, setIsMounted] = useState(false);

    // Prevent hydration mismatch
    useState(() => {
        setIsMounted(true);
    });

    if (!isMounted) return null;

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <Button
                                type="button"
                                onClick={() => onRemove(url)}
                                variant="destructive"
                                size="icon"
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Image"
                            src={url}
                        />
                    </div>
                ))}
            </div>
            {/** 
             * NOTE: For MVP, we are using a simple URL input in the form.
             * Real Cloudinary upload widget would use CLD Upload Widget scripts 
             * or a server action to upload files.
             * For now, this component is a visual placeholder for where the widget would go.
             */}
            <Button
                type="button"
                disabled={disabled}
                variant="secondary"
                onClick={() => {
                    // In a real implementation this would open the widget
                    const url = prompt("Enter Image URL (Simulating Cloudinary Upload):");
                    if (url) onChange(url);
                }}
            >
                <ImagePlus className="h-4 w-4 mr-2" />
                Upload an Image
            </Button>
        </div>
    );
}
