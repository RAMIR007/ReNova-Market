"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ImagePlus, Trash } from 'lucide-react';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';

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

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onUpload = (result: any) => {
        if (result.info && result.info.secure_url) {
            onChange(result.info.secure_url);
        }
    };

    if (!isMounted) return null;

    return (
        <div>
            {/* Hidden Input for Form Submission */}
            {value.length > 0 ? (
                value.map((url, i) => (
                    <input key={i} type="hidden" name="image_url" value={url} />
                ))
            ) : (
                <input type="hidden" name="image_url" value="" />
            )}

            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden bg-secondary border border-border">
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

            <CldUploadWidget
                uploadPreset="RenovaMarket"
                onSuccess={onUpload}
                options={{
                    maxFiles: 1,
                    sources: ['local', 'url'],
                    clientAllowedFormats: ['png', 'jpeg', 'jpg', 'webp'],
                    maxFileSize: 1500000, // 1.5MB limit enforced before upload
                    maxImageWidth: 2000, // Resize large images before upload
                    resourceType: 'image',
                    // Client-side validation: Cloudinary widget can validate size/type before upload.
                    // Note: True format conversion (e.g. force to WebP) implies Cloudinary transformation usage 
                    // which consumes credits or is done on-the-fly. 
                    // To save storage/credits, we limit the size of what gets uploaded.
                }}
            >
                {({ open }) => {
                    return (
                        <Button
                            type="button"
                            disabled={disabled}
                            variant="secondary"
                            onClick={() => open()}
                        >
                            <ImagePlus className="h-4 w-4 mr-2" />
                            Subir Imagen (Cloudinary)
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
}
