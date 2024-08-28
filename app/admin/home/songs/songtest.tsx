'use client';

import { Button, Input } from '@material-tailwind/react';
import { SongRow } from './api/song';
import useForm from './useForm';

export default function SongInput2() {
  const fieldsConfig = {
    song_id: { type: 'text', label: 'Song ID' },
    title: { type: 'text', label: 'Title' },
    artist: { type: 'text', label: 'Artist' },
    language: { type: 'text', label: 'Language' },
    created_time: { type: 'text', label: 'Created Time' },
    edit_time: { type: 'text', label: 'Edit Time' },
  } as any;

  const { values, errors, submitting, handleChange, handleSubmit } = useForm({
    initialValues: Object.keys(fieldsConfig).reduce((acc : any, field) => {
      acc[field] = ''; // Initialize all fields with empty strings
      return acc;
    }, {} as SongRow),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

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
        <Button type="submit" disabled={submitting} color="blue">
          Add Song
        </Button>
      </form>
    </div>
  );
}
