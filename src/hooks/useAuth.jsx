import { useReducer } from 'react'

const reducer = (currentState, newState) => {
  return { ...currentState, ...newState }
}

const initialState = {
  auth: true,
  loading: false,
  user: null,
  error: null
}

const useAuth = () => {
  const [state, setState] = useReducer(reducer, initialState)

  const handle = () => {}

  return {
    state,
    handle
  }
}

export default useAuth
