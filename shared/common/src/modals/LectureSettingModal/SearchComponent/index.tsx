'use client'

import { InputCancel, SearchIcon } from '@bitgouel/common'
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  ReactNode,
  SetStateAction,
} from 'react'
import * as S from './style'

const SearchComponent = ({ children }: { children: ReactNode }) => {
  return <S.SearchWrapper>{children}</S.SearchWrapper>
}

interface SearchInputBoxProps {
  inputValue: string
  setInputValue: Dispatch<SetStateAction<string>>
  recoilValue: string
  onSubmit: (e?: FormEvent) => void
  onDeleteInputValue: () => void
  inputPlaceholder:
    | '유형'
    | '학과'
    | '핵심분야'
    | '계열'
    | '학과'
    | '구분'
    | '분야'
  isSearch?: boolean
  isAdd?: boolean
}

const SearchInputBox = ({
  inputValue,
  setInputValue,
  recoilValue,
  onSubmit,
  onDeleteInputValue,
  inputPlaceholder,
  isSearch,
  isAdd = true,
}: SearchInputBoxProps) => {
  return (
    <S.SearchInputBox onSubmit={onSubmit} isSelected={!!recoilValue.length}>
      <S.SearchInput
        length={recoilValue.length}
        type='text'
        value={recoilValue.length ? recoilValue : inputValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }
        placeholder={
          inputPlaceholder === '계열'
            ? inputPlaceholder
            : `${inputPlaceholder} 검색${isAdd ? ` 또는 임의로 추가...` : ''}`
        }
        disabled={!!recoilValue.length || inputPlaceholder === '계열'}
      />
      {recoilValue.length ? (
        <InputCancel onClick={() => onDeleteInputValue()} />
      ) : (
        isSearch && <SearchIcon onClick={onSubmit} />
      )}
    </S.SearchInputBox>
  )
}

interface SearchItemListProps {
  searchList: string[]
  onSelectInputValue: (item: string) => void
  addText?: string
  inputValue?: string
  type?: '계열'
}

const SearchItemList = ({
  searchList,
  inputValue,
  onSelectInputValue,
  addText,
  type,
}: SearchItemListProps) => {
  return (
    <S.SearchListContainer type={type}>
      {searchList.map((searchItem) => (
        <S.SearchItem
          key={searchItem}
          onClick={() => onSelectInputValue(searchItem)}
        >
          <span>{searchItem}</span>
        </S.SearchItem>
      ))}
      {addText && (
        <S.SearchItem onClick={() => onSelectInputValue(inputValue as string)}>
          <span>{inputValue}</span>
          <small>새 {addText} 추가하기...</small>
        </S.SearchItem>
      )}
    </S.SearchListContainer>
  )
}

SearchComponent.SearchInputBox = SearchInputBox
SearchComponent.SearchItemList = SearchItemList
export default SearchComponent
