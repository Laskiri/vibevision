import Link from "next/link";
import { Button } from "@/components/ui/button";
import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default function Signup({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/signup?message=Could not authenticate user");
    }

    return redirect("/signup?message=Check email to continue sign in process");
  };

  return (
    <>
      <h2 className=" text-2xl text-white p-6 font-semibold">
        Sign in to VibeVision
      </h2>
      <form
        className="flex-1 flex flex-col w-full justify-center gap-1 text-foreground"
        action={signUp}
      >
        <label className="text-white font-semibold" htmlFor="email">
          Email
        </label>
        <input
          className="h-8 mb-2 px-4 py-2 bg-slate-200  border"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-white font-semibold" htmlFor="password">
          Password
        </label>
        <input
          className="h-8 mb-11 px-4 py-2 bg-slate-200  border"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />

        <Button
          variant="default"
          className="h-8 bg-green-600 hover:bg-green-700 "
        >
          Sign up
        </Button>
        <a
          className=" m-4 w-full text-center font-semibold text-sm text-green-400 mb-4 hover:text-green-500 hover:cursor-pointer"
          href="/login"
        >
          Already a user? Log in
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
