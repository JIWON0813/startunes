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
import { ChannelRow, deleteChannel, getChannels } from './api/channel';
import ChannelInput from './channelInput';

export default function ChannelsPage() {    
  const [data, setData] = useState<ChannelRow[]>([]); 
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
      const ChannelsData = await getChannels({}); 
      setData(ChannelsData ?? []); 
    };
    fetchData();
  }, []);

  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null); // 선택된 곡 ID

  // 삭제 버튼 클릭 시 confirm을 사용해 삭제 여부 확인
  const handleDelete = async (id: string) => {
    const isConfirmed = confirm('삭제하시겠습니까?'); // 확인/취소 팝업
    if (isConfirmed) {
      try {
        await deleteChannel(id); // deleteChannel 호출
        setData((prevData) => prevData.filter((Channel) => Channel.id !== id)); // 삭제된 곡 제거
      } catch (error) {
        console.error('Error deleting Channel:', error);
      }
    }
  };


  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<ChannelRow>[]>(
    () => [
      {
        accessorKey: 'id', // Channel_id에 접근
        header: 'ID',
        size: 150,
      },
      {
        accessorKey: 'name', // title에 접근
        header: 'Name',
        size: 150,
      },
      {
        accessorKey: 'join_date', // title에 접근
        header: 'join_date',
        size: 150,
      },
      {
        accessorKey: 'email', // title에 접근
        header: 'email',
        size: 150,
      },
      {
        accessorKey: 'description', // title에 접근
        header: 'description',
        size: 150,
      },
      {
        accessorKey: 'flag', // title에 접근
        header: 'flag',
        size: 150,
      },
      {
        accessorKey: 'created_dt', // created_time에 접근
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
    setSelectedChannelId(null); // Reset ChannelId to trigger form reset
    setOpen(true);
  };
  const handleEdit = (ChannelId: string) => {
    setSelectedChannelId(ChannelId); // 선택된 곡 ID 설정
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
          <ChannelInput ChannelId={selectedChannelId} /> 
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
