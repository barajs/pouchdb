import { withPouch } from './withPouch'

export const put = withPouch(
  () => async (doc: any, pouchdb: PouchDB.Database) => {
    try {
      const result = await pouchdb.put(doc)
      return result
    } catch (err) {
      throw new Error(
        `[PouchDB] Could not put docId "${doc._id ||
          JSON.stringify(doc, null, 2)}": ${err.message}`,
      )
    }
  },
)
