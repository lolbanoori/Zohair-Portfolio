import React, { useState, useRef } from 'react';
import { Mail, MapPin, Phone, Send, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const formRef = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const notificationTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_NOTIFICATION_ID; // ID for the email sent to YOU
        const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_AUTOREPLY_ID;     // ID for the email sent to THEM
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        // 1. Send Notification to YOU
        const sendNotification = emailjs.sendForm(serviceId, notificationTemplateId, formRef.current, publicKey);

        // 2. Send Auto-Reply to THEM
        const sendAutoReply = emailjs.sendForm(serviceId, autoReplyTemplateId, formRef.current, publicKey);

        // Wait for BOTH to finish
        Promise.all([sendNotification, sendAutoReply])
            .then(() => {
                setStatus({ type: 'success', message: 'Message sent successfully! Check your inbox for a confirmation.' });
                formRef.current.reset();
            })
            .catch((error) => {
                // Even if one fails, we log it, but usually, if one works, the connection is good.
                setStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
                console.error("Email Error:", error);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <section id="contact" className="py-20 bg-light dark:bg-dark transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section remains the same... */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Have a project in mind or just want to say hi? I'd love to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info Side - No changes needed here */}
                    <div className="space-y-8">
                        {/* ... (Keep your existing Contact Info code) ... */}
                        <div className="flex items-start space-x-4">
                            <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-1">Email</h3>
                                <p className="text-gray-600 dark:text-gray-400">banoorizohair@gmail.com</p>
                            </div>
                        </div>
                        {/* ... (Keep Phone and Location) ... */}
                        <div className="flex items-start space-x-4">
                            <div className="p-3 bg-secondary/10 rounded-lg text-secondary">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-1">Phone</h3>
                                <p className="text-gray-600 dark:text-gray-400">+92 333 4958166</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-1">Location</h3>
                                <p className="text-gray-600 dark:text-gray-400">Islamabad, Pakistan</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form - CRITICAL CHANGES HERE */}
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                                {/* CHANGED: name="user_name" -> name="name" */}
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-primary outline-none transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                                {/* CHANGED: name="user_email" -> name="email" */}
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-primary outline-none transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                            {/* This was already correct */}
                            <input
                                type="text"
                                name="subject"
                                id="subject"
                                required
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-primary outline-none transition-all"
                                placeholder="Project Inquiry"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                            {/* This was already correct */}
                            <textarea
                                name="message"
                                id="message"
                                rows="4"
                                required
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-primary outline-none transition-all"
                                placeholder="Tell me about your project..."
                            ></textarea>
                        </div>

                        {status.message && (
                            <div className={`p-4 rounded-lg ${status.type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                {status.message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/25 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    <span>Sending...</span>
                                </>
                            ) : (
                                <>
                                    <Send size={20} />
                                    <span>Send Message</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;