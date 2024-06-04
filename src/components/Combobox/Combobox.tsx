import { useId, useMemo, useRef, useState } from 'react'
import styled, { CSSObject } from 'styled-components'
import { useOnClickOutside } from '../../hooks'
import { svgIcons } from '../../constants'

export type ComboboxData<T extends string | number = string> = {
  text: string
  value: T
}

type IProps<T extends string | number> = {
  label?: string
  labelSx?: CSSObject
  sx?: CSSObject
  data: ComboboxData<T>[]
  value: T
  onChange: (value: T) => void
}

const Combobox = <T extends string | number>({
  label,
  labelSx,
  sx,
  data,
  value,
  onChange,
}: IProps<T>) => {
  const id = useId()
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useOnClickOutside(wrapperRef, () => {
    setOpen(false)
  })

  const listHeight = data.length * 29

  const onToggleHandler = () => {
    setOpen((p) => !p)
  }

  const onChangeHandler = (val: T) => {
    setOpen(false)
    onChange(val)
  }

  const currentText = useMemo(() => {
    const finded = data.find((d) => d.value === value)

    if (!finded) {
      onChange(data[0].value)
      return data[0].text
    }

    return finded.text
  }, [value])

  return (
    <Container ref={wrapperRef}>
      {label && (
        <Label sx={labelSx} onClick={onToggleHandler} htmlFor={id}>
          {label}
        </Label>
      )}

      <CmbContainer sx={sx}>
        <InnerContainer>
          <Text>{currentText}</Text>
          <Icon className={open ? 'openned' : ''} onClick={onToggleHandler}>
            {svgIcons.arrow}
          </Icon>
        </InnerContainer>

        <List listHeight={listHeight} className={open ? 'opened' : ''}>
          {data.map(({ text, value }) => (
            <ItemList
              className={text === currentText ? 'active' : ''}
              onClick={() => onChangeHandler(value)}>
              {text}
            </ItemList>
          ))}
        </List>
      </CmbContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const Label = styled.label<{ sx?: CSSObject }>`
  ${({ sx }) => sx}
`

const CmbContainer = styled.div<{ sx?: CSSObject }>`
  position: relative;
  width: 100%;
  height: 40px;
  border-radius: 30px;
  background-color: #d9d9d9;
  transition: all 0.2s ease 0s;
  user-select: none;

  ${({ sx }) => sx};
`

const InnerContainer = styled.div`
  gap: 10px;
  height: 100%;
  padding: 5px;
  justify-content: space-between;
  display: flex;
  align-items: center;
`

const Text = styled.div`
  padding: 0 5px;
  color: #040404;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 12px;
  cursor: pointer;
  height: 100%;
  transform: rotate(0deg);
  transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s;

  & svg {
    width: 12px;
    height: 12px;
  }

  &.openned {
    transform: rotate(180deg);
  }
`

const List = styled.ul<{ listHeight: number }>`
  list-style: none;
  width: 100%;
  border-radius: 3px;
  position: absolute;
  top: 40px;
  box-shadow: rgba(0, 0, 0, 0.173) 0px 1px 2px;
  background-color: #d9d9d9;
  overflow: hidden;
  height: 0px;
  z-index: 999;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s;

  &.opened {
    height: ${({ listHeight }) => listHeight}px;
  }
`

const ItemList = styled.li`
  color: #040404;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding: 5px;
  height: 29px;
  cursor: pointer;
  user-select: none;
  background-color: #d9d9d9;

  &:hover,
  &.active {
    background-color: #999999;
  }
`

export default Combobox
