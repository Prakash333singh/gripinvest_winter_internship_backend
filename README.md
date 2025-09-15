
# 📖 README.md

```markdown
# Grip Invest - Mini Investment Platform (Backend)

This is the **backend service** for the Grip Invest Winter Internship 2025 project.  
It simulates a mini investment platform with authentication, product management, investments, transaction logging, and AI-powered insights.

---

## 🚀 Features
- **User Authentication**
  - Signup/Login with JWT
  - Password reset via OTP/email
  - AI password strength suggestions
- **Investment Products**
  - CRUD operations (admin only)
  - Fetch investment products for users
  - AI auto-generate product descriptions
- **Investments**
  - Users can invest in products
  - Business rules: min/max amounts, balance check
  - AI portfolio insights (risk distribution)
- **Transaction Logs**
  - Every API call logged (endpoint, status, error message)
  - AI error summaries
- **Health Monitoring**
  - `/health` endpoint shows service + DB status
- **Testing**
  - Jest unit + integration tests
  - >75% coverage target
- **DevOps**
  - Containerized backend + MySQL with Docker
  - Prisma ORM with migrations
  - DB seeding with sample products

---

## 🛠 Tech Stack
- **Backend Framework**: Node.js + Express + TypeScript
- **Database**: MySQL (Dockerized)
- **ORM**: Prisma
- **Auth**: JWT + Bcrypt
- **Mailer**: Nodemailer
- **Logger**: Pino
- **Testing**: Jest + Supertest
- **AI Helpers**: zxcvbn (password strength), custom insight generators

---

## 📂 Project Structure
```

backend/
├── prisma/              # Prisma schema & seed
├── src/
│   ├── controllers/     # Business logic per module
│   ├── middleware/      # Auth, adminGuard, transactionLogger
│   ├── routes/          # Express routes
│   ├── services/        # Reusable services (auth, email, product, etc.)
│   ├── utils/           # AI helpers, portfolio insights
│   ├── prisma.ts        # Prisma client
│   ├── index.ts         # App entrypoint
├── tests/               # Jest tests (unit + integration)
├── Dockerfile           # Backend Docker image
├── docker-compose.yml   # Backend + MySQL setup
├── .env                 # Environment variables
└── README.md

````

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/<your-username>/gripinvest_winter_internship_backend.git
cd gripinvest_winter_internship_backend/backend
````

### 2️⃣ Environment Variables

Create a `.env` file in `backend/`:

```env
DATABASE_URL="mysql://root:rootpassword@mysql:3306/gripinvest"
JWT_SECRET_KEY="your_secret"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your_email@gmail.com"
SMTP_PASS="your_app_password"
```

### 3️⃣ Run with Docker

Make sure Docker Desktop is running.

```bash
docker compose up -d --build
```

This will:

* Start a MySQL container
* Start backend API on `http://localhost:4000`

### 4️⃣ Database Migration + Seed

```bash
npx prisma migrate dev
npx prisma db seed
```

---

## 📡 API Endpoints

### Authentication

* `POST /auth/signup` → Signup
* `POST /auth/login` → Login
* `POST /auth/request-reset` → Request OTP
* `POST /auth/reset-password` → Reset password

### Products

* `GET /products` → List products
* `POST /products` → Create product (admin)
* `PUT /products/:id` → Update product (admin)
* `DELETE /products/:id` → Delete product (admin)

### Investments

* `POST /investments` → Invest in a product
* `GET /portfolio` → Fetch user portfolio + AI insights

### Logs

* `GET /logs` → View all logs (admin only)
* `GET /logs/summary` → AI error summary (admin only)

### Health

* `GET /health` → Service + DB status

---

## 🧪 Testing

Run unit + integration tests:

```bash
npm run test
```

Coverage report:

```bash
npm run test -- --coverage
```

---

## 🤖 AI Usage

This project integrates **AI-driven helpers**:

* **Password Strength**: zxcvbn suggests stronger passwords at signup.
* **Product Descriptions**: Auto-generated based on investment fields.
* **Portfolio Insights**: Risk distribution + investment summary.
* **Error Summarizer**: Groups & summarizes errors from transaction logs.

---

## 📜 Deliverables

* ✅ Working backend APIs with Postman collection
* ✅ Prisma schema + seed data
* ✅ Logs & monitoring endpoints
* ✅ Docker setup (backend, MySQL)
* ✅ Documentation (README + AI usage notes)

---

## 👤 Author

**Prakash Singh**
