# PawQuest 🐾

PawQuest is a complete, modern, responsive e-commerce website for pet products. It includes a React frontend, an Express backend for persistent cart/wishlist/auth/order data, and sample pet product data.

## Features

- **Beautiful homepage** with hero banner, category highlights, featured products, perks, and newsletter section
- **Product catalog** with categories, search, sorting, and product detail pages
- **Shopping experience**: Add to Cart, Buy Now, cart quantity controls, totals, and checkout
- **Wishlist** with persistent storage
- **Auth**: Register/Login/Logout with server-side persistence (demo auth)
- **Checkout** with shipping form and sample payment options (Card, PayPal, Cash on Delivery)
- **Responsive design** for mobile and desktop
- **Persistent data**: cart and wishlist stored in browser localStorage and synced to backend when logged in; users/orders/carts/wishlists stored in `server/data/db.json`

## Tech Stack

- **Frontend**: React 18, React Router, Vite, custom CSS
- **Backend**: Node.js, Express, CORS, nanoid
- **Storage**: JSON file (`server/data/db.json`) for demo persistence

## Project Structure

```text
pawquest/
  README.md
  package.json                # root scripts (concurrently)
  server/
    package.json
    index.js                  # Express API
    data/
      db.json                 # created automatically on first run
  client/
    package.json
    vite.config.js
    index.html
    src/
      App.jsx
      main.jsx
      components/
      context/
      data/
      pages/
      styles/
```

## Getting Started

### Prerequisites

- **Node.js 18+** (Node 20+ recommended)
- **npm**

### 1. Install dependencies

From the project root (`C:\pawquest`):

```bash
npm install
npm run install:all
```

This installs root, server, and client dependencies.

### 2. Run the app in development

From the project root:

```bash
npm run dev
```

This starts:
- **Backend API**: http://localhost:5000
- **Frontend (Vite)**: http://localhost:5173

Open http://localhost:5173 in your browser.

### Run frontend/backend separately (optional)

```bash
# Terminal 1
npm run server

# Terminal 2
npm run client
```

## Build for production

Build the frontend:

```bash
npm run build
```

The production build is generated in `client/dist`.

To run the backend only (API):

```bash
npm run start
```

> Note: The backend serves the API. For production deployment, serve `client/dist` with a static host or add static serving to Express and point it to the built client.

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/me` - Current user (requires `x-user-id` header)
- `GET /api/cart` - Get cart
- `PUT /api/cart` - Save cart
- `GET /api/wishlist` - Get wishlist
- `PUT /api/wishlist` - Save wishlist
- `POST /api/orders` - Create order
- `GET /api/orders` - List user orders

## Sample Data

Initial products are defined in `client/src/data/products.js` and include all required categories:
- Dog food
- Cat food
- Pet toys
- Pet accessories
- Grooming products
- Pet beds and clothing

## Notes

- Authentication is demo-grade for local use (passwords stored in plain text in `server/data/db.json`). Do not use as-is for real production.
- Checkout payment is a sample flow; no real payments are processed.
- Cart and wishlist persist locally and sync to the backend when a user is logged in.

## Troubleshooting

- **Port in use**: Change frontend port in `client/vite.config.js` or backend `PORT` env var.
- **API errors in dev**: Ensure backend is running on port 5000; Vite proxies `/api` to `http://localhost:5000`.
- **Reset demo data**: Stop the server and delete `server/data/db.json`. It will be recreated on next start.
