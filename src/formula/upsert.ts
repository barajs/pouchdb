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
  (options?: PouchDB.Core.GetOptions) => async (
    doc: any,
    pouchdb: PouchDB.Database,
    contextes: any,
  ) => {
    let realOptions: PouchDB.Core.GetOptions =
      typeof options === 'function'
        ? (options as Function)(doc._id, contextes)
        : options
    realOptions = { ...defaultGetOptions, ...realOptions }
    try {
      let result: any = await pouchdb.get(doc._id, realOptions)
      if (result._id) {
        result = await pouchdb.put({
          ...doc,
          _id: result._id,
          _rev: result._rev,
        })
      } else {
        result = await pouchdb.put(doc)
      }
      return result
    } catch (err) {
      throw new Error(
        `[PouchDB] Can not upsert docId "${doc._id}": ${err.message}`,
      )
    }
  },
)
