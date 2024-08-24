"use client"; // this is a client component 👈🏽

import { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { createBrowserSupabaseClient } from '@/app/utils/supabase/client';
import { getVideos, VideoRow } from './api/video';

export default function VideosPage() {    
  const [data, setData] = useState<VideoRow[]>([]); 

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();
    const session = supabase.auth.getSession();

    if(!session){
        alert('TLqkf')
    }

    const fetchData = async () => {
      const videosData = await getVideos({}); 
      setData(videosData ?? []); 
    };
    fetchData();
  }, []);

  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<VideoRow>[]>(
    () => [
        {
            accessorKey: 'id',
            header: 'ID',
            size: 100,
        },
        {
            accessorKey: 'cover_artist', 
            header: 'Cover Artist',
            size: 150,
        },
          {
            accessorKey: 'original_artist_id',
            header: 'Original Artist ID',
            size: 150,
          },
        {
            accessorKey: 'song_id',
            header: 'Song ID',
            size: 150,
        },
        {
            accessorKey: 'create_dt',
            header: 'Creation Date',
            size: 150,
          },
          {
            accessorKey: 'edit_dt',
            header: 'Edit Date',
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
    
      <MaterialReactTable columns={columns} data={data} />

    </>
  ) ;
};
