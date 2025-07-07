import React, {forwardRef, useEffect} from 'react'
import classNames from 'classnames'

import {removeIcon} from './RemoveIcon.jsx'
import styles from './Page.module.css'

export const Position = {
    Before: -1,
    After: 1
}

export const Layout = {
    Horizontal: 'horizontal',
    Vertical: 'vertical',
    Grid: 'grid'
}

export const Page = forwardRef(function Page(
    {
        id,
        color,
        thumb,
        index,
        containerId,
        active,
        clone,
        insertPosition,
        layout,
        handle,
        handleProps,
        dragOverlay,
        onRemove,
        style,
        disabled = false,
        renderItem,
        dragging,
        sorting,
        fadeIn,
        listeners,
        transition,
        transform,
        value,
        wrapperStyle,
        ...props
    },
    ref
) {

    const borderStyle = index === 0 && containerId === 'A'
        ? {border: '2px solid #fff', textAlign: 'center', fontWeight: 'bold', fontSize: '1.0em', padding: 4}
        : {}

    useEffect(() => {
        if (!dragOverlay) return
        document.body.style.cursor = 'grabbing'
        return () => {
            document.body.style.cursor = ''
        }
    }, [dragOverlay])

    if (renderItem) {
        return renderItem({
            dragOverlay: Boolean(dragOverlay),
            dragging: Boolean(dragging),
            sorting: Boolean(sorting),
            index,
            fadeIn: Boolean(fadeIn),
            listeners,
            ref,
            style,
            transform,
            transition,
            value
        })
    }

    return (
        <li
            className={classNames(
                styles.Wrapper,
                active && styles.active,
                clone && styles.clone,
                insertPosition === Position.Before && styles.insertBefore,
                insertPosition === Position.After && styles.insertAfter,
                layout === Layout.Vertical && styles.vertical,
                fadeIn && styles.fadeIn,
                sorting && styles.sorting,
                dragOverlay && styles.dragOverlay
            )}
            style={{
                ...style, ...borderStyle,
                ...wrapperStyle,
                transition: [transition, wrapperStyle?.transition]
                    .filter(Boolean)
                    .join(', '),
                '--translate-x': transform ? `${Math.round(transform.x)}px` : undefined,
                '--translate-y': transform ? `${Math.round(transform.y)}px` : undefined,
                '--scale-x': transform?.scaleX ? `${transform.scaleX}` : undefined,
                '--scale-y': transform?.scaleY ? `${transform.scaleY}` : undefined,
                '--index': index,
                '--color': color
            }}
            ref={ref}
        >
            {index === 0 && containerId === 'A' &&
                <span>Main Image</span>
            }
            {index !== 0 && containerId === 'A' &&
                <span>&nbsp;</span>
            }
            <button
                className={classNames(
                    styles.Page,
                    dragging && styles.dragging,
                    handle && styles.withHandle,
                    dragOverlay && styles.dragOverlay,
                    disabled && styles.disabled,
                    color && styles.color
                )}
                data-id={String(id)}
                style={{
                    backgroundImage: `url(${String(id)})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    cursor: disabled ? 'unset' : 'grab'
                }}
                disabled={disabled}
                {...props}
            />
            {!active && onRemove && !disabled && (
                <button
                    className={styles.Remove}
                    onClick={onRemove}
                    disabled={disabled}
                    style={{top: (index === 0 && containerId === 'A') ? 30 : 0}}
                >
                    {removeIcon}
                </button>
            )}
        </li>
    )
})
