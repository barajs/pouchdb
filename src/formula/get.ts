import { withPouch } from './withPouch'

const defaultGetOptions: PouchDB.Core.GetOptions = {
  attachments: false,
  revs: false,
  revs_info: false,
  conflicts: false,
  latest: false,
}

/**
 * Fetch document on PouchDB
 * @param options Fetch options
 */
export const get = withPouch(
  (options?: PouchDB.Core.GetOptions) => async (
    docId: any,
    pouchdb: PouchDB.Database,
    contextes: any,
  ) => {
    let realOptions: PouchDB.Core.GetOptions =
      typeof options === 'function'
        ? (options as Function)(docId, contextes)
        : options
    realOptions = { ...defaultGetOptions, ...realOptions }
    try {
      const result = await pouchdb.get(docId, realOptions)
      return result
    } catch (err) {
      throw new Error(`[PouchDB] Can not get docId "${docId}": ${err.message}`)
    }
  },
)
