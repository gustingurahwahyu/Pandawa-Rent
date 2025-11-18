import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import { registerSchema } from "@/schemas/auth";

interface RegisterModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  openLogin: () => void;
}

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterModal({
  open,
  onOpenChange,
  openLogin,
}: RegisterModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  function onSubmit(values: RegisterForm) {
    router.post("/register", values, {
      onSuccess: () => onOpenChange(false),
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="[&>button:last-child]:hidden max-w-3xl p-10 rounded-3xl bg-white">

        {/* Close */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-6 top-6 text-orange cursor-pointer"
        >
          <X size={32} />
        </button>

        <p className="font-bold text-xl font-poppins">PandawaRent</p>
        <h1 className="text-3xl font-bold font-manrope mb-2">Register</h1>

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
          <div className="flex flex-col mb-4">
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
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col mb-6">
            <div className="flex items-center gap-3 bg-white-background px-4 py-3 rounded-xl">
              <Lock className="text-gray-600" />
              <Input
                type="password"
                placeholder="confirm password"
                className="bg-transparent border-none focus-visible:ring-0"
                {...register("password_confirmation")}
              />
            </div>
            {errors.password_confirmation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password_confirmation.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button
            disabled={isSubmitting}
            className="bg-orange border-1 border-orange hover:text-orange hover:bg-white-background px-10 py-6 rounded-xl text-white text-lg flex items-center gap-2 w-full"
          >
            {isSubmitting ? "Loading..." : "Register"}
          </Button>
        </form>

        <div className="mt-6 text-gray-600">
          Already have an account?{" "}
          <button
            onClick={openLogin}
            className="font-semibold text-gray cursor-pointer"
          >
            Login here
          </button>
        </div>

      </DialogContent>
    </Dialog>
  );
}
