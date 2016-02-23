import {Component} from 'angular2/core';
import {TabView} from '../../../components/tabview/tabview';
import {pCode} from '../../../components/codehighlighter/codehighlighter';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Button} from '../../../components/button/button';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    template: `
        <div class="ContentSideSections">
            <div class="Content100 overHidden TextShadow">
                <span class="fontSize30 TextShadow orange mediumFont marginBottom20 dispBlock">CodeHighlighter</span>
                <span class="defaultText dispTable">CodeHighlighter is an extension from Prismjs and its used for highlihts the specific element in the DOM.</span>
            </div>
        </div>

        <div class="ContentSideSections Implementation">
            <h3>CSS Highlihter</h3>
<pre>
<code class="language-css" pCode>
.ui-datatable table {
	border-collapse:collapse;
    width: 100%;
    table-layout: fixed;
}
</code>
</pre>
            
            <h3>HTML Highlihter</h3>
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
            
            <h3>Javascript Highlihter</h3>
<pre>
<code class="language-javascript" pCode>
$('#tbllocal').puidatatable({
    caption: 'Local Datasource',
    columns: [
        {field: 'vin', headerText: 'Vin'},
        {field: 'brand', headerText: 'Brand'},
        {field: 'year', headerText: 'Year'},
        {field: 'color', headerText: 'Color'}
    ],
    datasource: localData
});
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
                    <p>CodeHighlighter is applied to code element with pCode directive.</p>
                    
<pre>
<code class="language-markup" pCode>
&lt;code class="language-markup" pCode&gt;&lt;/code&gt;
</code>
</pre>
                    <h3>Dependencies</h3>
                    <p>Prismjs</p>
                </p-tabPanel>
                <p-tabPanel header="Source">
                <pre><code class="language-markup" pCode>
<h3>CSS Highlihter</h3>
&lt;pre&gt;
&lt;code class="language-css" pCode&gt;
.ui-datatable table {
border-collapse:collapse;
width: 100%;
table-layout: fixed;
}
&lt;/code&gt;
&lt;/pre&gt;

&lt;h3&gt;HTML Highlihter&lt;/h3&gt;
&lt;pre&gt;
&lt;code class="language-markup" pCode&gt;
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
&lt;/code&gt;
&lt;/pre&gt;

&lt;h3&gt;Javascript Highlihter&lt;/h3&gt;
&lt;pre&gt;
&lt;code class="language-javascript" pCode&gt;
$('#tbllocal').puidatatable({
caption: 'Local Datasource',
columns: [
{field: 'vin', headerText: 'Vin'},
{field: 'brand', headerText: 'Brand'},
{field: 'year', headerText: 'Year'},
{field: 'color', headerText: 'Color'}
],
datasource: localData
});
&lt;/code&gt;
&lt;/pre&gt;
                </code></pre>
                </ p-tabPanel>
             </p-tabView >
        </div>
    `,
    directives: [pCode,Button,TabPanel,TabView,ROUTER_DIRECTIVES]
})
export class CodeHighlighterDemo {

    clicks: number = 0;

    count() {
        this.clicks++;
    }
}