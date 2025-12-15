"use client";

import { useState } from 'react';
import ImageUpload from '@/components/ui/image-upload';

interface ProductImageFormItemProps {
    initialValue?: string | null;
}

export default function ProductImageFormItem({ initialValue }: ProductImageFormItemProps) {
    const [imageUrl, setImageUrl] = useState(initialValue || '');

    return (
        <div>
            <label className="block text-sm font-medium mb-2">Imagen del Producto</label>
            <ImageUpload
                value={imageUrl ? [imageUrl] : []}
                onChange={(url) => setImageUrl(url)}
                onRemove={() => setImageUrl('')}
            />
        </div>
    );
}
