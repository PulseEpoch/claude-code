import { isBatchModeActive } from '../commands/batch/batchMode.js'

/**
 * Batch mode section — activated via /batch command.
 *
 * Instructs the model to batch work aggressively:
 * - Parallel tool calls in a single response
 * - More output per turn
 * - Fewer, denser API interactions
 * - Reduced overhead behaviors
 */
export function getBatchModeSection(): string | null {
  if (!isBatchModeActive()) return null

  return `# Batch Mode — 省预算模式

You are running in **batch mode** to minimize API calls and save budget. Follow these rules:

## Multi-tool batching (关键)
- Whenever possible, issue **multiple independent tool calls in a single response**. Do not sequence reads/writes/searches that could be parallel.
- If you need to read 3 files, call Read tool 3 times in parallel — not one at a time.
- If you need to search and read, do the Grep/Glob and Read calls together.
- If the task has multiple edits, batch them into one Edit call per file (or one per change) in the same response.

## Output density
- Write longer, more complete responses per turn. Do not split work across multiple turns.
- Prefer writing complete implementations rather than incremental stubs.
- Skip "let me check" / "let me start by" / "first, let me" preamble — just do the work.
- If the user asks a question, answer thoroughly in one shot — avoid follow-up clarifications unless truly ambiguous.

## Reduce overhead calls
- Do not call Agent/Explore sub-agents for tasks you can do directly with Grep/Glob/Read/Edit.
- Skip verification agent calls — batch mode assumes you verify by re-reading your own edits.
- Combine search + edit + verify into one turn.
- If the user gives a task with multiple parts, do them all in one response — do not ask "shall I continue" or break it into separate turns.

## Autonomy
- When the user's instruction is clear enough, proceed without asking for confirmation.
- Default to "do it" rather than "shall I?" — the user is in batch mode to save turns.`
}
