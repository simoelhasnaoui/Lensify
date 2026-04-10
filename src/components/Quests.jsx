import React from 'react';
import { Target, Award, Camera, Clock } from 'lucide-react';

const Quests = () => {
    return (
        <div style={{ paddingTop: '100px', minHeight: '80vh', paddingBottom: '4rem' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Lensify Quests</h1>
                    <p style={{ color: '#aaa', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                        Complete creative challenges, push your boundaries, and earn exclusive rewards.
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
                    
                    {/* Quest 1 */}
                    <div className="glass" style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--glass-border)', display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '16px', background: 'rgba(8, 102, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0866ff', flexShrink: 0 }}>
                            <Camera size={40} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Neon Nights</h3>
                                <span style={{ background: 'var(--accent-blue)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '30px', fontSize: '0.8rem', fontWeight: 600 }}>Active</span>
                            </div>
                            <p style={{ color: '#aaa', marginBottom: '1rem', fontSize: '0.95rem' }}>
                                Capture the vibrant energy of your city after dark. Look for neon signs, reflections, and motion blur.
                            </p>
                            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: '#888' }}>
                                <span style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}><Award size={16} color="#10b981" /> 500 XP</span>
                                <span style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}><Clock size={16} /> 2 days left</span>
                                <span style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}><Target size={16} /> 1,204 submissions</span>
                            </div>
                        </div>
                    </div>

                    {/* Quest 2 */}
                    <div className="glass" style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--glass-border)', display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '16px', background: 'rgba(138, 43, 226, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8a2be2', flexShrink: 0 }}>
                            <Target size={40} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Minimalist Architecture</h3>
                                <span style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#ccc', padding: '0.25rem 0.75rem', borderRadius: '30px', fontSize: '0.8rem', fontWeight: 600 }}>Upcoming</span>
                            </div>
                            <p style={{ color: '#aaa', marginBottom: '1rem', fontSize: '0.95rem' }}>
                                Find beauty in simplicity. Focus on clean lines, negative space, and geometric patterns in buildings.
                            </p>
                            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: '#888' }}>
                                <span style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}><Award size={16} color="#10b981" /> 750 XP</span>
                                <span style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}><Clock size={16} /> Starts in 5 days</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Quests;
