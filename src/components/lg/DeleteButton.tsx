"use client"
import React from 'react'

import { Trash } from "lucide-react"
import axios from 'axios'

const DeleteButton = ({ noteId, noteImgUrl }: { noteId: string, noteImgUrl: string | null }) => {

    const deleteNote = async () => {
        const dataUrl = noteImgUrl ? noteImgUrl : 'null';
        const noteIdParsed = noteId.toString();

        const data = {
            noteImgUrl: dataUrl,
            noteId :noteIdParsed
        }

        const res = await axios.patch("/api/deleteNote", data);

        alert(res.data.response);

        if (res.status === 200) window.location.assign('/dashboard');
    }

    return (
        <button onClick={deleteNote} className='bg-red-500 h-10 w-10 rounded flex justify-center items-center hover:-translate-y-1 transition'>
            <Trash className='text-white hover:-translate-y-1 transition' />
        </button>
    )
}

export {
    DeleteButton
}