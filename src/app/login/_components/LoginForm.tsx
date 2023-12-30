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

export function LoginForm() {
  return (
    <Card className="flex flex-col justify-center w-[400px] mx-auto">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <form
            className="flex flex-col space-y-2"
            action="/auth/signin"
            method="post"
          >
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" />

            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" />

            <Button size="sm">Sign In</Button>

            <Button formAction="/auth/signup" size="sm">
              Sign Up
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
