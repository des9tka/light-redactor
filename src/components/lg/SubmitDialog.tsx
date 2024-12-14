"use client"

import React from 'react'

import { Dialog, DialogContent, Button, DialogHeader, DialogTitle, DialogDescription } from "@/components"
import { useRouter } from "next/navigation"

const SubmitDialog = ({ openSubmit, setOpenSubmit, noteId }: { openSubmit: boolean, setOpenSubmit: Function, noteId: number }) => {

    const router = useRouter();

    return (
        <Dialog open={openSubmit} onOpenChange={() => setOpenSubmit(false)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-center'>
                        Successfull!
                    </DialogTitle>
                    <DialogDescription className='text-center'>
                        Note was created, do you wan't to redirect to notebook page?
                    </DialogDescription>
                    <div className='flex text-center align-middle content-center justify-center'>
                        <Button
                            onClick={() => {
                                if (noteId !== 0) router.push(`/noteBook/${noteId}`)
                                else alert('Something went wrong! Please reload the page and try again!')
                            }}
                            className="hover:text-purple-800 rounded mr-4 w-[10vw]">
                            Yes
                        </Button>
                        <Button
                            onClick={() => setOpenSubmit(!openSubmit)}
                            className="bg-purple-800 text-white hover:text-black rounded hover:bg-purple-800 w-[10vw]">
                            No
                        </Button>
                    </div>

                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default SubmitDialog