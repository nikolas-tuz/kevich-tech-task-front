// 'use client';

import { ComponentPropsWithoutRef } from 'react';
import SearchIcon from '@/components/UI/Icons/SearchIcon';
import DivContainer from '@/components/UI/Containers/DivContainer';

type SearchInputType = {
  // children: ReactNode;
} & ComponentPropsWithoutRef<'input'>;

export default function SearchInput({ className, ...props }: SearchInputType) {
  return (
    <>
      <DivContainer className={`relative w-fit min-w-lg`}>
        <input
          {...props}
          className={`bg-zinc-50 px-4 py-3 pl-7 rounded-full outline-none max-w-lg w-full ${className}`}
          type="search"
          placeholder={`Feel free to search for anything!`} />
        <SearchIcon className={`absolute top-1/2 right-2 -translate-x-1/2 -translate-y-1/2`} />
      </DivContainer>
    </>
  );
}
