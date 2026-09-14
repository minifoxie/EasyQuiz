import { writeFile } from 'node:fs/promises'
import { createBookmarklets } from './bookmarklets.mjs'

const bookmarklets = createBookmarklets('latest')
await writeFile('docs/bookmarklets.json', JSON.stringify(bookmarklets, null, 2) + '\n', 'utf-8')
