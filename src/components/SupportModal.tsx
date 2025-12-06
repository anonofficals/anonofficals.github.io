import React, { useState } from 'react';
import { CreditCard, Wallet, Heart, Copy, Check, ArrowRight, DollarSign, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from 'qrcode.react';
import {
    Dialog,
    DialogContent,
    DialogClose,
} from "@/components/ui/dialog";

interface SupportModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
    const { toast } = useToast();
    const [step, setStep] = useState<'amount' | 'payment'>('amount');
    const [amount, setAmount] = useState<string>('');
    const [copiedWallet, setCopiedWallet] = useState(false);

    // Binance wallet address for USDT on BSC (BEP20) chain
    const WALLET_ADDRESS = "0x2b1bf0cb729769837cb19d8925419a434ed40d7e";
    const PAYPAL_ME_URL = "https://paypal.me/anonopensource";

    const handleCopyWallet = async () => {
        try {
            await navigator.clipboard.writeText(WALLET_ADDRESS);
            setCopiedWallet(true);
            toast({
                title: "Wallet Address Copied",
                description: "Address copied to clipboard.",
            });
            setTimeout(() => setCopiedWallet(false), 2000);
        } catch (err) {
            toast({
                title: "Copy Failed",
                description: "Please copy manually.",
                variant: "destructive",
            });
        }
    };

    const handlePayPalDonate = () => {
        const amountValue = parseFloat(amount) || 10;
        window.open(`${PAYPAL_ME_URL}/${amountValue}usd`, '_blank');
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    };

    const handleContinue = () => {
        const amountValue = parseFloat(amount);
        if (amount && amountValue > 0) {
            setStep('payment');
        } else {
            toast({
                title: "Invalid Amount",
                description: "Please enter a valid amount.",
                variant: "destructive",
            });
        }
    };

    const handleClose = () => {
        setStep('amount');
        setAmount('');
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-md bg-[#0f0f0f] border border-gray-800 p-0 overflow-hidden gap-0 shadow-2xl">
                <div className="relative p-6">
                    <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <X className="h-4 w-4 text-gray-400" />
                        <span className="sr-only">Close</span>
                    </DialogClose>

                    <AnimatePresence mode="wait">
                        {step === 'amount' ? (
                            <motion.div
                                key="amount"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-6"
                            >
                                <div className="text-center space-y-2 pt-4">
                                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                                        <Heart className="w-6 h-6 text-white" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-white">Support Our Mission</h2>
                                    <p className="text-sm text-gray-400">
                                        Help us build the future of open source.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 text-lg">$</span>
                                        </div>
                                        <Input
                                            type="number"
                                            placeholder="0.00"
                                            value={amount}
                                            onChange={handleAmountChange}
                                            className="pl-8 h-14 text-2xl bg-black/20 border-gray-800 focus:border-white/20 text-white placeholder:text-gray-700 rounded-xl text-center font-medium"
                                            min="1"
                                            step="0.01"
                                            autoFocus
                                        />
                                    </div>

                                    <div className="grid grid-cols-4 gap-2">
                                        {[10, 25, 50, 100].map((val) => (
                                            <button
                                                key={val}
                                                onClick={() => setAmount(val.toString())}
                                                className="py-2 text-sm font-medium rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors border border-white/5 hover:border-white/10"
                                            >
                                                ${val}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <Button
                                    onClick={handleContinue}
                                    className="w-full h-11 bg-white text-black hover:bg-gray-200 font-medium rounded-xl"
                                >
                                    Continue
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="payment"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="text-center space-y-1 pt-4">
                                    <p className="text-sm text-gray-400">Supporting with</p>
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="text-3xl font-bold text-white">${amount}</span>
                                        <button
                                            onClick={() => setStep('amount')}
                                            className="text-xs text-gray-500 hover:text-white underline underline-offset-2"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {/* PayPal */}
                                    <button
                                        onClick={handlePayPalDonate}
                                        className="w-full group relative flex items-center p-4 rounded-xl bg-[#0070BA]/10 hover:bg-[#0070BA]/20 border border-[#0070BA]/20 hover:border-[#0070BA]/40 transition-all"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-[#0070BA]/20 flex items-center justify-center mr-4">
                                            <CreditCard className="w-5 h-5 text-[#0070BA]" />
                                        </div>
                                        <div className="text-left">
                                            <div className="font-medium text-white">PayPal</div>
                                            <div className="text-xs text-gray-400">Secure checkout</div>
                                        </div>
                                        <ArrowRight className="absolute right-4 w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                                    </button>

                                    {/* Crypto */}
                                    <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                                                <Wallet className="w-5 h-5 text-yellow-500" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-white">Crypto Transfer</div>
                                                <div className="text-xs text-gray-400">USDT (BEP20)</div>
                                            </div>
                                        </div>

                                        <div className="flex justify-center py-2">
                                            <div className="p-2 bg-white rounded-lg">
                                                <QRCodeSVG value={WALLET_ADDRESS} size={120} />
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 bg-black/30 rounded-lg p-2 border border-white/5">
                                            <code className="flex-1 text-xs font-mono text-gray-300 truncate">
                                                {WALLET_ADDRESS}
                                            </code>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-6 w-6 hover:bg-white/10"
                                                onClick={handleCopyWallet}
                                            >
                                                {copiedWallet ? (
                                                    <Check className="w-3 h-3 text-green-500" />
                                                ) : (
                                                    <Copy className="w-3 h-3 text-gray-400" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SupportModal;
