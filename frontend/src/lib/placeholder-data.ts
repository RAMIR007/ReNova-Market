export interface Product {
    id: number;
    name: string;
    slug: string;
    priceUSD: number;
    image: string;
    category: string;
    type: 'FASHION' | 'CRAFT';
    condition?: 'LIKE_NEW' | 'GOOD' | 'FAIR';
    origin?: string;
    description?: string;
}

export const PRODUCTS: Product[] = [
    {
        id: 1,
        name: "Camisa de Lino Vintage",
        slug: "vintage-linen-shirt",
        priceUSD: 25.00,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop",
        category: "Moda Masculina",
        condition: "LIKE_NEW",
        type: 'FASHION',
        description: "Una camisa de lino clásica, perfecta para el clima de La Habana. Restaurada con cuidado."
    },
    {
        id: 2,
        name: "Cesta de Palma Tejida a Mano",
        slug: "palm-basket",
        priceUSD: 15.00,
        image: "https://images.unsplash.com/photo-1584107858602-5dba6cb3d47b?q=80&w=1000&auto=format&fit=crop",
        category: "Decoración",
        origin: "San Francisco de Paula",
        type: 'CRAFT',
        description: "Cesta tradicional tejida por artesanos locales usando técnicas ancestrales."
    },
    {
        id: 3,
        name: "Bolso Satchel de Cuero",
        slug: "leather-satchel",
        priceUSD: 45.00,
        image: "https://images.unsplash.com/photo-1590874102752-ce335b869271?q=80&w=1000&auto=format&fit=crop",
        category: "Accesorios",
        condition: "GOOD",
        type: 'FASHION',
        description: "Bolso de cuero genuino con carácter y durabilidad. Un compañero ideal para el día a día."
    },
    {
        id: 4,
        name: "Jarrón de Cerámica 'Habana'",
        slug: "ceramic-vase",
        priceUSD: 30.00,
        image: "https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?q=80&w=1000&auto=format&fit=crop",
        category: "Artesanía",
        origin: "Artesano Local",
        type: 'CRAFT',
        description: "Pieza única de cerámica inspirada en los colores de La Habana Vieja."
    },
    {
        id: 5,
        name: "Vestido de Verano Floral",
        slug: "floral-summer-dress",
        priceUSD: 35.00,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop",
        category: "Moda Femenina",
        condition: "LIKE_NEW",
        type: 'FASHION',
        description: "Vestido ligero y fresco con estampado floral vintage."
    },
    {
        id: 6,
        name: "Sombrero de Yarey",
        slug: "yarey-hat",
        priceUSD: 12.00,
        image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1000&auto=format&fit=crop",
        category: "Accesorios",
        origin: "Vinales",
        type: 'CRAFT',
        description: "El auténtico sombrero cubano, ideal para protegerse del sol con estilo."
    },
    {
        id: 7,
        name: "Cámara Retro Restaurada",
        slug: "retro-camera",
        priceUSD: 120.00,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
        category: "Coleccionables",
        condition: "GOOD",
        type: 'FASHION', // Using FASHION for vintage items for now or need a new type? Sticking to plan.
        description: "Cámara analógica totalmente funcional, una joya para coleccionistas."
    },
    {
        id: 8,
        name: "Juego de Dominó Artesanal",
        slug: "domino-set",
        priceUSD: 50.00,
        image: "https://images.unsplash.com/photo-1599850659976-5a4eb3544eb1?q=80&w=1000&auto=format&fit=crop", // generic board game image
        category: "Juegos",
        origin: "La Habana",
        type: 'CRAFT',
        description: "Juego de dominó hecho a mano con maderas preciosas cubanas."
    }
];
