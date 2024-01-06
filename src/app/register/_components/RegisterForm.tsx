import { GoogleAuth } from '@/components/GoogleAuth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export function RegisterForm() {
  return (
    <Card className="flex flex-col justify-center mx-auto w-[350px]">
      <CardHeader className="spacy-y-1">
        <CardTitle className="text-2xl">Sign up for Bookmark Vibes</CardTitle>
        <CardDescription>
          Enter your email and password to sign up
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
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

          <form
            className="flex flex-col space-y-3"
            action="/auth/signup"
            method="post"
          >
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" />

            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" />

            <div className="flex flex-col gap-2 justify-between">
              <Button className="w-full" size="sm">
                Sign Up
              </Button>

              <Button
                className="w-full"
                size="sm"
                type="submit"
                variant="link"
                asChild
              >
                <Link href="/login">Already have an account? Click here</Link>
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
