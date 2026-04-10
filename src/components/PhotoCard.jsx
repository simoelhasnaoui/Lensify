import React from 'react';
import { Heart, Plus, Download } from 'lucide-react';

const PhotoCard = ({ photo, onPhotoClick, onProfileClick, onToggleLike, onDownload }) => {
    return (
        <div className="photo-card" onClick={() => onPhotoClick(photo)}>
            <img src={photo.url} alt={photo.title} className="photo-image" />

            <div className="photo-overlay">
                <div className="overlay-top" onClick={(e) => e.stopPropagation()}>
                    <button className="overlay-btn"><Plus size={18} /></button>
                    <button
                        className={`overlay-btn ${photo.isLiked ? 'active' : ''}`}
                        onClick={() => onToggleLike(photo.id)}
                        style={photo.isLiked ? { color: '#ff4b2b', background: 'white' } : {}}
                    >
                        <Heart size={18} fill={photo.isLiked ? "#ff4b2b" : "none"} />
                    </button>
                </div>

                <div className="overlay-bottom" onClick={(e) => e.stopPropagation()}>
                    <div className="photographer-info" onClick={() => onProfileClick({ name: photo.userName, avatar: photo.userAvatar })}>
                        <div className="photographer-avatar" style={{ backgroundImage: `url(${photo.userAvatar})` }} />
                        <div className="photographer-details">
                            <span className="photo-title">{photo.title}</span>
                            <span className="photographer-name">by {photo.userName}</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', fontWeight: 600 }}>
                            <Heart size={14} fill="white" /> {photo.likes}
                        </div>
                        <button
                            className="overlay-btn"
                            onClick={() => onDownload && onDownload(photo)}
                            title="Download image"
                        >
                            <Download size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhotoCard;
