// ABOUTME: Adds concise IDE file and selection metadata as a model-visible custom message.
// ABOUTME: Leaves the user's prompt unchanged so the agent can inspect source files directly.
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent" with {
  "resolution-mode": "import",
};
import { formatEditorContextMessage } from "../shared/format.js";
import { DIAGNOSTIC_CONTEXT_MARKER } from "./diagnostics.js";
import type { EditorSelectionSnapshot } from "../shared/protocol.js";
import { runPiBoundary } from "./safety.js";
import type { PiIdeRuntime } from "./state.js";
import { updateIdeUi } from "./ui.js";

export { clearLatestSelection, setLatestSelection } from "./selection.js";

export function registerContextHandlers(pi: ExtensionAPI, runtime: PiIdeRuntime): void {
  pi.on("before_agent_start", (event, ctx) =>
    runPiBoundary(
      "Pi before_agent_start",
      runtime,
      () => {
        runtime.ctx = ctx;
        if (!runtime.enabled || !runtime.latestSelection || runtime.attachState !== "pending") return;
        const snapshot = runtime.latestSelection;
        runtime.attachState = "sent";
        updateIdeUi(runtime, ctx);
        if (promptContainsContextMarker(event.prompt, snapshot)) return;

        return {
          message: {
            customType: IDE_CONTEXT_MESSAGE_TYPE,
            content: formatEditorContextMessage(snapshot),
            display: true,
          },
        };
      },
      ctx,
    ),
  );
}

export const IDE_CONTEXT_MESSAGE_TYPE = "pi-x-ide/context";

function promptContainsContextMarker(prompt: string, snapshot: EditorSelectionSnapshot): boolean {
  return (
    prompt.includes(DIAGNOSTIC_CONTEXT_MARKER) ||
    (prompt.includes("<system-reminder><selected-context>") &&
      (prompt.includes(snapshot.filePath) || (!!snapshot.workspaceFolder && prompt.includes(snapshot.workspaceFolder))))
  );
}
