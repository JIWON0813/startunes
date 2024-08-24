'use client'

import {Button , Input } from '@material-tailwind/react'
import { SongRow, getSongs } from './api/song';
import useForm from '@/app/utils/components/form';

export default function SongInput(){
    const { values, errors, submitting, handleChange, handleSubmit } = useForm({
        initialValues: { email: "", password: "" },
        onSubmit: (values : boolean) => {
          alert(JSON.stringify(values, null, 2));
        },
        // validate,
      });
    

    return(
       <div>
               <form onSubmit={handleSubmit} noValidate>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          className={errors.email && "errorInput"}
        />
        {errors.email && <span className="errorMessage">{errors.email}</span>}
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          className={errors.email && "errorInput"}
        />
        {errors.password && (
          <span className="errorMessage">{errors.password}</span>
        )}
      </label>
      <br />
      <button type="submit" disabled={submitting}>
        로그인
      </button>
    </form>
       </div>
    );
}


  