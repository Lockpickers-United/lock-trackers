import React, {useEffect, useState} from 'react'
import {
    closestCenter,
    DndContext,
    DragOverlay,
    useSensor,
    useSensors,
    PointerSensor,
    KeyboardSensor,
    useDndContext,
    MeasuringStrategy,
    defaultDropAnimationSideEffects
} from '@dnd-kit/core'
import {
    arrayMove,
    useSortable,
    SortableContext,
    sortableKeyboardCoordinates
} from '@dnd-kit/sortable'
import {CSS, isKeyboardEvent} from '@dnd-kit/utilities'
import classNames from 'classnames'

import {Page, Position} from './Page.jsx'
import pageStyles from './Page.module.css'
import styles from './Pages.module.css'

const measuring = {
    droppable: {
        strategy: MeasuringStrategy.Always
    }
}

const dropAnimation = {
    keyframes({transform}) {
        return [
            {transform: CSS.Transform.toString(transform.initial)},
            {
                transform: CSS.Transform.toString({
                    scaleX: 0.98,
                    scaleY: 0.98,
                    x: transform.final.x - 10,
                    y: transform.final.y - 10
                })
            }
        ]
    },
    sideEffects: defaultDropAnimationSideEffects({
        className: {
            active: pageStyles.active
        }
    })
}

export function Pages({layout, media}) {
    const [activeId, setActiveId] = useState(null)

    const [items, setItems] = useState([])

    useEffect(() => {
        setItems(media?.map(m => m.thumbnailUrl))
    }, [media])


    const activeIndex = activeId !== null ? items.indexOf(activeId) : -1
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {coordinateGetter: sortableKeyboardCoordinates})
    )

    const handleDragStart = ({active}) => {
        setActiveId(active.id)
    }

    const handleDragCancel = () => {
        setActiveId(null)
    }

    const handleDragEnd = ({over}) => {
        if (over) {
            const overIndex = items.indexOf(over.id)
            if (activeIndex !== overIndex) {
                setItems(current => arrayMove(current, activeIndex, overIndex))
            }
        }
        setActiveId(null)
    }

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
            sensors={sensors}
            collisionDetection={closestCenter}
            measuring={measuring}
        >
            <SortableContext items={items ? items : []}>
                <ul className={classNames(styles.Pages, styles[layout])}>
                    {items?.map((id, idx) => (
                        <SortablePage
                            key={id}
                            id={id}
                            thumb={id}
                            index={idx + 1}
                            layout={layout}
                            activeIndex={activeIndex}
                            onRemove={() =>
                                setItems(current => current.filter(item => item !== id))
                            }
                        />
                    ))}
                </ul>
            </SortableContext>
            <DragOverlay dropAnimation={dropAnimation}>
                {activeId !== null && (
                    <PageOverlay id={activeId} layout={layout} items={items}/>
                )}
            </DragOverlay>
        </DndContext>
    )
}

function PageOverlay({id, items, layout}) {
    const {activatorEvent, over} = useDndContext()
    const isKeyboardSorting = isKeyboardEvent(activatorEvent)
    const activeIndex = items.indexOf(id)
    const overIndex = over?.id ? items.indexOf(over.id) : -1

    return (
        <Page
            id={id}
            layout={layout}
            clone
            insertPosition={
                isKeyboardSorting && overIndex !== activeIndex
                    ? overIndex > activeIndex
                        ? Position.After
                        : Position.Before
                    : undefined
            }
        />
    )
}

function SortablePage({id, thumb, activeIndex, index, layout, onRemove, disabled=false}) {
    const {
        attributes,
        listeners,
        index: sortableIndex,
        isDragging,
        isSorting,
        over,
        setNodeRef,
        transform,
        transition
    } = useSortable({
        id,
        disabled,
        animateLayoutChanges: () => true
    })

    return (
        <div>
            {index === 1
                ? <div>Main Image</div>
                : <div>&nbsp;</div>
            }
            <Page
                ref={setNodeRef}
                id={id}
                thumb={thumb}
                index={index}
                layout={layout}
                active={isDragging}
                onRemove={onRemove}
                style={{
                    transition,
                    transform: isSorting ? undefined : CSS.Translate.toString(transform)
                }}
                insertPosition={
                    over?.id === id
                        ? sortableIndex > activeIndex
                            ? Position.After
                            : Position.Before
                        : undefined
                }
                {...attributes}
                {...listeners}
            />
        </div>
    )
}
