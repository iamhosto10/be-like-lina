import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  },
  // Dirección del Studio desplegado: https://be-like-lina.sanity.studio
  studioHost: 'be-like-lina',
  autoUpdates: true,
})
