'use client';

import { ErrorMessage } from '@/components/ErrorMessage';
import { GoogleAuth } from '@/components/GoogleAuth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Auth, authSchema } from '@/lib/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export function LoginForm() {
  const router = useRouter();
  const form = useForm<Auth>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: Auth) => {
    const url = new URL(`/auth/signin`, process.env.NEXT_PUBLIC_BASE_URL).href;
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    const errorMessage = await res.json();

    if (!res.ok) {
      toast({
        title: 'Error',
        description: errorMessage.error,
      });

      return;
    }

    router.push('/dashboard');
  };

  return (
    <Card className="flex flex-col justify-center mx-auto w-[350px]">
      <CardHeader className="spacy-y-1">
        <CardTitle className="text-2xl">Sign in</CardTitle>
        <CardDescription>Enter your email below to sign in</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <GoogleAuth />
        </div>
        <div className="relative my-3">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div>
          <ErrorMessage />
          <Form {...form}>
            <form
              className="flex flex-col space-y-3"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-2 justify-between">
                <Button className="w-full" size="sm" type="submit">
                  Sign In
                </Button>

                <Button
                  className="w-full"
                  size="sm"
                  type="submit"
                  variant="link"
                  asChild
                >
                  <Link href="/register">
                    Don&#39;t have an account? Click here to register
                  </Link>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
