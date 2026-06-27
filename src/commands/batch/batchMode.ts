/**
 * Batch mode state — when active, alters system prompt to encourage multi-tool
 * batching and denser output per turn, and skips extract_memories/verification
 * to reduce API calls and save budget.
 *
 * Session-only: resets to inactive on every start.
 */

let batchModeActive = false

export function isBatchModeActive(): boolean {
  return batchModeActive
}

export function setBatchMode(active: boolean): void {
  batchModeActive = active
}
