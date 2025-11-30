import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { registerSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { Lock, Mail, Phone, User, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
    router.post('/register', values, {
      onSuccess: () => onOpenChange(false),
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl rounded-3xl bg-white p-10 [&>button:last-child]:hidden">
        {/* Close */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-6 right-6 cursor-pointer text-orange"
        >
          <X size={32} />
        </button>

        <p className="font-poppins text-xl font-bold">PandawaRent</p>
        <h1 className="mb-2 font-manrope text-3xl font-bold">Register</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="mb-4 flex flex-col">
            <div className="flex items-center gap-3 rounded-xl bg-white-background px-4 py-3">
              <User className="text-gray-600" />
              <Input
                type="text"
                placeholder="Full Name"
                className="border-none bg-transparent focus-visible:ring-0"
                {...register('name')}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

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

          {/* Phone Number */}
          <div className="mb-4 flex flex-col">
            <div className="flex items-center gap-3 rounded-xl bg-white-background px-4 py-3">
              <Phone className="text-gray-600" />
              <Input
                type="tel"
                placeholder="Phone Number (e.g., 08123456789)"
                className="border-none bg-transparent focus-visible:ring-0"
                {...register('no_telepon')}
              />
            </div>
            {errors.no_telepon && (
              <p className="mt-1 text-sm text-red-500">
                {errors.no_telepon.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4 flex flex-col">
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

          {/* Confirm Password */}
          <div className="mb-6 flex flex-col">
            <div className="flex items-center gap-3 rounded-xl bg-white-background px-4 py-3">
              <Lock className="text-gray-600" />
              <Input
                type="password"
                placeholder="confirm password"
                className="border-none bg-transparent focus-visible:ring-0"
                {...register('password_confirmation')}
              />
            </div>
            {errors.password_confirmation && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password_confirmation.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center gap-2 rounded-xl border-1 border-orange bg-orange px-10 py-6 text-lg text-white hover:bg-white-background hover:text-orange"
          >
            {isSubmitting ? 'Loading...' : 'Register'}
          </Button>
        </form>

        <div className="mt-6 text-gray-600">
          Already have an account?{' '}
          <button
            onClick={openLogin}
            className="cursor-pointer font-semibold text-gray hover:text-black"
          >
            Login here
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
