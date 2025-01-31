import {
  universityQueryKeys,
  useDeleteDepartment,
  useDeleteUniversity,
  usePatchUniversity,
  usePostDepartment,
} from '@bitgouel/api'
import { AppropriationModal, CompoundListItemComponent, useModal } from '@bitgouel/common'
import { ToggleDisplayBar, ToggleListContainer } from '@bitgouel/common/src/components/CompoundListItemComponent/style'
import { DisplayBarSpan } from '@outside/components/AdminDisplayInfo/style'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface Props {
  universityId: string
  name: string
  nameWidth: string
  departments: string[]
}

const ToggleDisplayBarList = [{ width: '15rem', text: '학과' }]

const UniversityItem = ({
  universityId,
  name,
  nameWidth,
  departments,
}: Props) => {
  const [modifyFlag, setModifyFlag] = useState(false)
  const [modifyText, setModifyText] = useState(name)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [addToggleList, setAddToggleList] = useState<
    { width: string; text: string }[][]
  >([])

  const { openModal, closeModal } = useModal()
  const queryClient = useQueryClient()
  const onSuccess = (message: string, toggleIndex?: number) => {
    if (typeof toggleIndex !== undefined) onCancel(toggleIndex)
    else setModifyFlag(false)
    closeModal()
    queryClient.invalidateQueries(universityQueryKeys.getUniversity())
    toast.success(message)
  }

  const { mutate: modifyUniversity } = usePatchUniversity(universityId, {
    onSuccess: () => onSuccess('대학을 수정하였습니다.'),
  })
  const { mutate: deleteUniversity } = useDeleteUniversity(universityId, {
    onSuccess: () => onSuccess('대학을 삭제하였습니다.'),
  })

  const [department, setDepartment] = useState<string>('')
  const { mutate: deleteDepartment } = useDeleteDepartment(
    universityId,
    { department },
    {
      onSuccess: () => onSuccess('학과를 삭제하였습니다.'),
    }
  )

  const onModifyUniversity = () => {
    if (!modifyFlag) return setModifyFlag(true)
    if (modifyText === name) return setModifyFlag(false)
    if (!modifyText.length) return toast.info('대학 이름을 작성해주세요.')

    openModal(
      <AppropriationModal
        isApprove={true}
        question='대학을 수정하시겠습니까?'
        purpose='수정하기'
        title={modifyText}
        onAppropriation={(callbacks) =>
          modifyUniversity({ universityName: modifyText }, callbacks)
        }
      />
    )
  }

  const onDeleteUniversity = () =>
    openModal(
      <AppropriationModal
        isApprove={false}
        question='대학을 삭제하시겠습니까?'
        purpose='삭제하기'
        title={name}
        onAppropriation={(callbacks) => deleteUniversity(undefined, callbacks)}
      />
    )

  const onDeleteDepartment = (departmentName: string) => {
    setDepartment(departmentName)
    openModal(
      <AppropriationModal
        isApprove={false}
        question='학과를 삭제하시겠습니까?'
        purpose='삭제하기'
        title={departmentName}
        onAppropriation={(callbacks) => deleteDepartment(undefined, callbacks)}
      />
    )
  }

  const onAdd = () => {
    setAddToggleList((prevState) => [
      ...prevState,
      [{ width: '15rem', text: '' }],
    ])
  }

  const onCancel = (index: number) => {
    const newAddInputList = [...addToggleList]
    newAddInputList.splice(index, 1)
    setAddToggleList(newAddInputList)
  }

  const handleChange = (listIndex, inputIndex, text) => {
    const newToggls = [...addToggleList]
    newToggls[listIndex][inputIndex].text = text
    setAddToggleList(newToggls)
  }

  const { mutate: createDepartment } = usePostDepartment(universityId)

  const onComplete = (index: number) => {
    const addName: string = addToggleList[index][0].text
    if (!addName.length) return toast.info('학과 이름을 작성해주세요.')
    
    openModal(
      <AppropriationModal
        isApprove={true}
        question='학과를 추가하시겠습니까?'
        purpose='추가하기'
        title={addName}
        onAppropriation={(callbacks) =>
          createDepartment({ department: addName }, {
            onSuccess: () => onSuccess('학과를 추가했습니다.', index),
          })
        }
      />
    )
  }

  return (
    <CompoundListItemComponent>
      <CompoundListItemComponent.AdminItemContainer gap='1.5rem'>
        <CompoundListItemComponent.AdminItemName
          name={name}
          nameWidth={nameWidth}
          modifyFlag={modifyFlag}
          modifyText={modifyText}
          setModifyText={setModifyText}
          modifyWidth='15rem'
        />
        <CompoundListItemComponent.ControlButton
          modifyFlag={modifyFlag}
          isModify={true}
          isDelete={true}
          onModify={onModifyUniversity}
          onDelete={onDeleteUniversity}
        />
        <CompoundListItemComponent.ToggleIcon
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </CompoundListItemComponent.AdminItemContainer>
      {isOpen && (
        <ToggleListContainer>
          <ToggleDisplayBar>
            {ToggleDisplayBarList.map((toggleDisplay) => (
              <DisplayBarSpan
                key={toggleDisplay.text}
                width={toggleDisplay.width}
              >
                {toggleDisplay.text}
              </DisplayBarSpan>
            ))}
          </ToggleDisplayBar>
          {departments.map((department) => (
            <CompoundListItemComponent key={department}>
              <CompoundListItemComponent.AdminToggleItemContainer>
                <CompoundListItemComponent.OtherItem
                  text={department}
                  width='15rem'
                  modifyFlag={false}
                />
                <CompoundListItemComponent.ControlButton
                  isModify={false}
                  isDelete={true}
                  onDelete={() => onDeleteDepartment(department)}
                />
              </CompoundListItemComponent.AdminToggleItemContainer>
            </CompoundListItemComponent>
          ))}
          {addToggleList.map((addInputList, listIndex) => (
            <CompoundListItemComponent.AddToggle
              key={listIndex}
              index={listIndex}
              addInputList={addInputList}
              setAddText={(text, inputIndex) =>
                handleChange(listIndex, inputIndex, text)
              }
              onCancel={onCancel}
              onComplete={(index: number) => onComplete(index)}
            />
          ))}
          <CompoundListItemComponent.AddText text='학과' onAdd={onAdd} />
        </ToggleListContainer>
      )}
    </CompoundListItemComponent>
  )
}

export default UniversityItem
