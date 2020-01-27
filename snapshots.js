module.exports = {
  "Markdown": {
    "tests italic": {
      "1": "<div><span><span><span>__foo_</span></span></span></div>"
    },
    "tests bold": {
      "1": "<div><span><span><span>**foo*</span></span></span></div>"
    },
    "tests blockquote": {
      "1": "<blockquote><div><span><span><span>foo</span></span></span></div></blockquote><div><span><span><span>﻿<br></span></span></span></div>"
    },
    "tests heading": {
      "1": "<h1><div><span><span><span>foo</span></span></span></div></h1><div><span><span><span>﻿<br></span></span></span></div>"
    },
    "tests highlight": {
      "1": "<div><span><span><span>`foo`</span></span></span></div>"
    },
    "separator": {
      "1": "<div><div style=\"height: 0px; color: transparent; outline: none; position: absolute;\"><span><span><span>﻿</span></span></span></div><div contenteditable=\"false\"><hr></div></div><div><span><span><span> </span></span></span></div>"
    },
    "tests unordered list": {
      "1": "<ul><li><div><span><span><span>list 1</span></span></span></div></li><li><div><span><span><span>list 2</span></span></span></div></li></ul><div><span><span><span>﻿<br></span></span></span></div>"
    },
    "tests ordered list": {
      "1": "<ol><li><div><span><span><span>list 1</span></span></span></div></li><li><div><span><span><span>list 2</span></span></span></div></li></ol><div><span><span><span>﻿<br></span></span></span></div>"
    },
    "tests embed youtube": {
      "1": "<div><span><span><span>https://www.youtube.com/watch?v=JjJHOYIVO98</span></span></span></div><div><span><span><span>﻿<br></span></span></span></div>"
    },
    "tests embed gist": {
      "1": "<div><span><span><span>https://gist.github.com/ajaxtown/c5d3ddcc0e634bdc8bfe9a4fbb7b063d?file=For.js</span></span></span></div><div><span><span><span>﻿<br></span></span></span></div>"
    }
  },
  "__version": "3.8.2",
  "Menu": {
    "clearing editor": {
      "1": "<div><span><span><span><span contenteditable=\"false\">Write something nice…</span><span>﻿<br></span></span></span></span></div>"
    },
    "bold": {
      "1": "<div><span><span><strong><span>This is a sample text</span></strong></span></span></div>"
    },
    "italics": {
      "1": "<div><span><span><em><span>This is a sample text</span></em></span></span></div>"
    },
    "blockquote": {
      "1": "<blockquote><div><span><span><span>These is a sample line of text</span></span></span></div></blockquote><div><span><span><span>﻿<br></span></span></span></div>"
    },
    "headings 1": {
      "1": "<h1><div><span><span><span>These is a sample line of text</span></span></span></div></h1><div><span><span><span>﻿<br></span></span></span></div>"
    },
    "headings 2": {
      "1": "<h2><div><span><span><span>These is a sample line of text</span></span></span></div></h2><div><span><span><span>﻿<br></span></span></span></div>"
    },
    "underline": {
      "1": "<div><span><span><u><span>This is a sample text</span></u></span></span></div>"
    }
  }
}
