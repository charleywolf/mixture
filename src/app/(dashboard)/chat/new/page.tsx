import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export default async function newChat() {
  const newChat = await prisma.chat.create({
    data: { title: "New Chat", userId: "1" },
  });

  return redirect(`/chat/${newChat.id}`);
}
