'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/context/AuthContext';

import { SiteHeader } from '@/components/SiteHeader';

import { AppSidebar } from '@/components/AppSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { Button } from '@/components/ui/button';



function DashBoard() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
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

    // Fetch user-specific data from backend
    fetch(`http://localhost:8080/api/user/${storedUser.username}`)
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((err) => console.error("Error fetching data", err));
  }, [auth, loading, router]);

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <div>
        <h1>Welcome, {user.username} ({user.position})</h1>
        {userData ? <pre>{JSON.stringify(userData, null, 2)}</pre> : <p>Loading user data...</p>}
        <button onClick={logout}>Logout</button>
      </div>
          
    </>
  );
}

export default DashBoard;