'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/context/AuthContext';

import { SiteHeader } from '@/components/sidebar/SiteHeader';

import { AppSidebar } from '@/components/sidebar/AppSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { Button } from '@/components/ui/button';

import { PieChartComponent, AreaChartComponent, BarChartComponent } from "@/components/ChartComponents";


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
      <div className="p-10">
        <h1>Welcome, {user.username}</h1>
        <div className="flex flex-wrap  pt-10">
          <div className="w-[30%]">
            <PieChartComponent />

          </div><div className="w-[30%]">
            <PieChartComponent />

          </div><div className="w-[30%]">
            <BarChartComponent />

          </div>
        </div>
        <AreaChartComponent />
        
      </div>
          
    </>
  );
}

export default DashBoard;