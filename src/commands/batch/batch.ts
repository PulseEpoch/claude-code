import type { LocalCommandCall } from '../../types/command.js'
import { isBatchModeActive, setBatchMode } from './batchMode.js'

export const call: LocalCommandCall = async (_, context) => {
  const currentlyActive = isBatchModeActive()
  const newState = !currentlyActive
  setBatchMode(newState)

  // Flush system prompt sections so the batch mode instruction takes effect
  // immediately on the next API call.
  const { clearSystemPromptSections } = await import(
    '../../constants/systemPromptSections.js'
  )
  clearSystemPromptSections()

  const status = newState ? 'ON' : 'OFF'
  const details = newState
    ? 'multi-tool batching, denser output, skipped extract_memories/verification'
    : 'normal mode restored'
  return { type: 'text', value: `Batch mode ${status} — ${details}` }
}
