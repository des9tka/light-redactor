"use client"
import React, { useEffect } from 'react'

import { noteActions, useAppDispatch, useAppSelector } from '@/redux'
import { CreateNoteDialog } from './CreateNoteDialog'
import { Note } from './Note'

const Notes = () => {
    const dispatch = useAppDispatch()
    const { userId, notes, loading } = useAppSelector(state => state.noteReducer)

    useEffect(() => {
        dispatch(noteActions.getAllNotes())
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 xs:m-10 md:grid-cols-4 gap-2 mt-4'>
            <div>
                {notes.length == 0 && (
                    <h1 className='text-purple-300 font-extrabold text-center'>Make your first note!</h1>
                )}
                <CreateNoteDialog />
            </div>

            {notes && notes.length > 0 && notes.map((note, index) => <Note key={index} note={note} userId={userId || ""} />)}
        </div>
    )
}

export { Notes }