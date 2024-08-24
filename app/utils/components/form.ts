'use client'

import { useEffect, useState} from 'react'

export type FormType = {
    initialValues : any,
    onSubmit : Function
}

export type FormOutType = {
    initialValues : any,
    onSubmit : Function
}

export default function useForm({ initialValues, onSubmit } : FormType) : any {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setValues({ ...values, [name]: value });
    };
  
    const handleSubmit = async (event: React.SyntheticEvent) => {
      setIsLoading(true);
      event.preventDefault();
      await new Promise((r) => setTimeout(r, 1000));
    //   setErrors(validate(values));
    };
  
    useEffect(() => {
      if (isLoading) {
        if (Object.keys(errors).length === 0) {
          onSubmit(values);
        }
        setIsLoading(false);
      }
    }, [errors]);
  
    return {
      values,
      errors,
      isLoading,
      handleChange,
      handleSubmit,
    };
  }