"use client"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { Plus, Loader } from "lucide-react"
import { useRouter } from "next/navigation"

import { Input, Button, Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components"
import { noteActions, useAppDispatch } from "@/redux"


function CreateNoteDialog({ openSubmit, setOpenSubmit }: { openSubmit: boolean, setOpenSubmit: Function }) {
    const [inputName, setInputName] = useState("");
    const [show, setShow] = useState(true);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const dispatch = useAppDispatch();

    const createNoteBook = useMutation({
        mutationFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            await dispatch(noteActions.createNote(inputName));
            setOpenSubmit(true);
            setShow(false);
        }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!inputName) {
            window.alert('Please enter a name for new NoteBook!');
            return;
        }

        try {
            createNoteBook.mutate(undefined, {
                onError: () => {
                    window.alert('Failed to create new NoteBook! Please, try it later.');
                    setShow(false);
                    router.replace('/dashboard');
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="border w-[100%] h-[100%] border-dashed border-purple-500 rounded-lg items-center justify-center hover:shadow-xl transition hover:-translate-y-1 flex-row p-4">
                <h2 className="flex text-purple-500 font-extrabold justify-center items-center content-center h-14">
                    <Plus className="w-5 h-5 mt-0.5" strokeWidth={3} />
                    New NoteBook
                </h2>
            </DialogTrigger>

            <DialogContent className="bg-white border rounded">
                <DialogHeader className="flex items-center">
                    <DialogTitle className="text-center font-black text-purple-800">
                        {!createNoteBook.isPending ?
                            'New NoteBook' :
                            (<div className="flex">
                                Creating <span className="mx-1 text-purple-500">"{inputName}"</span> NoteBook...
                                <Loader className="animate-spin ml-2" />
                            </div>)}
                    </DialogTitle>
                    <DialogDescription className="text-center font-medium">
                        You can create a new note book or close this window.
                    </DialogDescription>

                    <form className="w-full" onSubmit={handleSubmit}>
                        <Input onChange={(e) => setInputName(e.target.value)} className="w-full bg-slate-200 shadow-xl h-[40px] rounded pl-2 mb-2" placeholder="Name..." />
                        <div className="flex justify-start w-full">
                            <Button type="reset" variant={"secondary"} onClick={() => setOpen(!open)} className="hover:text-purple-800 rounded" disabled={createNoteBook.isPending || !show}>
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-purple-800 w-[75px] text-white hover:text-black rounded hover:bg-purple-800"
                                disabled={createNoteBook.isPending || !show}
                            >
                                Create
                            </Button>
                        </div>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export { CreateNoteDialog }
