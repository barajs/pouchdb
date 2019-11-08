import { withPouch } from './withPouch'

export const bulkDocs = withPouch(
  () => async (docs: any[], pouchdb: PouchDB.Database) => {
    try {
      const result = await pouchdb.bulkDocs(docs)
      return result
    } catch (err) {
      throw new Error(
        `[PouchDB] Could not bulkDocs ${docs.length} docs: ${err.message}`,
      )
    }
  },
)
