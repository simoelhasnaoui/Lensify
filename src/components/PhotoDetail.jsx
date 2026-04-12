import React, { useEffect } from 'react';
import { X, Heart, Plus, Download, Share2, MessageCircle, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PhotoDetail = ({ photo, isOpen, onClose, onProfileClick, onToggleLike, onDownload, onDelete, currentUser, onViewIncrement }) => {
    
    useEffect(() => {
        if (isOpen && photo && onViewIncrement) {
            onViewIncrement(photo.id);
        }
    }, [isOpen, photo?.id]);

    if (!photo) return null;

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
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="modal-close" onClick={onClose}><X size={24} /></button>

                        <div className="modal-content">
                            <div className="modal-image-wrapper">
                                <img src={photo.url} alt={photo.title} className="modal-image" />
                            </div>

                            <div className="modal-sidebar">
                                <div className="sidebar-header">
                                    <div
                                        className="photographer-info"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => onProfileClick({ id: photo.userId, name: photo.userName, avatar: photo.userAvatar })}
                                    >
                                        <div className="photographer-avatar" style={{ backgroundImage: `url(${photo.userAvatar})` }} />
                                        <div className="photographer-details">
                                            <span className="photographer-name">{photo.userName}</span>
                                            <button className="follow-btn">Follow</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="sidebar-actions">
                                    <button
                                        className={`action-btn ${photo.isLiked ? 'primary' : ''}`}
                                        onClick={() => onToggleLike(photo.id)}
                                        style={photo.isLiked ? { background: '#ff4b2b', borderColor: '#ff4b2b' } : {}}
                                    >
                                        <Heart size={18} fill={photo.isLiked ? "white" : "none"} /> {photo.isLiked ? 'Liked' : 'Like'}
                                    </button>
                                    <button className="action-btn"><Plus size={18} /> Add</button>
                                    <button
                                        className="action-btn"
                                        onClick={() => onDownload && onDownload(photo)}
                                    >
                                        <Download size={18} /> Download
                                    </button>
                                </div>

                                {currentUser && photo.userId === currentUser.id && (
                                    <div className="sidebar-actions" style={{ marginTop: '-1.5rem' }}>
                                        <button
                                            className="action-btn"
                                            style={{ color: '#ff4b2b', borderColor: 'rgba(255, 75, 43, 0.3)' }}
                                            onClick={() => onDelete && onDelete(photo.id)}
                                        >
                                            <Trash2 size={18} /> Delete Photo
                                        </button>
                                    </div>
                                )}

                                <div className="photo-info">
                                    <h2 className="photo-title-lg">{photo.title}</h2>
                                    <p className="photo-description">
                                        Captured by {photo.userName}. Explore more from this category: {photo.category}.
                                    </p>

                                    <div className="photo-stats">
                                        <div className="stat">
                                            <span className="stat-value">{photo.views >= 1000 ? `${(photo.views / 1000).toFixed(1)}k` : photo.views}</span>
                                            <span className="stat-label">Views</span>
                                        </div>
                                        <div className="stat">
                                            <span className="stat-value">{photo.likes >= 1000 ? `${(photo.likes / 1000).toFixed(1)}k` : photo.likes}</span>
                                            <span className="stat-label">Likes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="sidebar-footer">
                                    <div className="footer-btns">
                                        <button className="icon-action"><Share2 size={20} /></button>
                                        <button className="icon-action"><MessageCircle size={20} /></button>
                                    </div>
                                    <button className="licensing-btn">License this photo</button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PhotoDetail;
