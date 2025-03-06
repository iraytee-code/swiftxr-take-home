import { useEffect, useState } from "react";
import ToastProvider from "./toast-provider";

export default function Provider({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <>
            {children}
            <ToastProvider />
        </>
    );
}
