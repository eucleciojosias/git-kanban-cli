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

  &:nth-child(even) {
    background: #EEF0F0;
  }

  h4 {
    margin: 0;
    color: #7A818A;
  }

  div {
    display: flex;
    align-items: center;

    span {
      display: flex;
      align-items: baseline;
      font-size: 22px;
      font-weight: 400;
      color: #7A818A;
      margin-left: 10px;

      p {
        font-size: 16px;
        margin: 5px 0 0 0;
        color: #7A818A;
      }
    }
  }
`;
