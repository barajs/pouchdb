import { run, app, act } from '@barajs/core'
import { pipe, log } from '@barajs/formula'
import Source, { whenPouchReady, put, get } from './src'

run(
  app({
    portion: [Source()],
    trigger: [
      whenPouchReady(
        // act(
        //   pipe(
        //     () => ({ _id: '1', hello: 'world' }),
        //     put(),
        //     (result: any) => console.log(`Success:`, result),
        //   ),
        // ),
        act(
          pipe(
            () => '1',
            get(),
            log(),
          ),
        ),
      ),
    ],
  }),
)
