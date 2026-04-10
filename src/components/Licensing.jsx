import React from 'react';
import { FileText, CheckCircle, Shield } from 'lucide-react';

const Licensing = () => {
    return (
        <div style={{ paddingTop: '100px', minHeight: '80vh', paddingBottom: '4rem' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Lensify Licensing</h1>
                    <p style={{ color: '#aaa', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                        High-quality, royalty-free images for your next project. Predictable pricing, infinite possibilities.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
                    <div className="glass" style={{ padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(8, 102, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#0866ff' }}>
                            <FileText size={24} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Standard License</h3>
                        <p style={{ color: '#aaa', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                            Perfect for digital use, social media, and internal presentations. Coverage up to 500,000 copies.
                        </p>
                        <ul style={{ listStyle: 'none', color: '#ddd', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><CheckCircle size={16} color="#10b981" /> Web and App use</li>
                            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><CheckCircle size={16} color="#10b981" /> Social Media</li>
                            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><CheckCircle size={16} color="#10b981" /> Marketing materials</li>
                        </ul>
                        <button className="profile-btn secondary" style={{ width: '100%' }}>Learn More</button>
                    </div>

                    <div className="glass" style={{ padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--accent-blue)', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: '1.5rem', right: '-2rem', background: 'var(--accent-blue)', color: 'white', fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 3rem', transform: 'rotate(45deg)' }}>
                            POPULAR
                        </div>
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(138, 43, 226, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#8a2be2' }}>
                            <Shield size={24} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Extended License</h3>
                        <p style={{ color: '#aaa', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                            For massive reach, merchandise, and unrestricted distribution. Unlimited copies and views.
                        </p>
                        <ul style={{ listStyle: 'none', color: '#ddd', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><CheckCircle size={16} color="#10b981" /> Everything in Standard</li>
                            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><CheckCircle size={16} color="#10b981" /> Unlimited digital views</li>
                            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><CheckCircle size={16} color="#10b981" /> Merchandise for sale</li>
                        </ul>
                        <button className="profile-btn primary" style={{ width: '100%' }}>Learn More</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Licensing;
