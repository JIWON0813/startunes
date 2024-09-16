'use client';

import { useEffect, useState } from 'react';
import { Button, Input } from '@material-tailwind/react';
import { createArtist, updateArtist, getArtist, ArtistRow, ArtistRowInsert } from './api/artist';
import useForm from '../../components/useForm';

export default function ArtistInput({ArtistId} : any) {
  const [loading, setLoading] = useState(true); // 곡 정보 로딩 상태

  const fieldsConfig = {
    id: { type: 'text', label: 'Artist ID' },
    name: {type : 'text', label: 'Name'},
    create_dt: { type: 'text', label: 'Created Time' },
    edit_dt: { type: 'text', label: 'Edit Time' },
  } as any;

  const { values, errors, submitting, setValues, handleChange, handleSubmit } = useForm({
    initialValues: Object.keys(fieldsConfig).reduce((acc: any, field) => {
      acc[field] = ''; // Initialize all fields with empty strings
      return acc;
    }, {} as ArtistRow),
    onSubmit: async (values) => {
      const artist: ArtistRowInsert = {
        id: values.id,
        name:values.name,
        edit_dt: new Date().toISOString(),
      };

      if (ArtistId) {
        await updateArtist(artist); // 수정 시 updateArtist 호출
        alert('수정되었습니다.');
      } else {
        artist.create_dt = new Date().toISOString()
        await createArtist(artist); // 새 곡 추가
        alert('입력되었습니다.');
      }
    },
  });

  // 곡 정보 불러오기
  useEffect(() => {
    const fetchArtist = async () => {
      if (ArtistId) {
        try {
          const ArtistData = await getArtist(ArtistId); // ArtistId에 해당하는 곡 정보 불러오기
          setValues(ArtistData); // form values에 곡 정보 설정
        } catch (error) {
          console.error('Error fetching Artist:', error);
        } finally {
          setLoading(false);
        }
      }
      else{
        setValues({
          Artist_id: '',
          title: '',
          artist: '',
          language: '',
          created_time: '',
          edit_time: '',
        });
        setLoading(false);
      }
    };

    fetchArtist();
  }, [ArtistId, setValues]);

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
                value={values[fieldName as keyof ArtistRow]}
                onChange={handleChange}
                className={`w-full ${errors[fieldName as keyof ArtistRow] && 'errorInput'}`}
              />
            </label>
            {errors[fieldName as keyof ArtistRow] && (
              <span className="text-red-500 text-sm">
                {errors[fieldName as keyof ArtistRow]}
              </span>
            )}
          </div>
        ))}
        <Button
          className="h-[50px] w-[120px] bg-gray-800 text-white rounded-3xl"
          type="submit"
          disabled={submitting}
        >
          {ArtistId ? '수정' : '추가'}
        </Button>
      </form>
    </div>
  );
}
