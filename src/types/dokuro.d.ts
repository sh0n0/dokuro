declare global {
  type TerminalErrorEvent = TerminalError | TerminalErrorLoading;

  type TerminalErrorLoading = {
    type: "loading";
    id: number;
  };

  type TerminalError = {
    type: "terminal_error";
    id: number;
    value: string;
    timestamp: string;
  };
}

export {};
