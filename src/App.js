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
  downloadImage 
} from './utils/storage';
import { supabase } from './utils/supabase';
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

// Legacy local-storage hydration logic removed in favor of Supabase fetching

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  
  const handleLogin = useCallback(() => {
    // Auth state is handled by onAuthStateChange listener
    // This exists to maintain prop compatibility with Navbar/AuthModal
  }, []);
  const [photos, setPhotos] = useState([]);
  const [currentView, setCurrentView] = useState('discovery');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // ── Supabase Initialization ────────────────────────────────
  React.useEffect(() => {
    // 1. Check for active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const user = {
          id: session.user.id,
          name: session.user.user_metadata.name || session.user.email,
          avatar: session.user.user_metadata.avatar_url || `https://i.pravatar.cc/150?u=${session.user.id}`
        };
        setCurrentUser(user);
      }
    });

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const user = {
          id: session.user.id,
          name: session.user.user_metadata.name || session.user.email,
          avatar: session.user.user_metadata.avatar_url || `https://i.pravatar.cc/150?u=${session.user.id}`
        };
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    // 3. Initial photos fetch
    fetchPhotos();

    return () => subscription.unsubscribe();
  }, []);

  const fetchPhotos = async () => {
    try {
      // Fetch photos + profiles + likes count
      const { data, error } = await supabase
        .from('photos')
        .select(`
          *,
          profiles:user_id (name, avatar_url),
          likes (user_id)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform Supabase data to local app format
      const userId = (await supabase.auth.getUser()).data.user?.id;
      const transformed = data.map(p => ({
        id: p.id,
        url: p.url,
        title: p.title,
        userName: p.profiles?.name || 'Anonymous',
        userAvatar: p.profiles?.avatar_url || `https://i.pravatar.cc/150?u=${p.user_id}`,
        category: p.category,
        tags: p.tags || [],
        likes: p.likes?.length || 0,
        isLiked: p.likes?.some(l => l.user_id === userId) || false,
        userId: p.user_id
      }));

      // Combine with initial static placeholders if needed (optional)
      setPhotos([...transformed, ...INITIAL_PHOTOS]);
    } catch (err) {
      console.error('Error fetching photos:', err.message);
      setPhotos(INITIAL_PHOTOS); // Fallback
    }
  };

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

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    setPhotos(prev => prev.map(p => ({ ...p, isLiked: false })));
  }, []);

  const handleToggleLike = useCallback(async (photoId) => {
    if (!currentUser) return;

    try {
      const isCurrentlyLiked = photos.find(p => p.id === photoId)?.isLiked;
      
      if (isCurrentlyLiked) {
        // Unlike
        await supabase
          .from('likes')
          .delete()
          .match({ user_id: currentUser.id, photo_id: photoId });
      } else {
        // Like
        await supabase
          .from('likes')
          .insert({ user_id: currentUser.id, photo_id: photoId });
      }

      // Refresh local state (simplified)
      setPhotos(prev => prev.map(photo => {
        if (photo.id === photoId) {
          return { 
            ...photo, 
            likes: isCurrentlyLiked ? photo.likes - 1 : photo.likes + 1, 
            isLiked: !isCurrentlyLiked 
          };
        }
        return photo;
      }));
    } catch (err) {
      console.error('Like toggle failed:', err.message);
    }
  }, [currentUser, photos]);

  const handleAddPhoto = useCallback(() => {
    // Photos now fetch automatically from Supabase via fetchPhotos
    fetchPhotos();
  }, []);

  const handleDownload = useCallback((photo) => {
    const safeName = (photo.title || 'lensify-photo')
      .replace(/[^a-z0-9]/gi, '_')
      .toLowerCase();
    downloadImage(photo.url, `${safeName}.jpg`);
  }, []);

  const handleDeletePhoto = useCallback(async (photoId) => {
    if (!window.confirm('Delete this masterpiece? This cannot be undone.')) return;
    
    try {
      const { error } = await supabase
        .from('photos')
        .delete()
        .match({ id: photoId });

      if (error) throw error;
      setPhotos(prev => prev.filter(p => p.id !== photoId));
    } catch (err) {
      console.error('Delete failed:', err.message);
    }
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
