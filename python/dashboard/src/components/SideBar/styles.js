import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background: #35302D;
  box-shadow: 2px 0px 8px #35302D;
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;

  img {
    height: 30px;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;

  ul{
    width: 100%;
    border-top: solid 1px #3C3735;
  }

  li{
    text-align: center;
    border-bottom: solid 1px #3C3735;
  }

  a{
    padding: 1.1em 0;
    color: #DFDBD9;
    font: 400 1.125em 'Source Sans Pro', Helvetica, Arial, sans-serif;
    text: {
      align: center;
      transform: lowercase;
    }

    &:hover{
      color: #fff;
    }
  }

.list-hover-slide {

  li{
    position: relative;
    overflow: hidden;
  }

  a{
    display: block;
    position: relative;
    z-index: 1;
    transition: .35s ease color;

    &:before{
      content: '';
      display: block;
      z-index: -1;
      position: absolute;
      left: -100%; top: 0;
      width: 100%; height: 100%;
      border-right: solid 5px #F7941D;
      background: #3C3735;
      transition: .35s ease left;
    }

    &.is-current,
    &:hover{

      &:before{
        left: 0;
      }
    }
  }
}
`;
