'use client';

import { cn } from '@/lib/utils';

export default function PDFViewer(props: { url: string; className?: string }) {
    const { url } = props;

    return (
        <iframe src={url} className={cn('h-full w-full', props.className)} />
    );
}
