'use client';

import { useState, useEffect } from 'react';

import * as React from 'react';

import { NavMain } from '@/components/sidebar/NavMain';
import { NavProjects } from '@/components/sidebar/NavProjects';
import { NavUtilities } from '@/components/sidebar/NavUtilities';
import { NavUser } from '@/components/sidebar/NavUser';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';

import { fetchEmployeePosition } from '@/api/employee-call';
import { generateSidebarData } from '@/handlers/sidebarHandler';

// This is sample data.


export function AppSidebar({...props}) {
  const [sidebarData, setSidebarData] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      console.error("No user found in localStorage");
      return;
    }

    setUser(storedUser);
    
    fetchEmployeePosition(storedUser.username)
      .then((data) => {
        if (data) {
          setSidebarData(generateSidebarData(storedUser.username, data.position));
        }
      });
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
      {/* {sidebarData.projects && <NavProjects projects={sidebarData.projects} />} */}
      {sidebarData.utilities && <NavUtilities utilities={sidebarData.utilities} />}
    </SidebarContent>
    <SidebarFooter>
      {sidebarData.user && <NavUser user={sidebarData.user} />}
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
);

}
