import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 10px;

  &:nth-child(odd) {
    background: #EEF0F0;
  }

  h4 {
    margin: 0;
  }

  div {
    display: flex;
    align-items: center

    span {
      font-size: 22px;
      font-weight: 400;
    }

    p {
      font-size: 16px;
      margin: 0;
    }
  }
`
