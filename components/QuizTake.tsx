"use client";
import { ADMIN_TOKEN, api, API_BASE } from "@/api/api";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

export default function Take({ quiz }: { quiz: any }) {

    const [answer, setAnswer] = useState<any>({});
    const [result, setResult] = useState<any>("");

    const handleChange = (qid: string, value: any) => {
        setAnswer((prev: any) => ({ ...prev, [qid]: value }))
    }

    const handleSubmit = async () => {
        const payload = {
            participant: "Guest",
            answers: Object.entries(answer).map(([questionId, answer]) => ({
                questionId, answer
            }))
        }
        const res = await axios.post(API_BASE + "/quizzes/" + quiz._id + "/submit", payload)
        setResult(res.data)
    }

    if (result) {
        return (
            <div>
                <h2>Result</h2>
                <p>Score: {result.score} / {result.total} ({result.percentage}%)</p>
                <ul className="mt-3 space-y-2">
                    {result.details.map((res: any, index: number) => (
                        <li key={index}>
                            Q{index + 1}: {res.correct ? "Correct" : "Wrong"}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
    console.log(quiz)
    return (
        <div>
            <h2 className="">{quiz.title}</h2>

            {quiz?.questions?.map((q:any, i:number) => (
                <div key={q._id} className="p-4 mb-4">
                    <p>
                        {i + 1}, {q.text}
                    </p>

                    {q.type === "mcq" && q.options.map((opt: any) => (
                        <label key={opt._id} className="block">
                            <input
                                type={q.multiple ? "checkbox" : "radio"}
                                name={q._id}
                                value={opt._id}
                                onChange={(e) => {
                                    handleChange(q._id, opt.text)
                                }} />{opt.text}
                        </label>
                    ))}

                    {q.type === "text" && 
                            <input
                                type={"text"}
                                className=""
                                placeholder="Your Answer"
                                onChange={(e) => {
                                    handleChange(q._id, e.target.value)
                                }} />
                    }

                    {q.type === "tf" &&
                        <div>
                            <label className="mr-4">
                                <input
                                    type={"radio"}
                                    name={q._id}
                                    onChange={(e) => {
                                        handleChange(q._id, true)
                                    }} /> True
                            </label>
                            <label className="">
                                <input
                                    type={"radio"}
                                    name={q._id}
                                    onChange={(e) => {
                                        handleChange(q._id, false)
                                    }} /> False
                            </label>
                        </div>
                    }

                </div>
            ))}

            <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded">
                Submit
            </button>
        </div>
    );
}
