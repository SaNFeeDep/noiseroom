import styled from 'styled-components'
import { svgIcons } from '../../constants'
import { useState } from 'react'
import Button from '../Button'

type IProps = {
  title: string
  isOpen?: boolean
  items: React.ReactNode[]
}

const TimePicker: React.FC<IProps> = ({ title, items, isOpen }) => {
  const [open, setOpen] = useState(isOpen ?? false)

  const onToggleHandler = () => {
    setOpen((p) => !p)
  }

  return (
    <Container className={open ? 'openned' : ''}>
      <InnerContainer>
        <div>{title}</div>

        <IconContainer
          className={open ? 'openned' : ''}
          onClick={onToggleHandler}>
          {svgIcons.arrow}
        </IconContainer>
      </InnerContainer>

      <ContentContainer>
        {items.map((item, i) => (
          <Button key={item + i.toString()}>{item}</Button>
        ))}
      </ContentContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 340px;
  min-width: 340px;
  max-width: 340px;
  padding: 12px 18px;
  background-color: #00000070;
  border-radius: 30px;
  gap: 10px;
  height: 42px;

  &.openned {
    height: max-content;
  }
`

const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  user-select: none;
`

const IconContainer = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 22px;
  padding: 0 5px;
  transform: rotate(0deg);
  transition: transform 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s;

  & svg {
    width: 12px;
    height: 12px;
    fill: #ffffff;
  }

  &.openned {
    transform: rotate(180deg);
  }
`

const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  gap: 15px;

  & button {
    height: 35px;
  }
`

export default TimePicker
