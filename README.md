# ⚡ BoltMatch: Sovereign Matchmaking on Nostr

BoltMatch is an open-source, decentralized dating protocol built on Nostr. It moves human connection away from centralized, dopamine-addicted platforms and into a transparent, reputation-based ecosystem.

## 📜 The Manifesto

*   **Intentionality over Addiction:** No push notifications. If you want to see who’s interested, you check the app. You are in control of your time.
*   **Reputation is Reality:** Your "realness" is calculated by your Web of Trust (WoT). Fake profiles and bots are filtered out by the weight of real human connections.
*   **The Cost of Attention:** Anti-spam is built-in. Sending "Likes" or messages uses Progressive Zaps (Lightning Network). The more you send in a day, the more they cost. Choose wisely.
*   **Wingman Protocol:** We don't measure success by "time spent in-app". If you meet someone and there's no chemistry, but they are great, you can cryptographically "Endorse" them.
*   **Pro-Social Growth:** Designed to foster stable relationships, physical encounters, and build a powerful Web of Trust based on actual human recommendations.

## 🛠 Key Features

### 1. Progressive Zap Logic (Anti-Spam)
To prevent mass-spamming, the cost of an interaction (C) increases with every Zap sent within a 24-hour window:
*   **1st Zap:** 21 sats (The "Courtesy" gesture).
*   **5th Zap:** 500 sats (The "Genuine Interest").
*   **10th Zap:** 5,000 sats (The "Desperation" filter).

*Costs reset every 24 hours.*

### 2. Trust Score (Authenticity Coefficient)
A user's visibility in the feed is determined by:
*   **NIP-05 Verification:** Identity anchored to a domain.
*   **Social Proximity:** How many hops are they from your trusted circle?
*   **Wingman Endorsements:** Badges earned through physical QR-code scans when a date recommends you to the network as a safe, fun, or great person.

### 3. Privacy-First Discovery
Uses NIP-52 (Calendar/Time-based events) and Geohashes for proximity without revealing exact GPS coordinates. There is no central database. All data lives on decentralized Relays.

### 4. Zero-Friction PWA
*   Built as a Progressive Web App (PWA).
*   Installable on Android/iOS without App Store censorship.
*   Strictly zero notifications.

## 🏗 Technical Stack & Architecture

BoltMatch is designed to be fully sovereign but includes a lightweight backend to handle resource-intensive tasks, making it deployable on any container service.

*   **Frontend (PWA):** Vanilla Web Technologies (HTML, CSS, JS) - maximum performance, zero bloat, "Calm Tech" compliant.
*   **Backend (Node.js):** An Express server that serves the PWA and acts as the **Indexer** (calculating the Web of Trust graph so mobile devices don't have to) and **Lightning Handler** (generating invoices securely).
*   **Protocol:** Nostr (NIP-01, NIP-05, NIP-57 for Zaps).
*   **Lightning:** LNbits / Alby integration (via backend).

## 🚀 Deployment (Container / Docker)

You can easily deploy BoltMatch to any container-hosting platform (like `justrunmy.app`, Heroku, or Fly.io).

1. The provided `Dockerfile` uses a lightweight Node.js Alpine image.
2. The server exposes port `3000` by default.
3. Simply connect your repository to your hosting provider, and it will build and run automatically.

\`\`\`bash
docker build -t boltmatch .
docker run -p 3000:3000 boltmatch
\`\`\`

## 📈 Sustainability & Incentives

*   **Protocol Fee:** A small percentage (1-5%) of every Zap supports open-source development and relay maintenance.
*   **Female Incentives:** The cost-curve is flattened for female users to encourage active selection and high-quality filtering.
*   **Endorsement System:** Giving sincere recommendations to people you've met boosts your own network trust and helps the dating pool self-regulate natively.

## 🤝 Contributing

This is an open-source project. We are looking for:
*   Nostr developers to define a dedicated NIP-Dating.
*   UX/UI designers focused on "Calm Technology".
*   Human beings who want to fix the local and global dating market.

---
*Built with intent. Live in the real world.*
