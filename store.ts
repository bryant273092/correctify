import { userInfo } from 'os'
import { useMemo } from 'react'
import { createStore, applyMiddleware, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

let store: Store | any

type Store = {
  state: State | undefined
}

export type State = {
  // lastUpdate: number,
  // light: boolean,
  // count: number,
  userInfo: any
  tweets: Array<any>
}

const initialState= {
  // lastUpdate: 0,
  // light: false,
  // count: 0,
  userInfo: {user: null},
  tweets: [null]
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'updateUser':
      return {
        ...state,
        userInfo: action.userInfo
      }
    // case 'INCREMENT':
    //   return {
    //     ...state,
    //     count: state.count + 1,
    //   }
    // case 'DECREMENT':
    //   return {
    //     ...state,
    //     count: state.count - 1,
    //   }
    // case 'RESET':
    //   return {
    //     ...state,
    //     count: initialState.count,
    //   }
    default:
      return state
  }
}

function initStore(preloadedState = initialState) {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  )
}

export const initializeStore = (preloadedState: State) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState: State) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}