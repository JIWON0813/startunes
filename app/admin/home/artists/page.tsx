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
import { ArtistRow, deleteArtist, getArtists } from './api/artist';
import ArtistInput from './artistInput';

export default function ArtistsPage() {    
  const [data, setData] = useState<ArtistRow[]>([]); 
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
      const ArtistsData = await getArtists({}); 
      setData(ArtistsData ?? []); 
    };
    fetchData();
  }, []);

  const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null); // 선택된 곡 ID

  // 삭제 버튼 클릭 시 confirm을 사용해 삭제 여부 확인
  const handleDelete = async (id: string) => {
    const isConfirmed = confirm('삭제하시겠습니까?'); // 확인/취소 팝업
    if (isConfirmed) {
      try {
        await deleteArtist(id); // deleteArtist 호출
        setData((prevData) => prevData.filter((Artist) => Artist.id !== id)); // 삭제된 곡 제거
      } catch (error) {
        console.error('Error deleting Artist:', error);
      }
    }
  };


  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<ArtistRow>[]>(
    () => [
      {
        accessorKey: 'id', // Artist_id에 접근
        header: 'Artist ID',
        size: 150,
      },
      {
        accessorKey: 'name', // title에 접근
        header: 'Name',
        size: 150,
      },
      {
        accessorKey: 'create_dt', // created_time에 접근
        header: 'created_dt',
        size: 150,
      },
      {
        accessorKey: 'edit_dt', // edit_time에 접근
        header: 'edit_dt',
        size: 150,
      },
      {
        id: 'actions', // actions에 접근
        header: '',
        size: 100,
        Cell: ({ row }) => (
          <div>
          <Button className='h-10 w-20 bg-gray-800 text-white rounded-3xl' onClick={() => handleEdit(row.original.id)} >
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
          <Button className='h-10 w-20 bg-red-600 text-white rounded-3xl' onClick={() => handleDelete(row.original.id)} >
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
    setSelectedArtistId(null); // Reset ArtistId to trigger form reset
    setOpen(true);
  };
  const handleEdit = (ArtistId: string) => {
    setSelectedArtistId(ArtistId); // 선택된 곡 ID 설정
    setOpen(true); // 모달 열기
  };
  return(
    <>
     
      <>
       <Button onClick={handleAddNew} className="h-[50px] w-[120px] bg-gray-800 text-white rounded-3xl text-white" >
          Add New +
        </Button>
      <MaterialReactTable columns={columns} data={data} />
     
        {/* Dialog 컴포넌트로 팝업 구현 */}
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader >곡</DialogHeader>
          <DialogBody>
          <ArtistInput ArtistId={selectedArtistId} /> 
        </DialogBody>
          <DialogFooter >
            <Button variant="text" color="red" onClick={handleOpen} className="mr-1" >
              닫기
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    ) 
    </>
  ) ;
};
