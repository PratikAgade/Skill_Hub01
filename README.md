# 🎓 SkillHub - Freelance Skill Marketplace for Students

A full-stack MERN platform where students can offer services and hire other students for projects.

---

## 🚀 Live Deployment Links

**Frontend:** `https://skill-hub1-seven.vercel.app/`  
**Backend API:** `https://skillhub-peach.vercel.app/`  
**Database:** MongoDB

---

## 📚 Complete Documentation

**👉 READ THIS FIRST:** [COMPLETE_GUIDE.md](./COMPLETE_GUIDE.md)

This single file contains everything you need:
- Quick Start (30 minutes)
- Deployment Guide
- API Documentation
- Testing & Verification
- Screenshots Guide
- Troubleshooting
- All Commands

---

## ⚡ Quick Start

### 1. Setup MongoDB Atlas (5 min)
- Create free account at https://cloud.mongodb.com
- Create M0 cluster
- Get connection string

### 2. Deploy Backend (10 min)
- Deploy on Render: https://render.com
- Set environment variables
- Copy backend URL

### 3. Deploy Frontend (5 min)
- Deploy on Vercel: https://vercel.com
- Set `VITE_API_URL` to backend URL
- Copy frontend URL

### 4. Test & Verify (10 min)
- Signup → Check MongoDB
- Login → Verify JWT at jwt.io
- Take 4 screenshots

**Total Time: ~30 minutes**

---

## 🛠️ Tech Stack

**Frontend:** React + Vite + TailwindCSS  
**Backend:** Node.js + Express + MongoDB  
**Auth:** JWT + bcrypt  
**Deploy:** Vercel + Render + MongoDB Atlas

---

## ✅ Milestone-1 Features

- ✓ User Signup with bcrypt hashing
- ✓ User Login with JWT tokens
- ✓ Protected Dashboard
- ✓ MongoDB Atlas integration
- ✓ Production deployment ready

---

## 💻 Local Development

```bash
# Backend
cd backend
npm install
npm start  # http://localhost:5001

# Frontend
cd frontend
npm install
npm run dev  # http://localhost:3000
```

---

## 📂 Project Structure

```
skillhub/
├── frontend/          # React app
├── backend/           # Express API
├── screenshots/       # Evaluation screenshots
└── COMPLETE_GUIDE.md  # Full documentation
```

---

## 🔐 Security

- ✅ Passwords hashed with bcrypt (10 salt rounds)
- ✅ JWT tokens with 7-day expiry
- ✅ Tokens stored in localStorage (not displayed on UI)
- ✅ Environment variables for secrets
- ✅ CORS enabled

---

## 📸 Required Screenshots

1. Vercel/Netlify dashboard (account ownership)
2. Render/Railway dashboard (account ownership)
3. MongoDB Atlas user (hashed password)
4. jwt.io verification (token payload)

---

## 🎯 Evaluator Requirements

All requirements met:
- ✅ Frontend deployed on personal account
- ✅ Backend deployed on personal account
- ✅ MongoDB Atlas on personal account
- ✅ Signup creates user with hashed password
- ✅ Login returns JWT with userId & email
- ✅ JWT verifiable at jwt.io

---

## 📝 Environment Variables

**Backend (.env):**
```env
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
NODE_ENV=production
```

**Frontend (.env):**
```env
VITE_API_URL=https://your-backend-url.com
```

---

## 🔗 Quick Links

- **Complete Guide:** [COMPLETE_GUIDE.md](./COMPLETE_GUIDE.md)
- **MongoDB Atlas:** https://cloud.mongodb.com
- **Render:** https://render.com
- **Vercel:** https://vercel.com
- **JWT Decoder:** https://jwt.io

---

## 🐛 Troubleshooting

See [COMPLETE_GUIDE.md](./COMPLETE_GUIDE.md#troubleshooting) for solutions to common issues.

---

## 🎉 Ready to Deploy?

1. Read [COMPLETE_GUIDE.md](./COMPLETE_GUIDE.md)
2. Follow the Quick Start section
3. Deploy in 30 minutes
4. Take screenshots
5. Submit for evaluation

---

**Status:** ✅ Complete & Ready for Evaluation  
**Date:** November 17, 2025  
**Milestone:** 1 of 6

---

**Good luck! 🚀**
