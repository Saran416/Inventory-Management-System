'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { toast } from "sonner"

import { addBrand } from '@/api/brand-calls';

export default function AddFacilityPage() {
  const [brandName, setBrandName] = useState("");
  const [brandContactInfo, setBrandContactInfo] = useState("");

  
  const handleAddBrand = async (e) => {
    e.preventDefault();
    if (!brandName || !brandContactInfo) {
      toast.error("Error", {
        description: "Please fill all fields",
      });
      return;
    }

    let response = await addBrand(brandName, brandContactInfo);

    if (response.success) {
      toast.success("Success", {
        description: response.message,
      });
      setBrandName("");
      setBrandContactInfo("");

    } else {
      toast.error("Error", {
        description: response.message,
      });
    }
  };


  return (
    <div className="p-10">
      <div className="font-semibold tracking-tight text-3xl">Add brand</div>
      <form onSubmit={handleAddBrand} className='w-[50%] pt-10'>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Input 
              id="brandName" 
              type="brandName" 
              placeholder="Brand Name"
              value={brandName} 
              onChange={(e) => setBrandName(e.target.value)} 
              required 
            />

          </div>

          <div className="grid gap-2">
            <Input 
              id="brandContactInfo" 
              type="brandContactInfo" 
              placeholder="Brand Contact Info"
              value={brandContactInfo} 
              onChange={(e) => setBrandContactInfo(e.target.value)} 
              required 
            />

          </div>

          <Button type="submit" className="w-full">
            Add brand
          </Button>
        </div>
      </form>

    </div>
  )
}