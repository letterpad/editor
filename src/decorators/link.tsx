function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();

    const isLink =
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK";
    return isLink;
  }, callback);
}

const Link = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return <a href={url}>{props.children}</a>;
};

export const linkDecorator = {
  strategy: findLinkEntities,
  component: Link,
};
