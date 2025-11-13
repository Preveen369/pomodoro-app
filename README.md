# ⏰ Pomodoro-App – A Productivity Web App

![Platform](https://img.shields.io/badge/Platform-Web-blue.svg)
![Tech](https://img.shields.io/badge/Frontend-React-orange.svg)
![Tech](https://img.shields.io/badge/UI-Tailwind%20CSS-emerald.svg)
![Language](https://img.shields.io/badge/Language-JavaScript-yellow.svg)
![License](https://img.shields.io/badge/License-MIT-lightgrey.svg)

**Pomodoro-App** is a beautifully designed productivity application that integrates a to-do list with the Pomodoro time-management technique. Built using React, JavaScript, and Tailwind CSS, it offers a seamless user experience with features like task management, a customizable timer, and a progress dashboard. The app uses LocalStorage for data persistence, supports multiple themes, hosted on Firebase Hosting for scalable deployment.

🔗 **Project Demo**: <https://pomodoro-app-7b05a.firebaseapp.com/>

---

## 🚀 Features

### 📋 Task Management
- Add, edit, delete, and reorder tasks with drag-and-drop functionality.  
- Organize tasks efficiently to boost productivity.

### ⏲️ Pomodoro Timer
- Customizable work and break durations for focused sessions.  
- Start, pause, and reset the timer with ease.

### 📊 Progress Dashboard
- Displays task completion stats and Pomodoro session history.  
- Tracks productivity trends over time.

### ⚙️ Settings Panel
- Personalize the app with user-defined settings.  
- Adjust timer durations and other preferences.

### 🎨 Multiple Themes
- Choose from Tomato, Mint, and Midnight themes.  
- Enhances visual appeal and user engagement.

### 💾 LocalStorage Persistence
- Saves tasks and user preferences locally.  
- Ensures data retention across sessions.

### 📱 Mobile-Responsive Design
- Adapts seamlessly to different screen sizes.  
- Provides a consistent experience on all devices.

### ⌨️ Keyboard Shortcuts
- Boosts productivity with shortcuts like `Space` to start/pause, `R` to reset, and more.  
- Includes shortcuts for quick navigation and actions.

---

## 🛠️ Tech Stack

- **Frontend**: React, JavaScript, Tailwind CSS  
- **State Management**: Context API  
- **Data Persistence**: LocalStorage  
- **Icons**: Lucide React  
- **Hosting**: Firebase Hosting  

---

## 📂 Project Structure

```
pomodoro-app/
    ├── src/
    │   ├── components/         # UI components
    │   │   ├── Dashboard/      # Progress dashboard components
    │   │   ├── Header/         # App header components
    │   │   ├── PomodoroTimer/  # Timer modal components
    │   │   ├── Settings/       # Settings modal components
    │   │   └── TaskList/       # Task list components
    │   ├── context/            # React Context providers
    │   ├── hooks/              # Custom React hooks
    │   ├── types/              # TypeScript interfaces and types
    │   ├── utils/              # Utility functions
    │   ├── App.tsx             # Main app component
    │   └── main.tsx            # Entry point
    ├── dist/                   # Production build output
    ├── .firebaserc             # Firebase configuration file
    └── firebase.json           # Firebase hosting configuration
```

---

## 🧪 Installation & Setup

### 📋 Prerequisites
- Node.js (v14 or higher)  
- npm or yarn  
- Firebase CLI (optional, if deploying with Firebase)

### 🧑‍💻 Steps to run
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pomodoro-todo.git
   cd pomodoro-todo
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   🌐 Open your browser and navigate to `http://localhost:5173`.

4. **Build for Production**
   ```bash
   npm run build
   # or
   yarn build
   ```
   The built files will be in the `dist` directory.

5. **(Optional) Deploy with Firebase**
   - Initialize Firebase: `firebase init`
   - Deploy: `firebase deploy`

    🌐 Access your app live at: <https://pomodoro-app-7b05a.firebaseapp.com/>
---

## 🤝 Contributing

Pull requests are welcome! Feel free to fork the repository and suggest improvements.

Steps to contribute:

```bash
# 1. Fork the repository
# 2. Create a feature branch
git checkout -b feature-name

# 3. Commit your changes
git commit -m "Add feature description"

# 4. Push to GitHub
git push origin feature-name

# 5. Open a Pull Request
```

---

## 📧 Contact
For queries or suggestions:
- 📩 Email: [spreveen123@gmail.com](mailto:spreveen123@gmail.com)
- 🌐 LinkedIn: [www.linkedin.com/in/preveen-s-17250529b/](https://www.linkedin.com/in/preveen-s-17250529b/)

---

## 🌟 Show Your Support
If you like this project, please consider giving it a ⭐ on GitHub!

## 🌟 Show Your Support

If you like this project, please consider giving it a ⭐ on GitHub!
