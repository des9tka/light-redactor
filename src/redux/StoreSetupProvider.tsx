"use client"

import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from './appDispatchHook';
import { noteActions } from './noteSlice';

const StoreSetupProvider = ({ children }: { children: React.ReactNode }) => {

    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.noteReducer);

    useEffect(() => {
        if (!user) {
            dispatch(noteActions.setUserInfo())
            console.log("Setuped!");
        }
    }, [])

    return (
        <div>{children}</div>
    )
}

export { StoreSetupProvider }