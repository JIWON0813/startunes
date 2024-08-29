"use client"; // this is a client component 👈🏽

import { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { SongRow, getSongs } from './api/song';
import { createBrowserSupabaseClient } from '@/app/utils/supabase/client';
import { IoIosMore } from 'react-icons/io';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton } from '@material-tailwind/react';
import ReactQueryClientProviders from '@/app/config/ReactQueryClientProvider';
import SongInput from './songInput';

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

  const [dropdownVisible, setDropdownVisible] = useState<string | null>(null);

  const toggleDropdown = (rowId: string) => {
    setDropdownVisible(dropdownVisible === rowId ? null : rowId);
    console.log('oo')
  };

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
      {
        id: 'actions', // actions에 접근
        header: '',
        size: 100,
        Cell: ({ row }) => (
          <div>
          <Button className='h-10 w-20 bg-gray-800 text-white rounded-3xl'>
            수정
          </Button>
          </div>
          
        ),
      },
      {
        id: 'actions', // actions에 접근
        header: '',
        size: 100,
        Cell: ({ row }) => (
          <div>
          <Button className='h-10 w-20 bg-red-600 text-white rounded-3xl'>
            삭제
          </Button>
          </div>
        ),
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

  const [open, setOpen] = useState(false); // 팝업 열림 상태
  const handleOpen = () => setOpen(!open); // 팝업 열기/닫기 토글
  return(
    <>
     {data.length > 0 ? (
      <>
       <Button onClick={handleOpen} className="h-[50px] w-[120px] bg-gray-800 text-white rounded-3xl text-white">
          Add New +
        </Button>
      <MaterialReactTable columns={columns} data={data} />
     

        {/* Dialog 컴포넌트로 팝업 구현 */}
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>새로운 곡 추가</DialogHeader>
          <DialogBody divider>
            <SongInput />
          </DialogBody>
          <DialogFooter>
            <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
              닫기
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    ) : (
      <div>Loading...</div>
    )}
    </>
  ) ;
};
