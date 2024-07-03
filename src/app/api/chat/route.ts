import { CoreMessage, generateText, streamText } from "ai";

import { NextResponse } from "next/server";
import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import { parseMixtureStorage } from "./typeguard";
import { saveMessage } from "@/lib/db/history";

// Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, mixture, chatId } = await req.json();
  const parsedMixture = parseMixtureStorage(mixture);

  if (parsedMixture && chatId && typeof chatId === "string") {
    const gpt4o_result = await generateText({
      messages,
      model: openai("gpt-4o"),
    });

    const gpt4Turbo_result = await generateText({
      messages,
      model: openai("gpt-4-turbo"),
    });

    const claude3Sonnet_response = await generateText({
      messages,
      model: anthropic("claude-3-5-sonnet-20240620"),
    });

    const claude3Opus_result = generateText({
      messages,
      model: anthropic("claude-3-opus-20240229"),
    });

    const results = await Promise.all([
      gpt4o_result,
      gpt4Turbo_result,
      claude3Sonnet_response,
      claude3Opus_result,
    ]);

    const combination = `Combine the following messages based on these percentages:\n\n${parsedMixture.gpt4o} of gpt4o: ${results[0]?.text}\n${parsedMixture.gpt4Turbo} of gpt4Turbo: ${results[1]?.text}\n${parsedMixture.claude3Sonnet} of claude3Sonnet: ${results[2]?.text}\n${parsedMixture.claude3Opus} of claude3Opus: ${results[3]?.text}`;

    return (
      await streamText({
        model: openai("gpt-4-turbo"),
        prompt: combination,

        onFinish: async (res) => {
          const coreMessages = messages as CoreMessage[];
          await saveMessage(
            coreMessages[coreMessages.length - 1].content.toString(),
            "user",
            chatId
          );
          await saveMessage(res.text, "assistant", chatId);
        },
      })
    ).toAIStreamResponse();
  } else {
    return NextResponse.json({ status: 400 });
  }
}
