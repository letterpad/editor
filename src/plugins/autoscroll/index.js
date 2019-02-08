import scrollToCursor from "../../helper/scrollToCursor";

const AutoScrollPlugin = () => {
    return {
        onKeyDown(event, editor, next) {
            if (event.key == "Enter" || event.key == "Backspace") {
                event.preventDefault();
                scrollToCursor();
            }
            return next();
        }
    };
};

export { AutoScrollPlugin };
