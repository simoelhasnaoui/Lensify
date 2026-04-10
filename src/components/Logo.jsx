import React from 'react';

const Logo = ({ size = 32 }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: size, height: size }}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transition: 'transform 0.3s ease' }}
            >
                <defs>
                    <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0866ff" />
                        <stop offset="100%" stopColor="#8a2be2" />
                    </linearGradient>
                </defs>

                {/* Main outer ring */}
                <circle cx="50" cy="50" r="40" stroke="url(#logo-gradient)" strokeWidth="8" />

                {/* Inner lens detail */}
                <circle cx="50" cy="50" r="18" fill="url(#logo-gradient)" />

                {/* Minimalist focus brackets */}
                <path d="M20 20L35 20M20 20L20 35" stroke="white" strokeWidth="4" strokeLinecap="round" />
                <path d="M80 80L65 80M80 80L80 65" stroke="white" strokeWidth="4" strokeLinecap="round" />

                {/* Stylized highlight/reflection */}
                <path d="M65 35C65 35 70 40 70 50" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
            </svg>
        </div>
    );
};

export default Logo;
