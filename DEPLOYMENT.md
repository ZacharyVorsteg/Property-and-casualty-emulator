# Deployment Guide

## ✅ Project Status

Your Florida P&C Insurance Underwriting Training Emulator is **ready to deploy**!

- ✅ All code files created
- ✅ Dependencies installed
- ✅ Production build tested successfully
- ✅ Git repository initialized
- ✅ GitHub remote configured
- ✅ Netlify configuration in place (`netlify.toml`)

## 📤 Next Steps to Deploy

### Step 1: Push to GitHub

```bash
git push -u origin main
```

This will upload your code to GitHub at:
`https://github.com/ZacharyVorsteg/Property-and-casualty-emulator`

### Step 2: Deploy to Netlify

#### Option A: Connect GitHub to Netlify (Recommended)

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** and authenticate
4. Select repository: **Property-and-casualty-emulator**
5. Build settings (auto-detected from `netlify.toml`):
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Branch**: `main`
6. Click **"Deploy site"**

Netlify will:
- Build your site automatically
- Give you a live URL (e.g., `your-site.netlify.app`)
- Auto-deploy whenever you push to GitHub

#### Option B: Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy to production
netlify deploy --prod
```

#### Option C: Manual Deploy

```bash
# Build the project
npm run build

# Drag the 'dist' folder to Netlify's deployment zone at app.netlify.com
```

## 🎯 What's Included

Your application includes:

### Core Features
- ✅ 8-step underwriting workflow
- ✅ Real-time validation and alerts
- ✅ Educational popups with "Why?" buttons
- ✅ 10 pre-built test scenarios
- ✅ Wind mitigation discount calculator (up to 45% savings)
- ✅ Carrier selection engine
- ✅ Premium pricing calculator
- ✅ Training certificate on completion

### Florida-Specific Logic
- ✅ Roof age evaluation (most critical factor)
- ✅ Wind zone determination (1, 2, 3, X)
- ✅ Flood zone analysis (VE, AE, X)
- ✅ County risk profiles (all 67 Florida counties)
- ✅ Sinkhole coverage calculations
- ✅ Hurricane deductible explanations
- ✅ Claims pattern detection
- ✅ Carrier appetite matching

### Technical Stack
- ⚛️ React 18 with Vite
- 🎨 Tailwind CSS for beautiful, responsive UI
- 📦 Zustand for state management
- ✨ Framer Motion for animations
- 📱 Mobile-responsive design
- 🚀 Optimized production build

## 🧪 Test Locally

Before deploying, you can test locally:

```bash
# Development server (http://localhost:5173)
npm run dev

# Production preview
npm run build
npm run preview
```

## 📊 Application Structure

```
✅ Step 1: Initial Contact & Pre-Qualification
   - Kill switch questions (roof age, vacancy, etc.)
   - Insurance situation screening
   
✅ Step 2: Property Details
   - Construction details (CBS, Frame, etc.)
   - Roof matrix (age, shape, material)
   - Age-based inspection requirements
   
✅ Step 3: Location & Catastrophe Assessment
   - Wind zone calculation
   - Flood zone analysis
   - County risk profiles
   
✅ Step 4: Wind Mitigation
   - OIR-B1-1802 form fields
   - Discount calculator (up to 45%)
   - Savings estimator
   
✅ Step 5: Loss History & Claims
   - Claims frequency/severity analysis
   - Red flag detection (public adjusters, attorneys)
   - Pattern recognition
   
✅ Step 6: Coverage Selection
   - Dwelling/liability limits
   - Florida-specific coverages (sinkhole, mold)
   - Deductible strategy
   
✅ Step 7: Rating & Carrier Selection
   - Carrier appetite matching
   - Premium calculation engine
   - Market availability
   
✅ Step 8: Final Decision
   - Risk summary
   - Training certificate
   - Key lessons learned
```

## 🎓 Pre-Built Scenarios

Users can load these test scenarios:

1. **Perfect Risk** - 2020 build, new roof, no claims
2. **Typical Risk** - 2005 build, 12-year roof, 1 claim
3. **Challenged Risk** - 1985 build, 18-year roof, 2 water claims
4. **Coastal High-Value** - $1.5M home, Zone 1, impact glass
5. **Sinkhole County** - Pasco property with sinkhole concerns
6. **Citizens Eligible** - 22-year roof, declined by others
7. **Fraud Red Flags** - Multiple claims, public adjusters
8. **Wind Mitigation Savings** - Maximum discount example
9. **E&S Only** - 20-year roof, barrier island
10. **Auto Decline** - 26-year roof, 3 claims, open claim

## 🔐 Environment Variables

No environment variables needed! Everything is configured and ready to go.

## 📈 Post-Deployment

After deployment, you can:

1. **Custom Domain**: Add your own domain in Netlify settings
2. **Analytics**: Enable Netlify Analytics to track usage
3. **Continuous Deployment**: Pushes to `main` branch auto-deploy
4. **Preview Deploys**: Pull requests get preview URLs
5. **SSL**: HTTPS enabled automatically

## 💡 Tips for Success

- The app auto-saves progress to browser localStorage
- Mobile-responsive - works on all devices
- No backend required - fully client-side
- Educational popups explain every decision
- Real-time feedback on risk factors

## 🐛 Troubleshooting

If you encounter issues:

```bash
# Clear dependencies and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear build cache
rm -rf dist
npm run build

# Test locally first
npm run dev
```

## 📞 Support

- GitHub Issues: Report bugs or request features
- Documentation: Check README.md for detailed info
- Netlify Docs: [docs.netlify.com](https://docs.netlify.com)

---

**Ready to deploy? Run:** `git push -u origin main`

Then connect your GitHub repo to Netlify, and you'll be live in minutes! 🚀

