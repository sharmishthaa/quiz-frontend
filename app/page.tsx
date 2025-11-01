"use client";
import { ADMIN_TOKEN, api } from "@/api/api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loader, setLoader]= useState(true)
      useEffect(() => {
          //api call
          api.get("/admin/quizzes", { headers: { "x-admin-token": ADMIN_TOKEN } })
              .then(res => setQuizzes(res.data.quizzes))
              .finally(()=> setLoader(false))
      }, [])

      if(loader) return <p> Loading...</p>
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Available Quizzes</h1>

      <ul className="space-y-3">
        {quizzes.map((q, i)=>(
          <li key={i} className="p-4 hover:bg-grey-100 border rounded">
            <Link href={`/quiz/`+q._id} className="text-blue-600 font-medium">{q.title}</Link>
            <p className="text-sm">{q.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
