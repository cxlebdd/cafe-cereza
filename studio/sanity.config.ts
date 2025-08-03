import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import { schemaTypes } from './schemas/schema'

export default defineConfig({
  name: 'default',
  title: 'CafeCerezaWeb',

  projectId: 'ci1bgwil',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
