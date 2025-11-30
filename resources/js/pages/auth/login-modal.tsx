import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { loginSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { Lock, Mail, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
    router.post('/login', values, {
      onSuccess: () => onOpenChange(false),
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl rounded-3xl bg-white p-10 [&>button:last-child]:hidden">
        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 cursor-pointer text-orange"
        >
          <X size={32} />
        </button>

        <p className="font-poppins text-xl font-bold">PandawaRent</p>
        <h1 className="mb-2 font-manrope text-3xl font-bold">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="mb-4 flex flex-col">
            <div className="flex items-center gap-3 rounded-xl bg-white-background px-4 py-3">
              <Mail className="text-gray-600" />
              <Input
                type="email"
                placeholder="email"
                className="border-none bg-transparent focus-visible:ring-0"
                {...register('email')}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6 flex flex-col">
            <div className="flex items-center gap-3 rounded-xl bg-white-background px-4 py-3">
              <Lock className="text-gray-600" />
              <Input
                type="password"
                placeholder="password"
                className="border-none bg-transparent focus-visible:ring-0"
                {...register('password')}
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center gap-2 rounded-xl border-1 border-orange bg-orange px-10 py-6 text-lg text-white hover:bg-white-background hover:text-orange"
          >
            {isSubmitting ? 'Loading...' : 'Login'}
          </Button>
        </form>

        {/* Register Link */}
        <div className="mt-6 text-gray-600">
          Don’t have an account?{' '}
          <button
            onClick={openRegister}
            className="cursor-pointer font-semibold text-gray hover:text-black"
          >
            Register here
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
