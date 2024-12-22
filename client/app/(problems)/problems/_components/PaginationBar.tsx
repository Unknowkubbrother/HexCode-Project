"use client";
import { useState , useEffect } from "react";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { useSearchParams } from "next/navigation";

export default function PaginationBar({totalCounts} : { totalCounts: number }) {
    const searchParams = useSearchParams();
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);

    useEffect(() => {
        setPage(searchParams.get("page") ? Number(searchParams.get("page")) : 1);
        setPageSize(searchParams.get("pageSize") ? Number(searchParams.get("pageSize")) : 10);
    }, [searchParams]);

    useEffect(()=>{
        console.log(totalCounts)
    },[totalCounts])

  return (
    <PaginationWithLinks
      page={page}
      pageSize={pageSize}
      totalCount={totalCounts}
      pageSizeSelectOptions={{
        pageSizeOptions: [10, 20, 50, 100],
      }}
    />
  );
}
