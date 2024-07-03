"use client";

import { CogIcon, Menu, Package2, PlusCircle } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "./ui/button";
import { Chat } from "@prisma/client";
import Link from "next/link";
import MixtureSettings from "./MixtureSettings";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function Wrapper({
  chats,
  children,
}: {
  chats: Chat[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div className="grid max-h-screen max-w-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              Mixture
            </Link>
          </div>
          <div className="flex-1 overflow-y-scroll">
            <nav className="grid items-start px-2 text-normal font-medium lg:px-4 gap-3">
              {chats.map((chat) => (
                <Link
                  key={chat.id}
                  href={`/chat/${chat.id}`}
                  className={clsx(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                    pathname === `/chat/${chat.id}`
                      ? "text-white bg-primary shadow"
                      : "text-muted-foreground hover:text-primary bg-neutral-200"
                  )}
                >
                  {chat.title}
                </Link>
              ))}
              <Link
                href="/chat/new"
                className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-neutral-700 text-white bg-primary shadow"
              >
                <PlusCircle />
                Create New Chat
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col max-h-screen">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col gap-3">
              <nav className="grid gap-2 text-normal font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  Mixture
                </Link>

                {chats.map((chat) => (
                  <Link
                    key={chat.id}
                    href={`/chat/${chat.id}`}
                    className={clsx(
                      "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 bg-neutral-100",
                      pathname === `/chat/${chat.id}`
                        ? "text-white bg-primary shadow"
                        : "text-muted-foreground hover:text-primary bg-neutral-200"
                    )}
                  >
                    {chat.title}
                  </Link>
                ))}

                <Link
                  href="/chat/new"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:bg-neutral-700 text-white bg-primary shadow"
                >
                  <PlusCircle />
                  Create New Chat
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <MixtureSettings />
        </header>
        {children}
      </div>
    </div>
  );
}
