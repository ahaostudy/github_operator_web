import { get } from '../axios/index.js'

export function getStateData(state) {
  return get(`/state/${state}`)
}