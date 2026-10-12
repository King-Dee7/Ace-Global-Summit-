# ACE GLOBAL SUMMIT 2026

**Event Date:** December 23, 2026 (One-Day Summit)  
**Host Venue:** Accra Marriott Hotel, Airport City, Accra, Ghana  
**Tagline:** *Meet the people building what's next.*  
**Powered by:** Reinvent Africa Network (RAN)  
**Target Platform:** Vercel  

---

## 🚀 Overview

This repository powers the official website and organizer administration portal for the inaugural **ACE GLOBAL SUMMIT** — a premier convening of global investors, creatives, founders, and the diaspora in Accra, Ghana.

### Key Capabilities
- **High-Conversion Editorial Landing Page:** Built with Next.js 15 App Router, kinetic Lenis smooth scrolling, and scroll-triggered GSAP motion.
- **Paystack Ticket Checkout:**
  - **Individual Passes:** General ($150) & VIP ($170 with Investor Dealroom access).
  - **Group of 3 Passes:** General Group ($400, saves $50) & VIP Group ($470, saves $40). Collects names, emails, and contact details for all 3 delegates.
  - Paystack cryptographic HMAC-SHA512 webhook verification.
- **Digital Passes & Scannable QR Codes:** Dynamic QR code generation for every attendee with downloadable / printable event badges upon payment.
- **Organizer Admin Dashboard (`/admin`):**
  - Live revenue and ticket metrics.
  - Attendee roster with filtering and one-click CSV export for registration desks.
  - Paystack order and transaction ledger.
  - Schedule alert and speaker reveal lead subscribers with CSV export.
  - Mobile-ready Door Check-In QR scanner (`/admin/scan`) for door staff at Accra Marriott Hotel.

---

## 🎨 Brand Design Tokens

| Role | Color Name | Hex Code | Usage |
| :--- | :--- | :--- | :--- |
| **Backgrounds** | Deep Maroon | `#62060E` | Main page background, primary containers |
| **Headlines & Accents** | Bright Orange | `#FF6417` | Key headlines, badges, glows, links |
| **Buttons & Action Items** | Burnt Orange | `#E65100` | CTAs, ticket selection cards, checkout triggers |
| **Typography & Contrast** | Pure White | `#FFFFFF` | Text on maroon, icons, clean contrast |

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Styling:** Tailwind CSS + custom brand tokens
- **Kinetic Smooth Scroll:** Lenis (`lenis`)
- **Motion & Scroll Triggers:** GSAP 3 (`gsap`, `ScrollTrigger`)
- **Database:** Supabase PostgreSQL (with automatic development fallback)
- **Authentication:** Supabase Auth (`@supabase/ssr`)
- **Payments:** Paystack API & Webhooks
- **QR Codes:** `qrcode` & `canvas-confetti`

---

## 💻 Local Development

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Configure environment variables:**
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

3. **Start the local development server:**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Access the Admin Portal:**
   Visit [http://localhost:3000/admin](http://localhost:3000/admin) (or use the one-click demo login button).

---

## 🚢 Deploying to Vercel

1. Push this repository to GitHub or GitLab.
2. In the [Vercel Dashboard](https://vercel.com), click **Add New > Project** and import your repository.
3. Add the following Environment Variables in Vercel Project Settings:
   - `PAYSTACK_SECRET_KEY`: Your Paystack live secret key (`sk_live_...`)
   - `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`: Your Paystack live public key (`pk_live_...`)
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
   - `NEXT_PUBLIC_APP_URL`: Your Vercel production URL (e.g. `https://aceglobalsummit.com`)
4. In your [Paystack Dashboard](https://dashboard.paystack.com/#/settings/developer), set the **Webhook URL** to:
   ```
   https://<your-domain>.vercel.app/api/webhooks/paystack
   ```
5. Deploy! Vercel will automatically compile and optimize your project.
