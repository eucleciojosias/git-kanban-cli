import styled from 'styled-components';

export const Container = styled.div`
  .card {
    border-radius: 5px;
    background-color: #FFFFFF;
    box-shadow:0px 2px 8px rgba(0,0,0,0.07);
    margin-right: 20px;

    .card-header {
      border-radius: 3px 3px 0 0;
      transition: all 0.5s;
      cursor: grab;

      &:active {
        cursor: grabbing;
      }

      h1, h2, h3, h4, h5, h6 {
        text-align: center;
        font-weight: 600;
        padding: 10px;
      }
    }

  .card-body {
    padding: 20px;
  }

  .card-footer {
      border-radius: 0 0 3px 3px;
      background-color: #C8CED5;
    }
  }
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-size: 26px;

  span {
    margin-top: 15px;
  }
`;
