import styled from 'styled-components'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import Combobox, { ComboboxData } from '../../../components/Combobox'
import { useState } from 'react'

type IProps = {}

const cmbData: ComboboxData[] = [
  { text: 'без напоминаний', value: 'noNotif' },
  { text: 'SMS', value: 'notifSms' },
  { text: 'Email', value: 'notifEmail' },
  { text: 'VK', value: 'notifVk' },
]

const PersonalInfo: React.FC<IProps> = ({}) => {
  const [value, setValue] = useState(cmbData[0].value)

  return (
    <Container>
      <InputContainer>
        <label>Электронная почта</label>
        <Input placeholder='mail@mail.ru' />
      </InputContainer>

      <InputContainer>
        <label>Имя пользователя</label>
        <Input placeholder='username' />
      </InputContainer>

      <InputContainer>
        <label>Номер телефона</label>
        <Input placeholder='8 (000) 000-00-00' />
      </InputContainer>

      <InputContainer>
        <label>Пароль</label>
        <Input type='password' placeholder='**********' />
      </InputContainer>

      <InputContainer>
        <div style={{ flex: 1 }}></div>
        <Button sx={{ flex: 2 }}>Изменить пароль</Button>
      </InputContainer>

      <Combobox
        labelSx={{ textAlign: 'center', flex: 1 }}
        sx={{ flex: 2 }}
        label='отправка напоминаний'
        data={cmbData}
        value={value}
        onChange={(v) => setValue(v)}
      />

      <InputContainer>
        <div style={{ flex: 1 }}></div>
        <Button sx={{ flex: 2 }}>Сохранить изменения</Button>
      </InputContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 30px;
  width: 550px;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 30px;

  & input {
    flex: 2;
  }

  & label {
    flex: 1;
    overflow: hidden;
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: center;
  }
`

export default PersonalInfo
