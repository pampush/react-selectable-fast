import React, { memo } from 'react'

import { TAlbumItem } from './sample-data'
import { Card } from './Card'

type TListProps = {
  items: TAlbumItem[]
}

export const List = memo((props: TListProps) => {
  const { items } = props

  return (
    <div className="albums">
      {items.map(item => (
        <Card key={item.year} player={item.player} year={item.year} />
      ))}
    </div>
  )
})
