"use client"
import React from 'react'
import { useRouter } from "next/navigation"

import { NoteType } from '@/lib'
import { ImageCatcher } from './ImageCatcher'
import { DeleteButton } from './DeleteButton'

const Note = ({ note, userId }: { note: NoteType, userId: string }) => {
    const router = useRouter();
    return (
        <div className='rounded border border-purple-500 justify-center p-2 hover:shadow-xl transition hover:-translate-y-1 cursor-pointer'>
            <div key={note.id} onClick={() => router.push(`/noteBook/${note.id}`)} className='rounded text-white flex font-bold bg-purple-700 justify-center w-full hover:text-purple-700 hover:bg-white border border-white hover:border-purple-700'>
                {note.name.length > 10 ? note.name.slice(0, 10) + '...' : note.name}
            </div>

            <div className='w-full justify-center flex h-auto mt-4'>
                <ImageCatcher note={note} userId={userId} />
            </div>

            <p className='flex justify-evenly items-center text-purple-500 font-bold text-center text-xs mt-2'>
                {note.createdAt ? new Date(note.createdAt).toLocaleDateString().split('.').join('/') : ""}
                {note.id && <DeleteButton noteId={note.id.toString()} noteImgUrl={note.imageUrl || null} push={false} />}
            </p>
        </div>
    )
}

export { Note }