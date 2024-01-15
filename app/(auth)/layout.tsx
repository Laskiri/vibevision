import Link from "next/link";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" flex w-full items-center justify-center gap-2 h-full ">
      <div className=" bg-zinc-700 h-[428px] w-[32rem] p-7 flex items-center justify-center flex-col ">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
