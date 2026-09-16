import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppView, RoleType } from './types';
import { FarmLinkSplash } from './components/splash/FarmLinkSplash';
import { RoleSelection } from './components/roles/RoleSelection';
import { RoleTransition } from './components/roles/RoleTransition';
import { RoleLoginScreen } from './components/auth/RoleLoginScreen';
import { FarmerDashboard } from './components/farmer/FarmerDashboard';
import { BuyerDashboard } from './components/buyer/BuyerDashboard';
import { LogisticsDashboard } from './components/logistics/LogisticsDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';

export function App() {
  const [view, setView] = useState<AppView>('splash');
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);

  // Restart opening experience
  const handleReplayIntro = () => {
    setSelectedRole(null);
    setView('splash');
  };

  // Skip splash screen straight to role selection
  const handleSkipSplash = () => {
    setView('role_selection');
  };

  // When splash progress finishes
  const handleSplashComplete = () => {
    setView('role_selection');
  };

  // Role card clicked
  const handleSelectRole = (role: RoleType) => {
    setSelectedRole(role);
    setView('role_transition');
  };

  // Continue from micro-animation to role login screen
  const handleContinueToLogin = () => {
    setView('role_login');
  };

  // Return from login or transition to role selection
  const handleBackToRoles = () => {
    setSelectedRole(null);
    setView('role_selection');
  };

  // Open Demo Admin Workspace
  const handleOpenAdmin = () => {
    setSelectedRole(null);
    setView('admin_dashboard');
  };

  // Admin logout handler
  const handleAdminLogout = () => {
    setSelectedRole(null);
    setView('role_selection');
  };

  // Authentication success handler
  const handleLoginSuccess = (role: RoleType) => {
    if (role === 'farmer') {
      setView('farmer_dashboard');
    } else if (role === 'buyer') {
      setView('buyer_dashboard');
    } else if (role === 'logistics') {
      setView('logistics_dashboard');
    } else if (role === 'admin') {
      setView('admin_dashboard');
    }
  };

  const handleFarmerLogout = () => {
    setSelectedRole(null);
    setView('role_selection');
  };

  const handleBuyerLogout = () => {
    setSelectedRole(null);
    setView('role_selection');
  };

  const handleLogisticsLogout = () => {
    setSelectedRole(null);
    setView('role_selection');
  };

  // If inside admin dashboard, let admin dashboard manage its specialized header & footer
  if (view === 'admin_dashboard') {
    return <AdminDashboard onLogout={handleAdminLogout} />;
  }

  // If inside farmer dashboard, let the farmer dashboard manage its own specialized header & footer
  if (view === 'farmer_dashboard') {
    return <FarmerDashboard onLogout={handleFarmerLogout} />;
  }

  // If inside buyer dashboard, let the buyer dashboard manage its own specialized header & footer
  if (view === 'buyer_dashboard') {
    return <BuyerDashboard onLogout={handleBuyerLogout} />;
  }

  // If inside logistics dashboard, let the logistics dashboard manage its own specialized header & footer
  if (view === 'logistics_dashboard') {
    return <LogisticsDashboard onLogout={handleLogisticsLogout} />;
  }

  return (
    <div className="min-h-screen min-h-[100dvh] bg-farm-bg text-farm-text flex flex-col justify-between relative overflow-x-hidden selection:bg-farm-brand-soft selection:text-farm-brand transition-colors">
      {/* Top Application Header */}
      <Header
        currentView={view}
        onReplay={handleReplayIntro}
        onSkipSplash={handleSkipSplash}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 flex flex-col justify-center items-center relative z-10 w-full">
        <AnimatePresence mode="wait">
          {view === 'splash' && (
            <motion.div
              key="splash-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="w-full flex-1 flex flex-col justify-center items-center py-6"
            >
              <FarmLinkSplash onComplete={handleSplashComplete} />
            </motion.div>
          )}

          {view === 'role_selection' && (
            <motion.div
              key="roles-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex-1 flex flex-col justify-center items-center"
            >
              <RoleSelection
                selectedRole={selectedRole}
                onSelectRole={handleSelectRole}
                onOpenAdmin={handleOpenAdmin}
              />
            </motion.div>
          )}

          {view === 'role_transition' && selectedRole && (
            <motion.div
              key="transition-view"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="w-full flex-1 flex flex-col justify-center items-center px-4 py-8"
            >
              <RoleTransition
                role={selectedRole}
                onContinueToLogin={handleContinueToLogin}
                onBack={handleBackToRoles}
              />
            </motion.div>
          )}

          {view === 'role_login' && selectedRole && (
            <motion.div
              key="login-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full flex-1 flex flex-col justify-center items-center"
            >
              <RoleLoginScreen
                role={selectedRole}
                onBack={handleBackToRoles}
                onReplayIntro={handleReplayIntro}
                onLoginSuccess={handleLoginSuccess}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Modern AgriTech Trust Footer */}
      {view !== 'splash' && <Footer />}
    </div>
  );
}

export default App;
