'use client';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

const page = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify(values),
      });

      const data = await res.json();

      console.log('data: ', data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <form onSubmit={handleSubmit} className='w-full max-w-[480px] mx-auto'>
        <h1 className='text-2xl font-medium'>Create an account</h1>
        <div className='my-4'>
          <input
            type='text'
            name='username'
            id='username'
            placeholder='Enter username'
            className='border w-full block p-2 rounded-md'
            value={values.username}
            onChange={(e) =>
              setValues({
                ...values,
                username: e.target.value,
              })
            }
          />
        </div>
        <div className='my-4'>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Enter password'
            className='border w-full block p-2 rounded-md'
            value={values.password}
            onChange={(e) =>
              setValues({
                ...values,
                password: e.target.value,
              })
            }
          />
        </div>
        <button
          className='p-2 mb-4 px-4 font-medium rounded-md bg-blue-600 text-white'
          type='submit'
        >
          Create an account
        </button>
        <p>
          Already have an account?{' '}
          <Link className='text-blue-600' href={'/login'}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default page;
