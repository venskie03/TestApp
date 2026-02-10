import React, { useState } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaSpinner } from 'react-icons/fa';

interface ConfirmationCardsProps {
    isOpen: boolean;
    email: string;
    onConfirm: () => Promise<void>;
    onClose: () => void;
}

const ConfirmationCards: React.FC<ConfirmationCardsProps> = ({ isOpen, email, onConfirm, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleConfirm = async () => {
        setLoading(true);
        setError('');
        try {
            await onConfirm();
            setSuccess('You have successfully joined the waitlist!');
        } catch (err: any) {
            // Extract error message if it's an object with an 'error' property, otherwise use the string or default
            const errorMessage = err?.error || err?.message || "Something went wrong. Please try again.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setSuccess('');
        setError('');
        setLoading(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-md p-[2px] rounded-2xl bg-gradient-to-br from-white/20 via-white/10 to-transparent">
                <div className="bg-[#1E2122]/90 backdrop-blur-xl rounded-2xl p-8 text-center border border-white/10 shadow-2xl relative overflow-hidden">

                    {/* Background Glows */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -z-10" />
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -z-10" />

                    {!success && !error && !loading && (
                        <>
                            <h3 className="text-2xl font-bold mb-4 text-white">Confirm Email</h3>
                            <p className="text-gray-300 mb-6">
                                Join the waitlist with <span className="text-primary font-semibold break-words">{email}</span> ?
                            </p>
                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={onClose}
                                    className="px-6 py-2 cursor-pointer rounded-full border border-white/10 text-gray-300 hover:bg-white/5 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirm}
                                    className="px-6 py-2 cursor-pointer rounded-full bg-primary text-black font-bold hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]"
                                >
                                    Confirm
                                </button>
                            </div>
                        </>
                    )}

                    {loading && (
                        <div className="flex flex-col items-center py-6">
                            <FaSpinner className="text-4xl text-primary animate-spin mb-4" />
                            <p className="text-gray-300 animate-pulse">Adding you to the list...</p>
                        </div>
                    )}

                    {success && (
                        <div className="flex flex-col items-center py-4">
                            <FaCheckCircle className="text-5xl text-green-400 mb-4 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
                            <h3 className="text-xl font-bold text-white mb-2">Success!</h3>
                            <p className="text-gray-300 mb-6">{success}</p>
                            <button
                                onClick={handleClose}
                                className="px-8 py-2 cursor-pointer rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/10"
                            >
                                Close
                            </button>
                        </div>
                    )}

                    {error && (
                        <div className="flex flex-col items-center py-4">
                            <FaExclamationCircle className="text-5xl text-red-400 mb-4 drop-shadow-[0_0_10px_rgba(248,113,113,0.5)]" />
                            <h3 className="text-xl font-bold text-white mb-2">Oops!</h3>
                            <p className="text-red-300 mb-6">{error}</p>
                            <div className="flex gap-4">
                                <button
                                    onClick={handleClose}
                                    className="px-6 py-2 cursor-pointer rounded-full border border-white/10 text-gray-300 hover:bg-white/5 transition-colors"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={handleConfirm}
                                    className="px-6 py-2 cursor-pointer rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/10"
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConfirmationCards;