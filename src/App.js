import React, { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PhotoGrid from './components/PhotoGrid';
import UserProfile from './components/UserProfile';
import UploadModal from './components/UploadModal';
import Licensing from './components/Licensing';
import Quests from './components/Quests';
import Footer from './components/Footer';
import {
  getCurrentUser, setCurrentUser as persistUser, clearCurrentUser,
  getUploads, addUpload,
  getLikes, toggleLike as storageToggleLike,
  downloadImage, deleteUpload,
} from './utils/storage';
import './App.css';

const INITIAL_PHOTOS = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    title: 'Serene Lake Reflection',
    userName: 'Elena Mishlanova',
    userAvatar: 'https://i.pravatar.cc/150?u=elena',
    category: 'Nature',
    tags: ['lake', 'reflection', 'mountains'],
    baseLikes: 1200,
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    title: 'Mountain Mist at Dawn',
    userName: 'John Doe',
    userAvatar: 'https://i.pravatar.cc/150?u=john',
    category: 'Nature',
    tags: ['mist', 'dawn', 'mountain'],
    baseLikes: 850,
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
    title: 'Deep Forest Path',
    userName: 'Sarah Smith',
    userAvatar: 'https://i.pravatar.cc/150?u=sarah',
    category: 'Nature',
    tags: ['forest', 'path', 'trees'],
    baseLikes: 2100,
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    title: 'Skyscraper Symmetry',
    userName: 'Mark Wilson',
    userAvatar: 'https://i.pravatar.cc/150?u=mark',
    category: 'Architecture',
    tags: ['city', 'blue', 'glass'],
    baseLikes: 950,
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80',
    title: 'Neon Nights',
    userName: 'Lisa Ray',
    userAvatar: 'https://i.pravatar.cc/150?u=lisa',
    category: 'Street',
    tags: ['cyberpunk', 'neon', 'city'],
    baseLikes: 3400,
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=1200&q=80',
    title: 'The Silent Look',
    userName: 'Dave Clark',
    userAvatar: 'https://i.pravatar.cc/150?u=dave',
    category: 'Portrait',
    tags: ['man', 'eyes', 'monochrome'],
    baseLikes: 560,
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1200&q=80',
    title: 'Curious Bengal',
    userName: 'Alicia Keys',
    userAvatar: 'https://i.pravatar.cc/150?u=alicia',
    category: 'Animals',
    tags: ['cat', 'feline', 'eyes'],
    baseLikes: 4200,
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    title: 'Microchip Architecture',
    userName: 'Ned Stark',
    userAvatar: 'https://i.pravatar.cc/150?u=ned',
    category: 'Technology',
    tags: ['chip', 'macro', 'circuit'],
    baseLikes: 890,
  },
  {
    id: 9,
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80',
    title: 'Fluid Dynamics',
    userName: 'Emma Woods',
    userAvatar: 'https://i.pravatar.cc/150?u=emma',
    category: 'Abstract',
    tags: ['liquid', 'colors', 'art'],
    baseLikes: 1550,
  },
  {
    id: 10,
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80',
    title: 'Rustic Pizza Delivery',
    userName: 'Mario Rossi',
    userAvatar: 'https://i.pravatar.cc/150?u=mario',
    category: 'Food',
    tags: ['pizza', 'cheese', 'italian'],
    baseLikes: 2750,
  },
  {
    id: 11,
    url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    title: 'Studio Vintage Mic',
    userName: 'David Bowie',
    userAvatar: 'https://i.pravatar.cc/150?u=david',
    category: 'Music',
    tags: ['microphone', 'studio', 'audio'],
    baseLikes: 6100,
  }
];

/** Merge persisted like data into a photo list, relative to the current user. */
function hydratePhotos(photos, likesMap, userId) {
  return photos.map(p => {
    const entry = likesMap[p.id];
    const baseLikes = p.baseLikes ?? 0;
    if (entry) {
      return {
        ...p,
        likes: baseLikes + entry.count,
        isLiked: userId ? entry.likedBy.includes(userId) : false,
      };
    }
    return { ...p, likes: baseLikes, isLiked: false };
  });
}

