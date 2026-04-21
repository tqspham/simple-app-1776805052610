"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface PageSection {
  id: string;
  title: string;
  description: string;
  emoji: string;
}

interface ButtonAction {
  label: string;
  sectionId: string;
  variant: "primary" | "secondary";
}

const sections: PageSection[] = [
  {
    id: "welcome",
    title: "Welcome",
    description:
      "This is the welcome section. Click the buttons below to explore other sections.",
    emoji: "👋",
  },
  {
    id: "features",
    title: "Features",
    description: "This section highlights key features of the application.",
    emoji: "⚡",
  },
  {
    id: "about",
    title: "About",
    description: "Learn more about this application and its capabilities.",
    emoji: "ℹ️",
  },
];

const navigationButtons: ButtonAction[] = [
  { label: "Welcome", sectionId: "welcome", variant: "primary" },
  { label: "Features", sectionId: "features", variant: "secondary" },
  { label: "About", sectionId: "about", variant: "secondary" },
];

export default function Page(): React.ReactElement {
  const [activeSection, setActiveSection] = useState<string>("welcome");
  const [clickCount, setClickCount] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>("");

  const currentSection = sections.find((s) => s.id === activeSection) || sections[0];

  const handleSectionClick = (sectionId: string): void => {
    setActiveSection(sectionId);
  };

  const handleIncrement = (): void => {
    setClickCount((prev) => prev + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserInput(e.currentTarget.value);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header Section */}
      <header className="border-b border-gray-200 py-8 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Functional UI App
          </h1>
          <p className="text-lg text-gray-600">
            Explore sections and interact with the interface
          </p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
          {/* Section Display */}
          <div className="flex items-start gap-4 mb-6">
            <span className="text-4xl">{currentSection.emoji}</span>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {currentSection.title}
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {currentSection.description}
              </p>
            </div>
          </div>

          {/* User Input Field */}
          <div className="mb-6">
            <label
              htmlFor="user-input"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Your Input:
            </label>
            <input
              id="user-input"
              type="text"
              value={userInput}
              onChange={handleInputChange}
              placeholder="Type something..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-gray-900"
            />
            {userInput && (
              <p className="mt-2 text-sm text-gray-600">
                You typed: <span className="font-semibold">{userInput}</span>
              </p>
            )}
          </div>

          {/* Button Group */}
          <div className="flex gap-4 justify-center flex-wrap mt-8 sm:flex-row">
            {navigationButtons.map((button) => {
              const isActive = button.sectionId === activeSection;
              const buttonClasses = twMerge(
                "px-6 py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
                isActive || button.variant === "primary"
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              );

              return (
                <button
                  key={button.sectionId}
                  type="button"
                  onClick={() => handleSectionClick(button.sectionId)}
                  className={buttonClasses}
                  aria-label={`Navigate to ${button.label} section`}
                >
                  {button.label}
                </button>
              );
            })}
          </div>

          {/* Increment Button */}
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={handleIncrement}
              className="px-6 py-3 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              aria-label="Increment counter"
            >
              Click to Increment
            </button>
          </div>

          {/* Counter Display */}
          {clickCount > 0 && (
            <p className="text-center text-gray-600 mt-6 text-sm">
              Button clicked {clickCount} {clickCount === 1 ? "time" : "times"}
            </p>
          )}
        </div>
      </main>

      {/* Footer Section */}
      <footer className="border-t border-gray-200 py-6 px-4">
        <div className="max-w-2xl mx-auto text-center text-gray-500 text-sm">
          <p>© 2024 Functional UI Application. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}