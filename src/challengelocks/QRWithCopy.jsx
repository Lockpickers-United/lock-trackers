import React, {useRef, useState} from 'react'
import {
    Card,
    CardContent,
    CardActions,
    Stack,
    Typography,
    Button,
    Tooltip,
    Snackbar,
    Alert,
    Box
} from '@mui/material'
import QRCode from 'react-qr-code'
import {enqueueSnackbar} from 'notistack'

export function QRWithCopy({
                               value,
                               size = 200,
                               copyLabel = 'Copy',
                               filename = 'qr-code.png',
                               svgFilename,                 // defaults to filename with .svg
                               pngScale = 4,                // higher = sharper PNG
                               pngPadding = 16,             // pixels of quiet zone around QR in PNG
                               fg = '#111',
                               bg = '#ffffff',
                               title,
                               subtitle,
                               actionsPlacement = 'end',    // 'start' | 'center' | 'end'
                               cardProps = {}
                           }) {
    const [copied, setCopied] = useState(false)
    const svgWrapRef = useRef(null)
    const timerRef = useRef(null)
    const svgName = svgFilename || filename.replace(/\.[^.]+$/, '') + '.svg'

    const handleCopy = async () => { //eslint-disable-line no-unused-vars
        try {
            await navigator.clipboard.writeText(value)
            setCopied(true)
            clearTimeout(timerRef.current)
            timerRef.current = setTimeout(() => setCopied(false), 1500)
        } catch {
            // Fallback for older browsers
            const ta = document.createElement('textarea')
            ta.value = value
            ta.setAttribute('readonly', '')
            ta.style.position = 'absolute'
            ta.style.left = '-9999px'
            document.body.appendChild(ta)
            ta.select()
            try {
                document.execCommand('copy')
                setCopied(true)
                clearTimeout(timerRef.current)
                timerRef.current = setTimeout(() => setCopied(false), 1500)
            } finally {
                document.body.removeChild(ta)
            }
        }
    }

    const handleCopyImage = async () => {
        const svg = svgWrapRef.current?.querySelector('svg')
        if (!svg) return

        // Clone the SVG and serialize
        const cloned = svg.cloneNode(true)
        cloned.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
        const svgString = new XMLSerializer().serializeToString(cloned)
        const svgBlob = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'})
        const url = URL.createObjectURL(svgBlob)

        const img = new Image()
        img.onload = async () => {
            const pad = pngPadding
            const canvas = document.createElement('canvas')
            const w = size + pad * 2
            const h = size + pad * 2
            canvas.width = w * pngScale
            canvas.height = h * pngScale

            const ctx = canvas.getContext('2d')
            ctx.imageSmoothingEnabled = false
            ctx.fillStyle = bg
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(
                img,
                0, 0, size, size,
                pad * pngScale, pad * pngScale, size * pngScale, size * pngScale
            )

            canvas.toBlob(async blob => {
                try {
                    await navigator.clipboard.write([
                        new ClipboardItem({'image/png': blob})
                    ])
                    enqueueSnackbar('QR image copied to clipboard')

                } catch (err) {
                    console.error('Copy failed', err)
                    enqueueSnackbar('Copy failed. Browser may not support image clipboard.', {variant: 'error', autoHideDuration: 3000})
                }
            }, 'image/png')
            URL.revokeObjectURL(url)
        }
        img.src = url
    }

    const handleDownloadPng = () => {
        const svg = svgWrapRef.current?.querySelector('svg')
        if (!svg) return

        const cloned = svg.cloneNode(true)
        cloned.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
        const svgString = new XMLSerializer().serializeToString(cloned)
        const svgBlob = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'})
        const url = URL.createObjectURL(svgBlob)

        const img = new Image()
        img.decoding = 'async'
        img.onload = () => {
            const pad = pngPadding
            const canvas = document.createElement('canvas')
            const w = size + pad * 2
            const h = size + pad * 2
            canvas.width = w * pngScale
            canvas.height = h * pngScale

            const ctx = canvas.getContext('2d')
            ctx.imageSmoothingEnabled = false
            ctx.fillStyle = bg
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(
                img,
                0, 0, size, size,
                pad * pngScale, pad * pngScale, size * pngScale, size * pngScale
            )

            canvas.toBlob(blob => {
                const a = document.createElement('a')
                a.download = filename
                a.href = URL.createObjectURL(blob)
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
                URL.revokeObjectURL(a.href)
                URL.revokeObjectURL(url)
            }, 'image/png')
        }
        img.onerror = () => URL.revokeObjectURL(url)
        img.src = url
    }

    const handleDownloadSvg = () => { //eslint-disable-line no-unused-vars
        const svg = svgWrapRef.current?.querySelector('svg')
        if (!svg) return
        const cloned = svg.cloneNode(true)
        cloned.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
        cloned.setAttribute('width', String(size))
        cloned.setAttribute('height', String(size))
        const svgString = new XMLSerializer().serializeToString(cloned)
        const blob = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'})
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.download = svgName
        a.href = url
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    return (
        <>
            <Card sx={{maxWidth: 480, mx: 'auto', backgroundColor: '#fff'}} elevation={0} {...cardProps}>
                <CardContent>
                    <Stack spacing={2} alignItems='center'>
                        {title && (
                            <Typography variant='h6' align='center'>
                                {title}
                            </Typography>
                        )}

                        {subtitle && (
                            <Typography variant='body2' color='text.secondary' align='center'>
                                {subtitle}
                            </Typography>
                        )}

                        <Box ref={svgWrapRef} sx={{p: 1, bgcolor: bg, borderRadius: 1}}>
                            <QRCode value={value} size={size} bgColor={bg} fgColor={fg}/>
                        </Box>

                    </Stack>
                </CardContent>

                <CardActions sx={{justifyContent: actionsPlacement}}>
                    <Tooltip title='Download PNG'>
                        <Button variant='outlined' onClick={handleDownloadPng} color='secondary' size='small'>
                            Download
                        </Button>
                    </Tooltip>
                    <Tooltip title='Copy to clipboard'>
                        <Button variant='outlined' onClick={handleCopyImage} color='secondary' size='small'>
                            {copyLabel}
                        </Button>
                    </Tooltip>
                </CardActions>

            </Card>

            <Snackbar
                open={copied}
                autoHideDuration={1400}
                onClose={() => setCopied(false)}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            >
                <Alert severity='success' variant='filled' onClose={() => setCopied(false)}>
                    Copied to clipboard
                </Alert>
            </Snackbar>
        </>
    )
}
