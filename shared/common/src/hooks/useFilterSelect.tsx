'use client'

import { FilterListTypes } from '@bitgouel/types'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FilterModal, useModal } from '@bitgouel/common'

interface onSelectedParameter {
  item: string
  checked: boolean
  inputValue?: string
}

interface Parameter {
  title: string
  defaultFilterList: FilterListTypes[]
  setFilterPayload: Dispatch<SetStateAction<string>>
}

const useFilterSelect = ({
  title,
  defaultFilterList,
  setFilterPayload,
}: Parameter) => {
  const [isMount, setIsMount] = useState<boolean>(true)
  const { openModal } = useModal()
  const [filterList, setFilterList] =
    useState<FilterListTypes[]>(defaultFilterList)
  const onSelected = (parameter: onSelectedParameter) => {
    setFilterList((filter) =>
      filter.map((filterItem) =>
        filterItem.item === parameter.item
          ? { ...filterItem, checked: true }
          : { ...filterItem, checked: false }
      )
    )

    if (!parameter.checked && parameter.item === '전체') setFilterPayload('')
    else if (
      parameter.checked &&
      parameter.item === '기타' &&
      parameter.inputValue
    )
      setFilterPayload(parameter.inputValue)
    else if (!parameter.checked) setFilterPayload(parameter.item)
  }

  useEffect(() => {
    if (isMount) return setIsMount(false)
    openModal(
      <FilterModal
        title={title}
        filterList={filterList}
        onSelected={onSelected}
      />
    )
  }, [filterList])

  return { filterList, onSelected }
}

export default useFilterSelect
