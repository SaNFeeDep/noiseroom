import { CSSObject } from 'styled-components'

export type ICalendarMonthType = 'prev' | 'current' | 'next'

export type ICalendarAnimDirection = 'left' | 'right' | 'top' | 'bottom' | ''

export interface ICalendar {
  name: string

  /**
   * Стили
   */
  sx?: CSSObject

  /**
   * Значение
   */
  value?: string

  /**
   * Изменение месяца/года по скроллу колесеком
   */
  isScollChange?: boolean

  /**
   * Изменения
   */
  onChange?: (event: string) => void
}

export interface ICalendarDays {
  time: Date
  day: number
  disabled: boolean
  type: ICalendarMonthType
}
