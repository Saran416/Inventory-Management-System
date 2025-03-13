'use client';

import { useState, useEffect } from 'react';

import * as React from 'react';
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal
} from 'lucide-react';

import { NavMain } from '@/components/NavMain';
import { NavProjects } from '@/components/NavProjects';
import { NavUser } from '@/components/NavUser';
import { TeamSwitcher } from '@/components/TeamSwitcher';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';

// This is sample data.


export function AppSidebar({...props}) {
  const [sidebarData, setSidebarData] = useState({});
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      console.error("No user found in localStorage");
      return; // Exit useEffect early if no user is found
    }

    setUser(storedUser);
    fetch(`http://localhost:8080/api/user-position/${storedUser.username}`)
      .then((res) => res.json())
      .then((data) => {
        setSidebarData({
          user: {
            name: storedUser.username,
            position: data.position,
          },
          navMain: [
            {
              title: "Playground",
              url: "#",
              icon: SquareTerminal,
              isActive: true,
              items: [
                { title: "Dashboard", url: "/dashboard" },
                { title: "Inner", url: "/dashboard/inner" },
                { title: "Settings", url: "#" },
              ],
            },
            {
              title: "Models",
              url: "#",
              icon: Bot,
              items: [
                { title: "Genesis", url: "#" },
                { title: "Explorer", url: "#" },
                { title: "Quantum", url: "#" },
              ],
            },
            {
              title: "Documentation",
              url: "#",
              icon: BookOpen,
              items: [
                { title: "Introduction", url: "dashboard" },
                { title: "Get Started", url: "#" },
                { title: "Tutorials", url: "#" },
                { title: "Changelog", url: "#" },
              ],
            },
            {
              title: "Settings",
              url: "#",
              icon: Settings2,
              items: [
                { title: "General", url: "#" },
                { title: "Team", url: "#" },
                { title: "Billing", url: "#" },
                { title: "Limits", url: "#" },
              ],
            },
          ],
          projects: [
            { name: "Design Engineering", url: "#", icon: Frame },
            { name: "Sales & Marketing", url: "#", icon: PieChart },
            { name: "Travel", url: "#", icon: Map },
          ],
        });
      })
      .catch((err) => console.error("Error fetching user data", err));
  }, []);

  if (!sidebarData) {
    return <p>Loading...</p>; // Show loading state while fetching data
  }


return (
  <Sidebar
    className="top-(--header-height) !h-[calc(100svh-var(--header-height))]"
    collapsible="icon"
    {...props}
  >
    {/* <SidebarHeader>
     <TeamSwitcher teams={data.teams}/>
   </SidebarHeader> */}
    <SidebarContent>
      {sidebarData.navMain && <NavMain items={sidebarData.navMain} />}
      {sidebarData.projects && <NavProjects projects={sidebarData.projects} />}
    </SidebarContent>
    <SidebarFooter>
      {sidebarData.user && <NavUser user={sidebarData.user} />}
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
);

}
