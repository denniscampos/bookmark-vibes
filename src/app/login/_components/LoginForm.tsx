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
import { useForm } from 'react-hook-form';
import { login } from '../actions';
import { useState } from 'react';

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm<Auth>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: Auth) => {
    setLoading(true);
    try {
      await login(data);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
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
                <Button
                  disabled={loading}
                  className="w-full"
                  size="sm"
                  type="submit"
                >
                  {loading ? 'Logging in...' : 'Sign In'}
                </Button>

                <div className="flex w-full items-center justify-center">
                  <span className="text-sm text-muted-foreground">
                    Don&#39;t have an account?{' '}
                  </span>
                  <Button size="sm" variant="link" asChild>
                    <Link href="/register">Sign up now</Link>
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
