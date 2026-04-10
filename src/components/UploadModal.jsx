import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Info, Image as ImageIcon, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UploadModal = ({ isOpen, onClose, onUpload, currentUser }) => {
    const [step, setStep] = useState(1); // 1: Select, 2: Details, 3: Success
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Nature');
    const [tags, setTags] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const categories = ['Nature', 'Architecture', 'Street', 'Portrait', 'Travel'];

    useEffect(() => {
        if (!isOpen) {
            // Reset state when modal closes
            setTimeout(() => {
                setStep(1);
                setFile(null);
                setPreview(null);
                setTitle('');
                setCategory('Nature');
                setTags('');
                setIsUploading(false);
                setError(null);
            }, 300);
        }
    }, [isOpen]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile.size > 10 * 1024 * 1024) {
                setError("File is too large. Max size is 10MB.");
                return;
            }

            setFile(selectedFile);
            setError(null);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                setStep(2);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleUploadClick = () => {
        if (!title.trim()) {
            setError("Please provide a title for your photo.");
            return;
        }

        setIsUploading(true);
        setError(null);

        // Simulate upload delay
        setTimeout(() => {
            const newPhoto = {
                id: Date.now(),
                url: preview,
                title: title,
                userName: currentUser?.name || 'Guest User',
                userAvatar: currentUser?.avatar || 'https://i.pravatar.cc/150?u=guest',
                userId: currentUser?.id || 'guest',
                category: category,
                tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
                likes: 0,
                isLiked: false,
                uploadDate: new Date().toISOString()
            };

            onUpload(newPhoto);
            setIsUploading(false);
            setStep(3);
        }, 2000);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type.startsWith('image/')) {
            handleFileChange({ target: { files: [droppedFile] } });
        }
    };

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
                        style={{
                            height: 'auto',
                            maxWidth: step === 2 ? '800px' : '500px',
                            width: '95%',
                            overflow: 'hidden'
                        }}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="modal-close" onClick={onClose}><X size={24} /></button>

                        <div className="upload-modal-content" style={{ padding: '0' }}>

                            {/* Step 1: File Selection */}
                            {step === 1 && (
                                <div style={{ padding: '3rem' }}>
                                    <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem', textAlign: 'center' }}>Upload Photos</h2>
                                    <p style={{ color: '#aaa', textAlign: 'center', marginBottom: '2.5rem' }}>Share your best work with the Lensify community.</p>

                                    <div
                                        className="upload-dropzone"
                                        onDragOver={handleDragOver}
                                        onDrop={handleDrop}
                                        onClick={() => fileInputRef.current.click()}
                                        style={{
                                            cursor: 'pointer',
                                            border: '2px dashed var(--glass-border)',
                                            borderRadius: '16px',
                                            padding: '4rem 2rem',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            background: 'rgba(255,255,255,0.02)',
                                            transition: 'var(--transition-smooth)',
                                            position: 'relative'
                                        }}
                                    >
                                        <div style={{
                                            width: '80px',
                                            height: '80px',
                                            borderRadius: '50%',
                                            background: 'rgba(8,102,255,0.1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: '1.5rem'
                                        }}>
                                            <Upload size={36} color="#0866ff" />
                                        </div>
                                        <p style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.5rem' }}>Drop your photos here</p>
                                        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '2rem' }}>or click to browse from your device</p>
                                        <button className="profile-btn primary">Select Files</button>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </div>

                                    {error && (
                                        <div style={{ marginTop: '1.5rem', color: '#ff4b2b', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', fontSize: '0.9rem' }}>
                                            <AlertCircle size={16} />
                                            {error}
                                        </div>
                                    )}

                                    <div className="upload-hints" style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                                        <div className="hint-item" style={{ color: '#666', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <ImageIcon size={16} />
                                            <span>JPEG, PNG, WebP</span>
                                        </div>
                                        <div className="hint-item" style={{ color: '#666', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Info size={16} />
                                            <span>Up to 10MB</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Photo Details */}
                            {step === 2 && (
                                <div style={{ display: 'flex', flexDirection: 'row', minHeight: '500px' }}>
                                    <div style={{ flex: 1.2, background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', position: 'relative' }}>
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            style={{ maxWidth: '100%', maxHeight: '450px', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                                        />
                                        <button
                                            onClick={() => setStep(1)}
                                            style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(0,0,0,0.6)', padding: '0.5rem 1rem', borderRadius: '30px', color: 'white', fontSize: '0.8rem', fontWeight: 600 }}
                                        >
                                            Change Photo
                                        </button>
                                    </div>

                                    <div style={{ flex: 1, padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem' }}>Photo Details</h3>

                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#aaa', marginBottom: '0.5rem' }}>TITLE (REQUIRED)</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Morning in Manhattan"
                                                className="search-input"
                                                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)' }}
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                autoFocus
                                            />
                                        </div>

                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#aaa', marginBottom: '0.5rem' }}>CATEGORY</label>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                {categories.map(cat => (
                                                    <button
                                                        key={cat}
                                                        onClick={() => setCategory(cat)}
                                                        style={{
                                                            padding: '0.5rem 1rem',
                                                            borderRadius: '30px',
                                                            fontSize: '0.8rem',
                                                            fontWeight: 600,
                                                            background: category === cat ? 'var(--accent-blue)' : 'rgba(255,255,255,0.05)',
                                                            color: category === cat ? 'white' : '#aaa',
                                                            border: '1px solid',
                                                            borderColor: category === cat ? 'var(--accent-blue)' : 'var(--glass-border)',
                                                            transition: 'var(--transition-smooth)'
                                                        }}
                                                    >
                                                        {cat}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: '2rem' }}>
                                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#aaa', marginBottom: '0.5rem' }}>TAGS (OPTIONAL, COMMA SEPARATED)</label>
                                            <input
                                                type="text"
                                                placeholder="city, architecture, night"
                                                className="search-input"
                                                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)' }}
                                                value={tags}
                                                onChange={(e) => setTags(e.target.value)}
                                            />
                                        </div>

                                        {error && (
                                            <div style={{ color: '#ff4b2b', marginBottom: '1.5rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <AlertCircle size={14} /> {error}
                                            </div>
                                        )}

                                        <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem' }}>
                                            <button
                                                className="profile-btn secondary"
                                                style={{ flex: 1 }}
                                                onClick={onClose}
                                                disabled={isUploading}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="profile-btn primary"
                                                style={{ flex: 2, position: 'relative', overflow: 'hidden' }}
                                                onClick={handleUploadClick}
                                                disabled={isUploading || !title.trim()}
                                            >
                                                {isUploading ? (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <Loader2 size={18} className="animate-spin" />
                                                        <span>Uploading...</span>
                                                    </div>
                                                ) : (
                                                    'Publish Photo'
                                                )}
                                                {isUploading && (
                                                    <motion.div
                                                        style={{ position: 'absolute', bottom: 0, left: 0, height: '4px', background: 'rgba(255,255,255,0.3)' }}
                                                        initial={{ width: '0%' }}
                                                        animate={{ width: '100%' }}
                                                        transition={{ duration: 2 }}
                                                    />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Success Screen */}
                            {step === 3 && (
                                <div style={{ padding: '4rem 3rem', textAlign: 'center' }}>
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', damping: 12 }}
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            borderRadius: '50%',
                                            background: '#10b981',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: '0 auto 2rem'
                                        }}
                                    >
                                        <CheckCircle2 size={48} color="white" />
                                    </motion.div>
                                    <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>Success!</h2>
                                    <p style={{ color: '#aaa', fontSize: '1.1rem', marginBottom: '3rem', maxWidth: '300px', margin: '0 auto 3rem' }}>
                                        Your masterpiece has been shared with the world.
                                    </p>
                                    <button
                                        className="profile-btn primary"
                                        style={{ width: '100%', padding: '1rem' }}
                                        onClick={onClose}
                                    >
                                        Back to Feed
                                    </button>
                                </div>
                            )}

                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default UploadModal;
