"use client"; // this is a client component 👈🏽

import { useEffect, useMemo, useState } from 'react';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { createBrowserSupabaseClient } from '@/app/utils/supabase/client';
import { deleteVideo, getVideos, VideoRow } from './api/video';
import { useRouter } from 'next/navigation';
import VideoInput from './videoInput';

export default function VideosPage() {    
  const [data, setData] = useState<VideoRow[]>([]); 
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
      const songsData = await getVideos({}); 
      setData(songsData ?? []); 
    };
    fetchData();
  }, []);

  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null); // 선택된 곡 ID

  // 삭제 버튼 클릭 시 confirm을 사용해 삭제 여부 확인
  const handleDelete = async (link: string) => {
    const isConfirmed = confirm('삭제하시겠습니까?'); // 확인/취소 팝업
    if (isConfirmed) {
      try {
        await deleteVideo(link); // deleteVideo 호출
        setData((prevData) => prevData.filter((video) => video.link !== link)); // 삭제된 곡 제거
      } catch (error) {
        console.error('Error deleting song:', error);
      }
    }
  };


  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<VideoRow>[]>(
    () => [
      {
        accessorKey: 'link', 
        header: 'link',
        size: 150,
    },
        {
            accessorKey: 'cover_artist', 
            header: 'Cover_Artist',
            size: 150,
        },
          {
            accessorKey: 'original_artist_id',
            header: 'Original Artist ID',
            size: 150,
          },
        {
            accessorKey: 'song_id',
            header: 'song_id',
            size: 150,
        },
        {
          accessorKey: 'title', 
          header: 'title',
          size: 150,
      },

      {
        accessorKey: 'channel', 
        header: 'channel',
        size: 150,
    },
    {
      accessorKey: 'description', 
      header: 'description',
      size: 150,
  },
  {
    accessorKey: 'flag', 
    header: 'flag',
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
      {
        id: 'actions', // actions에 접근
        header: '',
        size: 100,
        Cell: ({ row }) => (
          <div>
          <Button className='h-10 w-20 bg-gray-800 text-white rounded-3xl' onClick={() => handleEdit(row.original.link)} >
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
          <Button className='h-10 w-20 bg-red-600 text-white rounded-3xl' onClick={() => handleDelete(row.original.link)}>
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
    setSelectedVideoId(null); // Reset songId to trigger form reset
    setOpen(true);
  };
  const handleEdit = (link: string) => {
    setSelectedVideoId(link); // 선택된 곡 ID 설정
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
          <DialogHeader>영상</DialogHeader>
          <DialogBody divider>
          <VideoInput videoId={selectedVideoId} /> 
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
