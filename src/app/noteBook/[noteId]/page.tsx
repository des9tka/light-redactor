import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import { ArrowLeftSquare, FileWarningIcon } from 'lucide-react'
import { $notes, clerk, db } from '@/lib'
import { auth } from '@clerk/nextjs/server'
import { and, eq } from 'drizzle-orm'

import { TipTapEditor, DeleteButton } from '@/components'


type Props = {
    params: {
        noteId: string
    }
}

async function NoteBook({ params: { noteId } }: Props) {

    const { userId } = auth();

    if (!userId) {
        return redirect('/dashboard');
    }

    const userInfo = await clerk.users.getUser(userId)

    const notes = await db
        .select()
        .from($notes)
        .where(and(eq($notes.id, parseInt(noteId)), eq($notes.userId, userId)))


    if (!notes.length || notes.length != 1) {
        return (
            <div className='flex justify-center items-center h-[100vh]'>
                <div className='text-5xl font-extrabold h-[15%] text-center p-4'>

                    <div className='flex justify-center items-center mb-2 text-purple-500'>
                        <FileWarningIcon className="mr-2 w-[40px] h-[40px]" color='purple' />
                        Not found
                    </div>

                    <div className='w-full flex justify-center'>
                        <Link href={'/dashboard'} className='text-xl h-[45px] w-[100px] flex p-2 rounded shadow-2xl hover:border hover:border-purple-500 hover:bg-wh bg-purple-300 hover:text-purple-500 text-white font-semibold text-center justify-center items-center'>
                            <ArrowLeftSquare className='pt-1' />
                            Back
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    const note = notes[0];

    return (
        <div className='p-8 min-h-screen flex justify-center'>
            <div className='lg:w-[50%] md:w-[75%] w-[100%] h-full'>

                {/* HEADER */}
                <div className='mb-2 shadow-xl flex justify-between h-[15%] items-center p-4'>
                    <div className='flex'>
                        <Link href={'/dashboard'} className='font-semibold h-[40px] flex justify-center items-center p-2 rounded shadow-2xl bg-purple-700 text-white hover:text-purple-700 hover:bg-purple-100'>
                            <ArrowLeftSquare className='hidden md:flex lg:flex mr-1' />
                            Back
                        </Link>

                        <div className='font-bold ml-2 text-xl flex justify-center text-center items-center'>
                            <span className='text-lg'>{!userInfo
                                ? ''
                                : userInfo.fullName
                                    ? userInfo.fullName.length > 15
                                        ? userInfo.firstName
                                            ? userInfo.firstName.length > 15
                                                ? userInfo.firstName.slice(0, 15) + '...'
                                                : userInfo.firstName
                                            : userInfo.firstName
                                        : userInfo.fullName
                                    : ''}</span>
                            <span className='mx-1'>/</span>
                            <span className='text-sm text-gray-700'>{
                                note.name.length > 25
                                    ? note.name.slice(0, 25) + '...'
                                    : note.name
                            }</span>
                        </div>

                    </div>
                    <DeleteButton noteId={note.id} noteImgUrl={note.imageUrl} />
                </div>

                {/* EDITOR */}
                <div className='w-full border border-gray-100 shadow-xl p-6 mt-4'>
                    <TipTapEditor note={note} />
                </div>

            </div>
        </div>
    )
}

export default NoteBook
