"use client";

import { Loader, SendIcon } from "lucide-react";
import { MixtureStorage, getLocalStorage } from "@/lib/hooks/settings";
import { useEffect, useState } from "react";

import ChatMessage from "@/components/ChatMessage";
import { ChatWithMessages } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { useChat } from "ai/react";

export default function ClientChats({ chat }: { chat: ChatWithMessages }) {
  const [storage, setStorage] = useState<MixtureStorage | null>(null);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    setMessages,
  } = useChat({
    id: chat.id,
  });

  useEffect(() => {
    const data = getLocalStorage();
    setStorage(data);
    setMessages(chat.messages);
  }, [chat.messages, setMessages]);

  return (
    <div className="overflow-y-scroll relative h-screen-without-header flex flex-col">
      <main className="flex flex-col gap-5 mb-10 p-6">
        {messages.length === 0
          ? chat.messages.map((message) => (
              <ChatMessage
                key={message.id}
                content={message.content}
                role={message.role}
              />
            ))
          : messages?.map((message) => (
              <ChatMessage
                key={message.id}
                content={message.content}
                role={message.role === "user" ? "user" : "assistant"}
              />
            ))}
        <span className="text-sm text-red-500 text-right">
          {error?.message && "Error! Your mixture may not be configured."}
        </span>
      </main>

      <form
        onSubmit={(e) =>
          handleSubmit(e, {
            options: { body: { mixture: storage, chatId: chat.id } },
          })
        }
        className="flex items-center justify-center gap-3 bg-primary p-2 rounded-full fixed bottom-3 left-0 md:left-[220px] lg:left-[280px] right-0 mx-3"
      >
        <Input
          type="text"
          placeholder="Mix it up..."
          value={input}
          onChange={handleInputChange}
          className="flex w-full bg-transparent border-none text-white"
        />
        <button
          type="submit"
          className={clsx(
            "rounded-full p-3 text-neutral-500",
            input.length === 0 || isLoading
              ? "bg-neutral-300"
              : "bg-white hover:bg-neutral-100"
          )}
          disabled={input.length === 0 || isLoading}
        >
          {isLoading ? (
            <Loader className="animate-spin h-4 w-4" />
          ) : (
            <SendIcon className="h-4 w-4" />
          )}
        </button>
      </form>
      <div className=""></div>
    </div>
  );
}
