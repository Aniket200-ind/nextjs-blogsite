//! File: src/app/contact/page.tsx

import { PageHeader } from "@/components/PageHeader"
import { MessageCircle } from "lucide-react"

export default function ContactPage(){
    return (
        <section>
            <PageHeader
                title="Get in Touch"
                description="Have a question or want to collaborate? We'd love to hear from you."
                showSearch={false}
                icon={
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-theme-accent/10 rounded-2xl">
                        <MessageCircle className="w-8 h-8 text-theme-accent" />
                    </div>
                }
            />
            <h1>Contact Page</h1>
        </section>
    )
}