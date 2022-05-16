import { useEffect, useState } from 'react';

import { get } from 'utils/api';

type Fragment = {
  id: number;
  date: string;
  from?: string;
  to?: string;
  amount: number;
  Project: {
    id: number;
    title: string;
  };
  User: {
    id: number;
    firstName: string;
    lastName: string;
  };
};

const useFragmentsRequest = () => {
  const [fragments, setFragments] = useState<Fragment[]>([]);

  useEffect(() => {
    get<Fragment[]>('/fragments')
      .then(({ data }) => {
        setFragments(data);
      })
      .catch(() => {});
  }, []);

  return fragments;
};

export default useFragmentsRequest;
