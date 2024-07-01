'use client';
import useAuthSession from '@/hooks/useAuthSession';
import { clearAuth } from '@/redux/auth/authSlice';
import { useAppDispatch } from '@/redux/store';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function Home() {
  const { user, isLoading } = useAuthSession();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(clearAuth());
    toast.success('Logout successful');
  };

  if (isLoading) {
    return <p>Loading...please wait</p>;
  }

  return (
    <main className='flex min-h-screen items-center flex-col gap-4 justify-center'>
      {user ? (
        <>
          <h1 className='text-2xl font-bold'>Welcome {user.username}</h1>
          <Link href='/dashboard'>Dashboard</Link>
          <button
            className='p-2 px-4 border border-blue-600 bg-blue-600 text-white rounded-md font-medium'
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <h1 className='text-2xl'>Please login or signup to continue</h1>
          <div className='flex gap-2 items-center'>
            <Link
              href={'/login'}
              className='p-2 px-4 border border-blue-600 rounded-md bg-white text-blue-600
           font-medium'
            >
              Login
            </Link>
            <Link
              href={'/signup'}
              className='p-2 px-4 border border-blue-600 bg-blue-600 text-white rounded-md font-medium'
            >
              Create Account
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
