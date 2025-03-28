'use client';
import ProtectedRoute from '@/components/ProtectedRoute';
import { SiteHeader } from '@/components/sidebar/SiteHeader';

import { AppSidebar } from '@/components/sidebar/AppSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { Button } from '@/components/ui/button';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/context/AuthContext';


export default function DashBoardLayout({ children }) {
  return (
    <ProtectedRoute position={"warehouse-employee"}>
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