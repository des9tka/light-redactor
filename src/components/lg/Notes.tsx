"use client"
import React, { useEffect, useState } from 'react'
import { Loader } from "lucide-react"

import { noteActions, useAppDispatch, useAppSelector } from '@/redux'
import { CreateNoteDialog } from './CreateNoteDialog'
import { Note } from './Note'
import SubmitDialog from './SubmitDialog'

const Notes = () => {
    const dispatch = useAppDispatch();
    const { user, notes, note, loading, errors } = useAppSelector(state => state.noteReducer);
    const [openSubmit, setOpenSubmit] = useState(false);
    const [rendered, setRendered] = useState(false)

    useEffect(() => {
        if (notes.length == 0) dispatch(noteActions.getAllNotes());
        setRendered(true);
    }, [])

    return (
        <div>
            {errors && <div>Error while detch data: {errors}</div>}
            {loading && <div className='text-center w-full flex justify-center font-semibold mt-10'>Loading...<Loader className='animate-spin' /></div>}
            {!loading && rendered && <div className='grid grid-cols-1 sm:grid-cols-2 xs:m-10 md:grid-cols-4 gap-2 mt-4'>

                <div>
                    {notes.length == 0 && !loading && (
                        <h1 className='text-purple-300 font-extrabold text-center'>Make your first note!</h1>
                    )}
                    <CreateNoteDialog openSubmit={openSubmit} setOpenSubmit={setOpenSubmit} />
                    <SubmitDialog noteId={note?.id || 0} openSubmit={openSubmit} setOpenSubmit={setOpenSubmit} />
                </div>

                {notes && notes.length > 0 && notes.map((note, index) => <Note key={index} note={note} userId={user?.userId || ''} />)}
            </div>}
        </div>
    )
}

export { Notes }