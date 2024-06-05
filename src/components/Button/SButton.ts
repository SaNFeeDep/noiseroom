import styled, { CSSObject, css } from 'styled-components'

export const StyledButton = styled.button<{ active?: boolean; sx?: CSSObject }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ffffff;
  background-color: #00000080;
  color: #ffffff;
  padding: 11px 20px;
  border-radius: 30px;
  cursor: pointer;
  transition: 0.1s linear all;
  backdrop-filter: blur(10px);
  user-select: none;

  ${({ active }) => {
    if (active) {
      return css`
        background-color: #3f279e3e;
      `
    }
  }}

  &:hover {
    background-color: #3f279e3e;
  }

  ${({ sx }) => sx};
`
