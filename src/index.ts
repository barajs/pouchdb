import { portion, flow, popEvent, popSeep } from '@barajs/core'

import { PouchDB } from './platforms'

import { PouchDBMold, PouchDBContext } from './types'
import * as flows from './flow'

const PouchDBServer = portion<any, PouchDBContext, PouchDBMold>({
  name: 'bara-github',
  mold: {
    port: 5984,
    name: 'bara-pouchdb',
  },
  init: mold => {
    const { name, remote } = mold
    const pouchdb = new PouchDB(name || remote)
    return { pouchdb }
  },
  whenInitialized: flow<any, PouchDBContext, PouchDBMold>({
    bootstrap: async ({ context, next }) => {
      const { pouchdb } = context
      const info = await pouchdb.info()
      next(info)
      return info
    },
  }),
  ...flows,
})

const {
  whenInitialized: whenPouchReady,
  whenDatabaseCreated,
  whenDatabaseDestroyed,
} = popEvent(PouchDBServer)

// const { installationSenderLoginIs, installationReposIncludes } = popSeep()

export {
  PouchDBServer,
  whenPouchReady,
  whenDatabaseCreated,
  whenDatabaseDestroyed,
}
export * from './types'
// export * from './formula'
export default PouchDBServer
