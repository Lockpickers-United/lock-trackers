import React, {forwardRef} from 'react'
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
    {id, thumb, index, containerId, active, clone, insertPosition, layout, onRemove, style, disabled=false, ...props},
    ref
) {

    const borderStyle = index === 0 && containerId === 'A'
        ? {border: '2px solid #fff', textAlign: 'center', fontWeight: 'bold', fontSize: '1.0em', padding: 4}
        : {}

    return (
        <li
            className={classNames(
                styles.Wrapper,
                active && styles.active,
                clone && styles.clone,
                insertPosition === Position.Before && styles.insertBefore,
                insertPosition === Position.After && styles.insertAfter,
                layout === Layout.Vertical && styles.vertical
            )}
            style={{...style, ...borderStyle}}
            ref={ref}
        >
            {index === 0 && containerId === 'A' &&
                <span>Main Image</span>
            }
            <button
                className={styles.Page}
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
                >
                    {removeIcon}
                </button>
            )}
        </li>
    )
})
