'use client';

import { useEffect, useState } from 'react';
import { Button, Input } from '@material-tailwind/react';
import { createChannel, updateChannel, getChannel, ChannelRow, ChannelRowInsert } from './api/channel';
import useForm from '../../components/useForm';

export default function ChannelInput({ChannelId} : any) {
  const [loading, setLoading] = useState(true); // 곡 정보 로딩 상태

  const fieldsConfig = { 
    id: { type: 'text', label: 'ID' },
    name: {type : 'text', label: 'Name'},
    join_date: {type : 'text', label: 'join_date'},
    email: {type : 'text', label: 'email'},
    profile_link: {type : 'text', label: 'profile_link'},
    description: {type : 'text', label: 'description'},
    flag: {type : 'text', label: 'flag'},
    create_dt: { type: 'text', label: 'Created Time' },
    edit_dt: { type: 'text', label: 'Edit Time' },
  } as any;

  const { values, errors, submitting, setValues, handleChange, handleSubmit } = useForm({
    initialValues: Object.keys(fieldsConfig).reduce((acc: any, field) => {
      acc[field] = ''; // Initialize all fields with empty strings
      return acc;
    }, {} as ChannelRow),
    onSubmit: async (values : ChannelRowInsert) => {
      const channel: ChannelRowInsert = {
        id: values.id,
        name:values.name,
        join_date: values.join_date,
        email : values.email,
        description : values.description,
        flag :values.flag,
        edit_dt: new Date().toISOString(),
      };

      if (ChannelId) {
        await updateChannel(channel); // 수정 시 updateChannel 호출
        alert('수정되었습니다.');
      } else {
        channel.created_dt = new Date().toISOString()
        await createChannel(channel); // 새 곡 추가
        alert('입력되었습니다.');
      }
    },
  });

  // 곡 정보 불러오기
  useEffect(() => {
    const fetchChannel = async () => {
      if (ChannelId) {
        try {
          const ChannelData = await getChannel(ChannelId); // ChannelId에 해당하는 곡 정보 불러오기
          setValues(ChannelData); // form values에 곡 정보 설정
        } catch (error) {
          console.error('Error fetching Channel:', error);
        } finally {
          setLoading(false);
        }
      }
      else{
        setValues({
          id: '',
          name: '',
          join_date: '',
          email: '',
          description : '',
          flag :'',
          created_dt: '',
          edit_dt: '',
        });
        setLoading(false);
      }
    };

    fetchChannel();
  }, [ChannelId, setValues]);

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
                value={values[fieldName as keyof ChannelRow]}
                onChange={handleChange}
                className={`w-full ${errors[fieldName as keyof ChannelRow] && 'errorInput'}`} 
                readOnly={fieldName === 'id' && ChannelId ? true : false}
                />
                
            </label>
            {errors[fieldName as keyof ChannelRow] && (
              <span className="text-red-500 text-sm">
                {errors[fieldName as keyof ChannelRow]}
              </span>
            )}
          </div>
        ))}
        <Button
          className="h-[50px] w-[120px] bg-gray-800 text-white rounded-3xl"
          type="submit"
          disabled={submitting} >
          {ChannelId ? '수정' : '추가'}
        </Button>
      </form>
    </div>
  );
}
