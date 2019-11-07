import { getContext } from '@barajs/core'

export interface PutProps {
  doc: any
  docId: string
  docRev: string
  options: any
}

export const put = () => async (payload: PutProps, contextes: any) => {
  const data: any = getContext('bara-pouchdb', contextes)
  const pouchdb: PouchDB.Database = data.pouchdb
  console.log(contextes, pouchdb)
  const { doc } = payload

  try {
    const result = await pouchdb.put(doc)
    return result
  } catch (err) {
    console.error(err)
  }
}
