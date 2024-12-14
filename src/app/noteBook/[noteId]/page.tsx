"use client"
import React, { useEffect, useState } from 'react'
import { ArrowLeftSquare, FileWarningIcon, Loader } from 'lucide-react'
import { useRouter } from "next/navigation"

import { TipTapEditor, DeleteButton } from '@/components'
import { noteActions, useAppDispatch, useAppSelector } from '@/redux'


type Props = {
    params: {
        noteId: string
    }
}

function NoteBook({ params: { noteId } }: Props) {

    const { user, note, errors, loading } = useAppSelector(state => state.noteReducer);
    const [rendered, setRendered] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        if (!user) dispatch(noteActions.setUserInfo())
        if (!rendered || !note || parseInt(noteId) !== note.id) {
            dispatch(noteActions.getStateNoteById({ noteId }));
            setRendered(true);
        }
        if (!note && rendered) dispatch(noteActions.getNoteById(noteId));
    }, [rendered])


    const nameExp = (user?.firstName ? user?.firstName : "") + (user?.lastName ? user?.lastName : "")

    const userName = nameExp.length > 15
        ? user?.firstName
            ? user?.firstName.length > 15
                ? user?.firstName.slice(0, 15)
                : user?.firstName
            : user?.lastName
                ? user?.lastName.slice(0, 15)
                : user?.lastName
        : nameExp


    if (loading) return (
        <div className="h-screen flex items-center justify-center">
            <div className="text-center font-semibold flex">
                Loading...
                <Loader className='animate-spin' />
            </div>
        </div>
    )

    return (
        <div className='p-8 min-h-screen flex justify-center'>
            {(!note && errors) && (
                <div className='flex justify-center items-center h-[100vh]'>
                    <div className='text-5xl font-extrabold h-[15%] text-center p-4'>

                        <div className='flex justify-center items-center mb-2 text-purple-500'>
                            <FileWarningIcon className="mr-2 w-[40px] h-[40px]" color='purple' />
                            Not found
                        </div>

                        {errors && <span>
                            An error occurred: {errors}
                        </span>}

                        <div className='w-full flex justify-center'>
                            <div onClick={() => router.push('/dashboard')} className='text-xl h-[45px] w-[100px] flex p-2 rounded shadow-2xl hover:border hover:border-purple-500 hover:bg-wh bg-purple-300 hover:text-purple-500 text-white font-semibold text-center justify-center items-center'>
                                <ArrowLeftSquare className='pt-1' />
                                Back
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {(note && !loading && !errors && rendered) && (
                <div className='lg:w-[50%] md:w-[75%] w-[100%] h-full'>

                    <div className='mb-2 shadow-xl flex justify-between h-[15%] items-center p-4'>
                        <div className='flex'>
                            <div onClick={() => router.push('/dashboard')} className='font-semibold h-[40px] flex justify-center items-center p-2 rounded shadow-2xl bg-purple-700 text-white hover:text-purple-700 hover:bg-purple-100'>
                                <ArrowLeftSquare className='hidden md:flex lg:flex mr-1' />
                                Back
                            </div>

                            <div className='font-bold ml-2 text-xl flex justify-center text-center items-center'>
                                <span className='text-lg'>{userName}</span>
                                <span className='mx-1'>/</span>
                                <span className='text-sm text-gray-700'>{
                                    note.name.length > 25
                                        ? note.name.slice(0, 25) + '...'
                                        : note.name
                                }</span>
                            </div>

                        </div>
                        <DeleteButton noteId={noteId} noteImgUrl={note.imageUrl || null} push={true} />
                    </div>

                    {/* EDITOR */}
                    <div className='w-full border border-gray-100 shadow-xl p-6 mt-4'>
                        <TipTapEditor note={note} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default NoteBook;
