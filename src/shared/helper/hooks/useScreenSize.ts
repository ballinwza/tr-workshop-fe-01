'use client'
import { useEffect, useState } from 'react'

export const useScreenSize = () => {
    const [screen, setScreen] = useState<boolean>()

    useEffect(() => {
        if (window != undefined) {
            const isTablet = window.innerWidth >= 768
            setScreen(isTablet)
        }
        return () => {
            setScreen(false)
        }
    }, [])

    return { isTablet: screen }
}
