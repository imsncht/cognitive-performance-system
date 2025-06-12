import React, { useState, useEffect } from 'react';

// --- Helper: Placeholder for a mini layout ---
// This component renders a single abstract wireframe box.
const MiniLayout = ({ isHighlighted }) => {
    const baseStyle = "w-full h-full rounded-md bg-gray-700 transition-all duration-150";
    const highlightStyle = "ring-2 ring-offset-2 ring-offset-gray-900 ring-blue-500 scale-110 shadow-lg shadow-blue-500/30";

    return (
        <div className="p-2">
            <div className={`${baseStyle} ${isHighlighted ? highlightStyle : ''}`}>
                <div className="p-2 h-full">
                    <div className="w-1/3 h-1/4 bg-gray-500 rounded-sm mb-1"></div>
                    <div className="w-full h-3/4 bg-gray-600 rounded-sm flex space-x-1 p-1">
                        <div className="w-1/2 h-full bg-gray-500 rounded-sm"></div>
                        <div className="w-1/2 h-full bg-gray-500 rounded-sm"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Main Animation Component ---
// This component displays the loading animation.
// It orchestrates the shuffling highlight effect over the grid of mini layouts.
const LayoutSelectorAnimation = ({
    duration = 4000, // Total time the animation should run in milliseconds
    onComplete = () => {}, // Optional callback when animation finishes
}) => {
    // There are 9 placeholders in our 3x3 grid
    const numLayouts = 9;
    const layouts = Array.from({ length: numLayouts });

    // State to track which layout is currently highlighted
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    // State to control the final "selected" state
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // --- Animation Effect ---
        // This effect runs once when the component mounts.

        // 1. Fast shuffling interval
        // Rapidly cycle through the layouts to create a "searching" effect.
        const shuffleInterval = setInterval(() => {
            setHighlightedIndex(prev => (prev + Math.floor(Math.random() * (numLayouts -1)) + 1) % numLayouts);
        }, 120); // ms between highlight changes

        // 2. Slowdown and Stop
        // After a delay, clear the fast shuffle and start a slower "final selection" sequence.
        setTimeout(() => {
            clearInterval(shuffleInterval);

            // Slower "thinking" sequence before the final choice
            const slowDownSequence = [1, 3, 2]; // A few more "jumps"
            let i = 0;
            const slowInterval = setInterval(() => {
                if (i < slowDownSequence.length) {
                    setHighlightedIndex(slowDownSequence[i]);
                    i++;
                } else {
                    clearInterval(slowInterval);
                    // The final choice is made. For demo, we'll pick index 4.
                    const finalIndex = 4;
                    setHighlightedIndex(finalIndex);
                    setIsComplete(true);

                    // 3. Call the onComplete callback after a short delay
                    // This gives the user a moment to see the "selected" layout before it disappears.
                    setTimeout(() => {
                         onComplete();
                    }, 800); // Wait a bit on the final selection
                }
            }, 400); // Slower interval

        }, duration - 2000); // Start the slowdown process before the total duration ends

        // Cleanup function to prevent memory leaks
        return () => {
            clearInterval(shuffleInterval);
        };
    }, [duration, onComplete]);

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
            <div className="w-full max-w-xs md:max-w-sm">
                <div className="grid grid-cols-3 gap-2">
                    {layouts.map((_, index) => (
                        <MiniLayout key={index} isHighlighted={!isComplete && index === highlightedIndex} />
                    ))}
                </div>
            </div>
            <div className="mt-8 text-center">
                <p className="text-lg font-semibold text-white animate-pulse">
                    {isComplete ? "Layout Selected!" : "Generating intelligent layout..."}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                    Analyzing your prompt to create the perfect structure.
                </p>
            </div>
        </div>
    );
};

export default LayoutSelectorAnimation;
