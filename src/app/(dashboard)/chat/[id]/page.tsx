import ClientChats from "./ClientChats";
import { notFound } from "next/navigation";
import prisma from "@/lib/db/prisma";

export default async function CurrentChat({
  params,
}: {
  params: { id: string };
}) {
  const chat = await prisma.chat.findUnique({
    where: { id: params.id },
    include: { messages: true },
  });

  if (chat) {
    return <ClientChats chat={chat} />;
  } else {
    return notFound();
  }
}
