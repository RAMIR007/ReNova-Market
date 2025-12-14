'use server';

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string);
    const description = formData.get("description") as string;
    const type = formData.get("type") as 'FASHION' | 'CRAFT';
    const categoryName = formData.get("category") as string;
    // Handle image upload properly in real app (e.g. S3/Blob). 
    // Here we assume a URL or just a placeholder for MVP.
    const image = formData.get("image_url") as string || null;

    // Simple category logic: find or create
    let category = await db.category.findUnique({ where: { slug: categoryName.toLowerCase() } });
    if (!category) {
        category = await db.category.create({
            data: {
                name: categoryName,
                slug: categoryName.toLowerCase().replace(/\s+/g, '-'),
            }
        });
    }

    await db.product.create({
        data: {
            name,
            slug: name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
            description,
            price_usd: price,
            product_type: type,
            image,
            category_id: category.id,
            stock: 1, // Default
        }
    });

    revalidatePath('/shop');
    revalidatePath('/admin');
    redirect('/admin');
}

export async function deleteProduct(id: number) {
    await db.product.delete({ where: { id } });
    revalidatePath('/admin');
}
