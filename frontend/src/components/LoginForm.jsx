"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

import {useState} from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

import { validateLogin } from "@/api/login-calls"

export function LoginForm({ className, ...props }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { setAuth } = useAuth();


  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Error", {
        description: "Please fill all fields",
      });
      return;
    }

    const data = await validateLogin(username, password);

  if (data.success) {
    setAuth(true);
    localStorage.setItem("user", JSON.stringify({ username }));
    router.push(`/dashboard/${data.position}`);
  } else {
    toast.error("Login Failed", {
      description: data.message, // This now includes invalid credentials & server error messages
    });
  }

  
  };



  return (
    <>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your username below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
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
                  {/* <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div> */}
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
