// import ProtectedRoute from '@/components/ProtectedRoute';
'use client';
import { SiteHeader } from '@/components/SiteHeader';

import { AppSidebar } from '@/components/AppSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { Button } from '@/components/ui/button';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/context/AuthContext';


function ProtectedRoute({ children }) {
  const router = useRouter();
  const { auth, loading } = useAuth();
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      router.push("/login");
      return;
    }

    fetch(`http://localhost:8080/api/user-position/${storedUser.username}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("User position:", data.position);
        setUserPosition(data.position);
      })
      .catch((err) => console.error("Error fetching data", err));

  }, [router]);

  useEffect(() => {
    if (!loading && !auth) {
      router.push('/login');
      return;
    }

    if (userPosition && userPosition !== "supervisor") {
      router.push("/login");
      return;
    }
  }, [auth, loading, userPosition, router]);

  if (loading) return <p>Loading...</p>;

  return auth ? children : null;
}

export default function DashBoardLayout({ children }) {
  return (
    <ProtectedRoute>
      <SidebarProvider className="flex flex-col">
        <div className="[--header-height:calc(theme(spacing.14))]">
          <SiteHeader/>
          <div className="flex flex-1 relative mt-(--header-height)">
            <AppSidebar/>
            <SidebarInset>
              {children}
            </SidebarInset>
          </div>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  )
}