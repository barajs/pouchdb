import { withPouch } from './withPouch'

export const post = withPouch(
  () => async (doc: any, pouchdb: PouchDB.Database) => {
    try {
      const result = await pouchdb.post(doc)
      return result
    } catch (err) {
      throw new Error(
        `[PouchDB] Could not put docId "${doc._id ||
          JSON.stringify(doc, null, 2)}": ${err.message}`,
      )
    }
  },
)
