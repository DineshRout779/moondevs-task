'use client';
import useAuthSession from '@/hooks/useAuthSession';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/store';
import { clearAuth } from '@/redux/auth/authSlice';
import Image from 'next/image';
import toast from 'react-hot-toast';

const page = () => {
  const { user, isLoading, error, token } = useAuthSession();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(clearAuth());
    toast.success('Logout successful');
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
      <div className='p-4'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-semibold'>Protected Page</h1>
          <button
            className='p-2 px-4 border border-blue-600 bg-blue-600 text-white rounded-md font-medium'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <div className='flex gap-4 items-center'>
          <Image
            src={
              'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='
            }
            alt='avatar'
            width={200}
            height={200}
            className='w-24 h-24 rounded-full'
          />
          <p className='font-medium'>{user?.username}</p>
        </div>
      </div>
    );
  }

  return null;
};

export default page;
