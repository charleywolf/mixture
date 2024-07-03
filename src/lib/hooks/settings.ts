"use client";

import { useEffect, useState } from "react";

export type MixtureStorage = {
  gpt4o: string | null;
  gpt4Turbo: string | null;
  claude3Sonnet: string | null;
  claude3Opus: string | null;
};

export function getLocalStorage(): MixtureStorage {
  return {
    gpt4o: localStorage.getItem("gpt4o"),
    gpt4Turbo: localStorage.getItem("gpt4Turbo"),
    claude3Sonnet: localStorage.getItem("claude3Sonnet"),
    claude3Opus: localStorage.getItem("claude3Opus"),
  };
}

export function useMixtureSettings() {
  const [gpt4o, setGpt4o] = useState<number[]>([0]);
  const [gpt4Turbo, setGpt4Turbo] = useState<number[]>([0]);
  const [claude3Sonnet, setClaude3Sonnet] = useState<number[]>([0]);
  const [claude3Opus, setClaude3Opus] = useState<number[]>([0]);

  useEffect(() => {
    const storage = getLocalStorage();

    storage.gpt4o && setGpt4o([parseInt(storage.gpt4o)]);
    storage.gpt4Turbo && setGpt4Turbo([parseInt(storage.gpt4Turbo)]);
    storage.claude3Sonnet &&
      setClaude3Sonnet([parseInt(storage.claude3Sonnet)]);
    storage.claude3Opus && setClaude3Opus([parseInt(storage.claude3Opus)]);
  }, []);

  const maxGpt4o = 100 - (gpt4Turbo[0] + claude3Sonnet[0] + claude3Opus[0]);
  const maxGpt4Turbo = 100 - (gpt4o[0] + claude3Sonnet[0] + claude3Opus[0]);
  const maxClaude3Sonnet = 100 - (gpt4o[0] + gpt4Turbo[0] + claude3Opus[0]);
  const maxClaude3Opus = 100 - (gpt4o[0] + gpt4Turbo[0] + claude3Sonnet[0]);

  const saveToLocalStorage = () => {
    sliders.map((slider) => {
      localStorage.setItem(slider.id, slider.value[0].toString());
    });
    window.location.reload();
  };

  const handleValueChange = (
    newValue: number[],
    model: "gpt4o" | "gpt4Turbo" | "claude3Sonnet" | "claude3Opus"
  ) => {
    switch (model) {
      case "gpt4o":
        if (newValue[0] <= maxGpt4o) {
          setGpt4o(newValue);
        }
        break;
      case "gpt4Turbo":
        if (newValue[0] <= maxGpt4Turbo) {
          setGpt4Turbo(newValue);
        }
        break;
      case "claude3Sonnet":
        if (newValue[0] <= maxClaude3Sonnet) {
          setClaude3Sonnet(newValue);
        }
        break;
      case "claude3Opus":
        if (newValue[0] <= maxClaude3Opus) {
          setClaude3Opus(newValue);
        }
        break;
    }
  };

  const sliders = [
    {
      value: gpt4o,
      id: "gpt4o",
      name: "GPT-4o",
      onValueChange: (v: number[]) => handleValueChange(v, "gpt4o"),
    },
    {
      value: gpt4Turbo,
      id: "gpt4Turbo",
      name: "GPT-4 Turbo",
      onValueChange: (v: number[]) => handleValueChange(v, "gpt4Turbo"),
    },
    {
      value: claude3Sonnet,
      id: "claude3Sonnet",
      name: "Claude 3 Sonnet",
      onValueChange: (v: number[]) => handleValueChange(v, "claude3Sonnet"),
    },
    {
      value: claude3Opus,
      id: "claude3Opus",
      name: "Claude 3 Opus",
      onValueChange: (v: number[]) => handleValueChange(v, "claude3Opus"),
    },
  ];

  return { sliders: sliders, saveToLocalStorage, getLocalStorage };
}
