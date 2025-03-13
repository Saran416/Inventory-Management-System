'use client';
import { useState } from 'react';

import { SiteHeader } from '@/components/SiteHeader';

import { AppSidebar } from '@/components/AppSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { Button } from '@/components/ui/button';

function Section1() {
  return (
    <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
      <div className='aspect-video rounded-xl bg-red-400'/>
      <div className='aspect-video rounded-xl bg-red-400'/>
      <div className='aspect-video rounded-xl bg-red-400'/>
    </div>
  );
}

function Section2() {
  return (
    <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
      <div className='aspect-video rounded-xl bg-blue-400'/>
      <div className='aspect-video rounded-xl bg-blue-400'/>
      <div className='aspect-video rounded-xl bg-blue-400'/>
    </div>
  );
}

function DashBoard() {
  const [section, setSection] = useState(1);


  return (
    <>
      <div className='w-full pt-2 pb-2 px-4'>
        <Button onClick={() => setSection((prevSection) => (prevSection === 1 ? 2 : 1))}>Click to change section</Button>

      </div>
      
      <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>

        {section === 1 && <Section1/>}
        {section === 2 && <Section2/>}
        {section === 1 && <Section1/>}
        {section === 2 && <Section2/>}
        {section === 1 && <Section1/>}
        {section === 2 && <Section2/>}
        {section === 1 && <Section1/>}
        {section === 2 && <Section2/>}
        
      </div>
      <div className='h-[100vh] relative  flex-1 rounded-xl bg-black md:min-h-min'>fdsf</div>
          
    </>
  );
}

export default DashBoard;