export const insertLinkStrategy = editor => {
    const { change, value } = editor;
    const { text } = value.fragment;

    if (hasLinks(value)) {
        let href = getLink(value).data.get("href");
        href = window.prompt("Change url:", href);
        editor.command(unwrapLink);
        if (href !== "") {
            return editor
                .insertText(text)
                .moveFocusBackward(text.length)
                .command(wrapLink, href);
        }
    } else {
        const href = window.prompt("Enter the URL of the link:");

        if (value.selection.isExpanded && !hasMultiBlocks(value)) {
            if (!href) return;
            editor.command(wrapLink, href).focus();
        } else {
            const { text } = editor.value.fragment;
            editor
                .insertText(text)
                .moveFocusBackward(text.length)
                .command(wrapLink, href);
        }
    }

    return change;
};

export const httpPreffixStrategy = href =>
    href.search("https?://") >= 0 ? href : `http://${href}`;

export const hasLinks = value =>
    value.inlines.some(inline => inline.type === "a");

export const getLink = value =>
    value.inlines.filter(inline => inline.type === "a").first();

export const hasMultiBlocks = value => value.blocks.size > 1;

export const unlink = change => change.unwrapInline("a").focus();

const wrapLink = (editor, href) => {
    editor.wrapInline({
        type: "a",
        data: { href }
    });

    editor.moveToEnd();
};

const unwrapLink = editor => {
    editor.unwrapInline("a");
};
