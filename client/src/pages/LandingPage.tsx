import React, { useState } from 'react';
import { FaBrain, FaRegLightbulb, FaSpinner } from 'react-icons/fa';
import { BiTargetLock } from 'react-icons/bi';
import { MdOutlinePsychology } from 'react-icons/md';
import { LandingPageCards } from '../components/cards/LandingPageCards';
import MessageIcon from '../components/svg/MeessageIcon';
import LeafIcon from '../components/svg/LeafIcon';
import TargetIcon from '../components/svg/TargetIcon';
import { API } from '../components/api/api';
import ConfirmationCards from '../components/cards/ConfirmationCards';


const LandingPage = () => {
    const [email, setEmail] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) setIsModalOpen(true);
    };

    const handleConfirmJoin = async () => {
        await API.createWaitlist({ email });
        setEmail('');
    };

    const cardList = [
        {
            icon: <MessageIcon />,
            title: "Dump your thoughts",
            description: "Write or speak what's on your mind."
        },
        {
            icon: <TargetIcon />,
            title: "Fokus clarifies",
            description: "AI untangles the clutter and finds what matters."
        },
        {
            icon: <LeafIcon />,
            title: "Move forward calmly",
            description: "Get a clear plan for today."
        }
    ]

    return (
        <div className="min-h-screen bg-[#232627] text-white font-sans overflow-x-hidden relative selection:bg-cyan-500/30">

            <ConfirmationCards
                isOpen={isModalOpen}
                email={email}
                onConfirm={handleConfirmJoin}
                onClose={() => setIsModalOpen(false)}
            />

            {/* <div className="absolute -top-56 -right-60 h-full md:flex hidden opacity-50 z-10">
                <OrganicWaveform state="idle" width={1500} height={1500} />
            </div>

            <div className="absolute top-0 -right-96 h-full md:hidden flex opacity-50 z-10">
                <OrganicWaveform state="idle" width={1000} height={1000} />
            </div> */}

            <video
                autoPlay
                loop
                muted
                playsInline
                className="fixed inset-0 w-full h-full object-cover z-10 opacity-10"
            >
                <source src="./video/waveform.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Background Gradients/Glows */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
                <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px]" />
            </div>

            {/* Navbar Placeholder */}
            <nav className=" z-50 flex px-16 fixed py-5 w-full top-0">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/10" />

                {/* Animated border glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />

                {/* Subtle shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                <div className="flex md:justify-start justify-center z-20 w-full">
                    <img src="/raw/logo.png" alt="logo" className='sm:max-w-24 max-w-16 w-full' />
                </div>
            </nav>


            <main className="relative z-10">
                {/* Hero Section */}
                <section className="flex flex-col h-screen pb-10 mt-10 sm:px-3 px-7 items-center justify-center text-center max-w-6xl mx-auto">
                    <img src="/raw/logo.png" alt="logo" className='sm:max-w-44 max-w-32 mb-3 w-full' />
                    <div className="flex md:hidden flex-col">
                        <h1 className="md:text-7xl text-3xl">
                            Stop thinking.
                        </h1>
                        <h1 className="md:text-7xl text-3xl">
                            Start executing.
                        </h1>
                    </div>

                    <h1 className="md:text-6xl md:flex hidden text-3xl">
                        Stop thinking. Start executing.
                    </h1>

                    <p className="text-xl md:text-5xl mt-5 text-primary font-medium sm:mb-8 mb-3">
                        Without pressure. Without guilt.
                    </p>

                    <p className="max-w-xl text-gray-300 md:text-lg mb-10 leading-relaxed text-sm sm:text-md">
                        Fokus is an AI assistant that clears mental clutter and helps you decide what actually matters — in seconds.
                    </p>

                    <button
                        className="group hover:cursor-pointer relative px-8 py-4 bg-primary text-black font-bold rounded-full text-lg hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.7)]"
                        onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Join the waitlist
                    </button>
                </section>

                {/* Problem Section */}
                <section className="px-4 pb-24 max-w-6xl mx-auto flex flex-col">
                    <div>
                        <h2 className="text-3xl md:text-5xl mb-6 loading-tight md:text-start text-center">
                            Your mind isn't lazy. <br />
                            It's <span className="text-primary">overloaded</span>.
                        </h2>
                    </div>
                    <div className="space-y-4 pl-2">
                        {[
                            "Too many thoughts at once",
                            "Too many things to do",
                            "Productivity apps that add more noise",
                            "Knowing what you should do — but not what to do first"
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-lg text-gray-300">
                                <div className="max-w-3 w-full h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                                {item}
                            </div>
                        ))}
                    </div>
                </section>

                {/* How it Works Section */}
                <section className="px-4 py-24 max-w-7xl mx-auto">
                    <div className="text-center mb-16 md:flex hidden flex-col">
                        <div className="flex items-center justify-center gap-2">
                            <h2 className="text-3xl md:text-5xl mb-4">
                                How
                            </h2>
                            <img src="/raw/logo.png" alt="logo" className='sm:max-w-36 max-w-28 w-full' />
                            <h2 className="text-3xl md:text-5xl mb-4">
                                ai works
                            </h2>
                        </div>
                        <p className="text-gray-300">No setup. No systems. No pressure.</p>
                    </div>

                    <div className="text-center mb-7 md:hidden flex flex-col">
                        <div className="flex items-center justify-center gap-2">
                            <h2 className="text-3xl md:text-5xl mb-1">
                                How
                            </h2>
                            <img src="/raw/logo.png" alt="logo" className='sm:max-w-28 max-w-24 w-full' />
                        </div>
                        <h2 className="text-3xl md:text-5xl">
                            ai works
                        </h2>
                        <p className="text-gray-300 mt-3">No setup. No systems. No pressure.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {cardList.map((card, idx) => (
                            <LandingPageCards key={idx} {...card} />
                        ))}
                    </div>
                </section>

                {/* Who it's for Section */}
                <section className="px-4 py-24 max-w-5xl mx-auto flex sm:flex-row flex-col items-center">
                    <h2 className="text-3xl md:text-5xl sm:mb-12 text-center max-w-80 w-full">Who it's for?</h2>

                    <div className="flex flex-wrap justify-start gap-4 w-full sm:mt-38 mt-7">
                        {[
                            { label: "ADHD minds", icon: <FaBrain /> },
                            { label: "Creators & founders", icon: <FaRegLightbulb /> },
                            { label: "Anyone feeling mentally cluttered", icon: <MdOutlinePsychology /> },
                            { label: "Busy professionals", icon: <BiTargetLock /> }
                        ].map((tag, idx) => (
                            <div key={idx} className="flex items-center gap-3 px-6 py-4 pr-24 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-white/10 transition-all cursor-default">
                                <span className="font-medium text-gray-200">{tag.label}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Waitlist Section */}
                <section id="waitlist" className="md:px-4 px-2 py-24 max-w-4xl mx-auto relative">
                    {/* Background glow effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 blur-3xl -z-10" />
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -z-10" />
                    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10" />

                    <div className="relative group">


                        <div className="relative p-[2px] rounded-[2.5rem] bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-xl">
                            {/* Inner glass container */}
                            <div className="bg-gradient-to-b from-black/60 via-black/50 to-black/60 rounded-[2.3rem] p-8 text-center backdrop-blur-2xl border border-white/10 relative overflow-hidden">


                                <div className="flex w-full sm:justify-start justify-center">
                                    <img src="/raw/logo.png" alt="logo" className='max-w-20 w-full' />
                                </div>
                                <div className="relative z-10 py-10">
                                    <h2 className="text-3xl md:text-5xl mb-4  via-white">
                                        Why a waitlist?
                                    </h2>

                                    <p className="text-gray-300 mb-8 max-w-lg mx-auto leading-relaxed">
                                        We're building Fokus ai carefully — focused, calm, and intentional.
                                        The waitlist gets early access and helps shape the product.
                                    </p>

                                    <form onSubmit={handleSubmit} className="flex sm:flex-row flex-col justify-center rounded-full sm:overflow-hidden items-center max-w-lg mx-auto relative">

                                        <input
                                            type="email"
                                            placeholder="Enter email here"
                                            className="bg-white text-black focus:outline-none py-3 px-5 w-full sm:rounded-none rounded-full"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />

                                        <button
                                            type="submit"
                                            className={`bg-primary hover:cursor-pointer text-black font-bold     p-3 cursor-pointer sm:max-w-44 max-w-full w-full sm:rounded-none rounded-full sm:mt-0 mt-3 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed`}
                                        >
                                            Join the waitlist
                                        </button>
                                    </form>

                                    {/* Glass badge */}
                                    <div className="mt-8">

                                        <span className="relative text-white bg-primary/20 py-3 px-5 text-xs rounded-md font-bold">FOUNDING USERS PERK</span>
                                    </div>

                                    <p className="mt-6 text-sm text-white">
                                        First 1,000 people on the waitlist get their first month <span className='text-primary'>free</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="py-5 text-center bg-[#1E2122] text-gray-400 text-sm">
                    © Fokus 2026.
                </footer>
            </main>
        </div>
    );
};

export default LandingPage;