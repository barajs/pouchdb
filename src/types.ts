export const BARA_POUCHDB: string = 'bara-pouchdb'

export interface PouchDBMold {
  remote?: string
  name?: string
  plugins?: any[]
  syncRemote?: string
  options?: any
}

export interface PouchDBContext {
  pouchdb: PouchDB.Database
}

export type PouchDBFormula = (
  options?: any,
) => (payload: any, pouchdb: PouchDB.Database, contextes: any) => Promise<any>
