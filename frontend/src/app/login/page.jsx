'use client';

import { LoginForm } from '@/components/LoginForm.jsx';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function LoginPage() {
  const router = useRouter();
  const { auth, loading } = useAuth();

  useEffect(() => {


    if (!loading && auth) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser) {
        router.push("/");
      } else {
        // router.push(`/dashboard/${storedUser.username}`);
      }
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