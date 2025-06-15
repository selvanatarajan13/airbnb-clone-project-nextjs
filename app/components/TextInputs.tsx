'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from '@nextui-org/react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
};

export const TextInput = ({ name, ...props }: Props) => {
  const { register } = useFormContext();
  return (
    <Input {...props} {...register(name)} fullWidth />
  )
};