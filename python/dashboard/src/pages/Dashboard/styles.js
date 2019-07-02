import styled from 'styled-components';

export const Container = styled.div`
  .card {
    border-radius: 5px;
    background-color: #FFFFFF;
    box-shadow:0px 2px 8px rgba(0,0,0,0.07);
    margin-right: 0;

    .card-header {
      position: relative;
      border-bottom: 1px dashed #E8E8E8;
      border-radius: 3px 3px 0 0;
      transition: all 0.5s;
      cursor: grab;
      overflow: hidden;

      &:before {
        content: '';
        width: 4px;
        height: 100%;
        position: absolute;
        left: 0;
        background: #f00;
        top: 0;
        border-left: 7px solid #008DDE;
      }

      &:active {
        cursor: grabbing;
      }

      h1, h2, h3, h4, h5, h6 {
        font-weight: 600;
        padding: 10px 20px;
      }
    }

  .card-body {
    padding: 5px;
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
