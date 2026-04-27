"use client"

import { useEffect, useState } from "react"

interface LoaderProps {
    isLoading: boolean
    className?: string
    classNameLoader?: string
}

/**
 * Loader component that displays a loading animation while the page is loading. It fades out smoothly when loading is complete.
 * @param bool isLoading - A boolean indicating whether the page is currently loading.
 * @param {string | undefined} className - Optional additional class names for the loader container.
 * @param {string | undefined} classNameLoader - Optional additional class names for the loader animation element.
 * @returns A React component that renders a full-screen loader with a fade-out effect when loading is complete.
 */
export default function Loader({ isLoading, className, classNameLoader }: LoaderProps) {
    const [show, setShow] = useState(true)

    useEffect(() => {
        if (!isLoading) {
            // Delay hiding to allow animation to complete
            const timer = setTimeout(() => setShow(false), 1000)
            return () => clearTimeout(timer)
        }
    }, [isLoading])

    if (!show) return null

    return (
        <div
            className={`fixed inset-0 z-[10000] transition-opacity duration-500 ${className} ${isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
        >
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[1px] ${classNameLoader} animate-loader`} />
        </div>
    )
}
