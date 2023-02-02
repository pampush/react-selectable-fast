/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { createRef, Component } from 'react'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { TAlbumItem } from './sample-data'
import { SelectableGroup, SelectAll, DeselectAll } from '../../src'
import { Counters } from './Counters'
import { List } from './List'

type TAppProps = {
  items: TAlbumItem[]
}

type TAppState = {
  disableFirstRow: boolean
  reversed: boolean
  showSelectableGroup: boolean
}

class App extends Component<TAppProps, TAppState> {
  state = {
    disableFirstRow: false,
    reversed: false,
    showSelectableGroup: true,
  }

  countersRef = createRef<Counters>()

  selectableGroupRef: SelectableGroup | null = null

  getSelectableGroupRef = (ref: SelectableGroup | null) => {
    ;(window as any).selectableGroup = ref
    this.selectableGroupRef = ref
  }

  toggleFirstRow = () => {
    this.setState(state => ({ disableFirstRow: !state.disableFirstRow }))
  }

  toggleOrder = () => {
    this.setState(state => ({ reversed: !state.reversed }))
  }

  toggleSelectableGroup = () => {
    this.setState(state => ({
      showSelectableGroup: !state.showSelectableGroup,
    }))
  }

  handleSelecting = (selectingItems: TAlbumItem) => {
    this.countersRef.current!.handleSelecting(selectingItems)
  }

  handleSelectionFinish = selectedItems => {
    console.log('Handle selection finish', selectedItems.length)
    this.countersRef.current!.handleSelectionFinish(selectedItems)
  }

  handleSelectedItemUnmount = (_unmountedItem, selectedItems) => {
    console.log('hadneleSelectedItemUnmount')
    this.countersRef.current!.handleSelectionFinish(selectedItems)
  }

  handleSelectionClear() {
    console.log('Cancel selection')
  }

  render() {
    const { items } = this.props
    const { disableFirstRow, reversed, showSelectableGroup } = this.state

    const itemsToRender = disableFirstRow ? items.slice(5) : items
    const orderedItems = reversed ? itemsToRender.slice().reverse() : itemsToRender

    return (
      <DndProvider backend={HTML5Backend}>
        <div>
          <Counters ref={this.countersRef} />
          <button className="btn" type="button" onClick={this.toggleFirstRow}>
            Toggle first row
          </button>
          <button className="btn" type="button" onClick={this.toggleOrder}>
            Toggle order
          </button>
          <button className="btn" type="button" onClick={this.toggleSelectableGroup}>
            Toggle group
          </button>
          <div className="button-container">
            <SelectAll component="button" type="button" className="btn">
              Select all
            </SelectAll>
            <DeselectAll component="button" type="button" className="btn">
              Clear selection
            </DeselectAll>
          </div>
          <div className="scroll" style={{ height: '600px', overflow: 'scroll' }}>
            {showSelectableGroup && (
              <SelectableGroup
                ref={this.getSelectableGroupRef}
                className="main"
                selectOnClick={true}
                allowCtrlClick={true}
                allowShiftClick={true}
                deselectOnEsc={true}
                scrollContainer=".scroll"
                resetOnStart={true}
                onSelectionClear={this.handleSelectionClear}
                onSelectionFinish={this.handleSelectionFinish}
                onSelectedItemUnmount={this.handleSelectedItemUnmount}
                ignoreList={['.not-selectable']}
              >
                <List items={orderedItems} />
              </SelectableGroup>
            )}
          </div>
        </div>
      </DndProvider>
    )
  }
}

export default App
