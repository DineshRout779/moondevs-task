'use client';

import { setToken } from '@/redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const page = () => {
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      password: Yup.string()
        .min(6, 'Must be 20 characters or less')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const res = await fetch('/api/signup', {
          method: 'POST',
          body: JSON.stringify(values),
        });

        const data = await res.json();

        console.log('data: ', data);

        if (data.error) {
          toast.error(data.error);
        }

        if (data.success === true) {
          dispatch(setToken(data.token));
          toast.success('Signup successful');
          router.push('/dashboard');
        }
      } catch (error) {
        console.log(error);
        // toast.error(error);
      }
    },
  });

  useEffect(() => {
    if (token) {
      router.push('/dashboard');
    }
  }, [token]);

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <form
        onSubmit={formik.handleSubmit}
        className='w-full max-w-[480px] mx-auto'
      >
        <h1 className='text-2xl font-medium'>Create an account</h1>
        <div className='my-4'>
          <input
            type='text'
            name='username'
            id='username'
            placeholder='Enter username'
            className='border w-full block p-2 rounded-md'
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className='text-xs text-red-500'>{formik.errors.username}</div>
          ) : null}
        </div>

        <div className='my-4'>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Enter password'
            className='border w-full block p-2 rounded-md'
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className='text-xs text-red-500'>{formik.errors.password}</div>
          ) : null}
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
