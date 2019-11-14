import { withPouch } from './withPouch'

const getDocRev = async (doc: any, pouchdb: PouchDB.Database) => {
  try {
    const docRev = await pouchdb.get(doc._id)
    doc._rev = docRev._rev
    return doc
  } catch (err) {
    return doc
  }
}

/**
 * Upsert bulk multiple docs in a single query.
 */
export const upsertDocs = withPouch(
  () => async (docs: any[], pouchdb: PouchDB.Database) => {
    try {
      let docsWithRev = []
      for (const doc of docs) {
        const docRev = await getDocRev(doc, pouchdb)
        docsWithRev.push(docRev)
      }
      const result = await pouchdb.bulkDocs(docsWithRev)
      return result
    } catch (err) {
      throw new Error(
        `[PouchDB] Could not bulkDocs ${docs.length} docs: ${err.message}`,
      )
    }
  },
)
