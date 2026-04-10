import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Github, Chrome, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../utils/supabase';

const AuthModal = ({ isOpen, onClose, onLogin, initialMode = 'login' }) => {
    const [isLoginMode, setIsLoginMode] = useState(initialMode === 'login');
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        if (isOpen) {
            setIsLoginMode(initialMode === 'login');
            resetForm();
        }
    }, [isOpen, initialMode]);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');

    const resetForm = () => {
        setFormData({ name: '', email: '', password: '' });
        setError('');
        setSuccessMsg('');
        setIsForgotPassword(false);
        setShowPassword(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');

        if (isForgotPassword) {
            if (!formData.email.trim()) {
                setError('Please enter your email address.');
                return;
            }
            setSuccessMsg(`A password reset link has been sent to ${formData.email}.`);
            return;
        }

        // Basic validation
        if (!formData.email.trim() || !formData.password.trim()) {
            setError('Please fill in all required fields.');
            return;
        }
        if (!isLoginMode && !formData.name.trim()) {
            setError('Please enter your name.');
            return;
        }
        if (formData.password.length < 4) {
            setError('Password must be at least 4 characters.');
            return;
        }

        try {
            if (isLoginMode) {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password,
                });
                if (error) throw error;
                onLogin(data.user);
            } else {
                const { data, error } = await supabase.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                    options: {
                        data: { name: formData.name }
                    }
                });
                if (error) throw error;
                onLogin(data.user);
            }
            resetForm();
            onClose();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin
                }
            });
            if (error) throw error;
        } catch (err) {
            setError('Google Login Failed: ' + err.message);
        }
    };

    // Deprecated mock helpers removed in favor of Supabase logic
    const handleSocialAuth = (provider) => {
        if (provider === 'Google') {
            handleGoogleLogin();
        } else {
            setError(`${provider} login is not configured yet.`);
        }
    };

    const socialButtons = [
        { icon: <Chrome size={20} />, label: 'Google', color: '#ea4335' },
        { icon: <Github size={20} />, label: 'GitHub', color: '#333' }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="modal-container"
                        style={{ height: 'auto', maxWidth: '480px', width: '90%' }}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="modal-close" onClick={onClose}><X size={24} /></button>

                        <div className="auth-modal-content" style={{ padding: '3.5rem 3rem' }}>
                            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                                    {isForgotPassword ? 'Reset Password' : isLoginMode ? 'Welcome Back' : 'Create Account'}
                                </h2>
                                <p style={{ color: '#aaa', fontSize: '1rem' }}>
                                    {isForgotPassword ? 'Enter your email to receive a reset link' : isLoginMode ? 'Log in to your Lensify account' : 'Start your creative journey today'}
                                </p>
                            </div>

                            {!isForgotPassword && (
                                <>
                                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                                        {socialButtons.map((btn) => (
                                            <button
                                                key={btn.label}
                                                style={{
                                                    flex: 1,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '0.75rem',
                                                    padding: '0.8rem',
                                                    borderRadius: '12px',
                                                    background: 'rgba(255,255,255,0.05)',
                                                    border: '1px solid var(--glass-border)',
                                                    fontSize: '0.9rem',
                                                    fontWeight: 600,
                                                    transition: 'var(--transition-smooth)'
                                                }}
                                                className="nav-link"
                                                onClick={() => handleSocialAuth(btn.label)}
                                            >
                                                {btn.icon}
                                                <span>{btn.label}</span>
                                            </button>
                                        ))}
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                                        <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }} />
                                        <span style={{ color: '#666', fontSize: '0.8rem', fontWeight: 600 }}>OR</span>
                                        <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }} />
                                    </div>
                                </>
                            )}

                            {/* Error and Success messages */}
                            {error && (
                                <div style={{
                                    background: 'rgba(255, 75, 43, 0.1)',
                                    border: '1px solid rgba(255, 75, 43, 0.3)',
                                    borderRadius: '10px',
                                    padding: '0.75rem 1rem',
                                    marginBottom: '1.5rem',
                                    color: '#ff6b4a',
                                    fontSize: '0.85rem',
                                    fontWeight: 500,
                                    textAlign: 'center'
                                }}>
                                    {error}
                                </div>
                            )}

                            {successMsg && (
                                <div style={{
                                    background: 'rgba(16, 185, 129, 0.1)',
                                    border: '1px solid rgba(16, 185, 129, 0.3)',
                                    borderRadius: '10px',
                                    padding: '0.75rem 1rem',
                                    marginBottom: '1.5rem',
                                    color: '#10b981',
                                    fontSize: '0.85rem',
                                    fontWeight: 500,
                                    textAlign: 'center'
                                }}>
                                    {successMsg}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                {!isLoginMode && !isForgotPassword && (
                                    <div className="auth-input-group" style={{ marginBottom: '1.25rem', position: 'relative' }}>
                                        <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            className="search-input"
                                            style={{ width: '100%', paddingLeft: '3.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)' }}
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                )}

                                <div className="auth-input-group" style={{ marginBottom: '1.25rem', position: 'relative' }}>
                                    <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="search-input"
                                        style={{ width: '100%', paddingLeft: '3.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)' }}
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>

                                {!isForgotPassword && (
                                    <>
                                        <div className="auth-input-group" style={{ marginBottom: '1rem', position: 'relative' }}>
                                            <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Password"
                                                className="search-input"
                                                style={{ width: '100%', paddingLeft: '3.5rem', paddingRight: '3.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)' }}
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                required={!isForgotPassword}
                                            />
                                            <div 
                                                style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#666', cursor: 'pointer', display: 'flex' }}
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </div>
                                        </div>

                                        {isLoginMode && (
                                            <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
                                                <span 
                                                    onClick={() => { setIsForgotPassword(true); setError(''); setSuccessMsg(''); }}
                                                    style={{ fontSize: '0.85rem', color: '#666', fontWeight: 500, cursor: 'pointer' }}
                                                >
                                                    Forgot password?
                                                </span>
                                            </div>
                                        )}
                                    </>
                                )}

                                <button
                                    className="profile-btn primary"
                                    style={{ width: '100%', padding: '1.1rem', fontSize: '1rem', fontWeight: 700, marginTop: !isLoginMode ? '1rem' : '0' }}
                                >
                                    {isForgotPassword ? 'Send Reset Link' : isLoginMode ? 'Sign In' : 'Create Account'}
                                </button>

                                {isForgotPassword && (
                                    <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                                        <span 
                                            onClick={() => { setIsForgotPassword(false); setError(''); setSuccessMsg(''); }} 
                                            style={{ fontSize: '0.85rem', color: '#888', cursor: 'pointer', fontWeight: 500 }}
                                        >
                                            ← Back to Login
                                        </span>
                                    </div>
                                )}
                            </form>

                            {!isForgotPassword && (
                                <>
                                    <div style={{ marginTop: '2.5rem', textAlign: 'center', color: '#666', fontSize: '0.95rem' }}>
                                        {isLoginMode ? "Don't have an account?" : "Already have an account?"}{' '}
                                        <span
                                            onClick={() => { setIsLoginMode(!isLoginMode); setError(''); }}
                                            style={{ color: 'var(--accent-blue)', fontWeight: 700, cursor: 'pointer' }}
                                        >
                                            {isLoginMode ? 'Sign up' : 'Log in'}
                                        </span>
                                    </div>

                                    {!isLoginMode && (
                                        <p style={{ marginTop: '2rem', fontSize: '0.75rem', color: '#555', textAlign: 'center', lineHeight: 1.5 }}>
                                            By creating an account, you agree to our <a href="/" style={{ color: '#888' }}>Terms of Service</a> and <a href="/" style={{ color: '#888' }}>Privacy Policy</a>.
                                        </p>
                                    )}
                                </>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AuthModal;
