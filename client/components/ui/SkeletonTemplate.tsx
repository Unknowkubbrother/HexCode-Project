import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonListProblem() {
  return (
    <div className="flex flex-col space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-2">
              <Skeleton className="w-full h-[100px] rounded-2xl"/>
          </div>
        ))}
      
    </div>
  )
}
