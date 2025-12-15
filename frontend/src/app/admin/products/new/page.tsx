
import { createProduct } from "../../actions";
import db from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function NewProductPage() {
    // Fetch categories for the dropdown
    const categories = await db.category.findMany({ orderBy: { name: 'asc' } });

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/products" className="text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-bold">Añadir Producto</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Detalles del Producto</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={createProduct} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium mb-2">Nombre del Producto</label>
                                <input name="name" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium mb-2">Descripción</label>
                                <textarea name="description" rows={4} required className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Precio (USD)</label>
                                <input name="price" type="number" step="0.01" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Tipo de Producto</label>
                                <select name="type" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                    <option value="FASHION">Moda / Ropa</option>
                                    <option value="CRAFT">Artesanía (ConArte)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Categoría</label>
                                <select name="category" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                    <option value="">Seleccionar Categoría...</option>
                                    {categories.map((c: any) => (
                                        <option key={c.id} value={c.name}>{c.name}</option>
                                    ))}
                                </select>
                                <p className="text-xs text-muted-foreground mt-1">Si escribes una nueva categoría en 'Acciones' esta lista se actualizará.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">URL de Imagen</label>
                                <input name="image_url" placeholder="https://..." className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 pt-4">
                            <Link href="/admin/products">
                                <Button variant="outline" type="button">Cancelar</Button>
                            </Link>
                            <Button type="submit">Guardar Producto</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
