import { createGlobalState } from 'react-hooks-global-state'

const defaultState = {
  snack: { msg: '', variant: '' },
  dash: { tabVal: 0 }
}

export const {
  GlobalStateProvider,
  setGlobalState,
  useGlobalState
} = createGlobalState(defaultState)

/**
 * Show a snackbar containing a message.
 * @param {string} msg - the message to display.
 * @param {string} [variant] - the variant of the message (default: 'info').
 */
export function showSnack (msg, variant = 'info') {
  setGlobalState('snack', { msg, variant })
}

/**
 * Set the current tab value in the dashboard.
 * @param {number} tabVal - the tab value.
 */
export function setTabVal (tabVal) {
  setGlobalState('dash', v => ({ ...v, tabVal }))
}
