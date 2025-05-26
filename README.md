# mini-shopping-cart

##  Overview
A full-stack shopping cart application with:
- **Frontend**: React.js (deployed on Vercel)
- **Backend**: Go/Gin (deployed on Render)
- **Database**: Simple JSON based file I/O (Render free tier)

## Live Demo
   (Expect delay in 1 st response its due to cold start of backend service)
- **Frontend**: [https://mini-shopping-cart-comu.vercel.app/](https://mini-shopping-cart-comu.vercel.app/)
- **Backend API**: [https://mini-shopping-cart-oreg.onrender.com](https://mini-shopping-cart-oreg.onrender.com)

## Tech Stack
| Component       | Technology                          |
|-----------------|-------------------------------------|
| Frontend        | React 19, Javascript, Vite, CSS |
| Backend         | Go 1.23, Gin Framework             |
| Frontend Hosting| Vercel (Free tier)                 |
| Backend Hosting | Render (Free tier)                 |

## Features
- Browse products with categories
- Add/remove items from cart
- Adjust quantities
- Responsive design
- Order flow

## Setup Instructions

### Frontend (Vercel)
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file:
   ```env
   VITE_API_BASE_URL=https://mini-shopping-cart-oreg.onrender.com
   ```
4. Run development server:
   ```bash
   npm run dev
   ```

### Backend (Render)
1. Navigate to backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   go mod tidy
   ```
3. Create `.env` file:
   ```env
   PORT=8000
   TRUSTED_ORIGIN=https://mini-shopping-cart-comu.vercel.app
   ```
4. Run server:
   ```bash
   go run cmd/api/main.go
   ```

## Deployment

### Frontend to Vercel
1. Push code to GitHub repository
2. Import project in [Vercel dashboard](https://vercel.com)
3. Add environment variable:
   - `VITE_API_BASE_URL` = Your Render backend URL
4. Deploy!

### Backend to Render
1. Create new Web Service on [Render dashboard](https://dashboard.render.com)
2. Connect your GitHub repository
3. Configure:
   - Runtime: Go
   - Build Command: `go build -o app ./cmd/api/main.go`
   - Start Command: `./app`
4. Add environment variables:
   - `TRUSTED_ORIGIN` = FRONTEND DOMAIN name
5. Deploy!
