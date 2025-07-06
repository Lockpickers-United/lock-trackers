import React, {useCallback, useEffect, useRef, useState} from 'react'
import {unstable_batchedUpdates} from 'react-dom'
import {
    closestCenter,
    pointerWithin,
    rectIntersection,
    DndContext,
    DragOverlay,
    getFirstCollision,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useDroppable,
    useSensors,
    useSensor,
    MeasuringStrategy,
    defaultDropAnimationSideEffects, useDndContext
} from '@dnd-kit/core'
import {
    defaultAnimateLayoutChanges,
    SortableContext,
    useSortable,
    arrayMove,
    verticalListSortingStrategy,
    horizontalListSortingStrategy
} from '@dnd-kit/sortable'
import {CSS, isKeyboardEvent} from '@dnd-kit/utilities'
import {coordinateGetter as multipleContainersCoordinateGetter} from './multipleContainersKeyboardCoordinates'

import {Item} from './Item.jsx'
import {Container} from './Container.jsx'
import {Page, Position} from './Page.jsx'

const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
        styles: {active: {opacity: '1'}}
    })
}

const TRASH_ID = 'void'
const PLACEHOLDER_ID = 'placeholder'

export function MultipleContainers({
                                       containerList = {},
                                       lock,
                                       setContainerItems,
                                       cancelDrop,
                                       columns,
                                       handle = false,
                                       containerStyle,
                                       coordinateGetter = multipleContainersCoordinateGetter,
                                       getItemStyles = () => ({}),
                                       wrapperStyle = () => ({}),
                                       minimal = false,
                                       modifiers,
                                       renderItem,
                                       strategy = verticalListSortingStrategy,
                                       vertical = true,
                                       scrollable,
                                       disabled = false
                                   }) {

    const [items, setItems] = useState(
        {A: [], B: []}
    )
    useEffect(() => {
        if (lock?.media?.length > 0 || lock?.pendingMedia?.length > 0) {
            setItems({
                A: lock?.media?.map(m => m.thumbnailUrl) || [],
                B: lock?.pendingMedia?.map(m => m.thumbnailUrl) || []
            })
        }
    }, [lock])

    useEffect(() => {
        setContainerItems(items)
    }, [items, setContainerItems])

    console.log('items', items)

    const layout = vertical ? 'Vertical' : 'Horizontal'
    const [containers, setContainers] = useState(Object.keys(containerList))
    const [activeId, setActiveId] = useState(null)
    const lastOverId = useRef(null)
    const recentlyMovedToNewContainer = useRef(false)
    const isSortingContainer = activeId !== null && containers.includes(activeId.toString())

    // custom collision‐detection for multi‐container drag
    const collisionDetectionStrategy = useCallback(
        args => {
            if (activeId && activeId in items) {
                return closestCenter({
                    ...args,
                    droppableContainers: args.droppableContainers.filter(c => c.id in items)
                })
            }

            const pointerIntersections = pointerWithin(args)
            const intersections =
                pointerIntersections.length > 0 ? pointerIntersections : rectIntersection(args)
            let overId = getFirstCollision(intersections, 'id')

            if (overId !== null) {
                if (overId === TRASH_ID) {
                    return intersections
                }

                if (overId in items) {
                    const containerItems = items[overId]
                    if (containerItems.length > 0) {
                        overId = closestCenter({
                            ...args,
                            droppableContainers: args.droppableContainers.filter(
                                c => c.id !== overId && containerItems.includes(c.id)
                            )
                        })[0]?.id
                    }
                }

                lastOverId.current = overId
                return [{id: overId}]
            }

            if (recentlyMovedToNewContainer.current) {
                lastOverId.current = activeId
            }

            return lastOverId.current ? [{id: lastOverId.current}] : []
        },
        [activeId, items]
    )

    const [clonedItems, setClonedItems] = useState(null)
    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {coordinateGetter})
    )

    const findContainer = id =>
        id in items
            ? id
            : Object.keys(items).find(key => items[key].includes(id))

    const getIndex = id => {
        const container = findContainer(id)
        if (!container) return -1
        return items[container].indexOf(id)
    }

    const onDragCancel = () => {
        if (clonedItems) setItems(clonedItems)
        setActiveId(null)
        setClonedItems(null)
    }

    useEffect(() => {
        requestAnimationFrame(() => {
            recentlyMovedToNewContainer.current = false
        })
    }, [items])

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={collisionDetectionStrategy}
            measuring={{droppable: {strategy: MeasuringStrategy.Always}}}
            onDragStart={({active}) => {
                setActiveId(active.id)
                setClonedItems(items)
            }}
            onDragOver={({active, over}) => {
                const overId = over?.id
                if (!overId || overId === TRASH_ID || active.id in items) return

                const overContainer = findContainer(overId)
                const activeContainer = findContainer(active.id)
                if (!overContainer || !activeContainer) return

                if (activeContainer !== overContainer) {
                    setItems(current => {
                        const activeItems = current[activeContainer]
                        const overItems = current[overContainer]
                        const overIndex = overItems.indexOf(overId)
                        const activeIndex = activeItems.indexOf(active.id)

                        let newIndex
                        if (overId in current) {
                            newIndex = overItems.length + 1
                        } else {
                            const isBelow =
                                over &&
                                active.rect.current.translated &&
                                active.rect.current.translated.top >
                                over.rect.top + over.rect.height
                            newIndex = overIndex >= 0 ? overIndex + (isBelow ? 1 : 0) : overItems.length + 1
                        }

                        recentlyMovedToNewContainer.current = true
                        return {
                            ...current,
                            [activeContainer]: activeItems.filter(i => i !== active.id),
                            [overContainer]: [
                                ...overItems.slice(0, newIndex),
                                activeItems[activeIndex],
                                ...overItems.slice(newIndex)
                            ]
                        }
                    })
                }
            }}
            onDragEnd={({active, over}) => {
                // reorder containers if dragging a container
                if (active.id in items && over?.id) {
                    setContainers(c => arrayMove(c, c.indexOf(active.id.toString()), c.indexOf(over.id.toString())))
                }

                const activeContainer = findContainer(active.id)
                if (!activeContainer) {
                    setActiveId(null)
                    return
                }

                const overId = over?.id
                if (!overId) {
                    setActiveId(null)
                    return
                }

                if (overId === TRASH_ID) {
                    setItems(cur => ({
                        ...cur,
                        [activeContainer]: cur[activeContainer].filter(i => i !== activeId)
                    }))
                    setActiveId(null)
                    return
                }

                if (overId === PLACEHOLDER_ID) {
                    const newContainerId = getNextContainerId()
                    unstable_batchedUpdates(() => {
                        setContainers(c => [...c, newContainerId])
                        setItems(cur => ({
                            ...cur,
                            [activeContainer]: cur[activeContainer].filter(i => i !== activeId),
                            [newContainerId]: [active.id]
                        }))
                        setActiveId(null)
                    })
                    return
                }

                const overContainer = findContainer(overId)
                if (overContainer) {
                    const activeIndex = items[activeContainer].indexOf(active.id)
                    const overIndex = items[overContainer].indexOf(overId)
                    if (activeIndex !== overIndex) {
                        setItems(cur => ({
                            ...cur,
                            [overContainer]: arrayMove(cur[overContainer], activeIndex, overIndex)
                        }))
                    }
                }

                setActiveId(null)
            }}
            cancelDrop={cancelDrop}
            onDragCancel={onDragCancel}
            modifiers={modifiers}
        >
            <div
                style={{
                    display: 'inline-grid',
                    boxSizing: 'border-box',
                    padding: 0,
                    gridAutoFlow: vertical ? 'row' : 'column'
                }}
            >
                <SortableContext
                    items={[...containers, PLACEHOLDER_ID]}
                    strategy={vertical ? verticalListSortingStrategy : horizontalListSortingStrategy}
                >
                    {containers.map(cid => (
                        <React.Fragment key={cid}>
                            {(items[cid]?.length > 0 || cid === 'A') &&
                                <DroppableContainer
                                    key={cid}
                                    id={cid}
                                    label={minimal ? undefined : containerList[cid]}
                                    columns={columns}
                                    items={items[cid]}
                                    scrollable={scrollable}
                                    style={containerStyle}
                                    unstyled={minimal}
                                    onRemove={() => handleRemove(cid)}
                                    disabled={disabled}
                                >
                                    <SortableContext items={items[cid]} strategy={strategy}>
                                        {items[cid]?.map((val, idx) => (
                                            <React.Fragment key={val}>
                                                <SortablePage
                                                    key={val}
                                                    disabled={isSortingContainer || disabled}
                                                    id={val}
                                                    index={idx}
                                                    handle={handle}
                                                    style={getItemStyles}
                                                    layout={layout}
                                                    wrapperStyle={wrapperStyle}
                                                    renderItem={renderItem}
                                                    containerId={cid}
                                                    getIndex={getIndex}
                                                    onRemove={() => {
                                                        console.log('remove')
                                                        const currentItems = {...items}
                                                        currentItems[cid] = items[cid].filter(item => item !== val)
                                                        setItems(currentItems)
                                                    }}
                                                />
                                                <DragOverlay dropAnimation={dropAnimation}>
                                                    {activeId !== null && (
                                                        <PageOverlay id={activeId} layout={'Vertical'}
                                                                     items={items[cid]}/>
                                                    )}
                                                </DragOverlay>
                                            </React.Fragment>
                                        ))}
                                    </SortableContext>
                                </DroppableContainer>
                            }
                        </React.Fragment>
                    ))}
                </SortableContext>
            </div>
        </DndContext>
    )

    function DroppableContainer({
                                    children,
                                    columns = 1,
                                    disabled,
                                    id,
                                    items,
                                    style,
                                    ...props
                                }) {
        const {
            active,
            attributes,
            isDragging,
            listeners,
            over,
            setNodeRef,
            transition,
            transform
        } = useSortable({
            id,
            disabled,
            data: {type: 'container', children: items},
            animateLayoutChanges: args =>
                defaultAnimateLayoutChanges({...args, wasDragging: true})
        })

        const isOverContainer = over
            ? (id === over.id && active?.data?.current?.type !== 'container') ||
            items.includes(over.id)
            : false

        return (
            <Container
                ref={disabled ? undefined : setNodeRef}
                style={{
                    ...style,
                    transition,
                    transform: CSS.Translate.toString(transform),
                    opacity: isDragging ? 0.5 : undefined
                }}
                hover={isOverContainer}
                handleProps={{...attributes, ...listeners}}
                columns={columns}
                disabled={disabled}
                {...props}
            >
                {children}
            </Container>
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


    function SortablePage({id, thumb, activeIndex, index, containerId = 'A', layout, onRemove, disabled}) {
        const {
            setNodeRef,
            attributes,
            listeners,
            index: sortableIndex,
            isDragging,
            isSorting,
            over,
            transform,
            transition
        } = useSortable({
            id,
            disabled,
            animateLayoutChanges: () => true
        })

        // TODO: where is layout coming from and what does it do?

        return (
            <div>
                <Page
                    ref={setNodeRef}
                    id={id}
                    thumb={thumb}
                    index={index}
                    containerId={containerId}
                    layout={layout}
                    active={isDragging}
                    onRemove={onRemove}
                    disabled={disabled}
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


    function renderSortableItemDragOverlay(id) {
        return (
            <Item
                value={id}
                handle={handle}
                style={getItemStyles({
                    containerId: findContainer(id),
                    overIndex: -1,
                    index: getIndex(id),
                    value: id,
                    isSorting: true,
                    isDragging: true,
                    isDragOverlay: true
                })}
                color={getColor(id)}
                wrapperStyle={wrapperStyle({index: 0})}
                renderItem={renderItem}
                dragOverlay
            />
        )
    }

    function renderContainerDragOverlay(cid) {
        return (
            <Container label={containerList[cid]} columns={columns} style={{height: '100%'}} shadow unstyled={false}>
                {items[cid].map((it, idx) => (
                    <Item
                        key={it}
                        value={it}
                        handle={handle}
                        style={getItemStyles({
                            containerId: cid,
                            overIndex: -1,
                            index: getIndex(it),
                            value: it,
                            isDragging: false,
                            isSorting: false,
                            isDragOverlay: false
                        })}
                        color={getColor(it)}
                        wrapperStyle={wrapperStyle({index: idx})}
                        renderItem={renderItem}
                    />
                ))}
            </Container>
        )
    }

    function handleRemove(containerID) {
        setContainers(c => c.filter(i => i !== containerID))
    }

    function getNextContainerId() {
        const ids = Object.keys(items)
        const last = ids[ids.length - 1]
        return String.fromCharCode(last.charCodeAt(0) + 1)
    }
}

function getColor(id) {
    switch (String(id)[0]) {
        case 'A':
            return '#7193f1'
        case 'B':
            return '#ffda6c'
        case 'C':
            return '#00bcd4'
        case 'D':
            return '#ef769f'
        default:
            return undefined
    }
}


function SortableItem({
                          disabled,
                          id,
                          index,
                          handle,
                          renderItem,
                          style,
                          containerId,
                          getIndex,
                          wrapperStyle
                      }) {
    const {
        setNodeRef,
        setActivatorNodeRef,
        listeners,
        isDragging,
        isSorting,
        over,
        overIndex,
        transform,
        transition
    } = useSortable({id})
    const mounted = useMountStatus()
    const mountedWhileDragging = isDragging && !mounted

    return (
        <Item
            ref={disabled ? undefined : setNodeRef}
            value={id}
            dragging={isDragging}
            sorting={isSorting}
            handle={handle}
            handleProps={handle ? {ref: setActivatorNodeRef} : undefined}
            index={index}
            wrapperStyle={wrapperStyle({index})}
            style={style({
                index,
                value: id,
                isDragging,
                isSorting,
                overIndex: over ? getIndex(over.id) : overIndex,
                containerId
            })}
            color={getColor(id)}
            transition={transition}
            transform={transform}
            fadeIn={mountedWhileDragging}
            listeners={listeners}
            renderItem={renderItem}
        />
    )
}

function useMountStatus() {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        const t = setTimeout(() => setIsMounted(true), 500)
        return () => clearTimeout(t)
    }, [])
    return isMounted
}

function Trash({id}) {
    const {setNodeRef, isOver} = useDroppable({id})
    return (
        <div
            ref={setNodeRef}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'fixed',
                left: '50%',
                marginLeft: -150,
                bottom: 20,
                width: 300,
                height: 60,
                borderRadius: 5,
                border: '1px solid',
                borderColor: isOver ? 'red' : '#DDD'
            }}
        >
            Drop here to delete
        </div>
    )
}
