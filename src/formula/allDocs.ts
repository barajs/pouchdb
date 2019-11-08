import { withPouch } from './withPouch'

export const allDocs = withPouch(
  (options?: PouchDB.Core.AllDocsOptions) => async (
    _: any,
    pouchdb: PouchDB.Database,
  ) => {
    try {
      const result = options
        ? await pouchdb.allDocs(options)
        : await pouchdb.allDocs()
      return result
    } catch (err) {
      throw new Error(`[PouchDB] Could not fetch allDocs: ${err.message}`)
    }
  },
)
