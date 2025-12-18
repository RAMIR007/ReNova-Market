
import db from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Package, User, Clock, CheckCircle, XCircle, Truck } from "lucide-react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { updateOrderStatus } from "../../actions";

export const dynamic = 'force-dynamic';

export default async function OrderDetailsPage({ params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    if (isNaN(id)) notFound();

    const order = await db.order.findUnique({
        where: { id },
        include: {
            user: true,
            items: {
                include: {
                    product: true
                }
            }
        }
    });

    if (!order) notFound();

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'COMPLETED': return 'bg-green-100 text-green-700';
            case 'CANCELLED': return 'bg-red-100 text-red-700';
            case 'SHIPPED': return 'bg-blue-100 text-blue-700';
            default: return 'bg-yellow-100 text-yellow-800';
        }
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-4">
                <Link href="/admin/orders" className="text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-bold">Pedido #{order.id}</h1>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                </span>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Main Content - Items */}
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Package className="w-5 h-5" /> Productos
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {order.items.map((item: any) => (
                                    <div key={item.id} className="flex items-center gap-4 border-b last:border-0 pb-4 last:pb-0">
                                        <div className="relative w-16 h-16 rounded overflow-hidden bg-muted flex-shrink-0">
                                            {item.product.image && (
                                                <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium">{item.product.name}</h4>
                                            <p className="text-sm text-muted-foreground">Cantidad: {item.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">${Number(item.price).toFixed(2)}</p>
                                            <p className="text-xs text-muted-foreground">Total: ${(Number(item.price) * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                                {order.items.length === 0 && (
                                    <p className="text-muted-foreground">Este pedido no tiene items (Legacy Order).</p>
                                )}
                            </div>
                            <div className="mt-6 pt-4 border-t flex justify-between items-center">
                                <span className="font-medium">Total del Pedido</span>
                                <span className="text-xl font-bold">${Number(order.total_amount).toFixed(2)}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar - Customer & Actions */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="w-5 h-5" /> Cliente
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Nombre</p>
                                <p>{order.user.first_name} {order.user.last_name}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Email</p>
                                <p>{order.user.email}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Fecha de Registro</p>
                                <p>{new Date(order.user.created_at).toLocaleDateString()}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="w-5 h-5" /> Estado del Pedido
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <form action={updateOrderStatus}>
                                <input type="hidden" name="id" value={order.id} />
                                <input type="hidden" name="status" value="PENDING" />
                                <Button variant={order.status === 'PENDING' ? 'secondary' : 'outline'} className="w-full justify-start mb-2" disabled={order.status === 'PENDING'}>
                                    <Clock className="w-4 h-4 mr-2" /> Marcar como Pendiente
                                </Button>
                            </form>
                            <form action={updateOrderStatus}>
                                <input type="hidden" name="id" value={order.id} />
                                <input type="hidden" name="status" value="SHIPPED" />
                                <Button variant={order.status === 'SHIPPED' ? 'secondary' : 'outline'} className="w-full justify-start mb-2" disabled={order.status === 'SHIPPED'}>
                                    <Truck className="w-4 h-4 mr-2" /> Marcar como Enviado
                                </Button>
                            </form>
                            <form action={updateOrderStatus}>
                                <input type="hidden" name="id" value={order.id} />
                                <input type="hidden" name="status" value="COMPLETED" />
                                <Button variant={order.status === 'COMPLETED' ? 'secondary' : 'outline'} className="w-full justify-start mb-2 text-green-600 hover:text-green-700" disabled={order.status === 'COMPLETED'}>
                                    <CheckCircle className="w-4 h-4 mr-2" /> Marcar como Completado
                                </Button>
                            </form>
                            <form action={updateOrderStatus}>
                                <input type="hidden" name="id" value={order.id} />
                                <input type="hidden" name="status" value="CANCELLED" />
                                <Button variant={order.status === 'CANCELLED' ? 'secondary' : 'outline'} className="w-full justify-start text-red-600 hover:text-red-700" disabled={order.status === 'CANCELLED'}>
                                    <XCircle className="w-4 h-4 mr-2" /> Cancelar Pedido
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
