import type { Command } from '../../commands.js'

const batch = {
  type: 'local',
  name: 'batch',
  description:
    'Toggle batch mode — multi-tool batching, denser output, fewer API calls',
  supportsNonInteractive: false,
  load: () => import('./batch.js'),
} satisfies Command

export default batch
