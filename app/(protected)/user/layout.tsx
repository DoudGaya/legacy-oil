import { auth } from '@/auth'
import { SessionProvider } from "next-auth/react";
import { TopNav } from "../_components/TopNav";

export default async function AdmninLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  const user = session?.user.name
    return (
      <SessionProvider session={session}>
        <div className="flex h-screen md:flex-row md:overflow-hidden">
          <div className="flex flex-col w-full md:overflow-y-auto ">
            <TopNav />
          <div className=" mt-20 md:mt-0 w-full h-full">
          {children}
          </div>
          </div>
        </div>
      </SessionProvider>
    );
}