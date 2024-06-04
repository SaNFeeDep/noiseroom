import Calendar from '../components/Calendar'
import TimePicker from '../components/TimePicker'
const morningTimes = ['10:00', '11:00', '12:00']
const dayTimes = ['13:00', '14:00', '16:00', '17:00']
const eveningTimes = ['19:00', '20:00', '23:00']

const Booking: React.FC = () => {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <TimePicker title='Утро' items={morningTimes} />
        <TimePicker title='День' isOpen items={dayTimes} />
        <TimePicker title='Вечер' items={eveningTimes} />
      </div>
      <Calendar name='s' />
    </>
  )
}

export default Booking
