"use client"
import React from 'react'

import { NoteType } from '@/lib';
import { noteActions, useAppDispatch } from '@/redux';

const ImageCatcher = ({ note, userId }: { note: NoteType, userId: string }) => {

    const dispatch = useAppDispatch()

    const handleFileChange = async (e: any) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append("file", file);
            formData.append("noteId", `${note.id}`);

            dispatch(noteActions.uploadFileNote(formData))
        }
    };

    const imageClick = () => {
        const input = document.getElementById('inputFile');
        if (input) input.click();
    };

    return (
        <div className='justify-center flex'>
            <img className="md:h-[100px] xs:h-[100px] lg:h-[150px]" src={(!note.imageUrl) ? '/notesImages/note.png' : `/notesImages/${userId}/${note.imageUrl}`} alt={note.name} onClick={() => imageClick()} />
            <input
                type="file"
                id='inputFile'
                className="opacity-0 z-0 hidden"
                onChange={(e) => handleFileChange(e)}
            />
        </div>
    )
}

export {
    ImageCatcher
}
