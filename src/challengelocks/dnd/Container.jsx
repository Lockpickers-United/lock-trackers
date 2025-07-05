import React, { forwardRef } from 'react'
import classNames from 'classnames'

import styles from './Container.module.css'

export const Container = forwardRef(function Container(
    {
        children,
        columns = 1,
        handleProps,
        horizontal,
        hover,
        onClick,
        onRemove,
        label,
        placeholder,
        style,
        scrollable,
        shadow,
        unstyled,
        disabled,
        ...props
    },
    ref
) {
    const Component = onClick ? 'button' : 'div'

    return (
        <Component
            {...props}
            ref={ref}
            style={{
                ...style,
                '--columns': columns
            }}
            className={classNames(
                styles.Container,
                unstyled && styles.unstyled,
                horizontal && styles.horizontal,
                hover && styles.hover,
                placeholder && styles.placeholder,
                scrollable && styles.scrollable,
                shadow && styles.shadow
            )}
            onClick={onClick}
            tabIndex={onClick ? 0 : undefined}
            disabled={disabled}
        >
            {label && (
                <div className={styles.Header}>
                    {label}
                </div>
            )}
            {placeholder ? children : <ul className={classNames(styles.Pages, styles['grid'])}>{children}</ul>}
        </Component>
    )
})
