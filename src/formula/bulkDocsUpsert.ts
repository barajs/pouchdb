import { withPouch } from './withPouch'

const prepareDoc = async (doc: any, pouchdb: PouchDB.Database) => {
  const docRev = await pouchdb.get(doc._id)
  if (!docRev._rev) {
    return doc
  }
  return { ...doc, _rev: docRev._rev }
}

/**
 * Upsert bulk multiple docs in a single query.
 */
export const bulkDocsUpsert = withPouch(
  () => async (docs: any[], pouchdb: PouchDB.Database) => {
    try {
      let docsWithRev = []
      for (const doc of docs) {
        const docRev = await prepareDoc(doc, pouchdb)
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
