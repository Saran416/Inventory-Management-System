'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from 'react';
import { toast } from "sonner"

import { 
  addEmployee, 
  addAdmin,
  addAuditor,
  addWarehouseManager,
  addWarehouseEmployee,
  addStoreManager,
  addStoreEmployee,
  employeeExists, 
} from '@/api/employee-call';

import { fetchWarehouseLocations, fetchStoreLocations } from '@/api/facility-calls';
import { set } from 'date-fns';

export default function AddEmployeePage() {
  const [employeeName, setEmmployeeName] = useState("");
  const [position, setPosition] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [storeLocations, setStoreLocations] = useState([]);
  const [selectedStoreLocation, setSelectedStoreLocation] = useState("");

  const [warehouseLocations, setWarehouseLocations] = useState([]);
  const [selectedWarehouseLocation, setSelectedWarehouseLocation] = useState("");

  const positions = [
    // ["admin", "Admin"],
    ["auditor", "Auditor"],
    ["warehouse-manager", "Warehouse Manager"],
    ["warehouse-employee", "Warehouse Employee"],
    ["store-manager", "Store Manager"],
    ["store-employee", "Store Employee"],
  ];

  useEffect(() => {
    const fetchLocations = async () => {
      const warehouseLocationsResponse = await fetchWarehouseLocations();
  
      if (warehouseLocationsResponse.success) {
        // Convert array of strings into an array of objects
        const formattedLocations = warehouseLocationsResponse.locations.map((location, index) => ({
          id: String(index), // Use index as ID (or use location if it's unique)
          name: location, // Store the string as 'name'
        }));
        setWarehouseLocations(formattedLocations);
        console.log("Formatted Warehouse Locations:", formattedLocations);
      } else {
        toast.error("Error", {
          description: warehouseLocationsResponse.message,
        });
      }
  
      const storeLocationsResponse = await fetchStoreLocations();
  
      if (storeLocationsResponse.success) {
        const formattedStoreLocations = storeLocationsResponse.locations.map((location, index) => ({
          id: String(index),
          name: location,
        }));
        setStoreLocations(formattedStoreLocations);
      } else {
        toast.error("Error", {
          description: storeLocationsResponse.message,
        });
      }
    };
  
    fetchLocations();
  }, []);
  



  const handleAddEmployee = async (e) => {
    e.preventDefault();
    if (!employeeName || !position || !password || !confirmPassword) {
      toast.error("Error", {
        description: "Please fill all fields",
      });
      return;
    }

    if ((position === "warehouse-manager" || position === "warehouse-employee") && !selectedWarehouseLocation) {
      toast.error("Error", {
        description: "Please select a warehouse location",
      });
      return;
    }

    if ((position === "store-manager" || position === "store-employee") && !selectedStoreLocation) {
      toast.error("Error", {
        description: "Please select a store location",
      });
      return;
    }


    if (password !== confirmPassword) {
      toast.error("Error", {
        description: "Passwords don't match",
      })
      return;
    }

    // Check if employee already exists
    const employeeExistsResponse = await employeeExists(employeeName);
    console.log(employeeExistsResponse);
    if (employeeExistsResponse && employeeExistsResponse.success) {
      toast.error("Error", {
        description: employeeExists.message,
      });
      return;
    }

    let response;
    if (position === "admin") {
      response = await addAdmin(employeeName, password);
    } else if (position === "auditor") {
      response = await addAuditor(employeeName, password);
    } else if (position === "warehouse-manager") {
      response = await addWarehouseManager(employeeName, selectedWarehouseLocation, password);
    } else if (position === "warehouse-employee") {
      response = await addWarehouseEmployee(employeeName, selectedWarehouseLocation, password);
    } else if (position === "store-manager") {
      response = await addStoreManager(employeeName, selectedStoreLocation, password);
    } else if (position === "store-employee") {
      response = await addStoreEmployee(employeeName, selectedStoreLocation, password);
    }

    // response = await addEmployee(username, position, password);
    if (response.success) {
      toast.success("Success", {
        description: response.message,
      });

      // Clear input fields after success
      setEmmployeeName("");
      setPosition("");
      setPassword("");
      setConfirmPassword("");
      setSelectedWarehouseLocation("");
      setSelectedStoreLocation("");
    } else {
      toast.error("Error", {
        description: response.message,
      });
    }
  };

  return (
    <div className="p-10">
      <div className="font-semibold tracking-tight text-3xl">Add employee</div>

      <form onSubmit={handleAddEmployee} className='w-[50%] pt-10'>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            {/* <Label htmlFor="username">Username</Label> */}
            <Input
              id="username"
              type="text"
              placeholder="username"
              value={employeeName}
              onChange={(e) => setEmmployeeName(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              {/* <Label htmlFor="password">Position</Label> */}
            </div>
            <Select onValueChange={setPosition} value={position}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                {
                  positions.map((position) => (
                    <SelectItem key={position[0]} value={position[0]}>
                      {position[1]}
                    </SelectItem>
                  ))
                }
                {/* <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="auditor">Auditor</SelectItem>
                <SelectItem value="warehouse-manager">Warehouse manager</SelectItem>
                <SelectItem value="warehouse-employee">Warehouse employee</SelectItem>
                <SelectItem value="store-manager">Store manager</SelectItem>
                <SelectItem value="store-employee">Store employee</SelectItem> */}
              </SelectContent>
            </Select>
          </div>

          {
            (position === "warehouse-manager" || position === "warehouse-employee") && (
              <div className="grid gap-2">
                <Select onValueChange={setSelectedWarehouseLocation} value={selectedWarehouseLocation}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select warehouse location" />
                  </SelectTrigger>
                  <SelectContent>
                    {warehouseLocations.map((location) => (
                      <SelectItem key={location.id} value={location.name}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )
          }

          {
            (position === "store-manager" || position === "store-employee") && (
              <div className="grid gap-2">
                <Select onValueChange={setSelectedStoreLocation} value={selectedStoreLocation}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select store location" />
                  </SelectTrigger>
                  <SelectContent>
                    {storeLocations.map((location) => (
                      <SelectItem key={location.id} value={location.name}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )
          }




          <div className="grid gap-2">
            <div className="flex items-center">
              {/* <Label htmlFor="password">Password</Label> */}
            </div>
            <Input 
              id="password" 
              type="password" 
              placeholder="password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <Input 
              id="password" 
              type="password" 
              placeholder="confirm password"
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
          </div>
          
          <Button type="submit" className="w-full">
            Add employee
          </Button>
        </div>
      </form>

    </div>
  )
}