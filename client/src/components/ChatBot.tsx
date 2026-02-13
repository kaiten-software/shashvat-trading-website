import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Message {
    role: 'bot' | 'user';
    content: string;
}

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        { role: 'bot', content: "Hello! I am Shashvat's AI Assistant. How can I help you with our polymer resins and industrial grades today?" }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input.trim();
        setInput("");
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat/message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg }),
            });

            const data = await response.json();
            setMessages(prev => [...prev, { role: 'bot', content: data.reply || "I'm sorry, I couldn't process that. Please try again." }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'bot', content: "Connection error. Please contact us via the contact form." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="mb-4"
                    >
                        <Card className="w-80 md:w-96 h-[500px] shadow-2xl border-emerald-100 flex flex-col overflow-hidden">
                            <CardHeader className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white p-4 flex flex-row items-center justify-between space-y-0">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                                        <Bot className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm">Shashvat AI Assistant</h3>
                                        <p className="text-[10px] text-emerald-50 flex items-center gap-1">
                                            <span className="h-1.5 w-1.5 bg-green-300 rounded-full animate-pulse" /> Online
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsOpen(false)}
                                    className="text-white hover:bg-white/20 h-8 w-8"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </CardHeader>

                            <CardContent className="flex-1 p-0 bg-gray-50/50 overflow-hidden">
                                <div
                                    className="h-[360px] p-4 overflow-y-auto scroll-smooth custom-scrollbar"
                                    ref={scrollRef}
                                >
                                    <div className="space-y-4">
                                        {messages.map((msg, i) => (
                                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'bot' ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-200 text-gray-600'
                                                        }`}>
                                                        {msg.role === 'bot' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                                                    </div>
                                                    <div className={`p-3 rounded-2xl text-sm ${msg.role === 'user'
                                                            ? 'bg-emerald-600 text-white rounded-tr-none shadow-md'
                                                            : 'bg-white text-gray-800 rounded-tl-none border border-emerald-50 shadow-sm'
                                                        }`}>
                                                        {msg.content}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {isLoading && (
                                            <div className="flex justify-start">
                                                <div className="bg-white border border-emerald-50 p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                                                    <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-bounce" />
                                                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="p-4 border-t bg-white">
                                <form
                                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                    className="flex w-full items-center space-x-2"
                                >
                                    <Input
                                        placeholder="Ask about polymer grades..."
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        className="flex-1 border-gray-100 focus-visible:ring-emerald-500"
                                    />
                                    <Button
                                        type="submit"
                                        size="icon"
                                        className="bg-emerald-600 hover:bg-emerald-700 h-9 w-9 shrink-0"
                                        disabled={!input.trim() || isLoading}
                                    >
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </form>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <Button
                onClick={() => setIsOpen(!isOpen)}
                className={`h-14 w-14 rounded-full shadow-2xl transition-all duration-300 ${isOpen ? 'bg-white text-emerald-600 hover:bg-gray-100 rotate-90' : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
            >
                {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
            </Button>
        </div>
    );
}
