"use client";

import { useState } from "react";
import { SwipeCard } from "./SwipeCard";
import { AnimatePresence } from "framer-motion";

const CARDS = [
    { id: 1, url: "/1.jpg" },
    { id: 2, url: "/2.jpg" },
    { id: 3, url: "/3.jpg" },
    { id: 4, url: "/4.jpg", actionUrl: "https://timerex.net/s/takei_8256_dd6a/6cb3bb22/" },
];

export const SwipeDeck = () => {
    const [cards, setCards] = useState(CARDS);

    const handleSwipe = (id: number, direction: "left" | "right") => {
        console.log(`Swiped ${direction} on card ${id}`);
        setCards((prev) => prev.filter((card) => card.id !== id));
    };

    const handleReset = () => {
        setCards(CARDS);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 overflow-hidden relative">
            <div className="relative w-full h-full flex items-center justify-center">
                <AnimatePresence>
                    {cards.map((card, index) => (
                        <SwipeCard
                            key={card.id}
                            {...card}
                            index={cards.length - index}
                            onSwipe={handleSwipe}
                            priority={index === 0}
                        />
                    )).reverse()}
                </AnimatePresence>

                {cards.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full w-full bg-white rounded-2xl shadow-sm text-center p-8">
                        <h2 className="text-2xl font-bold mb-4">No more cards!</h2>
                        <button
                            onClick={handleReset}
                            className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium shadow-md hover:bg-blue-700 transition"
                        >
                            Reset Deck
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
