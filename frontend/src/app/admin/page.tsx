
import Link from "next/link";
import db from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Tag, ShoppingCart, Users } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const [productCount, categoryCount, orderCount, userCount] = await Promise.all([
        db.product.count(),
        db.category.count(),
        db.order.count(),
        db.user.count(),
    ]);

    const recentOrders = await db.order.findMany({
        take: 5,
        orderBy: { created_at: 'desc' },
        include: { user: true },
    });

    const lowStockProducts = await db.product.findMany({
        where: { stock: { lt: 5 } },
        take: 5,
        orderBy: { stock: 'asc' }
    });

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Bienvenido al panel de administración de ReNova Market.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <DashboardCard title="Productos" value={productCount} icon={ShoppingBag} href="/admin/products" />
                <DashboardCard title="Categorías" value={categoryCount} icon={Tag} href="/admin/categories" />
                <DashboardCard title="Pedidos" value={orderCount} icon={ShoppingCart} href="/admin/orders" />
                <DashboardCard title="Usuarios" value={userCount} icon={Users} href="/admin/users" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="border rounded-lg bg-card p-6">
                    <h3 className="font-semibold text-lg mb-4 text-red-600">Alerta de Stock Bajo</h3>
                    {lowStockProducts.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Todos los productos tienen buen stock.</p>
                    ) : (
                        <ul className="space-y-3">
                            {lowStockProducts.map((p: any) => (
                                <li key={p.id} className="flex justify-between items-center text-sm">
                                    <Link href={`/admin/products/${p.id}`} className="hover:underline truncate max-w-[200px]">
                                        {p.name}
                                    </Link>
                                    <span className="font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full text-xs">
                                        {p.stock} unid.
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="border rounded-lg bg-card p-6">
                    <h3 className="font-semibold text-lg mb-4">Últimos Pedidos</h3>
                    {recentOrders.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No hay pedidos recientes.</p>
                    ) : (
                        <ul className="space-y-3">
                            {recentOrders.map((order: any) => (
                                <li key={order.id} className="flex justify-between text-sm">
                                    <span>Pedido #{order.id}</span>
                                    <span className="font-medium">${Number(order.total_amount).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

function DashboardCard({ title, value, icon: Icon, href }: any) {
    return (
        <Link href={href}>
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                    <h3 className="tracking-tight text-sm font-medium">{title}</h3>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="p-6 pt-0">
                    <div className="text-2xl font-bold">{value}</div>
                </div>
            </div>
        </Link>
    );
}
