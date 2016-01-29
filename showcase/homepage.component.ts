import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    template: `
        <div class="ContentSideSections overHidden">
            <div class="Content33 floatLeft overHidden TextShadow">
                <span class="defaultTopic mediumFont dispTable">PrimeNG</span>
                <span class="defaultText dispTable">PrimeNG is a collection of rich UI components for AngularJS2. PrimeNG is a sibling of the popular JavaServer Faces Component Suite, <a href="http://www.primefaces.org">PrimeFaces</a>.</span>
                <br />
                <span class="defaultText dispTable">All widgets are open source and free to use under Apache License 2.0, a commercial friendly license.</span>
                <br />
                <span class="defaultText dispTable">For project news and updates, follow us on <a href="https://twitter.com/prime_ng">twitter</a>.</span>
                <a href="https://github.com/primefaces/primeng/releases" class="BigButton TextShadowNone YellowBtn"> <span class="floatLeft">Download</span> <img src="showcase/resources/images/btnArrow.svg" style="float:right"/></a>
                <a href="https://github.com/primefaces/primeng" class="BigButton TextShadowNone OrangeBtn"> <span class="floatLeft">View on GitHub</span> <img src="showcase/resources/images/btnDocumenticon.svg" style="float:right"/></a>
            </div>
            <div class="Content66 floatRight overHidden">
                <div class="PropertyBox TextShadow">
                    <img src="showcase/resources/images/ajaxFramework.svg" />
                    <span class="PropertyTopic boldFont">PRIMEFACES UI</span>
                    <span class="PropertyText mediumFont">Derived from the mighty PrimeFaces</span>
                </div>
                <div class="PropertyBox TextShadow">
                    <img src="showcase/resources/images/components.svg" />
                    <span class="PropertyTopic boldFont">WIDGETS</span>
                    <span class="PropertyText mediumFont">Rich Set of Components<br />Easy to Use<br />Accessible</span>
                </div>
                <div class="PropertyBox TextShadow">
                    <img src="showcase/resources/images/productivity.svg" />
                    <span class="PropertyTopic boldFont">PRODUCTIVITY</span>
                    <span class="PropertyText mediumFont">Simple<br />Lightweight<br />Powerful</span>
                </div>
                <div class="PropertyBox TextShadow">
                    <img src="showcase/resources/images/mobile.svg" />
                    <span class="PropertyTopic boldFont">MOBILE</span>
                    <span class="PropertyText mediumFont">Responsive<br />Cross Browser<br />Touch Optimized</span>
                </div>
                <div class="PropertyBox TextShadow">
                    <img src="showcase/resources/images/community.svg"/>
                    <span class="PropertyTopic boldFont">COMMUNITY</span>
                    <span class="PropertyText mediumFont">Active<br />Vibrant<br />Open Source<br /></span>
                </div>
                <div class="PropertyBox TextShadow">
                    <img src="showcase/resources/images/themeswitcher.svg" />
                    <span class="PropertyTopic boldFont">THEMES</span>
                    <span class="PropertyText mediumFont">35+ Free Themes<br />Premium Themes<br />Theme Creator Tool<br /></span>
                </div>
            </div>
        </div>

        <div class="ContentSideSections overHidden PFLayouts">
            <span class="dispBlock logoBlueText fontSize30 mediumFont">Premium Layouts and Themes coming soon...</span>
            <span class="defaultText">Create <a href="http://www.primefaces.org/themes">awesome web applications</a> in no time, impress your users.</span>
            <div style="padding:30px">
                <div class="Content33 floatLeft overHidden">
                    <a href="http://www.primefaces.org/layouts/modena-primeui"><img src="showcase/resources/images/layouts/modena.png" style="width:100%" /></a>
                </div>
                <div class="Content33 floatLeft overHidden">
                    <a href="http://www.primefaces.org/layouts/rio-primeui"><img src="showcase/resources/images/layouts/rio.png" style="width:100%" /></a>
                </div>
                <div class="Content33 floatLeft overHidden">
                    <a href="http://www.primefaces.org/layouts/adamantium-primeui"><img src="showcase/resources/images/layouts/adamantium.png" style="width:100%" /></a>
                </div>
            </div>
        </div>
    `
})
export class HomePageComponent {

}