import { withPouch } from './withPouch'

const defaultGetOptions: PouchDB.Core.GetOptions = {
  attachments: false,
  revs: false,
  revs_info: false,
  conflicts: false,
  latest: false,
}

/**
 * Update or insert new document.
 * @param options Fetch options
 */
export const upsert = withPouch(
  () => async (doc: any, pouchdb: PouchDB.Database) => {
    let result: any = null
    try {
      const _existedDoc = await pouchdb.get(doc._id)
      doc._rev = _existedDoc._rev
      result = await pouchdb.put(doc)
    } catch (err) {
      try {
        result = await pouchdb.put(doc)
      } catch (err) {
        throw new Error(
          `[PouchDB] Can not upsert docId "${doc._id}": ${err.message}`,
        )
      }
    }
    return result
  },
)
