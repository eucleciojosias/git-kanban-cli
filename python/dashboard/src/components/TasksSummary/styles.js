import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 12px 15px;

  div {
    display: flex;
    align-items: center;

    h4 {
      margin: 0;
      color: #7A818A;
      margin-left: 5px;
    }

    span {
      font-size: 20px;
    }
  }
`;

export const Divider = styled.div`
  border: .5px solid #E5E5E5;
  padding: 0 15px;
`;
