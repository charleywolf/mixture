import Wrapper from "@/components/Wrapper";
import prisma from "@/lib/db/prisma";

export default async function DashboardTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const chats = await prisma.chat.findMany();
  return <Wrapper chats={chats}>{children}</Wrapper>;
}
