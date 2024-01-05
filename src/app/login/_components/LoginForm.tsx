import { Icons } from '@/components/Icons';
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

export function LoginForm() {
  return (
    <Card className="flex flex-col justify-center mx-auto w-[350px]">
      <CardHeader className="spacy-y-1">
        <CardTitle className="text-2xl">Sign in</CardTitle>
        <CardDescription>Enter your email below to sign in</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {/* <form action="/auth/signup" method="post">
            <Button
              name="provider"
              value="google"
              variant="outline"
              size="sm"
              className="w-full"
            >
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
          </form> */}
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
          <form
            className="flex flex-col space-y-3"
            action="/auth/signin"
            method="post"
          >
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" />

            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" />

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
        </div>
      </CardContent>
    </Card>
  );
}
