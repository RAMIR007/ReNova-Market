
import db from "@/lib/db";
import { deleteProduct } from "../actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function ProductsPage({ searchParams }: { searchParams: { q?: string } }) {
    // Basic search implementation
    const query = searchParams?.q || "";
    const where: any = {};
    if (query) {
        where.name = { contains: query, mode: 'insensitive' };
    }

    const products = await db.product.findMany({
        where,
        orderBy: { created_at: 'desc' },
        include: { category: true }
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-bold">Productos</h1>
                <Link href="/admin/products/new">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" /> Añadir Producto
                    </Button>
                </Link>
            </div>

            {/* Search Bar */}
            <div className="flex gap-2 max-w-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <form>
                        <input
                            name="q"
                            defaultValue={query}
                            placeholder="Buscar productos..."
                            className="w-full bg-background border rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </form>
                </div>
            </div>

            <div className="border rounded-lg overflow-hidden bg-white dark:bg-card">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                        <tr>
                            <th className="px-4 py-3 w-[50px]">Img</th>
                            <th className="px-4 py-3">Nombre</th>
                            <th className="px-4 py-3">Categoría</th>
                            <th className="px-4 py-3">Precio</th>
                            <th className="px-4 py-3">Stock</th>
                            <th className="px-4 py-3">Estado</th>
                            <th className="px-4 py-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {products.map((p: any) => (
                            <tr key={p.id} className="hover:bg-muted/10 transition-colors">
                                <td className="px-4 py-3">
                                    <div className="relative h-10 w-10 rounded overflow-hidden bg-muted">
                                        {p.image && <Image src={p.image} alt={p.name} fill className="object-cover" />}
                                    </div>
                                </td>
                                <td className="px-4 py-3 font-medium">
                                    <Link href={`/admin/products/${p.id}`} className="hover:underline text-primary">
                                        {p.name}
                                    </Link>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">{p.category?.name || '-'}</td>
                                <td className="px-4 py-3">${Number(p.price_usd).toFixed(2)}</td>
                                <td className="px-4 py-3">{p.stock}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-0.5 rounded-full text-xs ${p.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {p.is_active ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/admin/products/${p.id}`}>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                        <form action={async () => {
                                            'use server';
                                            await deleteProduct(p.id);
                                        }}>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                                    No se encontraron productos.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
