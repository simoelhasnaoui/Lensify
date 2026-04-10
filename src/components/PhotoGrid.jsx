import React, { useState } from 'react';
import PhotoCard from './PhotoCard';
import PhotoDetail from './PhotoDetail';

const PhotoGrid = ({ photos, activeFilter, setActiveFilter, searchQuery, onProfileClick, onToggleLike, onDownload, onDelete, currentUser }) => {
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const handlePhotoClick = (photo) => {
        setSelectedPhoto(photo);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseModal = () => {
        setSelectedPhoto(null);
        document.body.style.overflow = 'auto';
    };

    const handleDelete = (photoId) => {
        if (onDelete) {
            onDelete(photoId);
            handleCloseModal();
        }
    };

    const filters = ['All', ...new Set(photos.map(photo => photo.category).filter(Boolean))];

    const filteredPhotos = photos.filter(photo => {
        // 1. Filter by category
        if (activeFilter !== 'All' && photo.category !== activeFilter) {
            return false;
        }
        // 2. Filter by search query
        if (searchQuery && searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase().trim();
            const matchesTitle = photo.title?.toLowerCase().includes(query);
            const matchesUser = photo.userName?.toLowerCase().includes(query);
            const matchesTag = photo.tags?.some(tag => tag.toLowerCase().includes(query));
            const matchesCategory = photo.category?.toLowerCase().includes(query);
            return matchesTitle || matchesUser || matchesTag || matchesCategory;
        }
        return true;
    });

    // Sync selected photo with updated global state (needed for live like updates in modal)
    const currentSelectedPhoto = selectedPhoto ? photos.find(p => p.id === selectedPhoto.id) : null;

    return (
        <section className="photo-grid-section container">
            <div className="grid-header">
                <h2 className="grid-title">Editor's Choice</h2>
                <div className="filters-container">
                    <div className="grid-filters">
                        {filters.map(filter => (
                            <button
                                key={filter}
                                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                                onClick={() => setActiveFilter(filter)}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="photo-grid">
                {filteredPhotos.map(photo => (
                    <PhotoCard
                        key={`${activeFilter}-${photo.id}`}
                        photo={photo}
                        onPhotoClick={handlePhotoClick}
                        onProfileClick={onProfileClick}
                        onToggleLike={onToggleLike}
                        onDownload={onDownload}
                    />
                ))}
            </div>

            <PhotoDetail
                photo={currentSelectedPhoto}
                isOpen={!!selectedPhoto}
                onClose={handleCloseModal}
                onProfileClick={(user) => {
                    handleCloseModal();
                    onProfileClick(user);
                }}
                onToggleLike={onToggleLike}
                onDownload={onDownload}
                onDelete={handleDelete}
                currentUser={currentUser}
            />
        </section>
    );
};

export default PhotoGrid;
