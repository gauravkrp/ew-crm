import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Header({
  isAuthorized = false,
}: {
  isAuthorized: boolean;
}) {
  return (
    <div className=" mx-auto px-4 md:px-6 lg:px-12">
      <header className="flex h-20 w-full shrink-0 items-center px-2 md:px-6">
        <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
          <Image
            src={"/assets/logo.png"}
            width={72}
            height={24}
            alt="Education World"
          />
        </Link>
        <div className="ml-auto flex gap-2">
          <Link
            href="/dashboard"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            prefetch={false}
          >
            Dashboard
          </Link>

          <Link
            href="https://www.eduworldglobal.com"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            prefetch={false}
          >
            eduworld
          </Link>
          {isAuthorized ? (
            <div className="flex gap-x-4 items-center">
              <Link href={"/auth/signup"}>
                <Button
                  variant={"outline"}
                  className="justify-self-end px-6 h-8 text-sm"
                >
                  Upload
                </Button>
              </Link>
              <Link href={"/student"}>
                <Button className="justify-self-end px-6 h-8 py-0 text-sm">
                  ADD
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              <Link href={"/auth/login"}>
                <Button
                  variant="ghost"
                  className="justify-self-end px-8 py-1 text-sm"
                >
                  Log in
                </Button>
              </Link>
              <Link href={"/auth/signup"}>
                <Button className="justify-self-end px-8 py-1 text-sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

function CarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}