function App() {
  // ── Session ──────────────────────────────────────────────────
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());

  const handleLogin = useCallback((user) => {
    // user comes from AuthModal as { id, name, email, avatar }
    const sessionUser = { id: user.id, name: user.name, avatar: user.avatar };
    setCurrentUser(sessionUser);
    persistUser(sessionUser);
    // Re-hydrate photos so like hearts reflect this user
    setPhotos(prev => hydratePhotos(prev, getLikes(), sessionUser.id));
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    clearCurrentUser();
    // Clear like hearts (counts stay)
    setPhotos(prev => prev.map(p => ({ ...p, isLiked: false })));
  }, []);

  // ── Photos (initial + uploads, hydrated with likes) ────────
  const [photos, setPhotos] = useState(() => {
    const uploads = getUploads();
    const likesMap = getLikes();
    const userId = getCurrentUser()?.id;
    const all = [...uploads, ...INITIAL_PHOTOS];
    return hydratePhotos(all, likesMap, userId);
  });

  const [currentView, setCurrentView] = useState('discovery');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // ── Handlers ───────────────────────────────────────────────

  const handleProfileClick = (user) => {
    setSelectedProfile(user);
    setCurrentView('profile');
    window.scrollTo(0, 0);
  };

  const handleBackHome = () => {
    setCurrentView('discovery');
    setSelectedProfile(null);
    setActiveFilter('All');
    setSearchQuery('');
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (currentView !== 'discovery') {
      setCurrentView('discovery');
    }
    setTimeout(() => {
       document.querySelector('.photo-grid-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleToggleLike = useCallback((photoId) => {
    if (!currentUser) return; // must be logged in
    const { count, isLiked } = storageToggleLike(photoId, currentUser.id);
    setPhotos(prev => prev.map(photo => {
      if (photo.id === photoId) {
        const baseLikes = photo.baseLikes ?? 0;
        return { ...photo, likes: baseLikes + count, isLiked };
      }
      return photo;
    }));
  }, [currentUser]);

  const handleAddPhoto = useCallback((newPhoto) => {
    addUpload(newPhoto);
    setPhotos(prev => [{ ...newPhoto, likes: 0, isLiked: false }, ...prev]);
  }, []);

  const handleDownload = useCallback((photo) => {
    const safeName = (photo.title || 'lensify-photo')
      .replace(/[^a-z0-9]/gi, '_')
      .toLowerCase();
    downloadImage(photo.url, `${safeName}.jpg`);
  }, []);

  const handleDeletePhoto = useCallback((photoId) => {
    deleteUpload(photoId);
    setPhotos(prev => prev.filter(p => p.id !== photoId));
  }, []);

  return (
    <div className="App">
      <Navbar
        onUploadClick={() => setIsUploadOpen(true)}
        onHomeClick={handleBackHome}
        onNavigate={handleNavigate}
        onSearch={handleSearch}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      <main>
        {currentView === 'discovery' ? (
          <>
            <Hero 
              onTagClick={(tag) => {
                setActiveFilter(tag);
                document.querySelector('.photo-grid-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onSearch={handleSearch}
            />
            <PhotoGrid
              photos={photos}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              searchQuery={searchQuery}
              onProfileClick={handleProfileClick}
              onToggleLike={handleToggleLike}
              onDownload={handleDownload}
              onDelete={handleDeletePhoto}
              currentUser={currentUser}
            />
          </>
        ) : currentView === 'licensing' ? (
          <Licensing />
        ) : currentView === 'quests' ? (
          <Quests />
        ) : (
          <UserProfile
            user={selectedProfile}
            onBack={handleBackHome}
            userPhotos={photos.filter(p => p.userName === selectedProfile.name)}
          />
        )}
      </main>
      <Footer />

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUpload={handleAddPhoto}
        currentUser={currentUser}
      />
    </div>
  );
}

export default App;
