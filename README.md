# Florida P&C Insurance Underwriting Training Emulator

A comprehensive training simulator that replicates the exact decision-making process of underwriting property & casualty insurance in Florida. This tool teaches new underwriters the complex, Florida-specific rules while preventing expensive real-world mistakes.

## 🎯 Purpose

Train individuals with ZERO insurance experience to learn:
- What questions to ask and in what order
- What answers disqualify a risk immediately
- How each factor impacts pricing and eligibility
- Which carriers would accept/decline the risk
- Florida-specific regulations and market dynamics

## ✨ Features

- **8-Step Underwriting Workflow**: Complete process from initial contact to final decision
- **Real-Time Feedback**: Immediate alerts and educational content based on inputs
- **Florida-Specific Logic**: 
  - Roof age evaluation (most critical factor)
  - Wind mitigation discount calculator (up to 45% savings)
  - Hurricane deductible calculations
  - Flood zone analysis
  - County-specific risk profiles
  - Sinkhole coverage considerations
- **Carrier Selection Engine**: Automated matching with carrier appetites
- **10 Pre-Built Scenarios**: From perfect risks to uninsurable properties
- **Educational Popups**: "Why?" buttons explaining the reasoning behind each question
- **Save/Resume**: Auto-save functionality using localStorage
- **Premium Calculator**: Realistic pricing engine with Florida-specific factors

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/ZacharyVorsteg/Property-and-casualty-emulator.git
cd Property-and-casualty-emulator

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Deploy to Netlify

### Option 1: Direct from GitHub

1. Push this repository to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/ZacharyVorsteg/Property-and-casualty-emulator.git
git branch -M main
git push -u origin main
```

2. Go to [Netlify](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select this repository
5. Build settings are auto-detected from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

### Option 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

### Option 3: Drag & Drop

```bash
# Build the project
npm run build

# Drag the 'dist' folder to Netlify's deployment zone
```

## 🏗️ Project Structure

```
Property-and-casualty-emulator/
├── src/
│   ├── components/
│   │   ├── steps/
│   │   │   ├── Step1InitialContact.jsx      # Pre-qualification
│   │   │   ├── Step2PropertyDetails.jsx     # Property characteristics
│   │   │   ├── Step3LocationRisk.jsx        # Wind/flood zones
│   │   │   ├── Step4WindMitigation.jsx      # Discount calculator
│   │   │   ├── Step5LossHistory.jsx         # Claims analysis
│   │   │   ├── Step6Coverage.jsx            # Coverage selection
│   │   │   ├── Step7Rating.jsx              # Carrier selection & pricing
│   │   │   └── Step8FinalDecision.jsx       # Summary & certificate
│   │   ├── Alert.jsx                        # Alert notifications
│   │   ├── EducationalPopup.jsx             # Training content
│   │   ├── ProgressBar.jsx                  # Step progress
│   │   └── ScenarioSelector.jsx             # Pre-built scenarios
│   ├── data/
│   │   ├── floridaData.js                   # County data, carrier matrix, rates
│   │   └── scenarios.js                     # 10 practice scenarios
│   ├── store/
│   │   └── useStore.js                      # Zustand state management
│   ├── App.jsx                              # Main application
│   ├── main.jsx                             # Entry point
│   └── index.css                            # Global styles
├── public/
│   └── icon.svg                             # App icon
├── index.html                               # HTML template
├── package.json                             # Dependencies
├── vite.config.js                           # Vite configuration
├── tailwind.config.js                       # Tailwind CSS config
├── netlify.toml                             # Netlify deployment config
└── README.md                                # This file
```

## 🎓 Training Scenarios

The simulator includes 10 pre-built scenarios:

1. **Perfect Risk** - Ideal scenario with new construction
2. **Typical Risk** - Average Florida home
3. **Challenged Risk** - Older home with multiple claims
4. **Coastal High-Value** - Luxury waterfront property
5. **Sinkhole County** - Pasco property with sinkhole concerns
6. **Citizens Eligible** - Last resort market scenario
7. **Fraud Red Flags** - Suspicious claim patterns
8. **Wind Mitigation Savings** - Maximum discount example
9. **E&S Only** - Excess & surplus lines scenario
10. **Auto Decline** - Uninsurable property example

## 🔑 Key Florida Insurance Concepts

### Roof Age (Most Critical Factor)
- **0-5 years**: Preferred - RCV settlement
- **6-10 years**: Standard - Most carriers
- **11-15 years**: Limited - ACV only
- **16-20 years**: E&S markets only
- **20+ years**: Replace or Citizens

### Wind Mitigation Discounts
- Hip roof: 12%
- Impact glass: 20%
- Roof straps (double wraps): 15%
- Secondary water resistance: 5%
- **Maximum combined discount: 45%**

### Hurricane Deductibles
- Percentage-based (not flat amount)
- Example: 5% of $400,000 = $20,000 out of pocket
- Varies by wind zone (1, 2, 3, X)

### Claims Impact
- 0 claims: Claims-free discount
- 1 claim: Acceptable
- 2 claims: Limited markets
- 3+ claims: E&S or Citizens only

## 🛠️ Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Framer Motion** - Animations
- **Netlify** - Deployment platform

## 📝 License

This is an educational tool for training purposes only. Not actual underwriting software.

## 🤝 Contributing

This is a training simulator. If you'd like to enhance it:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📧 Support

For questions about Florida insurance underwriting rules or this training tool, please refer to:
- Florida Office of Insurance Regulation (OIR)
- Florida Building Code standards
- Carrier underwriting guidelines

---

**Note**: This simulator mirrors real-world underwriting logic but should not be used for actual insurance decisions. All logic is for educational purposes only.

