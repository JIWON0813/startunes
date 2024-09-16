"use client"; // this is a client component 👈🏽

import { createBrowserSupabaseClient } from '@/app/utils/supabase/client';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { SongRow, deleteSong, getSongs } from './api/song';
import SongInput from './songInput';

export default function SongsPage() {    
  const [data, setData] = useState<SongRow[]>([]); 
  const router = useRouter();

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if(session == null){
        router.push('/admin');
      }
    };
    checkSession();

    const fetchData = async () => {
      const songsData = await getSongs({}); 
      setData(songsData ?? []); 
    };
    fetchData();
  }, []);

  const [selectedSongId, setSelectedSongId] = useState<string | null>(null); // 선택된 곡 ID

  // 삭제 버튼 클릭 시 confirm을 사용해 삭제 여부 확인
  const handleDelete = async (songId: string) => {
    const isConfirmed = confirm('삭제하시겠습니까?'); // 확인/취소 팝업
    if (isConfirmed) {
      try {
        await deleteSong(songId); // deleteSong 호출
        setData((prevData) => prevData.filter((song) => song.song_id !== songId)); // 삭제된 곡 제거
      } catch (error) {
        console.error('Error deleting song:', error);
      }
    }
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
        accessorKey: 'lyrics_part', // language에 접근
        header: 'lyrics_part',
        size: 150,
      },
      {
        accessorKey: 'lyrics_all', // language에 접근
        header: 'lyrics_all',
        size: 150,
      },
      {
        accessorKey: 'description', // language에 접근
        header: 'description',
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
          <Button className='h-10 w-20 bg-gray-800 text-white rounded-3xl' onClick={() => handleEdit(row.original.song_id)} >
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
          <Button className='h-10 w-20 bg-red-600 text-white rounded-3xl' onClick={() => handleDelete(row.original.song_id)}>
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
  const handleAddNew = () => {
    setSelectedSongId(null); // Reset songId to trigger form reset
    setOpen(true);
  };
  const handleEdit = (songId: string) => {
    setSelectedSongId(songId); // 선택된 곡 ID 설정
    setOpen(true); // 모달 열기
  };
  return(
    <>
      <>
       <Button onClick={handleAddNew} className="h-[50px] w-[120px] bg-gray-800 text-white rounded-3xl text-white">
          Add New +
        </Button>
      <MaterialReactTable columns={columns} data={data} />
     

        {/* Dialog 컴포넌트로 팝업 구현 */}
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>곡</DialogHeader>
          <DialogBody divider>
          <SongInput songId={selectedSongId} /> 
        </DialogBody>
          <DialogFooter>
            <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
              닫기
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    </>
  ) ;
};
