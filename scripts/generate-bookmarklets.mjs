import { writeFile } from 'node:fs/promises'
import { createBookmarklets } from './bookmarklets.mjs'

const bookmarklets = createBookmarklets(process.env.GITHUB_SHA?.slice(0, 7) || 'main')
await writeFile('docs/bookmarklets.json', JSON.stringify(bookmarklets, null, 2) + '\n', 'utf-8')
