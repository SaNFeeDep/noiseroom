import styled from 'styled-components'
import { PageContainer, PageContent } from '../components/Base'
import Calendar from '../components/Calendar'
import TimePicker from '../components/TimePicker'
import { useState } from 'react'
import Button from '../components/Button'

const times = {
  Утро: ['10:00', '11:00', '12:00'],
  День: ['13:00', '14:00', '16:00', '17:00'],
  Вечер: ['19:00', '20:00', '23:00'],
}

const Booking: React.FC = () => {
  const [date, setDate] = useState(new Date().toISOString())
  const [time, setTime] = useState('')

  const onBookHandler = () => {}

  const renderPicker = () => {
    return Object.entries(times).map(([title, items], i) => (
      <TimePicker
        key={title + i.toString()}
        title={title}
        items={items}
        value={time}
        onClick={(val) => setTime(val)}
        isOpen={i === 1}
      />
    ))
  }

  return (
    <PageContainer>
      <Content>
        <LogoWrapper>
          <img src='./images/small_logo.svg' />
        </LogoWrapper>

        <ContentContainer>
          <Calendar value={date} onChange={(val) => setDate(val)} />

          {renderPicker()}

          <Button onClick={onBookHandler}>Забронировать</Button>
        </ContentContainer>
      </Content>
    </PageContainer>
  )
}

const Content = styled(PageContent)`
  width: 850px;
`

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: max-content;
  margin: 0 auto;
`

export default Booking
