import {Component} from 'angular2/core';
import {GalleriaComponent} from '../galleria.component';

@Component({
    template: `
        <div class="ContentSideSections">
            <div class="Content100 overHidden TextShadow">
                <span class="fontSize30 TextShadow orange mediumFont marginBottom20 dispBlock">Galleria</span>
                <span class="defaultText dispTable">Galleria is a content gallery component.</span>
            </div>
        </div>

        <div class="ContentSideSections Implementation">
            <p-galleria panelWidth="500" panelHeight="313">
                <ul>
                    <li *ngFor="#image of images;#i = index;">
                        <img src="resources/demo/images/galleria/{{image}}" alt="Description for Image {{i}}" title="Image {{i}}"/>
                    </li>
                </ul>
            </p-galleria>
        </div>
    `,
    directives: [GalleriaComponent]
})
export class GalleriaDemoComponent {

    images: string[] = ['galleria1.jpg', 'galleria2.jpg', 'galleria3.jpg', 'galleria4.jpg', 'galleria5.jpg', 'galleria6.jpg', 'galleria7.jpg', 'galleria8.jpg',
        'galleria9.jpg', 'galleria10.jpg', 'galleria11.jpg', 'galleria12.jpg'];
}