"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { auth, loading } = useAuth();

  useEffect(() => {
    if (!loading && !auth) {
      router.push('/login'); // Redirect if auth is false AFTER loading
    }
  }, [auth, loading, router]);

  // Show loading state until `auth` is checked
  if (loading) return <p>Loading...</p>;

  return auth ? children : null;
}
