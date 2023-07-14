/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const useUrlSyncedState = <T extends Record<string, any>>(initial: T): [T, <K extends keyof T>(key: K, newVal: string) => void] => {
  const [state, _setState] = useState<T>(initial)
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    // Collect given params from url which have the key of the state-object that have a value
    const urlParams = Object.keys(initial)
      .map(key => ({ key, val: searchParams.get(key) }))
      .filter(p => p.val !== null)

    // If there are params, the state gets updated with their values
    if (urlParams.length > 0) {
      let updatedState = initial

      urlParams.forEach(p => {
        updatedState = { ...updatedState, [p.key as keyof T]: p.val }
      })

      _setState(updatedState)
    }

    // All property-keys from the initial state-object that do not have values in the url params
    const keys = Object.keys(initial).filter(k => !urlParams.map(p => p.key).includes(k))

    // Constructing the search params from these keys
    const initialParams = keys.map(key => ({ key, val: String(initial[key]) }))

    // Append the search params from the initial state-object
    initialParams.forEach(p => appendSearchParam(p.key, p.val))
  }, [])

  // setState function
  const setState = <K extends keyof T>(key: K, newVal: string) => {
    appendSearchParam(key as string, newVal)

    _setState(prev => ({
      ...prev,
      [key]: newVal
    }))
  }

  // Helper functions

  // Appends a key value pair to the url search params; If the value is null or an empty string, the property gets removed
  const appendSearchParam = (key: string, val: string) => {
    setSearchParams(prev => {
      if (val === undefined || val === '') {
        prev.delete(key)
      } else {
        prev.set(key, val)
      }
      return prev
    })
  }

  return [state, setState]
}

export default useUrlSyncedState
