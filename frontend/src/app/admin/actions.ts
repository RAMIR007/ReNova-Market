'use server';

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// ... createProduct function

export async function updateProduct(id: number, formData: FormData) {
    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string);
    const cost = formData.get("cost") ? parseFloat(formData.get("cost") as string) : null;
    const description = formData.get("description") as string;
    const type = formData.get("type") as 'FASHION' | 'CRAFT';
    const categoryName = formData.get("category") as string;
    const image = formData.get("image_url") as string || null;

    let category = await db.category.findUnique({ where: { slug: categoryName.toLowerCase() } });
    if (!category) {
        category = await db.category.create({
            data: {
                name: categoryName,
                slug: categoryName.toLowerCase().replace(/\s+/g, '-'),
            }
        });
    }

    await db.product.update({
        where: { id },
        data: {
            name,
            description,
            price_usd: price,
            cost: cost,
            product_type: type,
            image: typeof image === 'string' && image.length > 0 ? image : "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1000",
            category_id: category.id,
        }
    });

    revalidatePath('/shop');
    revalidatePath('/admin');
    revalidatePath('/admin/products');
    redirect('/admin/products');
}

export async function createProduct(formData: FormData) {
    // ... existing content (I'll just let it be, but I need to make sure I don't break it)
    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string);
    const cost = formData.get("cost") ? parseFloat(formData.get("cost") as string) : null;
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
            cost: cost,
            product_type: type,
            image: typeof image === 'string' && image.length > 0 ? image : "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1000",
            category_id: category.id,
            stock: 1, // Default
        }
    });

    revalidatePath('/shop');
    revalidatePath('/admin');
    revalidatePath('/admin/products');
    redirect('/admin/products');
}

// ... previous code
export async function deleteProduct(id: number) {
    await db.product.delete({ where: { id } });
    revalidatePath('/admin');
    revalidatePath('/admin/products');
}

export async function createCategory(formData: FormData) {
    const name = formData.get("name") as string;
    const slug = name.toLowerCase().replace(/\s+/g, '-');

    try {
        await db.category.create({
            data: {
                name,
                slug,
            }
        });
        revalidatePath('/admin/categories');
    } catch (e) {
        console.error("Failed to create category", e);
    }
}

export async function deleteCategory(id: number) {
    try {
        await db.category.delete({ where: { id } });
        revalidatePath('/admin/categories');
    } catch (e) {
        // Likely caused by foreign key constraint (products in category)
        console.error("Failed to delete category", e);
    }
}

export async function login(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // TODO: Implement proper database auth with password hashing
    // For now, using hardcoded credentials as requested for security improvement
    if (email === "admin@renova.com" && password === "admin123") {
        const cookieStore = await cookies();
        cookieStore.set("admin_session", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });
        redirect("/admin");
    } else {
        redirect("/admin/login?error=InvalidCredentials");
    }
}

export async function updateOrderStatus(formData: FormData) {
    const id = parseInt(formData.get("id") as string);
    const status = formData.get("status") as string;

    await db.order.update({
        where: { id },
        data: { status }
    });

    revalidatePath(`/admin/orders/${id}`);
    revalidatePath('/admin/orders');
    revalidatePath('/admin');
}

