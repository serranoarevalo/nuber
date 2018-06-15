import styled from "styled-components";

export const AbsContainer = styled<any, any>("div")`
  position: absolute;
  ${props => (props.top ? "top: 80px;" : "bottom: 50px;")};
  width: 100%;
  z-index: 2;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Btn = styled.button`
  -webkit-appearance: none;
  border: 0;
  padding: 10px 20px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  box-shadow: ${props => props.theme.boxShadow};
  font-size: 14px;
  color: rgba(0, 0, 0, 0.7);
  &:active {
    opacity: 0.9;
  }
`;
