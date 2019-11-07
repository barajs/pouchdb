import { run, app, act } from '@barajs/core'
import { pipe } from '@barajs/formula'
import Source, { whenPouchReady, put } from './src'

run(
  app({
    portion: [Source()],
    trigger: [
      whenPouchReady(
        act(
          pipe(
            () => ({ doc: { _id: '1', hello: 'world' } }),
            put(),
            (result: any) => console.log(`Success:`, result),
          ),
        ),
      ),
    ],
  }),
)
