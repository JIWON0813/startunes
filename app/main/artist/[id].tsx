'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Artist() {

    const params = useSearchParams();

    useEffect(() => {
      const fetchChannel = async () => {
        const id = params.get('id')!;
      };
  
      fetchChannel();
    }, [params]);
  

    return (
        <div>
            <h1>Artist</h1>
        </div>
    );
}