# HomeWhirl — Modern PG & Hostel Management Operating System

HomeWhirl is a full-stack PG and Hostel management platform designed for property owners. It provides real-time financial tracking, floor & bed matrix customization, digital guest KYC ledgers, automated rent & utility invoicing, and staff-assigned maintenance ticket management.

---

## 🌟 Core Features

1. **Overview Dashboard**:
   - Total monthly revenue collection tracking
   - Occupancy rate graphs (occupied vs. vacant vs. maintenance beds)
   - Pending rent alert banners (`⚠️ ₹1.0K pending • 4 dues`) with 1-click payment settlement
   - Quick action buttons (*Add Tenant*, *Collect Rent*, *Issue Bill*)

2. **Floor & Room Matrix Customizer**:
   - Visual floor-wise (Ground Floor, Floor 1, Floor 2, etc.) and room-wise grid layout
   - Color-coded bed status: **Green** (`AVAILABLE`), **Red** (`OCCUPIED`), **Orange** (`MAINTENANCE`)
   - Customize floor names, room numbers, AC/Non-AC types, sharing options, and bed counts dynamically
   - Instant bed status toggle per slot

3. **Tenant Profile & Digital KYC View**:
   - Guest contact details, room/bed assignment, emergency contact, and joining dates
   - Digital KYC ledger with stored Aadhaar & PAN card credentials and image proof viewer
   - Complete tenant rent invoice and settlement history

4. **Billing & Operating Expense Tracker**:
   - Automated bill generator for rent + electricity/water breakdown
   - Profit & Loss summaries (Gross Collection − Expenses = Net Profit)
   - Instant printable digital payment receipts (`REC-XXXX`)

5. **Complaint & Issue Maintenance Desk**:
   - Centralized ticket list view for tenant maintenance requests
   - Staff assignment (*Ramesh Electrician*, *Suresh Plumber*, *Anita Housekeeping*, *Vijay Carpenter*)
   - Priority tracking and status flow (`OPEN` ➔ `IN_PROGRESS` ➔ `RESOLVED`)

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, React Icons, React Router DOM
- **Backend**: Node.js, Express.js REST API, JSON File DB System
- **Design System**: SUNBURN Color Palette (`#152935`, `#698ea2`, `#e4a576`, `#ccd5d2`, `#f1e5d6`)

---

## 🚀 Getting Started

### 1. Clone & Setup Backend
```bash
cd backend
npm install
npm run dev
```
Backend API will start on `http://localhost:5000`

### 2. Setup & Run Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend Web App will run on `http://localhost:5173`

---

## 📄 License

HomeWhirl SaaS Platform © 2026. All rights reserved.
