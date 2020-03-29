module.exports = {
  "List": {
    "test list": {
      "1": "<h1><div><span><span><span>- list 1</span></span></span></div></h1><div><span><span><span>list 2</span></span></span></div><div><span><span><span>﻿<br></span></span></span></div>"
    },
    "test exiting list with double enter": {
      "1": "<h1><div><span><span><span>- list 1</span></span></span></div></h1><div><span><span><span>list 2</span></span></span></div><div><span><span><span>﻿<br></span></span></span></div><div><span><span><span>﻿<br></span></span></span></div><div><span><span><span>﻿<br></span></span></span></div>"
    },
    "test backspace": {
      "1": "<h1><div><span><span><span> list 1</span></span></span></div></h1><div><span><span><span>list 2-</span></span></span></div><div><span><span><span>﻿<br></span></span></span></div>"
    },
    "test merging list": {
      "1": "<h1><div><span><span><span>- list 1</span></span></span></div></h1><div><span><span><span>list 2</span></span></span></div><div><span><span><span>﻿<br></span></span></span></div><ul><li editor=\"[object Object]\" parent=\"t { &quot;data&quot;: Map {}, &quot;key&quot;: &quot;335&quot;, &quot;nodes&quot;: List [ t { &quot;data&quot;: Map {}, &quot;key&quot;: &quot;324&quot;, &quot;nodes&quot;: List [ t { &quot;data&quot;: Map {}, &quot;key&quot;: &quot;336&quot;, &quot;nodes&quot;: List [ t { &quot;leaves&quot;: List [ t { &quot;marks&quot;: Set {}, &quot;text&quot;: &quot;list 3&quot; } ], &quot;key&quot;: &quot;323&quot; } ], &quot;type&quot;: &quot;paragraph&quot; } ], &quot;type&quot;: &quot;list-item&quot; }, t { &quot;data&quot;: Map {}, &quot;key&quot;: &quot;456&quot;, &quot;nodes&quot;: List [ t { &quot;data&quot;: Map {}, &quot;key&quot;: &quot;455&quot;, &quot;nodes&quot;: List [ t { &quot;leaves&quot;: List [ t { &quot;marks&quot;: Set {}, &quot;text&quot;: &quot;&quot; } ], &quot;key&quot;: &quot;454&quot; } ], &quot;type&quot;: &quot;paragraph&quot; } ], &quot;type&quot;: &quot;list-item&quot; } ], &quot;type&quot;: &quot;bulleted-list&quot; }\"><div><span><span><span>list 3</span></span></span></div></li></ul><div><span><span><span>﻿<br></span></span></span></div><div><span><span><span>﻿<br></span></span></span></div>"
    },
    "test numbered list": {
      "1": "<h1><div><span><span><span>1. list 1</span></span></span></div></h1><div><span><span><span>list 2</span></span></span></div><div><span><span><span>﻿<br></span></span></span></div><div><span><span><span>This is a normal line</span></span></span></div><div><span><span><span>﻿<br></span></span></span></div>"
    }
  },
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
      "1": "<div><div style=\"height: 0px; color: transparent; outline: none; position: absolute;\"><span><span><span>﻿</span></span></span></div><div contenteditable=\"false\"><hr></div></div><ul><li editor=\"[object Object]\" parent=\"t { &quot;data&quot;: Map {}, &quot;key&quot;: &quot;186&quot;, &quot;nodes&quot;: List [ t { &quot;data&quot;: Map {}, &quot;key&quot;: &quot;174&quot;, &quot;nodes&quot;: List [ t { &quot;data&quot;: Map {}, &quot;key&quot;: &quot;187&quot;, &quot;nodes&quot;: List [ t { &quot;leaves&quot;: List [ t { &quot;marks&quot;: Set {}, &quot;text&quot;: &quot;&quot; } ], &quot;key&quot;: &quot;175&quot; } ], &quot;type&quot;: &quot;paragraph&quot; } ], &quot;type&quot;: &quot;list-item&quot; } ], &quot;type&quot;: &quot;bulleted-list&quot; }\"><div><span><span><span>﻿<br></span></span></span></div></li></ul><div><span><span><span>﻿<br></span></span></span></div>"
    },
    "tests unordered list": {
      "1": "<ul><li editor=\"[object Object]\" parent=\"t { &quot;data&quot;: Map {}, &quot;key&quot;: &quot;169&quot;, &quot;nodes&quot;: List [ t { &quot;data&quot;: Map {}, &quot;key&quot;: &quot;1&quot;, &quot;nodes&quot;: List [ t { &quot;data&quot;: Map {}, &quot;key&quot;: &quot;170&quot;, &quot;nodes&quot;: List [ t { &quot;leaves&quot;: List [ t { &quot;marks&quot;: Set {}, &quot;text&quot;: &quot;list 1&quot; } ], &quot;key&quot;: &quot;2&quot; } ], &quot;type&quot;: &quot;paragraph&quot; } ], &quot;type&quot;: &quot;list-item&quot; }, t { &quot;data&quot;: Map {}, &quot;key&quot;: &quot;292&quot;, &quot;nodes&quot;: List [ t { &quot;data&quot;: Map {}, &quot;key&quot;: &quot;291&quot;, &quot;nodes&quot;: List [ t { &quot;leaves&quot;: List [ t { &quot;marks&quot;: Set {}, &quot;text&quot;: &quot;&quot; } ], &quot;key&quot;: &quot;290&quot; } ], &quot;type&quot;: &quot;paragraph&quot; } ], &quot;type&quot;: &quot;list-item&quot; } ], &quot;type&quot;: &quot;bulleted-list&quot; }\"><div><span><span><span>list 1</span></span></span></div></li><li editor=\"[object Object]\" parent=\"t { &quot;data&quot;: Map {}, &quot;key&quot;: &quot;169&quot;, &quot;nodes&quot;: List [ t { &quot;data&quot;: Map {}, &quot;key&quot;: &quot;1&quot;, &quot;nodes&quot;: List [ t { &quot;data&quot;: Map {}, &quot;key&quot;: &quot;170&quot;, &quot;nodes&quot;: List [ t { &quot;leaves&quot;: List [ t { &quot;marks&quot;: Set {}, &quot;text&quot;: &quot;list 1&quot; } ], &quot;key&quot;: &quot;2&quot; } ], &quot;type&quot;: &quot;paragraph&quot; } ], &quot;type&quot;: &quot;list-item&quot; }, t { &quot;data&quot;: Map {}, &quot;key&quot;: &quot;292&quot;, &quot;nodes&quot;: List [ t { &quot;data&quot;: Map {}, &quot;key&quot;: &quot;291&quot;, &quot;nodes&quot;: List [ t { &quot;leaves&quot;: List [ t { &quot;marks&quot;: Set {}, &quot;text&quot;: &quot;list 2&quot; } ], &quot;key&quot;: &quot;290&quot; } ], &quot;type&quot;: &quot;paragraph&quot; } ], &quot;type&quot;: &quot;list-item&quot; } ], &quot;type&quot;: &quot;bulleted-list&quot; }\"><div><span><span><span>list 2</span></span></span></div></li></ul><div><span><span><span>﻿<br></span></span></span></div>"
    },
    "tests ordered list": {
      "1": "<ol><li editor=\"[object Object]\" parent=\"t { &quot;data&quot;: Map {}, &quot;key&quot;: &quot;179&quot;, &quot;nodes&quot;: List [ t { &quot;data&quot;: Map {}, &quot;key&quot;: &quot;1&quot;, &quot;nodes&quot;: List [ t { &quot;data&quot;: Map {}, &quot;key&quot;: &quot;180&quot;, &quot;nodes&quot;: List [ t { &quot;leaves&quot;: List [ t { &quot;marks&quot;: Set {}, &quot;text&quot;: &quot;list 1&quot; } ], &quot;key&quot;: &quot;2&quot; } ], &quot;type&quot;: &quot;paragraph&quot; } ], &quot;type&quot;: &quot;list-item&quot; }, t { &quot;data&quot;: Map {}, &quot;key&quot;: &quot;302&quot;, &quot;nodes&quot;: List [ t { &quot;data&quot;: Map {}, &quot;key&quot;: &quot;301&quot;, &quot;nodes&quot;: List [ t { &quot;leaves&quot;: List [ t { &quot;marks&quot;: Set {}, &quot;text&quot;: &quot;&quot; } ], &quot;key&quot;: &quot;300&quot; } ], &quot;type&quot;: &quot;paragraph&quot; } ], &quot;type&quot;: &quot;list-item&quot; } ], &quot;type&quot;: &quot;ordered-list&quot; }\"><div><span><span><span>list 1</span></span></span></div></li><li editor=\"[object Object]\" parent=\"t { &quot;data&quot;: Map {}, &quot;key&quot;: &quot;179&quot;, &quot;nodes&quot;: List [ t { &quot;data&quot;: Map {}, &quot;key&quot;: &quot;1&quot;, &quot;nodes&quot;: List [ t { &quot;data&quot;: Map {}, &quot;key&quot;: &quot;180&quot;, &quot;nodes&quot;: List [ t { &quot;leaves&quot;: List [ t { &quot;marks&quot;: Set {}, &quot;text&quot;: &quot;list 1&quot; } ], &quot;key&quot;: &quot;2&quot; } ], &quot;type&quot;: &quot;paragraph&quot; } ], &quot;type&quot;: &quot;list-item&quot; }, t { &quot;data&quot;: Map {}, &quot;key&quot;: &quot;302&quot;, &quot;nodes&quot;: List [ t { &quot;data&quot;: Map {}, &quot;key&quot;: &quot;301&quot;, &quot;nodes&quot;: List [ t { &quot;leaves&quot;: List [ t { &quot;marks&quot;: Set {}, &quot;text&quot;: &quot;list 2&quot; } ], &quot;key&quot;: &quot;300&quot; } ], &quot;type&quot;: &quot;paragraph&quot; } ], &quot;type&quot;: &quot;list-item&quot; } ], &quot;type&quot;: &quot;ordered-list&quot; }\"><div><span><span><span>list 2</span></span></span></div></li></ol><div><span><span><span>﻿<br></span></span></span></div>"
    }
  },
  "Menu": {
    "clearing editor": {
      "1": "<h1><div><span><span><span>﻿<br></span></span></span></div></h1><div><span><span><span>﻿<br></span></span></span></div>"
    },
    "headings 1": {
      "1": "<div><span><span><span>These is a sample line of text</span></span></span></div><div><span><span><span>﻿<br></span></span></span></div>"
    },
    "headings 2": {
      "1": "<h2><div><span><span><span>These is a sample line of text</span></span></span></div></h2><div><span><span><span>﻿<br></span></span></span></div>"
    }
  },
  "__version": "3.8.3"
}
