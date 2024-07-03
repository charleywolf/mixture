import { CoreTool, GenerateTextResult } from "ai";

export type MixtureResponses = {
  gpt4o: null | GenerateTextResult<Record<string, CoreTool<any, any>>>;
  gpt4Turbo: null | GenerateTextResult<Record<string, CoreTool<any, any>>>;
  gpt3_5Turbo: null | GenerateTextResult<Record<string, CoreTool<any, any>>>;
  claude3Opus: null | GenerateTextResult<Record<string, CoreTool<any, any>>>;
};

export function parseMixtureStorage(mixture: unknown) {
  if (
    mixture &&
    typeof mixture === "object" &&
    "gpt4o" in mixture &&
    "gpt4Turbo" in mixture &&
    "gpt3_5Turbo" in mixture &&
    "claude3Opus" in mixture &&
    mixture.gpt4o &&
    mixture.gpt4Turbo &&
    mixture.gpt3_5Turbo &&
    mixture.claude3Opus &&
    typeof mixture.gpt4o === "string" &&
    typeof mixture.gpt4Turbo === "string" &&
    typeof mixture.gpt3_5Turbo === "string" &&
    typeof mixture.claude3Opus === "string"
  ) {
    return {
      gpt4o: parseInt(mixture.gpt4o),
      gpt4Turbo: parseInt(mixture.gpt4Turbo),
      gpt3_5Turbo: parseInt(mixture.gpt3_5Turbo),
      claude3Opus: parseInt(mixture.claude3Opus),
    };
  } else {
    return null;
  }
}
