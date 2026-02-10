import React from 'react'

export const LandingPageCards = ({
    icon,
    title,
    description
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) => {
    return (
        <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 via-transparent to-primary/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-500 hover:-translate-y-1 overflow-hidden">
            {/* Liquid glass overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />

            {/* Animated shimmer effect */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite] opacity-0 group-hover:opacity-100" />
            </div>

            {/* Subtle border glow */}
            <div className="absolute inset-0 rounded-3xl border border-white/20 group-hover:border-primary/30 transition-all duration-500" />

            {/* Main content */}
            <div className="relative z-10">
                <div className="w-full flex justify-end items-end mb-16 py-3 pr-4">
                    <div className="relative w-12 h-12 bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center mb-6 text-2xl shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-500">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent blur-sm" />
                        {icon}
                    </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white relative">
                    {title}
                    <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-primary to-transparent transition-all duration-500" />
                </h3>
                <p className="text-gray-300 text-md leading-relaxed relative">
                    {description}
                    <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </p>
            </div>
        </div>
    )
}
