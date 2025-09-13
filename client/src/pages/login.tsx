import { GalleryVerticalEnd } from "lucide-react"
import authImage from "@/assets/authImage.png"
import LoginForm from "@/components/login-form"

export default function LoginPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                            <GalleryVerticalEnd className="size-4" />
                        </div>
                        <span className="text-lg font-bold">E-Comm</span>
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-lg">
                        <LoginForm />
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block">
                <img
                    src={authImage}
                    alt="Auth Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.7]"
                />
            </div>
        </div>
    )
}
