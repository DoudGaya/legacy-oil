import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";


export const metadata: Metadata = {
  title: "AUG Legacy Oil",
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()
  return (
    <html lang="en">
     <SessionProvider session={session}>
     <body className={``}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
       <div className="">
          {children}
       </div>
      </ThemeProvider>
      </body>
     </SessionProvider>
    </html>
  );
}
