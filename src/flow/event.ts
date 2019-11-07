import { flow } from '@barajs/core'
import { PouchDBContext, PouchDBMold } from '../types'

export const whenDatabaseCreated = flow<any, PouchDBContext, PouchDBMold>({
  bootstrap: ({ context, next }) => {
    const { pouchdb } = context
    pouchdb.on('created', (dbName: string) => {
      next(dbName)
    })
  },
})

export const whenDatabaseDestroyed = flow<any, PouchDBContext, PouchDBMold>({
  bootstrap: ({ context, next }) => {
    const { pouchdb } = context
    pouchdb.on('destroyed', (dbName: string) => {
      next(dbName)
    })
  },
})
