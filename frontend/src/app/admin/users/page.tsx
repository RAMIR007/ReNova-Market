
import db from "@/lib/db";

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
    const users = await db.user.findMany({
        orderBy: { created_at: 'desc' }
    });

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Usuarios</h1>
            <div className="border rounded-lg overflow-x-auto">
                <table className="w-full text-sm text-left min-w-[500px]">
                    <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                        <tr>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Nombre</th>
                            <th className="px-4 py-3">Fecha Registro</th>
                            <th className="px-4 py-3">Admin</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {users.map((user: any) => (
                            <tr key={user.id} className="hover:bg-muted/10">
                                <td className="px-4 py-3 font-medium">{user.email}</td>
                                <td className="px-4 py-3">{user.first_name} {user.last_name}</td>
                                <td className="px-4 py-3">{new Date(user.date_joined).toLocaleDateString()}</td>
                                <td className="px-4 py-3">{user.is_staff ? 'Sí' : 'No'}</td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                                    No hay usuarios registrados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
