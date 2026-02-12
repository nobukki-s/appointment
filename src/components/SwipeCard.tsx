interface SwipeCardProps {
    id: number;
    url: string;
    onBack?: () => void;
    onNext?: () => void;
    index: number;
    priority?: boolean;
}

export const SwipeCard = ({ id, url, onBack, onNext, index, priority = false }: SwipeCardProps) => {
    return (
        <div className="flex flex-col w-full h-full bg-white">
            <div className="flex-1 flex items-center justify-center p-4 md:p-6 overflow-hidden min-h-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={url}
                    alt="Card Image"
                    className="max-w-full max-h-full w-auto h-auto object-contain"
                />
            </div>

            <div className="flex-none p-6 w-full">
                <div className="flex flex-col gap-3 w-full">
                    <button
                        onClick={onNext}
                        className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-lg"
                    >
                        進む →
                    </button>
                    <button
                        onClick={onBack}
                        disabled={!onBack}
                        className={`w-full px-4 py-3 rounded-lg font-medium border ${!onBack
                            ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed'
                            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
                            }`}
                    >
                        ← 戻る
                    </button>
                </div>
            </div>
        </div>
    );
};
