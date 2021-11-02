declare module "*.module.css";

declare interface BlockFocusDecoratorProps {
  blockProps: {
    isFocused: boolean;
    setFocusToBlock(): void;
  };
  className: string;
  block: ContentBlock;
  onClick(event: MouseEvent): void;
  ref: Ref<unknown>;
}
