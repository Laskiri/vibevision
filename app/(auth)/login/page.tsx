import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/");
  };

  return (
    <>
      <h2 className=" text-2xl text-white p-6 font-semibold">
        Log in to VibeVision
      </h2>
      <form
        className="flex-1 flex flex-col w-full justify-center gap-1 text-foreground "
        action={signIn}
      >
        <label className="font-semibold text-md text-white" htmlFor="email">
          Email
        </label>
        <input
          className="h-8 mb-2 px-4 py-2 bg-slate-200  border"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="font-semibold text-md text-white" htmlFor="password">
          Password
        </label>
        <input
          className="h-8 px-4 py-2 mb-1 bg-slate-200 border  "
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <a className="text-sm text-green-500 mb-4 hover:text-green-600 hover:cursor-pointer">
          Forgot your password?
        </a>

        <Button
          variant="default"
          className="bg-green-600 hover:bg-green-700 font-semibold h-8"
        >
          Log in
        </Button>
        <a
          className=" m-4 w-full text-center font-semibold text-sm text-green-400 mb-4 hover:text-green-500 hover:cursor-pointer"
          href="/signup"
        >
          Don't have an account? Sign up
        </a>
        {searchParams?.message && (
          <p className="mt-2 p-4 bg-gray-300  text-center font-bold">
            {searchParams.message}!
          </p>
        )}
      </form>
    </>
  );
}
