import { portion, flow, popEvent, popSeep } from '@barajs/core'

import { PouchDB } from './platforms'

import { PouchDBMold, PouchDBContext, BARA_POUCHDB } from './types'
import * as flows from './flow'

const PouchDBServer = portion<any, PouchDBContext, PouchDBMold>({
  name: BARA_POUCHDB,
  mold: {
    port: 5984,
    name: BARA_POUCHDB,
  },
  init: mold => {
    const { name, remote, options, plugins } = mold
    let pouchdb = null
    try {
      if (plugins)
        for (const plugin of plugins) {
          PouchDB.plugin(plugin)
        }
      pouchdb = new PouchDB(remote || name, options)
      return { pouchdb }
    } catch (err) {
      console.error(err)
      throw new Error(`PouchDB could not initialized: ${err.message}`)
    }
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
export * from './formula'
export default PouchDBServer
