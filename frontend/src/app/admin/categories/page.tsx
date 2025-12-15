
import db from "@/lib/db";
import { deleteCategory, createCategory } from "../actions";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
    const categories = await db.category.findMany({
        orderBy: { name: 'asc' },
        include: { _count: { select: { products: true } } }
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Categorías</h1>
                {/* Simple inline create form for MVP */}
                <form action={createCategory} className="flex gap-2">
                    <input
                        name="name"
                        placeholder="Nueva Categoría..."
                        required
                        className="px-3 py-2 border rounded-md text-sm bg-background"
                    />
                    <Button size="sm" type="submit">
                        <Plus className="w-4 h-4 mr-1" /> Añadir
                    </Button>
                </form>
            </div>

            <div className="border rounded-lg overflow-x-auto">
                <table className="w-full text-sm text-left min-w-[500px]">
                    <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                        <tr>
                            <th className="px-4 py-3">Nombre</th>
                            <th className="px-4 py-3">Slug</th>
                            <th className="px-4 py-3">Productos</th>
                            <th className="px-4 py-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {categories.map((cat: any) => (
                            <tr key={cat.id} className="hover:bg-muted/10">
                                <td className="px-4 py-3 font-medium">{cat.name}</td>
                                <td className="px-4 py-3 text-muted-foreground">{cat.slug}</td>
                                <td className="px-4 py-3">{cat._count.products}</td>
                                <td className="px-4 py-3 text-right">
                                    <form action={async () => {
                                        'use server';
                                        await deleteCategory(cat.id);
                                    }}>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                        {categories.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                                    No hay categorías registradas.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
