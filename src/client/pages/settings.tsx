import { Button } from "@/client/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/client/components/ui/form";
import { Input } from "@/client/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { trpc } from "../lib/trpc";

const formSchema = z.object({
  openaiApiKey: z.string().optional(),
  anthropicApiKey: z.string().optional(),
  googleApiKey: z.string().optional(),
});

export function Settings() {
  const navigate = useNavigate();
  const mutation = trpc.settings.upsertSettings.useMutation();
  const { data: settings } = trpc.settings.getSettings.useQuery();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      openaiApiKey: undefined,
      anthropicApiKey: undefined,
      googleApiKey: undefined,
    },
  });

  useEffect(() => {
    if (settings) {
      form.reset({
        openaiApiKey: settings.openai || undefined,
        anthropicApiKey: settings.anthropic || undefined,
        googleApiKey: settings.google || undefined,
      });
    }
  }, [settings, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const apiKeys = {
        openai: values.openaiApiKey || null,
        anthropic: values.anthropicApiKey || null,
        google: values.googleApiKey || null,
      };
      mutation.mutate({ apiKeys });
      form.reset(values);
    } catch (error) {
      console.error("Failed to save API keys", error);
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-bold">Settings</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate({ to: ".." })}
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="openaiApiKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>OpenAI API Key</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your OpenAI API key"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="anthropicApiKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Anthropic API Key</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your Anthropic API key"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="googleApiKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Google API Key</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your Google API key"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={!form.formState.isDirty}>
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
