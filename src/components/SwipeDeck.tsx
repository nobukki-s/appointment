"use client";

import { useState } from "react";
import { SwipeCard } from "./SwipeCard";

export const SwipeDeck = ({
    cards: initialCards,
    title
}: {
    cards: { id: number; url: string; actionUrl?: string }[];
    title?: string;
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [companyName, setCompanyName] = useState("");
    const [showCompanyInput, setShowCompanyInput] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleNext = () => {
        if (currentIndex < initialCards.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            setShowCompanyInput(true);
        }
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const handleFinish = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // 1. Send data to Google Sheets (via API Route)
            const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
            await fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title || "担当振り分けアプリ",
                    companyName,
                    date,
                }),
            });
        } catch (error) {
            console.error("Failed to submit to Google Sheets:", error);
            // Proceed anyway to the action URL
        }

        // 2. Redirect to action URL
        const lastCard = initialCards[initialCards.length - 1];
        if (lastCard.actionUrl) {
            const url = new URL(lastCard.actionUrl);
            if (companyName) {
                url.searchParams.set("company", companyName);
            }
            window.location.href = url.toString();
        } else {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 font-sans">
            {showCompanyInput ? (
                <div className="w-full max-w-lg">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                            会社名を入力
                        </h2>

                        <form onSubmit={handleFinish} className="w-full">
                            <div className="mb-6">
                                <label htmlFor="company" className="block text-sm font-medium text-gray-600 mb-2">
                                    会社名
                                </label>
                                <input
                                    type="text"
                                    id="company"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    placeholder="例: 株式会社 〇〇"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-base"
                                    autoFocus
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={(e) => handleFinish(e as any)}
                                    disabled={isSubmitting}
                                    className={`w-full px-6 py-4 text-white rounded-lg font-bold text-lg transition-colors ${isSubmitting ? 'bg-blue-400 cursor-wait' : 'bg-blue-600 hover:bg-blue-700'
                                        }`}
                                >
                                    {isSubmitting ? '処理中...' : '日程調整に進む →'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowCompanyInput(false)}
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 rounded-lg font-medium text-gray-600 hover:bg-gray-100 border border-gray-300"
                                >
                                    ← 戻る
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-lg h-[85vh] md:h-auto md:min-h-[600px]">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-full overflow-hidden flex flex-col">
                        <SwipeCard
                            key={initialCards[currentIndex].id}
                            {...initialCards[currentIndex]}
                            index={1}
                            onBack={currentIndex > 0 ? handleBack : undefined}
                            onNext={handleNext}
                            priority={true}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
