import Markdown from "react-markdown";
import { Message } from "@prisma/client";
import clsx from "clsx";

export default function ChatMessage({
  content,
  role,
}: Omit<Message, "id" | "chatId">) {
  return (
    <div className={role === "user" ? "ml-12" : "mr-12"}>
      <div
        className={clsx(
          "p-5 rounded-3xl overflow-x-scroll markdown text-lg flex flex-col gap-3 items-center w-fit shadow text-left",
          role === "user" ? "ml-auto bg-blue-500 text-white" : "bg-neutral-200"
        )}
      >
        {role === "user" ? <>{content}</> : <Markdown>{content}</Markdown>}
      </div>
    </div>
  );
}
