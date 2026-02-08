"use client";

import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface SwipeCardProps {
    id: number;
    url: string;
    onSwipe: (id: number, direction: "left" | "right") => void;
    index: number;
    priority?: boolean;
    actionUrl?: string;
}

export const SwipeCard = ({ id, url, onSwipe, index, priority = false, actionUrl }: SwipeCardProps) => {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

    const handleDragEnd = (
        _: any,
        info: PanInfo
    ) => {
        if (info.offset.x > 100) {
            onSwipe(id, "right");
        } else if (info.offset.x < -100) {
            onSwipe(id, "left");
        }
    };

    return (
        <motion.div
            style={{
                x,
                rotate,
                opacity,
                zIndex: index,
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="absolute cursor-grab active:cursor-grabbing bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ x: x.get() < 0 ? -200 : 200, opacity: 0, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={url}
                    alt="Card Image"
                    className="max-w-[90vw] max-h-[80vh] w-auto h-auto object-contain pointer-events-none block"
                />
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 text-white pb-24">
                    <h3 className="text-2xl font-bold">Item {id}</h3>
                    <p className="text-sm opacity-90">Swipe right to like!</p>
                </div>
                {actionUrl && (
                    <div className="absolute bottom-6 left-0 w-full flex justify-center gap-4 px-6 z-10" onPointerDown={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => onSwipe(id, "left")}
                            className="flex-1 bg-red-500 text-white font-bold py-3 rounded-full hover:bg-red-600 transition shadow-lg"
                        >
                            いいえ
                        </button>
                        <a
                            href={actionUrl}
                            className="flex-1 bg-green-500 text-white font-bold py-3 rounded-full hover:bg-green-600 transition shadow-lg text-center"
                        >
                            はい
                        </a>
                    </div>
                )}
            </div>
        </motion.div>
    );
};
