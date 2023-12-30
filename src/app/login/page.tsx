export default function Page() {
  return (
    <div>
      <form action="/auth/signin" method="post">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />

        <button className="py-2 px-4 mb-2 bg-gray-800 rounded-md text-foreground">
          Sign In
        </button>

        <button
          formAction="/auth/signup"
          className="py-2 px-4 mb-2 rounded-md border border-foreground/20 text-foreground"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
