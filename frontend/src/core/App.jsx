import React, { useEffect, useState } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import CustomCursor from '../modules/shared/components/CustomCursor.jsx';
import GlobalInviteListener from '../modules/shared/components/GlobalInviteListener.jsx';
import ScrollToTop from '../modules/shared/components/ScrollToTop.jsx';
import ScrollToTopButton from '../modules/shared/components/ScrollToTopButton.jsx';
import Navbar from '../modules/shared/components/Navbar.jsx';
import Hero from '../modules/home/components/Hero.jsx';
import CompanyCarousel from '../modules/home/components/CompanyCarousel.jsx';
import Tournaments from '../modules/tournaments/components/Tournaments.jsx';
import TestimonialsSlider from '../modules/home/components/TestimonialsSlider.jsx';
import Features from '../modules/home/components/Features.jsx';
import Stats from '../modules/home/components/Stats.jsx';
import Testimonials from '../modules/home/components/Testimonials.jsx';
import CTA from '../modules/home/components/CTA.jsx';
import Contact from '../modules/home/components/Contact.jsx';
import Footer from '../modules/shared/components/Footer.jsx';
import VideoBackground from '../modules/home/components/VideoBackground.jsx';
import Signup from '../modules/auth/components/Signup.jsx';
import Signin from '../modules/auth/components/Signin.jsx';
import TournamentsPage from '../modules/tournaments/pages/TournamentsPage.jsx';
import AboutPage from '../pages/AboutPage.jsx';
import LeaderboardPage from '../modules/dashboard/pages/LeaderboardPage.jsx';
import ProfilePage from '../modules/dashboard/pages/ProfilePage.jsx';
import MatchRoomPage from '../modules/gaming/pages/MatchRoomPage.jsx';
import MemoryMatchRoomPage from '../modules/gaming/pages/MemoryMatchRoomPage.jsx';
import LobbyPage from '../modules/dashboard/pages/LobbyPage.jsx';
import MemoryLobbyPage from '../modules/gaming/pages/MemoryLobbyPage.jsx';
import { AuthProvider } from '../modules/auth/context/AuthContext.jsx';
import { MatchProvider } from '../modules/gaming/context/MatchContext.jsx';
import ProtectedRoute from '../modules/auth/components/ProtectedRoute.jsx';

/* ─── Homepage shell ─────────────────────────────────── */
const HomePage = ({ onGetStarted, onSignIn }) => {

  return (
    <div className="app-bg">
      <VideoBackground />
      <div className="bg-grid" />
      <div className="bg-noise" />

      <div className="viewport-chrome">
        <div className="floating-shell">
          <div className="shell-glow" aria-hidden />
          <div className="shell-grid" aria-hidden />
          <div className="shell-noise" aria-hidden />

          <div className="app-content">
            <Navbar onGetStarted={onGetStarted} onSignIn={onSignIn} />
            <Hero />

            <div className="divider" />

            <CompanyCarousel />

            <div className="divider" />

            <Tournaments />

            <div className="divider" />

            <TestimonialsSlider />

            <div className="divider" />

            <Features />

            <div className="divider" />

            <Stats />

            <div className="divider" />

            <Testimonials />

            <div className="divider" />

            <CTA />

            <div className="divider" />

            <Contact />

            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Root App with routing ──────────────────────────── */
const AppContent = () => {
  const [signupOpen, setSignupOpen] = useState(false);
  const [signinOpen, setSigninOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Intercept protective redirects
    if (searchParams.get('requiresLogin') === 'true') {
      setSigninOpen(true);
      // Clean up the URL quietly without navigation event
      searchParams.delete('requiresLogin');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  return (
    <>
      <GlobalInviteListener />
      <CustomCursor />
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onGetStarted={() => setSignupOpen(true)}
              onSignIn={() => setSigninOpen(true)}
            />
          }
        />
        <Route path="/tournaments" element={
          <ProtectedRoute>
            <TournamentsPage />
          </ProtectedRoute>
        } />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/leaderboard" element={
          <ProtectedRoute>
            <LeaderboardPage />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/match" element={
          <ProtectedRoute>
            <MatchRoomPage />
          </ProtectedRoute>
        } />
        <Route path="/match-room" element={
          <ProtectedRoute>
            <MatchRoomPage />
          </ProtectedRoute>
        } />
        <Route path="/lobby" element={
          <ProtectedRoute>
            <LobbyPage />
          </ProtectedRoute>
        } />
        <Route path="/memory-match-room" element={
          <ProtectedRoute>
            <MemoryMatchRoomPage />
          </ProtectedRoute>
        } />
        <Route path="/memory-lobby" element={
          <ProtectedRoute>
            <MemoryLobbyPage />
          </ProtectedRoute>
        } />
      </Routes>

      <Signup isOpen={signupOpen} onClose={() => setSignupOpen(false)} onSwitchToSignin={() => { setSignupOpen(false); setTimeout(() => setSigninOpen(true), 200); }} />
      <Signin
        isOpen={signinOpen}
        onClose={() => setSigninOpen(false)}
        onSwitchToSignup={() => { setSigninOpen(false); setTimeout(() => setSignupOpen(true), 200); }}
      />
      <ScrollToTopButton />
    </>
  );
};

const App = () => (
  <AuthProvider>
    <MatchProvider>
      <AppContent />
    </MatchProvider>
  </AuthProvider>
);

export default App;