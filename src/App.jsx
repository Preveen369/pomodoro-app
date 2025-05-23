import { useEffect } from "react";
import { TaskProvider } from "./context/TaskContext";
import { TimerProvider } from "./context/TimerContext";
import { SettingsProvider } from "./context/SettingsContext";
import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import TaskList from "./components/TaskList/TaskList";
import PomodoroTimer from "./components/PomodoroTimer/PomodoroTimer";
import { requestNotificationPermission } from "./utils/notificationUtils";

function App() {
  // Request notification permission on component mount
  useEffect(() => {
    requestNotificationPermission();

    // Set up keyboard shortcuts listener
    const handleKeyDown = (e) => {
      // Only process if no input/textarea is focused
      const target = e.target;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        return;
      }

      if (e.code === "KeyN" && e.altKey) {
        // Focus the add task input
        const addTaskInput = document.querySelector(
          'input[placeholder="Add a task..."]'
        );
        if (addTaskInput) {
          e.preventDefault();
          addTaskInput.focus();
        }
      } else if (e.code === "KeyS" && e.altKey) {
        // Open settings
        e.preventDefault();
        const settingsButton = document.querySelector(
          'button[aria-label="Settings"]'
        );
        if (settingsButton) {
          settingsButton.click();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <SettingsProvider>
      <TaskProvider>
        <TimerProvider>
          {/* Animated gradient background */}
          <div className="min-h-screen bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/40 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500 relative overflow-x-hidden">
            {/* Glassmorphism overlay */}
            <div
              className="absolute inset-0 pointer-events-none z-0"
              style={{
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
              }}
            ></div>
            <div className="relative z-10">
              <Header />
              <main className="pt-4 pb-16">
                <Dashboard />
                <TaskList />
              </main>
              <PomodoroTimer />
            </div>
          </div>
        </TimerProvider>
      </TaskProvider>
    </SettingsProvider>
  );
}

export default App;
