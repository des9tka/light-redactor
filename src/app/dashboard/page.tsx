"use client"
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { ArrowBigLeft } from 'lucide-react';
import { redirect } from 'next/navigation'

import { Button, Notes } from '@/components';
import { useAppSelector } from '@/redux';
import { useState } from 'react';

const DashPoardPage = () => {

    const { user } = useAppSelector(state => state.noteReducer);

    return (
        <div className="w-[100vw] h-[100vh] flex justify-center lg:mt-[15vh] md:mt-[10vh]">

            {/* Content wrapper */}
            <div className='w-full md:w-4/5 lg:w-4/5 shadow-xl p-10]'>

                {/* Header of list notes */}
                <div className='flex justify-evenly h-[100px] w-full my-2 items-center shadow-md'>
                    <Link href="/">
                        <Button className='bg-purple-700 text-white hover:text-purple-700 hover:bg-purple-100 rounded w-[65px] h-[25px] md:w-[115px] md:h-[45px] lg:w-[125px] lg:h-[50px]'>
                            <ArrowBigLeft />
                            Back
                        </Button>
                    </Link>
                    <h1 className='lg:text-3xl md:text-xl font-extrabold'>My Notes</h1>
                    <UserButton showName />
                </div>

                {/* List all notes */}
                <Notes />
            </div>
        </div>
    )
}

export default DashPoardPage 