import styled from 'styled-components'
import Calendar from '../../../components/Calendar'
import Button from '../../../components/Button'

type IProps = {}

const Equipment: React.FC<IProps> = ({}) => {
  return (
    <Container>
      <InfoWrapper>
        <h1>Забронированно на сегодня</h1>

        <InfoContainer>
          <Calendar sx={{ marginBottom: 40 }} />

          <InfoContainer>
            <RowContainer>
              <div>ЧЧ-ММ-ГГГГ</div>

              <Button>Редактировать</Button>
              <Button>Отменить</Button>
            </RowContainer>
          </InfoContainer>
        </InfoContainer>
      </InfoWrapper>

      <InfoWrapper>
        <h1>Активность посещения</h1>
        <InfoContainer>d</InfoContainer>
      </InfoWrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  gap: 100px;
`

const InfoWrapper = styled.div`
  flex: 1;

  & h1 {
    text-align: center;
  }
`

const InfoContainer = styled.div`
  background-color: #d9d9d92b;
  flex: 1;
  border-radius: 30px;
  padding: 40px 30px;
`

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 15px;
`

export default Equipment
