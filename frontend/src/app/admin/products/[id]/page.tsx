
import { updateProduct } from "../../actions";
import db from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import ProductImageFormItem from "@/components/admin/ProductImageFormItem";

export const dynamic = 'force-dynamic';

export default async function EditProductPage({ params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    if (isNaN(id)) notFound();

    const product = await db.product.findUnique({
        where: { id },
        include: { category: true }
    });

    if (!product) notFound();

    const categories = await db.category.findMany({ orderBy: { name: 'asc' } });
    const updateProductWithId = updateProduct.bind(null, id);

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/products" className="text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-bold">Editar Producto</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Detalles del Producto</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={updateProductWithId} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium mb-2">Nombre del Producto</label>
                                <input name="name" defaultValue={product.name} required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium mb-2">Descripción</label>
                                <textarea name="description" defaultValue={product.description} rows={4} required className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Precio (USD)</label>
                                <input name="price" defaultValue={Number(product.price_usd)} type="number" step="0.01" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Costo (Visible solo para admin)</label>
                                <input name="cost" defaultValue={product.cost ? Number(product.cost) : ''} type="number" step="0.01" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Ej: 15.00" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Tipo de Producto</label>
                                <select name="type" defaultValue={product.product_type} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                    <option value="FASHION">Moda / Ropa</option>
                                    <option value="CRAFT">Artesanía (ConArte)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Categoría</label>
                                <select name="category" defaultValue={product.category?.name} required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                    {categories.map((c: any) => (
                                        <option key={c.id} value={c.name}>{c.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <ProductImageFormItem initialValue={product.image} />
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 pt-4">
                            <Link href="/admin/products">
                                <Button variant="outline" type="button">Cancelar</Button>
                            </Link>
                            <Button type="submit">Guardar Cambios</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
