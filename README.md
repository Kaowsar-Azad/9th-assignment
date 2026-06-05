Project Name:
Adopets

Purpose:
Adopets is a modern, secure, and user-friendly pet adoption platform. Its primary purpose is to connect compassionate individuals with shelter pets in need of a loving home. The platform allows users to browse adoptable pets, search and filter by species, securely manage their own pet listings, and seamlessly send or approve adoption requests.

Live URL: [adopets-live.vercel.app](https://adopets-live.vercel.app)

Features:

1:Secure Authentication & Private Routes: Robust user authentication system using JWT, Better Auth, and Google Login, with Next.js middleware protecting private dashboard and request routes.
2:Dynamic Pet Catalog: An interactive 'All Pets' page featuring real-time search functionality and species-based filtering (implemented using MongoDB $regex and $in queries).
3:Comprehensive Dashboard: A dedicated dashboard for logged-in users to easily manage their pet listings, track incoming adoption requests, and securely update or delete their posts.
4:Adoption Request Management: Pet owners can view all adoption requests for their listed pets through a modal and can approve or reject them directly from the platform.
5:Modern UI & Dark Mode: A stunning, fully responsive user interface built with NextUI/HeroUI, Tailwind CSS, smooth animations, and an integrated Light/Dark mode toggle for a premium user experience.

NPM Packages Used:
Frontend: next (v16.2.6), react, better-auth (Authentication), @heroui/react (UI Components), tailwindcss (Styling), lucide-react & react-icons (Icons), react-hot-toast (Notifications), framer-motion (Animations).
Backend: express (Server Framework), mongodb (Database),  dotenv (Environment Variables), jose-cjs (JWT Token Verification).