import { useAppSelector } from '@/redux/store';
import { useEffect } from 'react';

const useAuthSession = () => {
  const { user, token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        const response = await fetch('/api/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (token) getLoggedInUser();
  }, [token]);

  return { user };
};

export default useAuthSession;
