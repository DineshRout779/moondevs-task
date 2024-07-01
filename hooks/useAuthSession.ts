'use client';

import { useAppSelector } from '@/redux/store';
import { useEffect, useState } from 'react';

const useAuthSession = () => {
  const { user: initialUser, token } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(!initialUser);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<typeof initialUser>(initialUser);

  useEffect(() => {
    const getLoggedInUser = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUser(data.user);
        // console.log(data);
      } catch (error: any) {
        console.error(error);
        setError(error.message || 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      getLoggedInUser();
    } else {
      setIsLoading(false);
      setUser(initialUser);
    }
  }, [token]);

  return { user, isLoading, error, token };
};

export default useAuthSession;
