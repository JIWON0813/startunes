'use client';

import { Button, Input } from '@material-tailwind/react';
import { useEffect, useState } from 'react';

import useForm from '../../components/useForm';
import { createProfileLink, getProfileLink, updateProfileLink, ProfileLinkRow, ProfileLinkRowInsert } from './api/profile_link';

export default function ProfileLinkInput({nameId} : any) {
  const [loading, setLoading] = useState(true); // 곡 정보 로딩 상태

  const fieldsConfig = {
    id: { type: 'text', label: 'ProfileLink ID' },
    cover_artist: { type: 'text', label: 'cover_artist' },
    original_artist_id: { type: 'text', label: 'original_artist_id' },
    song_id: { type: 'text', label: 'Song_id' },
  } as any;

  const { values, errors, submitting, setValues, handleChange, handleSubmit } = useForm({
    initialValues: Object.keys(fieldsConfig).reduce((acc: any, field) => {
      acc[field] = ''; // Initialize all fields with empty strings
      return acc;
    }, {} as ProfileLinkRow),
    onSubmit: async (values : ProfileLinkRowInsert) => {
      const video: ProfileLinkRowInsert = {
        name: values.name,
        link: values.link,
        artist_id: values.artist_id,
      };

      if (nameId) {
        await updateProfileLink(video); // 수정 시 updateProfileLink 호출
        alert('수정되었습니다.');
      } else {
        await createProfileLink(video); // 새 곡 추가
        alert('입력되었습니다.');
      }
    },
  });

  // 곡 정보 불러오기
  useEffect(() => {
    const fetchProfileLink = async () => {
      if (nameId) {
        try {
          const videoData = await getProfileLink(nameId); // nameId에 해당하는 곡 정보 불러오기
          setValues(videoData); // form values에 곡 정보 설정
        } catch (error) {
          console.error('Error fetching ProfileLink:', error);
        } finally {
          setLoading(false);
        }
      }
      else{
        setValues({
          name: '',
          link: '',
          artist_id: '',

        });
        setLoading(false);
      }
    };

    fetchProfileLink();
  }, [nameId, setValues]);

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
                value={values[fieldName as keyof ProfileLinkRow]}
                onChange={handleChange}
                className={`w-full ${errors[fieldName as keyof ProfileLinkRow] && 'errorInput'}`}
                readOnly={fieldName === 'name' && nameId ? true : false}
              />
            </label>
            {errors[fieldName as keyof ProfileLinkRow] && (
              <span className="text-red-500 text-sm">
                {errors[fieldName as keyof ProfileLinkRow]}
              </span>
            )}
          </div>
        ))}
        <Button
          className="h-[50px] w-[120px] bg-gray-800 text-white rounded-3xl"
          type="submit"
          disabled={submitting}
        >
          {nameId ? '수정' : '추가'}
        </Button>
      </form>
    </div>
  );
}
