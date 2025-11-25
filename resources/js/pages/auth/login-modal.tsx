import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import { loginSchema } from "@/schemas/auth";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  openRegister: () => void;
}

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginModal({
  open,
  onOpenChange,
  openRegister,
}: LoginModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(values: LoginForm) {
    router.post("/login", values, {
      onSuccess: () => onOpenChange(false),
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="[&>button:last-child]:hidden max-w-3xl p-10 rounded-3xl bg-white">

        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 text-orange cursor-pointer"
        >
          <X size={32} />
        </button>

        <p className="font-bold text-xl font-poppins">PandawaRent</p>
        <h1 className="text-3xl font-bold font-manrope mb-2">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="flex flex-col mb-4">
            <div className="flex items-center gap-3 bg-white-background px-4 py-3 rounded-xl">
              <Mail className="text-gray-600" />
              <Input
                type="email"
                placeholder="email"
                className="bg-transparent border-none focus-visible:ring-0"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col mb-6">
            <div className="flex items-center gap-3 bg-white-background px-4 py-3 rounded-xl">
              <Lock className="text-gray-600" />
              <Input
                type="password"
                placeholder="password"
                className="bg-transparent border-none focus-visible:ring-0"
                {...register("password")}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <Button
            disabled={isSubmitting}
            className="bg-orange border-1 border-orange hover:text-orange hover:bg-white-background px-10 py-6 rounded-xl text-white text-lg flex items-center gap-2 w-full"
          >
            {isSubmitting ? "Loading..." : "Login"}
          </Button>
        </form>

        {/* Register Link */}
        <div className="mt-6 text-gray-600">
          Don’t have an account?{" "}
          <button
            onClick={openRegister}
            className="font-semibold text-gray hover:text-black  cursor-pointer"
          >
            Register here
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
