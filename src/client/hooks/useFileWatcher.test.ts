import { trpc } from "@/client/lib/trpc";
import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useFileWatcher } from "./useFileWatcher";

vi.mock("@/client/lib/trpc", () => {
  const mockUseSubscription = vi.fn();
  return {
    trpc: {
      fileWatcher: {
        watchFile: {
          useSubscription: mockUseSubscription,
        },
      },
    },
  };
});

describe("useFileWatcher", () => {
  let mockOnData: (data: TerminalErrorEvent) => void;

  beforeEach(() => {
    vi.mocked(trpc.fileWatcher.watchFile.useSubscription).mockImplementation(
      (_, options) => {
        mockOnData = options?.onData as (data: TerminalErrorEvent) => void;
      },
    );
  });

  it("should handle loading events", () => {
    const { result } = renderHook(() => useFileWatcher());

    act(() => {
      mockOnData({ type: "loading", id: 123 });
    });

    expect(result.current.isLoading).toBe(true);
  });

  it("should handle terminal_error events", () => {
    const { result } = renderHook(() => useFileWatcher());

    act(() => {
      mockOnData({
        type: "terminal_error",
        id: 123,
        value: "Error message",
        timestamp: new Date().toISOString(),
      });
    });

    expect(result.current.terminalErrors).toEqual([
      {
        type: "terminal_error",
        id: 123,
        value: "Error message",
        timestamp: expect.any(String),
      },
    ]);
  });

  it("should remove loading state when terminal_error is received", () => {
    const { result } = renderHook(() => useFileWatcher());

    act(() => {
      mockOnData({ type: "loading", id: 123 });
      mockOnData({
        type: "terminal_error",
        id: 123,
        value: "Error message",
        timestamp: new Date().toISOString(),
      });
    });

    expect(result.current.isLoading).toBe(false);
  });

  it("should maintain loading state if there are multiple loading events", () => {
    const { result } = renderHook(() => useFileWatcher());

    act(() => {
      mockOnData({ type: "loading", id: 123 });
      mockOnData({ type: "loading", id: 456 });
      mockOnData({
        type: "terminal_error",
        id: 456,
        value: "Another error message",
        timestamp: new Date().toISOString(),
      });
    });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.terminalErrors).toEqual([
      {
        type: "terminal_error",
        id: 456,
        value: "Another error message",
        timestamp: expect.any(String),
      },
    ]);
  });
});
