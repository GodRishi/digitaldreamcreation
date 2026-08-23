import React, { useState, useEffect } from 'react';
import AdminLogin from '../components/AdminLogin';
import AdminDashboard from '../components/AdminDashboard';
import { RefreshCw } from 'lucide-react';

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Dynamic Noindex / Nofollow meta tag injection for security & search engine exclusion
  useEffect(() => {
    let metaTag = document.querySelector('meta[name="robots"]');
    let created = false;

    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.name = 'robots';
      created = true;
    }

    const previousContent = metaTag.content;
    metaTag.content = 'noindex, nofollow';

    if (created) {
      document.head.appendChild(metaTag);
    }

    return () => {
      if (created) {
        document.head.removeChild(metaTag);
      } else {
        metaTag.content = previousContent || 'index, follow';
      }
    };
  }, []);

  // Check auth session status
  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth-check');
      const data = await res.json();
      setIsAuthenticated(!!data.authenticated);
    } catch (err) {
      setIsAuthenticated(false);
    } finally {
      setCheckingAuth(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#000000] text-[#F5F5F7] flex items-center justify-center p-6">
        <div className="text-center font-cinzel text-xs uppercase tracking-[0.25em] text-[#86868B] flex items-center gap-3">
          <RefreshCw className="w-4 h-4 text-[#D9B36C] animate-spin" />
          <span>Verifying Studio Session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return <AdminDashboard onLogout={() => setIsAuthenticated(false)} />;
}
