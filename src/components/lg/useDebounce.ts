"use client"

import { useState, useEffect } from "react";

function useDebounce(value: string, delay: number) {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => { 
        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, delay);
        
        return () => clearTimeout(handler);
    }, [value, delay])
    
    return debounceValue;
};

export {
    useDebounce
};