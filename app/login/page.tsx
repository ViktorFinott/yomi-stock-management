import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-black selection:bg-primary/30">
      {/* Minimalist background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-black to-black" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-20" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-20" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
        <LoginForm />
      </div>
    </div>
  )
}
