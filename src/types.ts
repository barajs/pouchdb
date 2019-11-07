import PouchDB from 'pouchdb'

export interface PouchDBMold {
  remote?: string
  name?: string
  syncRemote?: string
}

export interface PouchDBContext {
  pouchdb: PouchDB.Database
}
