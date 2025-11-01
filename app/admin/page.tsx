"use client";
import React, { useEffect, useState } from "react";
import { ADMIN_TOKEN, api } from "@/api/api";
import Image from "next/image";
import Link from "next/link";


export default function AdminList() {
    const [quizzes, setQuizzes] = useState<any[]>([]);
    useEffect(() => {
        //api call
        api.get("/admin/quizzes", { headers: { "x-admin-token": ADMIN_TOKEN } })
            .then(res => setQuizzes(res.data.quizzes))
    }, [])
    return (
        <main className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between mb-4">
                <h1 className="font-bold">Admin Panel</h1>
                <Link href="/admin/new">+ New</Link>
            </div>

            <ul className="space-y-2">
                {quizzes.map((q) => (
                    <li key={q._id} className="p-4 border rounded">
                        <p className="font-semibold">{q.title}</p>
                        <p className="text-sm">{q.description}</p>
                    </li>
                ))}
            </ul>
        </main>
    );
}
