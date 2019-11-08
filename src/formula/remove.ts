import { withPouch } from './withPouch'

export const remove = withPouch(
  () => async (doc: any, pouchdb: PouchDB.Database) => {
    try {
      const result = await pouchdb.remove(doc)
      return result
    } catch (err) {
      throw new Error(
        `[PouchDB] Could not remove docId "${doc._id ||
          JSON.stringify(doc, null, 2)}": ${err.message}`,
      )
    }
  },
)
