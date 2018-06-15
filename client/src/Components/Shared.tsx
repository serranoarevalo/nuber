import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding-top: 150px;
  height: 100%;
`;
export const Wrapper = styled.div.attrs({
  className: "shouldScroll"
})`
  overflow-y: scroll;
  height: 100%;
`;
