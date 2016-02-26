import {Component} from 'angular2/core';
import {TabView} from '../../../components/tabview/tabview';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    template: `
        <div class="ContentSideSections">
            <div class="Content100 overHidden TextShadow">
                <span class="fontSize30 TextShadow orange mediumFont marginBottom20 dispBlock">CodeHighlighter</span>
                <span class="defaultText dispTable">CodeHighlighter is an attribute directive to highlight code blocks using PrismJS</span>
            </div>
        </div>

        <div class="ContentSideSections Implementation">
            <h3 class="first">CSS</h3>
<pre>
<code class="language-css" pCode>
.ui-datatable table {
	border-collapse:collapse;
    width: 100%;
    table-layout: fixed;
}
</code>
</pre>
            
            <h3>HTML</h3>
<pre>
<code class="language-markup" pCode>
&lt;div id="pm" style="width:300px"&gt;
    &lt;div&gt;
        &lt;div&gt;&lt;a data-icon="fa-file-o"&gt;File&lt;/a&gt;&lt;/div&gt;
        &lt;div&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;a data-icon="fa-plus"&gt;New&lt;/a&gt;
                    &lt;ul&gt;
                        &lt;li&gt;&lt;a&gt;Project&lt;/a&gt;&lt;/li&gt;
                        &lt;li&gt;&lt;a&gt;Other&lt;/a&gt;&lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/li&gt;
                &lt;li&gt;&lt;a&gt;Open&lt;/a&gt;&lt;/li&gt;
                &lt;li&gt;&lt;a&gt;Quit&lt;/a&gt;&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
</code>
</pre>
            
            <h3>Javascript</h3>
<pre>
<code class="language-javascript" pCode>
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}
</code>
</pre>

            <h3>Typescript</h3>
<pre>
<code class="language-typescript" pCode>
import {Directive, ElementRef, OnInit} from 'angular2/core';

declare var Prism: any;

@Directive({
    selector: '[pCode]'
})
export class CodeHighlighter implements OnInit {
        
    constructor(private el: ElementRef) {}
    
    ngOnInit() {
        Prism.highlightElement(this.el.nativeElement);
    }
}
</code>
</pre>
        </div>

        <div class="ContentSideSections Source">
            <p-tabView effect="fade">
                <p-tabPanel header="Documentation">
                            <h3>Import</h3>
<pre>
<code class="language-typescript" pCode>
import {CodeHighlighter} from 'primeng/primeng';
</code>
</pre>

                    <h3>Getting Started</h3>
                    <p>CodeHighlighter is applied to a code element with [pCode] directive. The &lt;code&gt; should have
                    a style class having language- prefix to specify the language to highlight. See Prismjs docs for the list of available languages.
                    An example block with css code would be as follows.</p>
                    
<pre>
<code class="language-markup" pCode>
&lt;pre&gt;
&lt;code class="language-css" pCode&gt;
.ui-datatable table {
	border-collapse:collapse;
    width: 100%;
    table-layout: fixed;
}
&lt;/code&gt;
&lt;/pre&gt;
</code>
</pre>                        
                    <h3>Dependencies</h3>
                    <p>Prismjs</p>
                </p-tabPanel>
             </p-tabView>
        </div>
    `,
    directives: [CodeHighlighter,TabPanel,TabView,ROUTER_DIRECTIVES]
})
export class CodeHighlighterDemo {

    clicks: number = 0;

    count() {
        this.clicks++;
    }
}