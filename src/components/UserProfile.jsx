import React, { useState, useEffect } from 'react';
import { Settings, Share2, MapPin, Link as LinkIcon, Camera, Loader2, CircleUser } from 'lucide-react';
import PhotoCard from './PhotoCard';
import { supabase } from '../utils/supabase';

const UserProfile = ({ user, onBack, userPhotos, onSettingsClick, isCurrentUser }) => {
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFullProfile = async () => {
            setIsLoading(true);
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();
                
                if (data) setProfileData(data);
            } catch (err) {
                console.error('Error fetching profile:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFullProfile();
    }, [user.id]);

    const displayData = {
        name: profileData?.name || user.name,
        bio: profileData?.bio || 'No bio yet.',
        location: profileData?.location || 'Earth',
        website: profileData?.website || '',
        camera: profileData?.camera || 'Digital Camera',
        followers: profileData?.followers_count || 0,
        following: profileData?.following_count || 0
    };

    if (isLoading) {
        return (
            <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader2 size={40} className="animate-spin" color="var(--accent-blue)" />
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="profile-header-bg" />
            <div className="container profile-content">
                <button className="back-btn" onClick={onBack}>&larr; Back to Discovery</button>

                <div className="profile-info-section">
                    <div 
                        className="profile-avatar-large" 
                        style={{ 
                            backgroundImage: user.avatar ? `url(${user.avatar})` : 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: user.avatar ? undefined : 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--glass-border)'
                        }} 
                    >
                        {!user.avatar && <CircleUser size={80} color="#444" />}
                    </div>

                    <div className="profile-details-main">
                        <div className="profile-name-row">
                            <h1 className="profile-name">{displayData.name}</h1>
                            <div className="profile-actions">
                                {isCurrentUser && (
                                    <button onClick={onSettingsClick} className="profile-btn secondary"><Settings size={18} /></button>
                                )}
                                <button className="profile-btn secondary"><Share2 size={18} /></button>
                                {!isCurrentUser && (
                                    <button className="profile-btn primary">Follow</button>
                                )}
                            </div>
                        </div>

                        <div className="profile-stats-row">
                            <div className="profile-stat"><strong>{displayData.followers}</strong> Followers</div>
                            <div className="profile-stat"><strong>{displayData.following}</strong> Following</div>
                            <div className="profile-stat"><strong>{userPhotos.length}</strong> Photos</div>
                        </div>

                        <p className="profile-bio">{displayData.bio}</p>

                        <div className="profile-meta-row">
                            <span className="profile-meta-item"><MapPin size={14} /> {displayData.location}</span>
                            {displayData.website && (
                                <a href={`https://${displayData.website}`} target="_blank" rel="noopener noreferrer" className="profile-meta-item">
                                    <LinkIcon size={14} /> {displayData.website}
                                </a>
                            )}
                            <span className="profile-meta-item"><Camera size={14} /> {displayData.camera}</span>
                        </div>
                    </div>
                </div>

                <div className="profile-tabs">
                    <button className="profile-tab active">Photos</button>
                    <button className="profile-tab">Galleries</button>
                    <button className="profile-tab">About</button>
                </div>

                <div className="photo-grid profile-grid">
                    {userPhotos.length > 0 ? (
                        userPhotos.map(photo => (
                            <PhotoCard key={photo.id} photo={photo} />
                        ))
                    ) : (
                        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: '#666' }}>
                            <p>No photos uploaded yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
