"use client"
import { NoteType } from '@/lib';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ImageCatcher = ({ note, userId }: { note: NoteType, userId: string }) => {

    const [isExist, setIsExist] = useState(false);

    useEffect(() => {
        const checkImage = async () => {
            const res = await fetch(`/api/checkImage?imageUrl=${note.imageUrl}`);
            const { isExist: exist } = await res.json();
            setIsExist(exist);
        }
        checkImage();
    }, [])

    const handleFileChange = async (e: any) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append("file", file);
            formData.append("noteId", `${note.id}`);

            try {
                const res = await axios.post("/api/uploadFile", formData);
                alert(res.data.response);
            } catch (error: any) {
                alert("Failed to upload file: " + error.message);
            }
        }
    };

    const imageClick = () => {
        const input = document.getElementById('inputFile');
        if (input) input.click();
    };

    return (
        <div className='justify-center flex'>
            <img className="h-[100%]" src={(!note.imageUrl || !isExist) ? '/notesImages/note.png' : `/notesImages/${userId}/${note.imageUrl}`} alt={note.name} onClick={() => imageClick()} />
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
