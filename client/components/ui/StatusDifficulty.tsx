'use client';

import { cn } from '@/lib/utils';
import { SchemaDifficulty } from "@/config/difficulty";


export default function StatusDifficulty(props: { className?: string, difficulty: number }) {

    return (
        <span
          className={cn("rounded-md p-1 text-xs text-white",props.className, SchemaDifficulty[props.difficulty][1])}
        >
            {SchemaDifficulty[props.difficulty][0]}
        </span>
    );
}
