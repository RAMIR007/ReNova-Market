import { createProduct, deleteProduct } from "./actions";
import db from "@/lib/db";

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    const products = await db.product.findMany({
        orderBy: { created_at: 'desc' },
        include: { category: true }
    });

    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Create Form */}
                <div className="bg-card p-6 rounded-lg border shadow-sm h-fit">
                    <h2 className="text-xl font-semibold mb-4">Añadir Producto</h2>
                    <form action={createProduct} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Nombre</label>
                            <input name="name" required className="w-full p-2 border rounded bg-background" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Descripción</label>
                            <textarea name="description" required className="w-full p-2 border rounded bg-background" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Precio (USD)</label>
                                <input name="price" type="number" step="0.01" required className="w-full p-2 border rounded bg-background" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Tipo</label>
                                <select name="type" className="w-full p-2 border rounded bg-background">
                                    <option value="FASHION">Moda</option>
                                    <option value="CRAFT">Artesanía</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Categoría (Nombre)</label>
                            <input name="category" required placeholder="Ej. Vestidos" className="w-full p-2 border rounded bg-background" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">URL de Imagen</label>
                            <input name="image_url" placeholder="https://..." className="w-full p-2 border rounded bg-background" />
                        </div>
                        <button type="submit" className="w-full bg-primary text-primary-foreground py-2 rounded">
                            Crear Producto
                        </button>
                    </form>
                </div>

                {/* List */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Inventario ({products.length})</h2>
                    <div className="space-y-2">
                        {products.map(p => (
                            <div key={p.id} className="flex justify-between items-center p-3 border rounded bg-card">
                                <div>
                                    <p className="font-medium">{p.name}</p>
                                    <p className="text-xs text-muted-foreground">{p.category?.name} - ${p.price_usd.toString()}</p>
                                </div>
                                <form action={async () => {
                                    'use server';
                                    await deleteProduct(p.id);
                                }}>
                                    <button className="text-red-500 text-sm hover:underline">Eliminar</button>
                                </form>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
