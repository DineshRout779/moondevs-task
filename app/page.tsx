import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex min-h-screen items-center flex-col gap-4 justify-center'>
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
    </main>
  );
}
