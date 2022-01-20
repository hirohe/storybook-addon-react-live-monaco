import React, { useCallback, useEffect, useState } from 'react'
import MonacoEditor from '@monaco-editor/react'
import { event } from '../constants'

function LiveEditor({ channel }) {
  const [code, setCode] = useState('')

  const loadSource = useCallback((val) => {
    setCode(val)
  }, [])

  const onChange = useCallback((val) => {
    channel.emit(event.UpdateSource, val)
  }, [])

  useEffect(() => {
    channel.on(event.LoadSource, loadSource)

    return () => {
      channel.removeListener(event.LoadSource, loadSource)
    }
  }, [])

  return (
    <MonacoEditor
      height="100%"
      language="javascript"
      theme="vs-dark"
      value={code}
      onChange={onChange}
    />
  )
}

export default LiveEditor