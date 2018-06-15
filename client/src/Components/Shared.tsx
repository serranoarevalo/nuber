import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 0px 15px;
  padding-top: 150px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Wrapper = styled.div.attrs({
  className: "shouldScroll"
})`
  overflow-y: scroll;
  height: 100%;
`;
