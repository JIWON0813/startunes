"use client"; // this is a client component 👈🏽

import { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { Person, getSongs } from './api/song';

export default function SongsPage() {

  const [data, setData] = useState<Person[]>([]); // 데이터를 상태로 관리

  useEffect(() => {
    // 컴포넌트가 마운트될 때 데이터를 가져옵니다.
    const fetchData = async () => {
      const songsData = await getSongs(); // 비동기 함수 호출
      setData(songsData); // 가져온 데이터를 상태에 설정
    };
    fetchData();
  }, []);
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'name.firstName', //access nested data with dot notation
        header: 'First Name',
        size: 150,
      },
      {
        accessorKey: 'name.lastName',
        header: 'Last Name',
        size: 150,
      },
      {
        accessorKey: 'address', //normal accessorKey
        header: 'Address',
        size: 200,
      },
      {
        accessorKey: 'city',
        header: 'City',
        size: 150,
      },
      {
        accessorKey: 'state',
        header: 'State',
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
      <MaterialReactTable columns={columns} data={data} />
    ) : (
      <div>Loading...</div>
    )}
    </>
  ) ;
};
