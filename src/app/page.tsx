"use client"
import { ArrowBigRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button, TypeWriter } from "@/components";
import { noteActions, useAppDispatch, useAppSelector } from "@/redux";
import { useEffect } from "react";


export default function Home() {

    const { user } = useAppSelector(state => state.noteReducer);
    const dispatch = useAppDispatch()
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            dispatch(noteActions.setUserInfo())
        }
    }, [])

    const mainTexts = [
        "Knowledge 🧠 is power, that must be written down.",
        "Write down your thoughts ⭐, and put them into action.",
        "Don't keep everything in your head, leave room for reflection 🚀."
    ]

    return (
        <div className="flex justify-center items-center w-[100vw] h-[100vh]">
            <div className="text-center">
                <h1 className="text-5xl font-bold"><span className="font-extrabold text-purple-500">Make</span> your own dash <span className="font-extrabold text-purple-600">Notes</span><br /> with simple editor <span className="font-extrabold text-purple-500">power</span>.</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mt-4">
                    <TypeWriter texts={mainTexts} />
                </h2>
                <div className="mt-8">
                    <div onClick={() => router.push('/dashboard')}>
                        <Button className="bg-purple-800 rounded text-white hover:text-purple-700 hover:bg-purple-100">
                            Get Started
                            <ArrowBigRight />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
