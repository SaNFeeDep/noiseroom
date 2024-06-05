import React from 'react'
import { CSSObject } from 'styled-components'
import { StyledButton } from './SButton'

type IProps = {
  children: React.ReactNode
  isDisabled?: boolean
  active?: boolean
  sx?: CSSObject
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: React.FC<IProps> = ({
  sx,
  active,
  children,
  isDisabled,
  onClick,
}) => {
  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return
    onClick?.(e)
  }

  return (
    <StyledButton sx={sx} active={active} onClick={onClickHandler}>
      {children}
    </StyledButton>
  )
}

export default Button
