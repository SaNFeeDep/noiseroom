import { addMonths, isValid, set } from 'date-fns'
import { useEffect, useId, useMemo, useState } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

import {
  Container,
  Controller,
  Day,
  DaysWeek,
  DaysWrapper,
  DaysWrapperOverflow,
  Header,
  HeaderBox,
  Month,
} from './SCalendar'

import { svgIcons } from '../../constants'
import {
  ICalendar,
  ICalendarAnimDirection,
  ICalendarDays,
  ICalendarMonthType,
} from './ICalendar'

type ClickType = 'prev' | 'next'

const shortDaysWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

const monthNames = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

/**
 * **Календарь.**
 *
 * В пропсе `onChange` дата возвращается в формате `ISODate`
 */
const Calendar: React.FC<ICalendar> = ({
  sx,
  value = '',
  isScollChange = true,
  onChange = () => {},
}) => {
  const id = useId()

  const stringToDate = (str: string) => new Date(Date.parse(str))

  const toggleAnimTrigger = () => setAnimTrigger((p) => !p)

  const [animDir, setAnimDir] = useState<ICalendarAnimDirection>('')
  const [animTrigger, setAnimTrigger] = useState(true)
  const [stateDate, setStateDate] = useState(
    value && isValid(value) ? stringToDate(value) : new Date()
  )

  useEffect(() => {
    const unformat = Date.parse(value)
    if (!isNaN(unformat) && isValid(unformat)) {
      setStateDate(stringToDate(value))
    }
  }, [value])

  /**
   * Генерирует дни для заполнения
   * @returns
   */
  const calendarDays = useMemo(() => {
    const [year, month] = [stateDate.getFullYear(), stateDate.getMonth() + 1]

    const prevMonthDays = new Date(year, month - 1, 0).getDate()
    const currMonthDays = new Date(year, month, 0).getDate()
    const firstDay = new Date(year, month - 1, 1).getDay()
    const firstWeekDay = firstDay === 0 ? firstDay + 7 : firstDay

    let [startNextMonthDay, startCurrMonthDay] = [1, 1]

    const generatedDays = []

    for (let index = 0; index < 42; index++) {
      let gen = {} as ICalendarDays

      if (index < firstWeekDay - 1) {
        const day = prevMonthDays - firstWeekDay + 2 + index
        gen = {
          day,
          disabled: true,
          type: 'prev',
          time: new Date(year, month - 2, day),
        }
      } else if (index < currMonthDays + firstWeekDay - 1) {
        const day = startCurrMonthDay++
        gen = {
          day,
          disabled: false,
          type: 'current',
          time: new Date(year, month - 1, day),
        }
      } else {
        const day = startNextMonthDay++
        gen = {
          day,
          disabled: true,
          type: 'next',
          time: new Date(year, month, day),
        }
      }

      generatedDays.push(gen)
    }

    return generatedDays
  }, [animTrigger])

  /**
   * Вспомогательная функция для запуска анимации.
   * Дергает триггер для анимации и коллбэк
   * @param direction направление анимации
   * @param func коллбэк
   */
  const animateCalendar = (
    direction: ICalendarAnimDirection,
    func: VoidFunction
  ) => {
    setAnimDir(direction)
    setTimeout(() => {
      toggleAnimTrigger()
      func()
    }, 100)
  }

  /**
   * Обрабатывает клик по стрелочкам месяца
   */
  const onClickMonthHandler = (clickType: ClickType) => {
    animateCalendar(clickType === 'next' ? 'right' : 'left', () => {
      const addOrSub = clickType === 'next' ? 1 : -1
      setStateDate((prevDate) => addMonths(prevDate, addOrSub))
    })
  }

  /**
   * Обрабатывает выбор дня
   */
  const onChangeDateHandler = (type: ICalendarMonthType, date: Date) => {
    const valueDate = new Date(value)
    const valid = isValid(valueDate)

    const newDate = set(date, {
      seconds: valid ? valueDate.getSeconds() : 0,
    })

    onChange(newDate.toISOString())

    if (type === 'next' || type === 'prev') {
      animateCalendar(type === 'next' ? 'right' : 'left', () =>
        setStateDate(date)
      )
    } else {
      setStateDate(date)
    }
  }

  /**
   * Скролл месяца
   *
   * @param param0
   * @param type
   * @returns
   */
  const onWheelHandler = ({ deltaY }: React.WheelEvent) => {
    if (!isScollChange) return

    deltaY < 0 ? onClickMonthHandler('prev') : onClickMonthHandler('next')
  }

  return (
    <Container sxStyle={sx}>
      <Header>
        <HeaderBox onWheel={onWheelHandler}>
          <Controller isPrev onClick={() => onClickMonthHandler('prev')}>
            {svgIcons.arrow}
          </Controller>

          <Month>{monthNames[stateDate.getMonth()]}</Month>

          <Controller onClick={() => onClickMonthHandler('next')}>
            {svgIcons.arrow}
          </Controller>
        </HeaderBox>
      </Header>

      <DaysWeek>
        {shortDaysWeek.map((day) => (
          <div key={day + id}>{day}</div>
        ))}
      </DaysWeek>

      <DaysWrapperOverflow>
        <SwitchTransition mode='out-in'>
          <CSSTransition
            key={String(animTrigger)}
            timeout={200}
            classNames='fade'>
            <DaysWrapper animationDirection={animDir}>
              {calendarDays.map(({ day, disabled, type, time }) => {
                const isSelected =
                  time.toDateString() === stateDate.toDateString()

                return (
                  <Day
                    className={isSelected ? 'selected' : ''}
                    key={id + time.toString()}
                    notCurrent={disabled}
                    onClick={() => onChangeDateHandler(type, time)}>
                    {day}
                  </Day>
                )
              })}
            </DaysWrapper>
          </CSSTransition>
        </SwitchTransition>
      </DaysWrapperOverflow>
    </Container>
  )
}

export default Calendar
