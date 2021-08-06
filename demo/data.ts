export const data = `

<h1 id="h1-heading-8-">h1 Heading 8-)</h1>
<h2 id="h2-heading">h2 Heading</h2>
<h3 id="h3-heading">h3 Heading</h3>
<h4 id="h4-heading">h4 Heading</h4>
<h5 id="h5-heading">h5 Heading</h5>
<h6 id="h6-heading">h6 Heading</h6>
<p><img src="//www.esa.int/var/esa/storage/images/esa_multimedia/videos/2018/05/mars_sample_return/17493376-1-eng-GB/Mars_sample_return_pillars.jpg" alt="My Image Name"></p>
<h2 id="horizontal-rules">Horizontal Rules</h2>
<hr>
<hr>
<hr>
<p>This article discusses how to customize Draft default block rendering. The block rendering is used to define supported block types and their respective renderers, as well as converting pasted content to known Draft block types.</p>
<p>When pasting content, or when calling convertFromHTML, Draft will convert pasted content to the respective block rendering type by matching the Draft block render map with the matched tag.</p>
<h2 id="emphasis">Emphasis</h2>
<p><strong>This is bold text</strong></p>
<p><strong>This is bold text</strong></p>
<p><em>This is italic text</em></p>
<p><em>This is italic text</em></p>
<p><del>Strikethrough</del></p>
<h2 id="blockquotes">Blockquotes</h2>

<blockquote>
...by using additional greater-than signs right next to each other...
</blockquote>
<h2 id="lists">Lists</h2>
<p>Unordered</p>
<ul>
<li>Sub-lists are made by indenting 2 spaces:<ul>
<li>Marker character change forces new list start:<ul>
<li>Ac tristique libero volutpat at</li>
<li>Facilisis in pretium nisl aliquet</li>
<li>Nulla volutpat aliquam velit</li>
</ul>
</li>
</ul>
</li>
<li>Very easy!</li>
</ul>
<p>Ordered</p>
<ol>
<li>Lorem ipsum dolor sit amet</li>
<li>Consectetur adipiscing elit</li>
<li>Integer molestie lorem at massa</li>
</ol>
<ol>
<li>You can use sequential numbers...</li>

</ol>
<p>Start numbering with offset:</p>
<ol>
<li>foo</li>
<li>bar</li>
</ol>
<h2 id="code">Code</h2>
<p>Indented code</p>
<pre><code><span class="hljs-comment">// Some comments</span>
line <span class="hljs-number">1</span> <span class="hljs-keyword">of</span> <span class="hljs-keyword">code</span>
line <span class="hljs-number">2</span> <span class="hljs-keyword">of</span> <span class="hljs-keyword">code</span>
line <span class="hljs-number">3</span> <span class="hljs-keyword">of</span> <span class="hljs-keyword">code</span>
</code></pre><p>Block code &quot;fences&quot;</p>
<p>Syntax highlighting</p>
<pre>
var foo = function (bar) {
  return bar++;
};</p>
<p>console.log(foo(5));
</pre>
<h2 id="links">Links</h2>
<p><a href="http://dev.nodeca.com">link text</a></p>
<p><a href="http://nodeca.github.io/pica/demo/" title="title text!">link with title</a></p>
<p>Autoconverted link <a href="https://github.com/nodeca/pica">https://github.com/nodeca/pica</a> (enable linkify to see)</p>
<h2 id="images">Images</h2>

`;
