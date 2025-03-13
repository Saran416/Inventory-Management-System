'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from 'react';
import { toast } from "sonner"

import { addEmployee, employeeExists, fetchEmployeePosition } from '@/api/user-service-call';

export default function Inner() {
  const [username, setUsername] = useState("");
  const [position, setPosition] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");



  const handleAddEmployee = async (e) => {
    e.preventDefault();
    if (!username || !position || !password || !confirmPassword) {
      toast.error("Error", {
        description: "Please fill all fields",
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
    const employeeExistsResponse = await employeeExists(username);
    console.log(employeeExistsResponse);
    if (employeeExistsResponse && employeeExistsResponse.success) {
      toast.error("Error", {
        description: employeeExists.message,
      });
      return;
    }

    const response = await addEmployee(username, position, password);
    if (response.success) {
      toast.success("Success", {
        description: response.message,
      });

      // Clear input fields after success
      setUsername("");
      setPosition("");
      setPassword("");
      setConfirmPassword("");
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="supervisor">Supervisor</SelectItem>
                <SelectItem value="employee">Employee</SelectItem>
              </SelectContent>
            </Select>
          </div>

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