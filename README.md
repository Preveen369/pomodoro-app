# pomodoro-app

A beautifully designed productivity application that combines a to-do list with the Pomodoro time-management technique.

## Features

- Task management with add, edit, delete, and drag-and-drop reordering
- Pomodoro timer with customizable work/break durations
- Progress dashboard showing task completion and pomodoro sessions
- Settings panel for personalization
- Multiple themes (Tomato, Mint, Midnight)
- LocalStorage persistence for tasks and user preferences
- Mobile-responsive design
- Keyboard shortcuts for improved productivity

## Tech Stack

- React with JavaScript
- Tailwind CSS for styling
- Context API for state management
- LocalStorage for data persistence
- Lucide React for icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pomodoro-todo.git
cd pomodoro-todo
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## Keyboard Shortcuts

- `Space`: Start/pause timer
- `R`: Reset timer
- `Esc`: Close timer or dialogs
- `Alt+N`: Focus new task input
- `Alt+S`: Open settings

## Project Structure

```
src/
  ├── components/         # UI components
  │   ├── Dashboard/      # Progress dashboard components
  │   ├── Header/         # App header components
  │   ├── PomodoroTimer/  # Timer modal components
  │   ├── Settings/       # Settings modal components
  │   └── TaskList/       # Task list components
  ├── context/            # React Context providers
  ├── hooks/              # Custom React hooks
  ├── types/              # TypeScript interfaces and types
  ├── utils/              # Utility functions
  ├── App.tsx             # Main app component
  └── main.tsx            # Entry point
```

## License

This project is licensed under the MIT License