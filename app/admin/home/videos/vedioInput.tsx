'use client';

import { createBrowserSupabaseClient } from '@/app/utils/supabase/client';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { createVideo, updateVideo, getVideo, VideoRow, VideoRowInsert } from './api/video';
import useForm from '../../components/useForm';

export default function VideoInput({videoId} : any) {
  const [loading, setLoading] = useState(true); // 곡 정보 로딩 상태

  const fieldsConfig = {
    id: { type: 'text', label: 'Video ID' },
    song_id: { type: 'text', label: 'Song_id' },
    cover_artist: { type: 'text', label: 'cover_artist' },
    original_artist_id: { type: 'text', label: 'original_artist_id' },
    create_dt: { type: 'text', label: 'Created Time' },
    edit_dt: { type: 'text', label: 'Edit Time' },
  } as any;

  const { values, errors, submitting, setValues, handleChange, handleSubmit } = useForm({
    initialValues: Object.keys(fieldsConfig).reduce((acc: any, field) => {
      acc[field] = ''; // Initialize all fields with empty strings
      return acc;
    }, {} as VideoRow),
    onSubmit: async (values) => {
      const video: VideoRowInsert = {
        id: values.id,
        song_id: values.song_id,
        cover_artist: values.cover_artist,
        original_artist_id: values.original_artist_id,
        edit_dt: new Date().toISOString(),
      };

      if (videoId) {
        await updateVideo(video); // 수정 시 updateVideo 호출
        alert('수정되었습니다.');
      } else {
        video.create_dt = new Date().toISOString();
        await createVideo(video); // 새 곡 추가
        alert('입력되었습니다.');
      }
    },
  });

  // 곡 정보 불러오기
  useEffect(() => {
    const fetchVideo = async () => {
      if (videoId) {
        try {
          const videoData = await getVideo(videoId); // videoId에 해당하는 곡 정보 불러오기
          setValues(videoData); // form values에 곡 정보 설정
        } catch (error) {
          console.error('Error fetching Video:', error);
        } finally {
          setLoading(false);
        }
      }
      else{
        setValues({
          id: '',
          song_id: '',
          cover_artist: '',
          original_artist_id: '',
          create_dt: '',
          edit_dt: '',
        });
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId, setValues]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} noValidate>
        {Object.keys(fieldsConfig).map((fieldName) => (
          <div key={fieldName} className="mb-4">
            <label className="block mb-1">
              {fieldsConfig[fieldName].label}:
              <Input
                type={fieldsConfig[fieldName].type}
                name={fieldName}
                value={values[fieldName as keyof VideoRow]}
                onChange={handleChange}
                className={`w-full ${errors[fieldName as keyof VideoRow] && 'errorInput'}`}
              />
            </label>
            {errors[fieldName as keyof VideoRow] && (
              <span className="text-red-500 text-sm">
                {errors[fieldName as keyof VideoRow]}
              </span>
            )}
          </div>
        ))}
        <Button
          className="h-[50px] w-[120px] bg-gray-800 text-white rounded-3xl"
          type="submit"
          disabled={submitting}
        >
          {videoId ? '수정' : '추가'}
        </Button>
      </form>
    </div>
  );
}
