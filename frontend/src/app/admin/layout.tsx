import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Tag, ShoppingCart, Users, Home } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const navItems = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Productos", href: "/admin/products", icon: ShoppingBag },
        { name: "Categorías", href: "/admin/categories", icon: Tag },
        { name: "Pedidos", href: "/admin/orders", icon: ShoppingCart },
        { name: "Usuarios", href: "/admin/users", icon: Users },
    ];

    return (
        <div className="flex min-h-screen bg-muted/20">
            {/* Sidebar - Django Style (Darker) */}
            <aside className="w-64 bg-[#1f2937] text-white flex-shrink-0 hidden md:block">
                <div className="p-6 border-b border-gray-700">
                    <h2 className="text-xl font-bold tracking-tight">ReNova Admin</h2>
                    <p className="text-xs text-gray-400 mt-1">Gestión de Tienda</p>
                </div>
                <nav className="p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm"
                        >
                            <item.icon className="w-4 h-4" />
                            {item.name}
                        </Link>
                    ))}
                    <div className="pt-4 mt-4 border-t border-gray-700">
                        <Link
                            href="/"
                            className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm text-gray-300"
                        >
                            <Home className="w-4 h-4" />
                            Ver Sitio
                        </Link>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
