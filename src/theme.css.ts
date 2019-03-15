import styled from "styled-components";
import * as themes from "./themes";

const applytheme = (theme: string) => {
  return (themes as any)[theme];
};

export const Theme = styled.div`
  ${({ theme }: { theme: string }) => applytheme(theme)};
  overflow-x: hidden;
  background: var(--bg-base);
  color: var(--color-base);
`;
