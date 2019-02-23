import renderer from "react-test-renderer";
import React from "react";
import Button from "../Button";

describe("components", () => {
  describe("Button", () => {
    test("snapshot", () => {
      const onMouseDown = jest.fn();
      const component = renderer.create(<Button onMouseDown={onMouseDown} />);

      const tree: any = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
