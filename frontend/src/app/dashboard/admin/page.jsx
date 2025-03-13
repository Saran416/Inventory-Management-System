'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/context/AuthContext';

import { SiteHeader } from '@/components/sidebar/SiteHeader';

import { AppSidebar } from '@/components/sidebar/AppSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { Button } from '@/components/ui/button';



function DashBoard() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { auth, loading, logout } = useAuth();

  useEffect(() => {
    // Redirect to login if no user
    if (!auth) {
      router.push("/login");
      return;
    }
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      router.push("/login");
      return;
    }
    setUser(storedUser);
  }, [auth, loading, router]);

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <div>
        <h1>Welcome, {user.username}</h1>
      </div>
          
    </>
  );
}

export default DashBoard;