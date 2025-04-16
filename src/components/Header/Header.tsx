import styled from 'styled-components'

const HeaderContainer = styled.header`
  background-color: #2196f3;
  padding: 20px;
  color: white;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`

const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
  font-weight: 500;
`

export const Header = () => {
  return (
    <HeaderContainer>
      <Title>Random Cat Generator</Title>
    </HeaderContainer>
  )
}
