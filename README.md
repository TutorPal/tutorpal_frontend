## DeKXP - Decentralized Knowledge Exchange Platform

DeKXP (Decentralized Knowledge Exchange Platform) is a blockchain-based platform for knowledge sharing, allowing learners and tutors to interact directly without intermediaries.

DeKXP leverages decentralized technologies to provide transparency, security, and monetization for educational content. Tutors offer consultations, online courses, and educational content, while learners can book sessions, purchase courses, and earn rewards by engaging with the platform.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

1. **Decentralized Profiles & Credentials**  
   Users can create decentralized profiles using Decentralized Identity (DID) solutions, showcasing qualifications (for tutors) and learning history (for students).

2. **NFT-based Course Ownership**  
   Tutors can tokenize their courses as NFTs, enabling ownership, resale, and royalty options when reused on the platform.

3. **Consultation Services**  
   Book one-on-one or group sessions directly with tutors, managed by smart contracts that handle scheduling and payments.

4. **Payment with Escrow**  
   Payments are secured in an escrow managed by a smart contract and released after session completion.

5. **Subscription Model**  
   Tutors can offer a subscription option, granting students unlimited access to their courses.

6. **Decentralized Storage**  
   Educational content is stored securely on IPFS or Arweave, ensuring tamper-proof, censorship-resistant access.

7. **DAO for Governance**  
   Platform governance is controlled by users through a decentralized autonomous organization (DAO) for platform improvements and content policies.

8. **Rating & Review System**  
   Ratings and reviews are stored on-chain, ensuring credibility.

9. **Incentivized Learning**  
   Students earn tokens for course completion, reviews, and community contributions.

10. **Referral and Rewards System**  
    Tutors and students can invite new users to the platform and earn referral rewards.

## Tech Stack

**Frontend**

- [Next.js](https://nextjs.org/) - React Framework for building UI
- [ShadCN](https://ui.shadcn.com/) - Component library for styling and UI components

**Blockchain Layer**

- Lisk SDK (Custom blockchain and smart contracts for payments, profiles, and content ownership)

**Storage**

- IPFS/Arweave - Decentralized storage for educational materials

**Identity & Authentication**

- Decentralized Identity (DID) solutions (e.g., Ceramic or uPort)

**Backend**

- Node.js with Express.js - To handle API requests and session management
- PostgreSQL - For non-critical data storage (user details, session logs, reviews)

## Contribute

To get a local copy of the project up and running, follow these steps.

### Prerequisites

- **Node.js** (version 14+)
- **npm**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/dekxp_frontend.git

   cd dekxp_frontend

   // installing deps
   npm install

   // starting the server
   npm run dev
   ```

2. **Environment Variables**

Contact the admin for secret variables. Checkout for the `.env.example` file for secret variables needed.
