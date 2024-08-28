"use client"; // this is a client component 👈🏽

import { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { SongRow, getSongs } from './api/song';
import { createBrowserSupabaseClient } from '@/app/utils/supabase/client';
import SongInput2 from './songtest';

export default function SongsPage() {    
  const [data, setData] = useState<SongRow[]>([]); 

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();
    const session = supabase.auth.getSession();


    const fetchData = async () => {
      const songsData = await getSongs({}); 
      setData(songsData ?? []); 
    };
    fetchData();
  }, []);

  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<SongRow>[]>(
    () => [
      {
        accessorKey: 'song_id', // song_id에 접근
        header: 'Song ID',
        size: 150,
      },
      {
        accessorKey: 'title', // title에 접근
        header: 'Title',
        size: 150,
      },
      {
        accessorKey: 'artist', // artist에 접근
        header: 'Artist',
        size: 200,
      },
      {
        accessorKey: 'language', // language에 접근
        header: 'Language',
        size: 150,
      },
      {
        accessorKey: 'created_time', // created_time에 접근
        header: 'Created Time',
        size: 150,
      },
      {
        accessorKey: 'edit_time', // edit_time에 접근
        header: 'Edit Time',
        size: 150,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
  });

  if(!data){
    return null;
  }

  return(
    <>
     {data.length > 0 ? (
      <>
      <MaterialReactTable columns={columns} data={data} />
      <SongInput2 />
      </>
    ) : (
      <div>Loading...</div>
    )}
    </>
  ) ;
};
