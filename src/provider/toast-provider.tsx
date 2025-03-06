import { Toaster as SonnerToaster } from "sonner";

export default function ToastProvider() {
    return (
        <SonnerToaster
            position="bottom-right"
            richColors
            offset={80}
            closeButton
            toastOptions={{
                duration: 5 * 1000,
            }}
            visibleToasts={9}
            expand
        />
    );
}
