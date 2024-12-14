"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

import { Trash } from "lucide-react"
import { noteActions, useAppDispatch } from '@/redux'

const DeleteButton = ({ noteId, noteImgUrl, push }: { noteId: string, noteImgUrl: string | null, push: boolean }) => {

    const dispatch = useAppDispatch();
    const router = useRouter()

    const deleteNote = async () => {
        const dataUrl = noteImgUrl ? noteImgUrl : 'null';
        const noteIdParsed = parseInt(noteId);

        const data = {
            noteImgUrl: dataUrl,
            noteId: noteIdParsed
        }

        await dispatch(noteActions.deleteNoteById(data))
        if (push) router.push('/dashboard')
    }

    return (
        <button onClick={deleteNote} className={`bg-red-500 rounded flex justify-center items-center hover:-translate-y-1 transition ${push ? 'h-10 w-10' : 'h-6 w-6'}`}>
            <Trash className={`text-white ${push ? '' : 'h-5 w-5'}`} />
        </button>
    )
}

export {
    DeleteButton
}