import { configureStore } from '@reduxjs/toolkit'
import notes from './notes/notes'
import nostr from './nostr/nostr'
import interactiveLog from './interactiveLog/interactiveLog'

export const store = configureStore({
  reducer: {
    notes,
    nostr,
    interactiveLog
  },
})

export type State = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
