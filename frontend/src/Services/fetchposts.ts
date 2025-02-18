import { useState, useEffect } from 'react';

const useFetch = (url: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const result = await response.json();
      setData(result.data); // Assuming Strapi's response includes a "data" field
      setLoading(false);
    };

    fetchData();
  }, [url]);

  return { data, loading };
};

export default useFetch;
