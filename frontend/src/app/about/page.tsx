import Image from "next/image";
import { MapPin, Users, Leaf } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-stone-900">
                <div className="absolute inset-0 z-0 opacity-50">
                    {/* Placeholder for a team or location image */}
                    <div className="w-full h-full bg-stone-800" />
                    {/* Note: In a real implementation, we'd use a real image here like:
               <Image src="/about-cover.jpg" fill className="object-cover" />
           */}
                </div>
                <div className="relative z-10 text-center max-w-2xl px-4">
                    <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6">Nuestra Historia</h1>
                    <p className="text-xl text-stone-200 font-light">
                        Redefiniendo el estilo y la tradición en el corazón de La Habana.
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 px-4 md:px-6 container mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                            <Leaf className="h-4 w-4" /> Nuestra Misión
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Más que una tienda, un movimiento.</h2>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            ReNova Market nació de la idea de que la moda y la decoración pueden tener una segunda vida más vibrante que la primera.
                            Nos dedicamos a curar prendas exclusivas y a potenciar el talento de los artesanos locales.
                        </p>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            Creemos en un futuro donde el consumo es consciente, donde cada objeto cuenta una historia y donde
                            la elegancia no está reñida con la sostenibilidad.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-square bg-stone-100 rounded-2xl flex items-center justify-center text-center p-6 border border-border">
                            <div>
                                <h3 className="font-serif text-4xl font-bold text-primary mb-2">100+</h3>
                                <p className="text-sm text-muted-foreground">Prendas Restauradas</p>
                            </div>
                        </div>
                        <div className="aspect-square bg-amber-50 rounded-2xl flex items-center justify-center text-center p-6 border border-amber-100">
                            <div>
                                <h3 className="font-serif text-4xl font-bold text-amber-600 mb-2">10+</h3>
                                <p className="text-sm text-muted-foreground text-amber-800/70">Artesanos Colaboradores</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Location & Team */}
            <section className="py-20 bg-secondary/30">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-3 gap-12 text-center">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="p-4 bg-background rounded-full shadow-sm">
                                <MapPin className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="font-serif text-xl font-bold">Ubicación</h3>
                            <p className="text-muted-foreground">
                                San Francisco de Paula,<br />
                                San Miguel del Padrón,<br />
                                La Habana, Cuba.
                            </p>
                        </div>

                        <div className="flex flex-col items-center space-y-4">
                            <div className="p-4 bg-background rounded-full shadow-sm">
                                <Users className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="font-serif text-xl font-bold">El Equipo</h3>
                            <p className="text-muted-foreground">
                                Fundado por Ramiro y potenciado por la creatividad de ConArte Boutique.
                                Un equipo pequeño con grandes sueños.
                            </p>
                        </div>

                        <div className="flex flex-col items-center space-y-4">
                            <div className="p-4 bg-background rounded-full shadow-sm">
                                <Leaf className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="font-serif text-xl font-bold">Values</h3>
                            <p className="text-muted-foreground">
                                Autenticidad.<br />
                                Sostenibilidad.<br />
                                Calidad sin compromisos.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
