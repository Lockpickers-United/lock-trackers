import React, {useEffect, useRef, useState} from 'react'
import {dropTargetForExternal} from '@atlaskit/pragmatic-drag-and-drop/external/adapter'
import {containsFiles, getFiles} from '@atlaskit/pragmatic-drag-and-drop/external/file'

export default function FileDropPage() {
    const dropRef = useRef(null)
    const [files, setFiles] = useState([])

    useEffect(() => {
        const el = dropRef.current
        if (!el) return

        // allow dropping by preventing the default browser behavior
        const onDragOver = e => e.preventDefault()
        el.addEventListener('dragover', onDragOver)

        // register the Pragmatic DnD drop target
        const cleanup = dropTargetForExternal({
            element: el,
            canDrop: containsFiles,
            onDrop: ({source}) => {
                const droppedFiles = getFiles({source})
                console.log('droppedFiles', droppedFiles)
                setFiles([...files, ...droppedFiles])
            }
        })
        return () => {
            cleanup()
            el.removeEventListener('dragover', onDragOver)
        }
    }, [files])

    console.log('files', files)

    return (
        <div style={{padding: 20}}>
            <h1>Pragmatic DnD File Drop</h1>
            <div
                ref={dropRef}
                style={{
                    width: '100%',
                    height: 200,
                    border: '2px dashed #ccc',
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    color: '#666'
                }}
            >
                {files.length
                    ? files.map(f => f.name).join(', ')
                    : 'Drag files here'}
            </div>
        </div>
    )
}
