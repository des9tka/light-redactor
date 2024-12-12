'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { EditorContent, useEditor } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"
import { TipTapHeaderBar } from './TipTapHeaderBar'
import { Button } from '../shadcn'
import { useDebounce } from './useDebounce'
import { useMutation } from '@tanstack/react-query'
import { NoteType } from '@/lib'
import { Loader } from "lucide-react"


type Props = { note: NoteType }

const TipTapEditor = ({ note }: Props) => {
    const [editorState, setEditorState] = useState(note.editorState || `<h1>${note.name}</h1>`);

    const saveNote = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/api/saveNote', {
                noteId: note.id,
                editorState
            });
            return response.data;
        }
    })

    const editor = useEditor({
        autofocus: true,
        extensions: [StarterKit],
        content: editorState,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            setEditorState(editor.getHTML())
        }
    })

    const debounceEditorState = useDebounce(editorState, 1000);

    useEffect(() => {
        if (debounceEditorState === '') return;
        saveNote.mutate(undefined, {
            onSuccess: (data) => {
                // console.log('Note saved', data)
            },
            onError: (error) => {
                console.error('Error saving note', error)
            }
        })

    }, [debounceEditorState])


    return (
        <>
            <div className='flex'>
                {editor && (
                    <TipTapHeaderBar editor={editor} />
                )}
                <Button className='ml-2 bg-purple-900 rounded text-white hover:text-purple-700 shadow-lg font-semibold' disabled>
                    {saveNote.isPending ? (<div className='flex justify-center items-center'>
                        Saving...
                        <Loader size={16} className='ml-2' />
                    </div>) : "Saved"}
                </Button>
            </div>
            <div className='prose'>
                <EditorContent editor={editor} />
            </div>
        </>
    )
}

export {
    TipTapEditor
}