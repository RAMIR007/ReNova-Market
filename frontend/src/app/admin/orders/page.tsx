
import db from "@/lib/db";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

export default async function OrdersPage() {
    const orders = await db.order.findMany({
        orderBy: { created_at: 'desc' },
        include: { user: true }
    });

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Pedidos</h1>

            <div className="border rounded-lg overflow-x-auto">
                <table className="w-full text-sm text-left min-w-[600px]">
                    <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                        <tr>
                            <th className="px-4 py-3">ID Pedido</th>
                            <th className="px-4 py-3">Cliente</th>
                            <th className="px-4 py-3">Fecha</th>
                            <th className="px-4 py-3">Total</th>
                            <th className="px-4 py-3">Estado</th>
                            <th className="px-4 py-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {orders.map((order: any) => (
                            <tr key={order.id} className="hover:bg-muted/10">
                                <td className="px-4 py-3 font-medium">#{order.id}</td>
                                <td className="px-4 py-3">{order.user?.email || 'Invitado'}</td>
                                <td className="px-4 py-3">{new Date(order.created_at).toLocaleDateString()}</td>
                                <td className="px-4 py-3">${Number(order.total_amount).toFixed(2)}</td>
                                <td className="px-4 py-3">
                                    <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                                        Pendiente
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <Button variant="ghost" size="sm">Ver Detalles</Button>
                                </td>
                            </tr>
                        ))}
                        {orders.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                                    No hay pedidos registrados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
