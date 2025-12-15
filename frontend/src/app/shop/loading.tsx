import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header Skeleton */}
            <div className="bg-stone-900 py-12 px-4 md:px-6">
                <div className="container mx-auto space-y-4">
                    <Skeleton className="h-12 w-[200px] bg-stone-800" />
                    <Skeleton className="h-4 w-[300px] bg-stone-800" />
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Skeleton */}
                    <aside className="w-full lg:w-64 space-y-8 flex-shrink-0 hidden lg:block">
                        <div className="space-y-4">
                            <Skeleton className="h-6 w-24" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Skeleton */}
                    <div className="flex-1 space-y-8">
                        <div className="flex justify-between">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-48" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="space-y-4">
                                    <Skeleton className="h-[300px] w-full rounded-md" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-[80%]" />
                                        <Skeleton className="h-4 w-[50%]" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
