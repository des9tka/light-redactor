"use client"

import { NoteType } from '@/lib'
import React from 'react'
import { ImageCatcher } from './ImageCatcher'
import { useRouter } from "next/navigation"

const Note = ({ note, userId }: { note: NoteType, userId: string }) => {
    const router = useRouter();
    return (
        <div className='rounded border border-purple-500 justify-center p-2 h-[75%] hover:shadow-xl transition hover:-translate-y-1 cursor-pointer'>
            <div key={note.id} onClick={() => router.push(`/noteBook/${note.id}`)} className='rounded text-white flex font-bold bg-purple-700 justify-center w-full hover:text-purple-700 hover:bg-white border border-white hover:border-purple-700'>
                {note.id} - {note.name.length > 10 ? note.name.slice(0, 10) + '...' : note.name}
            </div>

            <div className='w-full justify-center flex h-[50%] mt-4'>
                <ImageCatcher note={note} userId={userId} />
            </div>

            <p className='text-purple-500 font-bold text-center'>
                {note.createdAt ? new Date(note.createdAt).toLocaleDateString().split('.').join('/') : ""}
            </p>
        </div>
    )
}

export { Note }