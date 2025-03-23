# 🌿 Plant Disease Detector - React Native App  

This is a **React Native mobile app** built with **Expo** that allows users to capture or upload plant images and detect potential diseases using a Flask-based AI model. 🚀  

---

## 📌 Features  
✅ **Camera Integration** – Capture plant images directly  
✅ **Gallery Upload** – Select images from the device  
✅ **AI Disease Detection** – Sends images to the Flask API for predictions  
✅ **Clean UI** – User-friendly interface with smooth navigation  
✅ **Multi-Screen Navigation** – Organized structure using **Expo Router**  

---

## 📂 Project Structure  
```
plant-disease-detector/
├── app/                # Main screens
│   ├── index.js        # Home screen
│   ├── _layout.js      # Layout wrapper for navigation
│   ├── camera.js       # Camera functionality
│   ├── results.js      # Displays prediction results
│   └── about.js        # About page
├── components/         # Reusable UI components
│   ├── Button.js       
│   ├── DiseaseCard.js  
│   ├── Header.js       
│   └── LoadingOverlay.js  
├── services/           # API communication
│   └── api.js          
├── constants/          # UI constants (Colors, Layout)
│   ├── Colors.js       
│   └── Layout.js       
├── assets/             # Static assets (images, fonts)
│   ├── images/         
│   └── fonts/          
├── app.json            # Expo configuration  
├── babel.config.js     # Babel settings  
├── package.json        # Dependencies & scripts  
└── README.md           # Documentation  
```

---

## 🔧 Installation & Setup  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/zeroruntime/DetectMe-frontend.git
cd DetectMe-frontend
```

### 2️⃣ Install Dependencies  
Make sure you have **Node.js** and **Expo CLI** installed.  
```bash
npm install
```

### 3️⃣ Start the App  
For **Android**:  
```bash
npm run android
```
For **iOS** (Mac only):  
```bash
npm run ios
```
For **Web Preview**:  
```bash
npm run web
```

For **Expo**:  
```bash
npx expo start
```

---

## 📡 API Integration  
The app communicates with the **Flask backend** for disease detection.  
Modify `services/api.js` to match your backend URL:  
```js
import axios from 'axios';

const API_URL = 'http://your-backend-ip:5000';

```

---

## 📜 Dependencies  
📌 Key libraries used in this project:  
- `expo-camera` – Capture images  
- `expo-image-picker` – Upload from gallery  
- `axios` – API requests  
- `react-navigation` – Multi-screen navigation  

Install missing dependencies with:  
```bash
npm install
```

---

## 📸 Screens  
1️⃣ **Home Screen** – Welcome screen with buttons to capture or upload images  
2️⃣ **Camera Screen** – Uses device camera to take pictures  
3️⃣ **Results Screen** – Displays disease predictions and confidence score  

---

## 🔗 Future Enhancements  
✅ Improve UI/UX with better styling  
✅ Support more plant diseases  
✅ Offline prediction using on-device TensorFlow  

---

## 🤝 Contributing  
Feel free to fork, create issues, or submit PRs! 🎉  

---

## 🏷 License  
MIT License © 2025 DetectMe Team  

---
