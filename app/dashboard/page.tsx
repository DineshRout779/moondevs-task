'use client';
import useAuthSession from '@/hooks/useAuthSession';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/store';
import { clearAuth } from '@/redux/auth/authSlice';

const page = () => {
  const { user, isLoading, error, token } = useAuthSession();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(clearAuth());
  };

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (user) {
    return (
      <div>
        <h1 className='text-2xl font-semibold'>Protected Page</h1>
        <p className='font-medium'>{user?.username}</p>
        <button
          className='p-2 px-4 border border-blue-600 bg-blue-600 text-white rounded-md font-medium'
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    );
  }

  return null;
};

export default page;
