import React from 'react';
import { FileText, CheckCircle, Shield, Zap, Globe, HardDrive } from 'lucide-react';

const Licensing = () => {
    const plans = [
        {
            name: 'Starter',
            price: 'Free',
            description: 'Essential features for hobbyists and individual creators.',
            icon: <Zap size={24} color="#aaa" />,
            features: [
                'Up to 10 high-res downloads/mo',
                'Standard License coverage',
                'Basic profile customizations',
                'Community support'
            ],
            buttonText: 'Get Started',
            buttonClass: 'secondary'
        },
        {
            name: 'Professional',
            price: '$12/mo',
            description: 'The best option for freelance designers and agencies.',
            icon: <Shield size={24} color="#0866ff" />,
            features: [
                'Unlimited high-res downloads',
                'Extended License included',
                'Pro badge & Priority search',
                'Cloud backup for original files',
                '24/7 Priority support'
            ],
            buttonText: 'Upgrade to Pro',
            buttonClass: 'primary',
            popular: true
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            description: 'Full-scale solutions for large teams and organizations.',
            icon: <Globe size={24} color="#8a2be2" />,
            features: [
                'Multi-user team management',
                'Unrestricted usage rights',
                'API access for integrations',
                'Dedicated account manager',
                'Custom legal indemnification'
            ],
            buttonText: 'Contact Sales',
            buttonClass: 'secondary'
        }
    ];

    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '6rem' }}>
            <div className="container" style={{ maxWidth: '1200px' }}>
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
                        Simple, Transparent Pricing
                    </h1>
                    <p style={{ color: '#aaa', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
                        Choose the perfect plan for your creative needs. All plans include access to our entire library of high-quality, royalty-free photography.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
                    {plans.map((plan) => (
                        <div 
                            key={plan.name}
                            className="glass" 
                            style={{ 
                                padding: '3rem 2.5rem', 
                                borderRadius: '24px', 
                                border: plan.popular ? '2px solid var(--accent-blue)' : '1px solid var(--glass-border)',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.3s ease',
                                transform: 'translateZ(0)'
                            }}
                        >
                            {plan.popular && (
                                <div style={{ 
                                    position: 'absolute', 
                                    top: '1.25rem', 
                                    right: '1.25rem', 
                                    background: 'var(--accent-blue)', 
                                    color: 'white', 
                                    fontSize: '0.7rem', 
                                    fontWeight: 800, 
                                    padding: '0.4rem 0.8rem', 
                                    borderRadius: '20px',
                                    letterSpacing: '0.05em'
                                }}>
                                    MOST POPULAR
                                </div>
                            )}

                            <div style={{ 
                                width: '56px', 
                                height: '56px', 
                                borderRadius: '16px', 
                                background: 'rgba(255,255,255,0.03)', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                marginBottom: '2rem',
                                border: '1px solid var(--glass-border)'
                            }}>
                                {plan.icon}
                            </div>

                            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>{plan.name}</h3>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>{plan.price.split('/')[0]}</span>
                                {plan.price.includes('/') && (
                                    <span style={{ color: '#666', fontWeight: 600 }}>/{plan.price.split('/')[1]}</span>
                                )}
                            </div>

                            <p style={{ color: '#888', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '2.5rem' }}>{plan.description}</p>

                            <div style={{ flex: 1, marginBottom: '2.5rem' }}>
                                <p style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#555', marginBottom: '1.25rem' }}>What's included:</p>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {plan.features.map(feature => (
                                        <li key={feature} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.9rem', color: '#ccc' }}>
                                            <CheckCircle size={18} color="#10b981" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button className={`profile-btn ${plan.buttonClass}`} style={{ width: '100%', padding: '1.1rem', fontSize: '1rem' }}>
                                {plan.buttonText}
                            </button>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '6rem', textAlign: 'center', padding: '4rem', borderRadius: '32px', background: 'linear-gradient(rgba(8,102,255,0.1), transparent)', border: '1px solid rgba(8,102,255,0.1)' }}>
                    <HardDrive size={40} color="var(--accent-blue)" style={{ marginBottom: '1.5rem' }} />
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>Need something else?</h2>
                    <p style={{ color: '#aaa', marginBottom: '2rem' }}>We offer custom licensing and bulk purchase options for large-scale productions.</p>
                    <button className="profile-btn secondary">Contact Support</button>
                </div>
            </div>
        </div>
    );
};

export default Licensing;
