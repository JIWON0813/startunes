'use client';

import { useEffect, useState } from 'react';
import { Button, Input } from '@material-tailwind/react';
import { createSong, updateSong, getSong, SongRow, SongRowInsert } from './api/song';
import useForm from '../../components/useForm';

export default function SongInput({songId} : any) {
  const [loading, setLoading] = useState(true); // 곡 정보 로딩 상태

  const fieldsConfig = {
    song_id: { type: 'text', label: 'Song ID' },
    title: { type: 'text', label: 'Title' },
    artist: { type: 'text', label: 'Artist' },
    language: { type: 'text', label: 'Language' },
    lyrics_part: { type: 'text', label: 'lyrics_part' },
    lyrics_all: { type: 'text', label: 'lyrics_all' },
    description: { type: 'text', label: 'description' },
    created_time: { type: 'text', label: 'Created Time' },
    edit_time: { type: 'text', label: 'Edit Time' },
  } as any;

  const { values, errors, submitting, setValues, handleChange, handleSubmit } = useForm({
    initialValues: Object.keys(fieldsConfig).reduce((acc: any, field) => {
      acc[field] = ''; // Initialize all fields with empty strings
      return acc;
    }, {} as SongRow),
    onSubmit: async (values) => {
      const song: SongRowInsert = {
        song_id: values.song_id,
        title: values.title,
        artist: values.artist,
        language: values.language,
        lyrics_part : values.lyrics_part,
        lyrics_all : values.lyrics_all,
        description : values.description,
        edit_time: new Date().toISOString(),
      };

      if (songId) {
        await updateSong(song); // 수정 시 updateSong 호출
        alert('수정되었습니다.');
      } else {
        song.created_time = new Date().toISOString()
        await createSong(song); // 새 곡 추가
        alert('입력되었습니다.');
      }
    },
  });

  // 곡 정보 불러오기
  useEffect(() => {
    const fetchSong = async () => {
      if (songId) {
        try {
          const songData = await getSong(songId); // songId에 해당하는 곡 정보 불러오기
          setValues(songData); // form values에 곡 정보 설정
        } catch (error) {
          console.error('Error fetching song:', error);
        } finally {
          setLoading(false);
        }
      }
      else{
        setValues({
          song_id: '',
          title: '',
          artist: '',
          language: '',
          lyrics_part : '',
          lyrics_all : '',
          description : '',
          created_time: '',
          edit_time: '',
        });
        setLoading(false);
      }
    };

    fetchSong();
  }, [songId, setValues]);

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
                value={values[fieldName as keyof SongRow]}
                onChange={handleChange}
                className={`w-full ${errors[fieldName as keyof SongRow] && 'errorInput'}`}
              />
            </label>
            {errors[fieldName as keyof SongRow] && (
              <span className="text-red-500 text-sm">
                {errors[fieldName as keyof SongRow]}
              </span>
            )}
          </div>
        ))}
        <Button
          className="h-[50px] w-[120px] bg-gray-800 text-white rounded-3xl"
          type="submit"
          disabled={submitting}
        >
          {songId ? '수정' : '추가'}
        </Button>
      </form>
    </div>
  );
}
