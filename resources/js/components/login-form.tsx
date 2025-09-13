import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import InputError from './input-error';

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            post('/login');
        } catch (error) {
            toast.error('Login failed. please try again');
        }
    };
    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome </CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        <div className="grid gap-6">
                            <form className="grid gap-6" onSubmit={handleSubmit}>
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        onChange={(e) => setData('email', e.target.value)}
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                    />
                                    <InputError message={errors.email} className="mt-1" />
                                </div>
                                <div className="grid gap-3">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                                            Forgot your password?
                                        </a>
                                    </div>
                                    <Input onChange={(e) => setData('password', e.target.value)} id="password" type="password" required />
                                    <InputError message={errors.password} className="mt-1" />
                                </div>
                                <Button type="submit" className="w-full" disabled={processing}>
                                    Login
                                </Button>
                            </form>
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{' '}
                                <a href="#" className="underline underline-offset-4">
                                    Sign up
                                </a>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="text-center text-xs text-balance text-muted-foreground *:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary">
                By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    );
}
