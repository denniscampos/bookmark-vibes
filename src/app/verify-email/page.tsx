import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Page() {
  return (
    <Card className="flex flex-col items-center justify-center w-[300px] sm:w-[400px] mx-auto mt-20">
      <CardTitle className="font-bold">
        <CardHeader>Thank You for Signing Up!</CardHeader>
      </CardTitle>
      <CardContent>
        <CardDescription className="text-muted-foreground">
          To complete your registration and continue, please check your email
          inbox and verify your email address.
        </CardDescription>
      </CardContent>
    </Card>
  );
}
