import * as React from "react";

import { IEmbedProvider } from "../../types";
import { getEmbedProvider } from ".";
import styled from "styled-components";

export default class DefaultEmbed extends React.Component<any> {
  get url(): string {
    return this.props.node.data.get("href");
  }

  render() {
    const result = getEmbedProvider(this.url);
    if (!result) return null;
    const { attributes, isSelected, children } = this.props;
    const { component, matches } = result;
    const EmbedComponent: React.FC<IEmbedProvider> = component;

    if (!children) return <EmbedComponent matches={matches} url={this.url} />;
    return (
      <Container
        contentEditable={false}
        isSelected={isSelected}
        {...attributes}
      >
        <EmbedComponent matches={matches} url={this.url} />
        {children}
      </Container>
    );
  }
}

const Container = styled.div<any>`
  text-align: center;
  line-height: 0;
  border-radius: 3px;
  box-shadow: ${props =>
    props.isSelected ? `0 0 0 2px var(--bg-success)` : "none"};
`;
