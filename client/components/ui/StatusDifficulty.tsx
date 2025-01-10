'use client';

import { cn } from '@/lib/utils';
const SchemaDifficulty: {
    [key: number]: string[];
  } = {
    1: ["Easy","bg-green-500"],
    2: ["Medium","bg-yellow-500"],
    3: ["Hard","bg-red-500"],
    4: ["Expert","bg-rose-500"],
  };

export default function StatusDifficulty(props: { className?: string, difficulty: number }) {

    return (
        <span
          className={cn("rounded-md p-1 text-xs text-white",props.className, SchemaDifficulty[props.difficulty][1])}
        >
            {SchemaDifficulty[props.difficulty][0]}
        </span>
    );
}
