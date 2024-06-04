import styled, { css, CSSObject } from 'styled-components'
import { ICalendarAnimDirection } from './ICalendar'

const getAnimationProps = (direction: ICalendarAnimDirection) =>
  ({
    left: {
      enter: 'translateX(-100%)',
      active: 'translateX(0%)',
      exit: 'translateX(100%)',
    },
    right: {
      enter: 'translateX(100%)',
      active: 'translateX(0%)',
      exit: 'translateX(-100%)',
    },
    top: {
      enter: 'translateY(-100%)',
      active: 'translateY(0%)',
      exit: 'translateY(100%)',
    },
    bottom: {
      enter: 'translateY(100%)',
      active: 'translateY(0%)',
      exit: 'translateY(-100%)',
    },
    '': { enter: '', active: '', exit: '' },
  }[direction])

export const Container = styled.div<{ sxStyle?: CSSObject }>`
  width: 380px;
  height: 280px;
  overflow: hidden;
  background-color: #00000070;

  ${({ sxStyle }) => sxStyle}
`

export const Header = styled.div`
  height: 24px;
  display: flex;
  color: #fff;
  justify-content: space-around;
  align-items: center;
  user-select: none;
`

export const HeaderBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & span {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 4px;
    height: 100%;
  }
`
export const Month = styled.span`
  width: 52px;
`

export const Controller = styled.div<{ isPrev?: boolean }>`
  width: 15px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    & > svg {
      fill: #fff;
    }
  }

  & > svg {
    width: 10px;
    height: 10px;
    fill: #d3d3d3;
    transition: fill 0.2s ease;
    transform: ${({ isPrev }) => (isPrev ? 'rotate(90deg)' : 'rotate(-90deg)')};
  }
`

export const DaysWeek = styled.div`
  user-select: none;
  display: grid;
  column-gap: 28px;
  height: 19px;
  padding: 0 22px;
  grid-template-columns: repeat(7, 24px);
  text-align: center;

  & span {
    width: 14px;
    height: 14px;
    line-height: 14px;
    text-align: center;
    user-select: none;
  }
`

export const DaysWrapperOverflow = styled.div`
  overflow: hidden;
`

export const DaysWrapper = styled.div<{
  animationDirection: ICalendarAnimDirection
}>`
  width: 100%;
  grid-template-columns: repeat(7, 24px);
  row-gap: 14px;
  column-gap: 28px;
  padding: 12px 22px;
  display: grid;

  ${({ animationDirection }) => {
    if (animationDirection !== '') {
      const { enter, active, exit } = getAnimationProps(animationDirection)
      return css`
        &.fade {
          &-enter {
            opacity: 0;
            transform: ${enter};
          }
          &-enter-active {
            opacity: 1;
            transform: ${active};
          }
          &-exit {
            opacity: 1;
            transform: ${active};
          }
          &-exit-active {
            opacity: 0;
            transform: ${exit};
          }
          &-enter-active,
          &-exit-active {
            transition: opacity 200ms, transform 200ms;
          }
        }
      `
    }
  }}
`

export const Day = styled.div<{
  notCurrent?: boolean
}>`
  width: 24px;
  height: 24px;
  display: block;
  text-align: center;
  cursor: pointer;
  user-select: none;
  line-height: 24px;
  padding-left: 1px;
  transition: all 0.1s ease-out;

  &.selected,
  &:hover {
    background-color: #7a098a;
    color: #fff;
  }

  ${({ notCurrent }) => {
    if (notCurrent) {
      return css`
        color: #616161;
      `
    }
  }}
`
