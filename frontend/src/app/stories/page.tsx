import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";

export default function StoriesPage() {
    // Mock Stories
    const stories = [
        {
            id: 1,
            title: "El Renacer del Lino: Restaurando Clásicos",
            excerpt: "Descubre el proceso detrás de la restauración de nuestras camisas de lino vintage, devolviéndoles su brillo original.",
            date: "10 Dic 2024",
            image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1000&auto=format&fit=crop",
            author: "Ramiro"
        },
        {
            id: 2,
            title: "Artesanía en San Francisco de Paula",
            excerpt: "Una visita al taller de ConArte Boutique, donde la magia sucede entre hilos y texturas.",
            date: "05 Dic 2024",
            image: "https://images.unsplash.com/photo-1459749411177-0473ef71607b?q=80&w=1000&auto=format&fit=crop",
            author: "ConArte"
        },
        {
            id: 3,
            title: "Guía de Estilo: Verano en La Habana",
            excerpt: "Consejos esenciales para mantenerte fresco y elegante durante los meses más calurosos del año.",
            date: "28 Nov 2024",
            image: "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?q=80&w=1000&auto=format&fit=crop",
            author: "ReNova Team"
        }
    ];

    return (
        <div className="container mx-auto px-4 md:px-6 py-12 min-h-screen">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Historias ReNova</h1>
                <p className="text-muted-foreground text-lg">
                    Crónicas de estilo, artesanía y la vida en Cuba.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stories.map((story) => (
                    <article key={story.id} className="flex flex-col group cursor-pointer">
                        <div className="relative aspect-video overflow-hidden rounded-lg mb-4 bg-secondary">
                            <Image
                                src={story.image}
                                alt={story.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" /> {story.date}
                            </span>
                            <span>•</span>
                            <span>Por {story.author}</span>
                        </div>
                        <h2 className="font-serif text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {story.title}
                        </h2>
                        <p className="text-muted-foreground line-clamp-3 mb-4">
                            {story.excerpt}
                        </p>
                        <div className="mt-auto pt-4">
                            <span className="text-primary font-medium text-sm hover:underline">Leer más</span>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
