import prisma from "./prisma";

export async function saveMessage(
  text: string,
  role: "user" | "assistant",
  chatId: string
) {
  try {
    const newMessage = await prisma.message.create({
      data: { content: text, role: role, chatId: chatId },
    });

    return newMessage;
  } catch (e) {
    console.error("saveMessage error: " + e);
  }
}
