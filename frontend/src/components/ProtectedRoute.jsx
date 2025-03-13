"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { fetchEmployeePosition } from '@/api/user-service-call';

export default function ProtectedRoute({ position, children }) {
  const router = useRouter();
  const { auth, loading } = useAuth();
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      router.push("/login");
      return;
    }

    fetchEmployeePosition(storedUser.username)
      .then((data) => {
        if (data) setUserPosition(data.position);
      })
      .catch((err) => console.error("Error fetching data", err));


  }, [router]);

  useEffect(() => {
    if (!loading && !auth) {
      router.push('/login');
      return;
    }

    if (userPosition && userPosition !== position) {
      router.push("/login");
      return;
    }
  }, [auth, loading, userPosition, router]);

  // Show loading state until `auth` is checked
  if (loading) return <p>Loading...</p>;

  return auth ? children : null;
}
