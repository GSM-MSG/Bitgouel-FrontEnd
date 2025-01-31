'use client'

import { useGetDivisions } from '@bitgouel/api'
import { LectureDivision, LectureLine } from '@bitgouel/common'
import { FormEvent, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import SearchComponent from '../SearchComponent'

const SearchDivision = () => {
  const setLectureLine = useSetRecoilState(LectureLine)
  const [lectureDivision, setLectureDivision] = useRecoilState(LectureDivision)
  const [division, setDivision] = useState<string>('')
  const { data, refetch } = useGetDivisions(division)

  const onSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault()
    refetch()
  }

  const onSelectDivision = (divisionItem: string) => {
    setLectureDivision(divisionItem)
    setDivision('')
  }

  const onDeleteDivision = () => {
    setLectureDivision('')
    setLectureLine('')
    setDivision('')
  }

  return (
    <SearchComponent>
      <SearchComponent.SearchInputBox
        inputValue={division}
        setInputValue={setDivision}
        recoilValue={lectureDivision}
        onSubmit={onSubmit}
        onDeleteInputValue={onDeleteDivision}
        inputPlaceholder='구분'
      />
      {lectureDivision.length <= 0 && (
        <SearchComponent.SearchItemList
          searchList={data?.divisions || []}
          inputValue={division}
          onSelectInputValue={onSelectDivision}
          addText='구분'
        />
      )}
    </SearchComponent>
  )
}

export default SearchDivision
