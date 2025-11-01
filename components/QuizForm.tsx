"use client";
import { ADMIN_TOKEN, api } from "@/api/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Form() {
    const router = useRouter()
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [question, setQuestion] = useState<any[]>([]);
    const [message, setMessage] = useState("");

    const addQuestion = () => {
        setQuestion([...question, {text: "", type: "mcq", options: [{text: "", }], answer:""}])
    }

    const handleSubmit = async ()=> {
        try{
            await api.post("/admin/quizzes", {title, description: desc, questions:question}, {headers: {"x-admin-token": ADMIN_TOKEN}})
            setMessage("Quiz Created Successfully")
            router.push("/admin")

        }catch(err){
            console.log(err)
            setMessage("Error Createing quiz")
        }
    }
    return (
        <div className="space-y-6">
            <div>
                <label className="block font-semibold">Title</label>
                <input className="border px-2 py-1 w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div>
                <label className="block font-semibold">Description</label>
                <input className="border px-2 py-1 w-full" value={desc} onChange={(e) => setDesc(e.target.value)} />
            </div>

            <div>
                <h2 className="font-semibold mb-2">Questions</h2>
                {question.map((q, i) => (
                    <div key={i} className="border p-3 mb-2 rounded">
                        <input
                            className="border px-2 py-1 mb-2"
                            value={q.text}
                            onChange={(e) => {
                                const copy = [...question]
                                copy[i].text = e.target.value;
                                setQuestion(copy);
                            }} />

                        <select
                        className="border px-2 py-1 mb-2"
                            value={q.type}
                            onChange={(e) => {
                                const copy = [...question]
                                copy[i].type = e.target.value;
                                setQuestion(copy);
                            }}
                        >
                            <option value={"mcq"}>MCQ</option>
                            <option value={"tf"}>True/False</option>
                            <option value={"text"}>Text</option>
                        </select>

                        {q.type === "mcq" &&
                            <div>
                                {q.options.map((opt: any, j: number) => (
                                    <input
                                    className="border px-2 py-1 mb-2"
                                        key={j}
                                        value={opt.text}
                                        onChange={(e) => {
                                            const copy = [...question]
                                            copy[i].options[j].text = e.target.value;
                                            setQuestion(copy);
                                        }} />
                                ))}
                                <button
                                type="button"
                                onClick={()=> {
                                    const copy = [...question]
                                            copy[i].options.push({text:""})
                                            setQuestion(copy);
                                }}>+Add Option</button>
                            </div>
                        }
                        <input placeholder="Answer"
                        value={q.answer}
                        onChange={(e) => {
                                const copy = [...question]
                                copy[i].answer = e.target.value;
                                setQuestion(copy);
                            }} />
                    </div>
                ))
                }

                <button onClick={addQuestion}>+Add Question</button>
            </div>

            <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white">
                Save Quiz
            </button>

            {message && <p className="mt-2">{message}</p>}



        </div>
    );
}
