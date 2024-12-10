"use client"

import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from './appDispatchHook';
import { noteActions } from './noteSlice';

const StoreSetupProvider = ({ children }: { children: React.ReactNode }) => {

    const dispatch = useAppDispatch();
    const { userId } = useAppSelector(state => state.noteReducer);

    useEffect(() => {
        if (!userId) {
            dispatch(noteActions.setUserId())
        }
    }, [])

    return (
        <div>{children}</div>
    )
}

export { StoreSetupProvider }