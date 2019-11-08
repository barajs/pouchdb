import { getContext } from '@barajs/core'
import { Formula } from '@barajs/formula'

import { BARA_POUCHDB, PouchDBFormula } from '../types'

export const withPouch = (formula: Formula | PouchDBFormula) => (
  options?: any,
) => (payload: any, contextes: any) => {
  const data: any = getContext(BARA_POUCHDB, contextes)
  const pouchdb: PouchDB.Database = data.pouchdb
  return formula(options)(payload, pouchdb, contextes)
}
