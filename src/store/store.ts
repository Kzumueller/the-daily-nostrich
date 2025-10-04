import { configureStore } from '@reduxjs/toolkit'
import notes from './notes/notes'
import nostr from './nostr/nostr'

export const store = configureStore({
  reducer: {
    notes,
    nostr
  },
})

export type State = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
