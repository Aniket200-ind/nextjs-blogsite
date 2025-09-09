//! File: src/app/tags/page.tsx

import { PageHeader } from "@/components/PageHeader"
import { Hash } from "lucide-react"

export default function TagsListPage(){
    return(
        <section>
            <PageHeader
                title="Explore Tags"
                description="Browse topics and discover content that interests you"
                showSearch={true}
                showFilter={false}
                searchPlaceholder="Search tags..."
                icon={
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-theme-accent/10 rounded-2xl">
                        <Hash className="w-8 h-8 text-theme-accent" />
                    </div>
                }
             />
            <h1>Tags List Page</h1>
        </section>
    )
}