# 💳 SmartReimburse: Automated Expense Management System
SmartReimburse is a full-stack enterprise solution designed to eliminate the friction of manual expense reporting. It features a dynamic, multi-level approval engine, automated OCR receipt processing, and real-time currency conversion for global teams.

## 🚀 Core Tech Stack
Backend: Python, Django REST Framework (DRF)

Frontend: React.js, Material UI (MUI)

Database: PostgreSQL (Production) / SQLite (Development)

## External APIs:

RestCountries API for localized currency settings.

ExchangeRate API for real-time expense conversion.

OCR Engine: Tesseract OCR / Google Vision API (for automated data extraction from receipts).

## 🛠 Features & System Architecture
### 1. Multi-Tenant Onboarding
Auto-Provisioning: Upon the first Admin signup, the system automatically creates a Company profile.

Localization: Detects the country and sets the Default Company Currency using the RestCountries API.

User Hierarchy: Admins can define organizational structures, linking Employees to their respective Managers.

### 2. Intelligent Approval Engine
The heart of the system is a flexible workflow designer that supports sequential and conditional logic:

Sequential Steps: Define paths like Manager → Finance → Director.

Conditional Rules:

Percentage Rule: Approved if X% of a board approves.

Specific Approver Rule: Auto-approval if a high-level role (e.g., CFO) signs off.

Hybrid Logic: Combines thresholds and specific roles (e.g., "60% approval OR CFO approval").

### 3. Automated Expense Submission (OCR)
Scan & Go: Employees upload receipts; the system uses OCR to extract:

Merchant Name

Total Amount & Date

Expense Category (Food, Travel, etc.)

## Multi-Currency Support: Employees can submit in any currency; the system automatically converts it to the Company’s base currency for the Manager’s view using live exchange rates.

## 📋 Role-Based Access Control (RBAC)
Role	Permissions
Admin	Manage users, configure complex approval rules, override any expense status, and view global analytics.
Manager	View team expenses in base currency, approve/reject with comments, and escalate claims.
Employee	Upload receipts (OCR), manually enter expenses, and track the live status of reimbursements.
🔧 Database Schema (Conceptual)
The system relies on a robust relational structure to handle the recursive nature of approvals:

User: Extends AbstractUser (Roles: Admin, Manager, Employee).

Company: Stores base currency and subscription details.

Expense: Stores amount, converted amount, status, and OCR metadata.

ApprovalStep: Defines the sequence and the required "approver_type" (Specific User or Role).

ApprovalRule: Logic-heavy table storing percentage thresholds or "Fast-track" users.

## 🚦 Getting Started
Prerequisites
Python 3.10+

Node.js & npm

Tesseract OCR (if using local OCR engine)

Backend Setup
Clone the repository: git clone <repo-url>

Install dependencies: pip install -r requirements.txt

Run migrations: python manage.py migrate

Start the server: python manage.py runserver

## Frontend Setup
Navigate to client folder: cd client

Install packages: npm install

Start the development server: npm start

## 📡 API Integration Details
Country Data: Fetches name and currencies from [https://restcountries.com/v3.1/all](https://restcountries.com/v3.1/all).

Conversion: Uses {BASE_CURRENCY} as a pivot to calculate employee claim values against company standards via `https://api.exchangerate-api.com/v4/latest/`.

## 📈 Future Enhancements
Slack/Teams Integration: Real-time notifications for pending approvals.

Anomaly Detection: AI-driven flagging of duplicate or suspicious receipts.

Batch Payouts: Exporting approved expenses directly to CSV for payroll processing.
