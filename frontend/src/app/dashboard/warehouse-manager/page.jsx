'use client';
import { useState } from 'react';

import { SiteHeader } from '@/components/sidebar/SiteHeader';

import { AppSidebar } from '@/components/sidebar/AppSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';


import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { InventoryTransactionsTable, CurrentOrdersTable } from './TableComponents';


function AccordionComponent() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Current Orders</AccordionTrigger>
        <AccordionContent>
          <CurrentOrdersTable />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Inventory Transactions</AccordionTrigger>
        <AccordionContent>
          <InventoryTransactionsTable />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Item 3</AccordionTrigger>
        <AccordionContent>
          Content for Item 3 goes here. Add details or interactive elements.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}



function DashBoard() {

  
  return (
    <div className="p-10">
      <div className="font-semibold tracking-tight text-3xl">Dashboard</div>

      <div className="grid grid-cols-12 gap-10 mt-10">
        <div className="col-span-12">
          <AccordionComponent />
          
        </div>
        
      </div>
      
    </div>
  );
}

export default DashBoard;