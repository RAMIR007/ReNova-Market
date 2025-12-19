# ReNova Market - E-Commerce Platform

ReNova Market is a modern e-commerce platform built with Next.js, tailored for the Cuban market. It features a robust administration panel, dynamic product management, and a user-friendly shopping experience.

## 🚀 Features

### 🛍️ User Experience (Storefront)
- **Modern UI/UX**: Responsive design with a clean, "Apple-like" aesthetic.
- **Product Catalog**: Browse products by category (Fashion, Crafts/ConArte, etc.).
- **Product Details**: View detailed product information including price, descriptions, and high-quality images.
- **Shopping Cart**: (In Progress) Functionality to add items and manage cart.
- **Stories**: Instagram-like stories features for showcasing products.

### 🛡️ Administration Panel (/admin)
The platform includes a comprehensive admin dashboard protected by authentication.

- **Dashboard**:
  - **Overview**: Real-time stats for Products, Categories, Orders, and Users.
  - **Low Stock Alerts**: Automatic alerts for products running low on inventory (< 5 units).
  - **Recent Orders**: Quick view of the latest purchases.

- **Product Management**:
  - **CRUD Operations**: Create, Read, Update, and Delete products.
  - **Cost Tracking**: Special field for product cost (visible only to admins) to calculate margins.
  - **Image Management**: Support for external image URLs.
  - **Categorization**: Assign products to dynamic categories.

- **Order Management**:
  - **Full Lifecycle**: View orders and manage status (Pending -> Shipped -> Completed -> Cancelled).
  - **Detailed View**: Inspect order items, customer details, and total amounts.
  - **Visual Feedback**: Color-coded status badges.

- **Category Management**: Create and delete product categories.
- **User Management**: View registered users and their details.

## 🔑 Admin Credentials

To access the administration panel, go to `/admin` and use the following credentials:
> **Note**: These are default credentials for the development environment. Change them for production.

- **URL**: `http://localhost:3000/admin`
- **Email**: `admin@renova.com`
- **Password**: `admin123`

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (via Neon DB)
- **ORM**: Prisma
- **Styling**: Tailwind CSS / Vanilla CSS
- **UI Components**: Lucide React Icons

## 📦 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Database Setup**:
   Ensure your `.env` file is configured with your `DATABASE_URL`.
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```
