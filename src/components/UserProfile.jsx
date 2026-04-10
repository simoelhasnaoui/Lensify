import React from 'react';
import { Settings, Share2, MapPin, Link as LinkIcon, Camera } from 'lucide-react';
import PhotoCard from './PhotoCard';

const UserProfile = ({ user, onBack }) => {
    // Mock photos for this user
    const userPhotos = [
        { id: 101, url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', title: 'Mountain Lake', userName: user.name, userAvatar: user.avatar },
        { id: 102, url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80', title: 'Misty Peaks', userName: user.name, userAvatar: user.avatar },
        { id: 103, url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80', title: 'Forest Sun', userName: user.name, userAvatar: user.avatar },
    ];

    return (
        <div className="profile-page">
            <div className="profile-header-bg" />
            <div className="container profile-content">
                <button className="back-btn" onClick={onBack}>&larr; Back to Discovery</button>

                <div className="profile-info-section">
                    <div className="profile-avatar-large" style={{ backgroundImage: `url(${user.avatar})` }} />

                    <div className="profile-details-main">
                        <div className="profile-name-row">
                            <h1 className="profile-name">{user.name}</h1>
                            <div className="profile-actions">
                                <button className="profile-btn secondary"><Settings size={18} /></button>
                                <button className="profile-btn secondary"><Share2 size={18} /></button>
                                <button className="profile-btn primary">Follow</button>
                            </div>
                        </div>

                        <div className="profile-stats-row">
                            <div className="profile-stat"><strong>250</strong> Followers</div>
                            <div className="profile-stat"><strong>1.2k</strong> Following</div>
                            <div className="profile-stat"><strong>45</strong> Photos</div>
                        </div>

                        <p className="profile-bio">
                            Landscape and nature photographer based in the Pacific Northwest.
                            Capturing the beauty of the world one frame at a time.
                        </p>

                        <div className="profile-meta-row">
                            <span className="profile-meta-item"><MapPin size={14} /> Seattle, WA</span>
                            <span className="profile-meta-item"><LinkIcon size={14} /> portfoliosite.com</span>
                            <span className="profile-meta-item"><Camera size={14} /> Sony A7R IV</span>
                        </div>
                    </div>
                </div>

                <div className="profile-tabs">
                    <button className="profile-tab active">Photos</button>
                    <button className="profile-tab">Galleries</button>
                    <button className="profile-tab">About</button>
                </div>

                <div className="photo-grid profile-grid">
                    {userPhotos.map(photo => (
                        <PhotoCard key={photo.id} photo={photo} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
