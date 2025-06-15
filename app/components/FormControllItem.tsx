'use client';

import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

type Props {
    name: string,
    label: string,
    children: ReactNode;
}

export const FormControllItem = ({ name, label, children }: Props) => {

    const {
        formState: {errors},
    } = useFormContext();

    const error = errors[name]?.message as string;

    return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>
      {children}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}