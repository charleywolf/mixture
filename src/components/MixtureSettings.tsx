"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";
import { CogIcon } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Slider } from "./ui/slider";
import { useMixtureSettings } from "@/lib/hooks/settings";

export default function MixtureSettings() {
  const { sliders, saveToLocalStorage } = useMixtureSettings();

  return (
    <Dialog>
      <DialogTrigger className="ml-auto">
        <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shrink-0 h-10 w-10 border border-input bg-background hover:bg-accent hover:text-accent-foreground">
          <CogIcon className="h-5 w-5" />
          <span className="sr-only">Open mixture settings</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mixture Settings</DialogTitle>
          <DialogDescription id="mixture-description">
            Choose your mixture of agents.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-8 mb-5 py-5">
          {sliders.map(({ value, id, name, onValueChange }) => (
            <div key={id} className="flex flex-col gap-4">
              <Label htmlFor={id}>{name}</Label>
              <Slider value={value} id={id} onValueChange={onValueChange} />
            </div>
          ))}
        </div>
        <DialogFooter>
          <div className="flex flex-col items-center gap-3 justify-center w-full">
            <span className="text-sm text-muted-foreground italic">
              Saving will cause the page to reload.
            </span>
            <DialogTrigger asChild>
              <Button
                type="submit"
                className="w-full"
                onClick={saveToLocalStorage}
              >
                Save changes
              </Button>
            </DialogTrigger>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
