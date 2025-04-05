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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/client/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { trpc } from "../lib/trpc";

const formSchema = z.object({
  provider: z.enum(["openai", "anthropic", "google"]).default("openai"),
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
      provider: "openai",
      openaiApiKey: undefined,
      anthropicApiKey: undefined,
      googleApiKey: undefined,
    },
  });

  useEffect(() => {
    if (settings) {
      form.reset({
        provider: "openai",
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
      mutation.mutate({
        apiKeys,
        provider: values.provider,
      });
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
            name="provider"
            render={({ field }) => (
              <FormItem>
                <FormLabel>API Provider</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an API provider" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="openai">OpenAI (o3-mini)</SelectItem>
                    <SelectItem value="anthropic">
                      Anthropic (Claude 3.7 Sonnet)
                    </SelectItem>
                    <SelectItem value="google">
                      Google (Gemini 2.5 Pro)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("provider") === "openai" && (
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
          )}

          {form.watch("provider") === "anthropic" && (
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
          )}

          {form.watch("provider") === "google" && (
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
          )}

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
