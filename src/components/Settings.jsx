import React, { useState, useEffect } from 'react';
import { X, User, MapPin, Link as LinkIcon, Camera, Save, CheckCircle, Loader2, CircleUser } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../utils/supabase';

const Settings = ({ currentUser, onBack, onUpdateProfile }) => {
    const [formData, setFormData] = useState({
        name: currentUser?.name || '',
        bio: '',
        location: '',
        website: '',
        camera: ''
    });
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch existing profile data if available
        const fetchProfile = async () => {
            if (!currentUser) return;
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', currentUser.id)
                .single();
            
            if (data) {
                setFormData({
                    name: data.name || currentUser.name,
                    bio: data.bio || '',
                    location: data.location || '',
                    website: data.website || '',
                    camera: data.camera || ''
                });
            }
        };
        fetchProfile();
    }, [currentUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setError(null);

        try {
            const { error } = await supabase
                .from('profiles')
                .upsert({
                    id: currentUser.id,
                    name: formData.name,
                    bio: formData.bio,
                    location: formData.location,
                    website: formData.website,
                    camera: formData.camera,
                    updated_at: new Date()
                });

            if (error) throw error;

            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
            
            if (onUpdateProfile) {
                onUpdateProfile({ ...currentUser, name: formData.name });
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="quest-page" style={{ paddingTop: '100px' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Settings</h1>
                        <p style={{ color: '#aaa' }}>Manage your profile and account preferences</p>
                    </div>
                    <button onClick={onBack} className="profile-btn secondary">Back to Discovery</button>
                </div>

                <div className="glass" style={{ padding: '3rem', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', alignItems: 'center' }}>
                            <div style={{ 
                                width: '100px', 
                                height: '100px', 
                                borderRadius: '50%', 
                                backgroundImage: currentUser?.avatar ? `url(${currentUser.avatar})` : 'none',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                border: '3px solid var(--accent-blue)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: currentUser?.avatar ? undefined : 'rgba(255,255,255,0.05)'
                            }}>
                                {!currentUser?.avatar && <CircleUser size={48} color="#444" />}
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Profile Picture</h3>
                                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>Google account avatar is used by default</p>
                                <button type="button" className="nav-link" style={{ color: 'var(--accent-blue)', fontSize: '0.85rem' }}>Change Avatar</button>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <div className="auth-input-group">
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#aaa', marginBottom: '0.5rem' }}>FULL NAME</label>
                                <div style={{ position: 'relative' }}>
                                    <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
                                    <input
                                        type="text"
                                        className="search-input"
                                        style={{ paddingLeft: '3.5rem', background: 'rgba(0,0,0,0.2)' }}
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="auth-input-group">
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#aaa', marginBottom: '0.5rem' }}>LOCATION</label>
                                <div style={{ position: 'relative' }}>
                                    <MapPin size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
                                    <input
                                        type="text"
                                        className="search-input"
                                        placeholder="e.g. London, UK"
                                        style={{ paddingLeft: '3.5rem', background: 'rgba(0,0,0,0.2)' }}
                                        value={formData.location}
                                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#aaa', marginBottom: '0.5rem' }}>BIO</label>
                            <textarea
                                className="search-input"
                                placeholder="Tell us about your creative journey..."
                                style={{ 
                                    width: '100%', 
                                    height: '100px', 
                                    borderRadius: '12px', 
                                    background: 'rgba(0,0,0,0.2)', 
                                    padding: '1rem',
                                    resize: 'none'
                                }}
                                value={formData.bio}
                                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
                            <div className="auth-input-group">
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#aaa', marginBottom: '0.5rem' }}>WEBSITE</label>
                                <div style={{ position: 'relative' }}>
                                    <LinkIcon size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
                                    <input
                                        type="text"
                                        className="search-input"
                                        placeholder="yourportfolio.com"
                                        style={{ paddingLeft: '3.5rem', background: 'rgba(0,0,0,0.2)' }}
                                        value={formData.website}
                                        onChange={(e) => setFormData({...formData, website: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="auth-input-group">
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#aaa', marginBottom: '0.5rem' }}>CAMERA GEAR</label>
                                <div style={{ position: 'relative' }}>
                                    <Camera size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
                                    <input
                                        type="text"
                                        className="search-input"
                                        placeholder="e.g. Canon EOS R5"
                                        style={{ paddingLeft: '3.5rem', background: 'rgba(0,0,0,0.2)' }}
                                        value={formData.camera}
                                        onChange={(e) => setFormData({...formData, camera: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div style={{ color: '#ff4b2b', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center' }}>
                                {error}
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <button
                                type="submit"
                                className="profile-btn primary"
                                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', height: '50px' }}
                                disabled={isSaving}
                            >
                                {isSaving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        style={{
                            position: 'fixed',
                            bottom: '2rem',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: '#10b981',
                            color: 'white',
                            padding: '1rem 2rem',
                            borderRadius: '50px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                            zIndex: 1000
                        }}
                    >
                        <CheckCircle size={20} />
                        <span style={{ fontWeight: 600 }}>Profile updated successfully!</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Settings;
