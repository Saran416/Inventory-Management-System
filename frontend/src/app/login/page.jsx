'use client';

import { LoginForm } from '@/components/LoginForm.jsx';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { fetchUserPosition } from '@/api/user-position-call';

function LoginPage() {
  const router = useRouter();
  const { auth, loading } = useAuth();

  useEffect(() => {
    if (!loading && auth) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser) {
        console.error("No user found in localStorage");
        router.push("/login");
      }
      fetchUserPosition(storedUser.username)
        .then((data) => {
          if (data) {
            router.push(`/dashboard/${data.position}`);
          }
        });
    }
  }, [auth, loading, router]);


  return (
    <>
      <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
        <div className='w-full max-w-sm'>
          <LoginForm/>
        </div>
      </div>
    </>
  );
}

export default LoginPage;