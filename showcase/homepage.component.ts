import {Component} from '@angular/core';

@Component({
    template: `
        <div class="ContentSideSections overHidden">
            <div class="Content33 floatLeft overHidden TextShadow">
                <div class="defaultTopic">PrimeNG</div>
                <div class="defaultText">PrimeNG is a collection of rich UI components for Angular 2. PrimeNG is a sibling of the popular JavaServer Faces Component Suite, <a href="http://www.primefaces.org">PrimeFaces</a>.</div>
                <br />
                <div class="defaultText">All widgets are open source and free to use under Apache License 2.0, a commercial friendly license.</div>
                <br />
                <div class="defaultText">PrimeNG is developed by <a href="http://www.primetek.com.tr">PrimeTek Informatics</a>, a company with years of expertise in developing open source UI components.
                 For project news and updates, follow us on <a href="https://twitter.com/prime_ng">twitter.</a></div>
                 <br />
                <a [routerLink]="['/setup']" class="BigButton TextShadowNone YellowBtn"> <span class="floatLeft">Download</span> <img src="showcase/resources/images/btnArrow.svg" style="float:right"/></a>
                <a href="https://github.com/primefaces/primeng" class="BigButton TextShadowNone OrangeBtn"> <span class="floatLeft">View on GitHub</span> <img src="showcase/resources/images/btnDocumenticon.svg" style="float:right"/></a>
            </div>
            <div class="Content66 floatRight overHidden">
                <div class="PropertyBox TextShadow">
                    <img src="showcase/resources/images/ajaxFramework.svg" />
                    <span class="PropertyTopic">PRIMEFACES UI</span>
                    <span class="PropertyText">Derived from the mighty PrimeFaces</span>
                </div>
                <div class="PropertyBox TextShadow">
                    <img src="showcase/resources/images/components.svg" />
                    <span class="PropertyTopic">WIDGETS</span>
                    <span class="PropertyText">60+ Components<br />Easy to Use<br />Accessible</span>
                </div>
                <div class="PropertyBox TextShadow">
                    <img src="showcase/resources/images/productivity.svg" />
                    <span class="PropertyTopic">PRODUCTIVITY</span>
                    <span class="PropertyText">Simple<br />Lightweight<br />Powerful</span>
                </div>
                <div class="PropertyBox TextShadow">
                    <img src="showcase/resources/images/mobile.svg" />
                    <span class="PropertyTopic">MOBILE</span>
                    <span class="PropertyText">Responsive<br />Cross Browser<br />Touch Optimized</span>
                </div>
                <div class="PropertyBox TextShadow">
                    <img src="showcase/resources/images/community.svg"/>
                    <span class="PropertyTopic">COMMUNITY</span>
                    <span class="PropertyText">Active<br />Vibrant<br />Open Source<br /></span>
                </div>
                <div class="PropertyBox TextShadow">
                    <img src="showcase/resources/images/themeswitcher.svg" />
                    <span class="PropertyTopic">THEMES</span>
                    <span class="PropertyText">35+ Free Themes<br />Premium Themes<br />Theme Creator Tool<br /></span>
                </div>
            </div>
        </div>
        
        
        <div class="ContentSideSections overHidden defaultText">
            <span class="dispBlock logoBlueText fontSize30">PrimeNG at Keynote of NG-Conf</span>
            <p class="defaultText" style="margin-bottom:10px">PrimeNG has been mentioned at keynote of NG-Conf, watch the full keynote <a href="https://www.youtube.com/watch?v=gdlpE9vPQFs">here</a>.</p>
            <a href="https://www.youtube.com/watch?v=gdlpE9vPQFs">
                <img src="showcase/resources/images/keynote.png" style="width:100%" />
            </a>
        </div>

        <div class="ContentSideSections overHidden PFLayouts">
            <div class="logoBlueText fontSize30">Ultima Material Admin Template for PrimeNG</div>
            <p class="defaultText" style="margin-bottom:10px">Create awesome applications in no time, impress your users.</p>
            <a href="http://www.primefaces.org/layouts/ultima-ng">
                <img alt="Ultima" src="http://www.primefaces.org/images/market/ultima/ultima_layout_biggest.png" style="width:100%"/> 
            </a>
        </div>
        
        <div class="ContentSideSections overHidden defaultText">
            <span class="dispBlock logoBlueText fontSize30">PrimeNG PRO Support</span>
            <p class="defaultText" style="margin-bottom:10px">With PrimeNG PRO, it's easy to support, tune and add features to PrimeNG as if it were an in-house framework.</p>
            <p class="defaultText" style="margin-bottom:10px">PrimeNG PRO is a term based commercial support service. With the exclusive services of Pro account, 
                            you no longer need to post your questions in the community forum and your issues to community issue tracker.</p>
                            
            <h4>Standard PRO Services</h4>
			<ul>
				<li>Access to pro.primefaces.org</li>
				<li>Response within 1 business day.</li>
				<li>Defect patches.</li>
				<li>Private branch management in case you need.</li>
				<li>Customized builds.</li>
				<li>Unlimited number of cases.</li>
				<li>Remote desktop connection.</li>
				<li>Conference calls for discussions.</li>
				<li>High priority to your issues.</li>
			</ul>
						
			<h4>New Features (Optional)</h4>			
						
			<p>New feature and enhancement requests are not available in core services and provided via an hour based model instead.  When you have a feature request we provide an estimate, if you confirm we deliver your request within an estimated timeframe and deduct the amount of work from your hours. These requests can be;</p>

			<ul>
				<li>New components.</li>
				<li>New functionality to existing components.</li>
				<li>Changing the way a certain functionality is implemented.</li>
				<li>Accessibility improvements.</li>
				<li>Proof of Concept implementations of a use case.</li>
				<li>Code reviews to offer best practices.</li>
			</ul>
			
			<p>You can purchase additional hours along with the subscription and also anytime during your subscription period. If your subscription term ends with unused hours, they will be added to your new subscription term in case you extend.</p>
        
            <div style="text-align:center"><a href="mailto:primeng@primetek.com.tr"><img src="showcase/resources/images/quote.png" alt="Get a Quote"></a></div>
        </div>
    `,
})
export class HomePageComponent {

}