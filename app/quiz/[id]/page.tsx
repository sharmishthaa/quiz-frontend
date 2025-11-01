"use client";
import React, { useEffect, useState } from "react";
import { ADMIN_TOKEN, api, API_BASE } from "@/api/api";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Take from "@/components/QuizTake";


export default function QuizPage() {
    const {id}= useParams()
    const [quizzes, setQuizzes] = useState<any[]>([]);
    const [loader, setLoader]=useState(true)
    useEffect(() => {
        //api call
        api.get(API_BASE+"/quizzes/"+id)
            .then(res => setQuizzes(res.data.quiz))
            .finally(()=> setLoader(false))
    }, [])

    if(loader) return <p> Loading...</p>

    return (
        <main className="max-w-3xl mx-auto p-6">
            <Take quiz={
                quizzes
            } />
        </main>
    );
}
