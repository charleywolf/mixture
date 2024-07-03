import "server-only";

import { CoreMessage, CoreTool, StreamTextResult, streamText } from "ai";

import { anthropic } from "@ai-sdk/anthropic";

export default async function Anthropic({
  messages,
  model,
}: {
  messages: CoreMessage[];
  model: string;
}): Promise<StreamTextResult<Record<string, CoreTool<any, any>>>> {
  try {
    const result = await streamText({
      model: anthropic(model),
      messages,
    });

    return result;
  } catch (e) {
    throw new Error("Anthropic Error: " + e);
  }
}
