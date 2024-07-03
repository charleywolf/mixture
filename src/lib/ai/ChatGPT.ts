import "server-only";

import { CoreMessage, CoreTool, StreamTextResult, streamText } from "ai";

import { OpenAIChatModelId } from "@ai-sdk/openai/internal";
import { openai } from "@ai-sdk/openai";

export default async function ChatGPT({
  messages,
  model,
}: {
  messages: CoreMessage[];
  model: OpenAIChatModelId;
}): Promise<StreamTextResult<Record<string, CoreTool<any, any>>>> {
  try {
    const result = await streamText({
      model: openai(model),
      messages,
    });

    return result;
  } catch (e) {
    throw new Error("OpenAI Error: " + e);
  }
}
