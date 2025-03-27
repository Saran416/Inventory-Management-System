'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from 'react';
import { toast } from "sonner"

import { addFacility } from '@/api/facility-calls';

import { set } from 'date-fns';

export default function AddFacilityPage() {
  const [facilityType, setFacilityType] = useState("");
  const [facilityLocation, setFacilityLocation] = useState("");
  const [facilityCoordinates, setFacilityCoordinates] = useState("");



  const facility_types = [
    ["store", "Store"],
    ["warehouse", "Warehouse"],
  ]
  
  const handleAddFacility = async (e) => {
    e.preventDefault();
    if (!facilityType || !facilityLocation || !facilityCoordinates) {
      toast.error("Error", {
        description: "Please fill all fields",
      });
      return;
    }

    let response = await addFacility(facilityType, facilityLocation, facilityCoordinates);
    // let response = { success: true, message: "Added" };

    console.log("Added ", facilityType, facilityLocation, facilityCoordinates);

    if (response.success) {
      toast.success("Success", {
        description: response.message,
      });
      setFacilityType("");
      setFacilityLocation("");
      setFacilityCoordinates("");
      

    } else {
      toast.error("Error", {
        description: response.message,
      });
    }
  };


  return (
    <div className="p-10">
      <div className="font-semibold tracking-tight text-3xl">Add facility</div>

      <form onSubmit={handleAddFacility} className='w-[50%] pt-10'>
        <div className="flex flex-col gap-6">

          <div className="grid gap-2">
            <Select onValueChange={setFacilityType} value={facilityType} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {
                  facility_types.map((facility_type) => (
                    <SelectItem key={facility_type[0]} value={facility_type[0]}>
                      {facility_type[1]}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Input 
              id="facilityLocation" 
              type="facilityLocation" 
              placeholder="Location"
              value={facilityLocation} 
              onChange={(e) => setFacilityLocation(e.target.value)} 
              required 
            />
          </div>

          <div className="grid gap-2">
            <Input 
              id="facilityCoordinates" 
              type="facilityCoordinates" 
              placeholder="Coordinates"
              value={facilityCoordinates} 
              onChange={(e) => setFacilityCoordinates(e.target.value)} 
              required 
            />
          </div>
          
          <Button type="submit" className="w-full">
            Add facility
          </Button>
        </div>
      </form>

    </div>
  )
}