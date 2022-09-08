import React from 'react'

import { useDrag } from 'react-dnd'
import { createSelectable, TSelectableItemProps } from '../../src'
import { Label } from './Label'

type TAlbumProps = {
  player: string
  year: number
}

// const DISABLED_CARD_YEARS = [10, 22, 27, 54, 82, 105, 150]

export const Card = createSelectable<TAlbumProps>((props: TSelectableItemProps & TAlbumProps) => {
  const { selectableRef, isSelected, isSelecting, player, year } = props

  const [, drag] = useDrag({
    type: 'item',
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const classNames = ['item', isSelecting && 'selecting', isSelected && 'selected']
    .filter(Boolean)
    .join(' ')

  return (
    <div
      ref={node => {
        selectableRef(node)
        drag(node)
      }}
      className={classNames}
    >
      <h2>{player}</h2>
      <small>{year}</small>
      <Label isSelected={isSelected} isSelecting={isSelecting} />
    </div>
  )
})
