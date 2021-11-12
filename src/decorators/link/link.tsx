import { ContentBlock, ContentState } from "draft-js";

function findLinkEntities(
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState
) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();

    const isLink =
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK";
    return isLink;
  }, callback);
}

const Link = (props) => {
  const { url, title } = props.contentState
    .getEntity(props.entityKey)
    .getData();
  const urlHost = new URL(url).origin;
  const srcHost = new URL(document.location.href).origin;
  const isInternal = urlHost.indexOf(srcHost) === 0;

  const attrs = {
    href: url,
    target: isInternal ? "" : "_blank",
    title,
  };
  return <a {...attrs}>{props.children}</a>;
};

export const linkDecorator = {
  strategy: findLinkEntities,
  component: Link,
};
