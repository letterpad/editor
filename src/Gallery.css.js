import styled from "styled-components";

export const StyledGallery = styled.div`
  .gallery-container {
    border-top: 8px solid #fff;
    width: 100vw;
    background: #fff;
    position: fixed;
    left: 0px;
    max-height: 300px;
    overflow-y: scroll;
    bottom: 0px;
    box-shadow: 0px -2px 15px 1px #333;
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 4px;
      max-width: 100vw;
      width: 100%;
      margin: 0 auto;
      .image-wrapper {
        display: flex;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          border: 2px solid #fff;
        }
      }
      @media (min-width: 20em) {
        grid-template-columns: repeat(3, 1fr);
      }
      @media (min-width: 34em) {
        grid-template-columns: repeat(4, 1fr);
      }
      @media (min-width: 60em) {
        grid-template-columns: repeat(6, 1fr);
      }
      .modal {
        position: fixed;
        z-index: 999;
        width: 50%;
        max-width: 800px;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        img {
          width: 100%;
          border: 5px solid #fff;
        }
        @media (min-width: 20em) {
          width: 95%;
        }

        @media (min-width: 34em) {
          width: 80%;
        }

        @media (min-width: 60em) {
          width: 60%;
        }
      }
      .modal-overlay {
        position: fixed;
        z-index: 1;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        top: 0;
        left: 0;
      }

      .modal-body {
        a {
          position: absolute;
          display: inline;
          color: #222;
          text-decoration: none;
          line-height: 36px;
          font-size: 30px;
          font-weight: lighter;
          background: #fff;
          border-radius: 5px;
          height: 40px;
          width: 40px;
          text-align: center;
        }
        .modal-close {
          right: 0;
          top: 0;
          border-radius: 0 0 0 5px;
        }
        .modal-next {
          right: 0;
          top: calc(50% - 25px);
          border-radius: 5px 0 0 5px;
          height: 50px;
          line-height: 40px;
          font-size: 60px;
        }
        .modal-prev {
          right: 0;
          top: calc(50% - 25px);
          border-radius: 5px 0 0 5px;
          height: 50px;
          line-height: 40px;
          font-size: 60px;
          left: 0;
          right: auto;
          border-radius: 0 5px 5px 0;
        }
        position: relative;
      }
    }
  }
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  &:before {
    content: "🎧";
    font-size: x-large;
    display: flex;
    align-items: center;
    margin-top: 4px;
    padding: 0 8px;
  }
`;

export const StyledInput = styled.input`
  font-size: medium;
  width: 100%;
  border: none;
  outline: none;
`;
