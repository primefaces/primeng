import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Galleria } from 'primeng/galleria';
import { Code } from '../../domain/code';
import { PhotoService } from '../../service/photoservice';

@Component({
    selector: 'galleria-advanced-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Galleria can be extended further to implement complex requirements.</p>
        </app-docsectiontext>
        <div class="card">
            <p-galleria
                #galleria
                [(value)]="images"
                [(activeIndex)]="activeIndex"
                [numVisible]="5"
                [showThumbnails]="showThumbnails"
                [showItemNavigators]="true"
                [showItemNavigatorsOnHover]="true"
                [circular]="true"
                [autoPlay]="true"
                [transitionInterval]="3000"
                [containerStyle]="{ 'max-width': '640px' }"
                [containerClass]="galleriaClass()"
            >
                <ng-template pTemplate="item" let-item>
                    <img [src]="item.itemImageSrc" [ngStyle]="{ width: !fullscreen ? '100%' : '', display: !fullscreen ? 'block' : '' }" />
                </ng-template>
                <ng-template pTemplate="thumbnail" let-item>
                    <div class="grid grid-nogutter justify-content-center">
                        <img [src]="item.thumbnailImageSrc" />
                    </div>
                </ng-template>
                <ng-template pTemplate="footer" let-item>
                    <div class="custom-galleria-footer">
                        <button type="button" pButton icon="pi pi-list" (click)="onThumbnailButtonClick()"></button>
                        <span *ngIf="images" class="title-container">
                            <span>{{ activeIndex + 1 }}/{{ images.length }}</span>
                            <span class="title">{{ images[activeIndex].title }}</span>
                            <span>{{ images[activeIndex].alt }}</span>
                        </span>
                        <button type="button" pButton [icon]="fullScreenIcon()" (click)="toggleFullScreen()" class="fullscreen-button"></button>
                    </div>
                </ng-template>
            </p-galleria>
        </div>
        <app-code [code]="code" selector="galleria-advanced-demo"></app-code>
    </section>`
})
export class AdvancedDoc implements OnInit, OnDestroy {
    @Input() id: string;

    @Input() title: string;

    images: any[] | undefined;

    showThumbnails: boolean | undefined;

    fullscreen: boolean = false;

    activeIndex: number = 0;

    onFullScreenListener: any;

    @ViewChild('galleria') galleria: Galleria | undefined;

    constructor(@Inject(PLATFORM_ID) private platformId: any, private photoService: PhotoService, private cd: ChangeDetectorRef) {}

    responsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    ngOnInit() {
        this.photoService.getImages().then((images) => (this.images = images));
        this.bindDocumentListeners();
    }

    onThumbnailButtonClick() {
        this.showThumbnails = !this.showThumbnails;
    }

    toggleFullScreen() {
        if (this.fullscreen) {
            this.closePreviewFullScreen();
        } else {
            this.openPreviewFullScreen();
        }

        this.cd.detach();
    }

    openPreviewFullScreen() {
        let elem = this.galleria?.element.nativeElement.querySelector('.p-galleria');
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem['mozRequestFullScreen']) {
            /* Firefox */
            elem['mozRequestFullScreen']();
        } else if (elem['webkitRequestFullscreen']) {
            /* Chrome, Safari & Opera */
            elem['webkitRequestFullscreen']();
        } else if (elem['msRequestFullscreen']) {
            /* IE/Edge */
            elem['msRequestFullscreen']();
        }
    }

    onFullScreenChange() {
        this.fullscreen = !this.fullscreen;
        this.cd.detectChanges();
        this.cd.reattach();
    }

    closePreviewFullScreen() {
        if (isPlatformBrowser(this.platformId)) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document['mozCancelFullScreen']) {
                document['mozCancelFullScreen']();
            } else if (document['webkitExitFullscreen']) {
                document['webkitExitFullscreen']();
            } else if (document['msExitFullscreen']) {
                document['msExitFullscreen']();
            }
        }
    }

    bindDocumentListeners() {
        if (isPlatformBrowser(this.platformId)) {
            this.onFullScreenListener = this.onFullScreenChange.bind(this);
            document.addEventListener('fullscreenchange', this.onFullScreenListener);
            document.addEventListener('mozfullscreenchange', this.onFullScreenListener);
            document.addEventListener('webkitfullscreenchange', this.onFullScreenListener);
            document.addEventListener('msfullscreenchange', this.onFullScreenListener);
        }
    }

    unbindDocumentListeners() {
        if (isPlatformBrowser(this.platformId)) {
            document.removeEventListener('fullscreenchange', this.onFullScreenListener);
            document.removeEventListener('mozfullscreenchange', this.onFullScreenListener);
            document.removeEventListener('webkitfullscreenchange', this.onFullScreenListener);
            document.removeEventListener('msfullscreenchange', this.onFullScreenListener);
            this.onFullScreenListener = null;
        }
    }

    ngOnDestroy() {
        this.unbindDocumentListeners();
    }

    galleriaClass() {
        return `custom-galleria ${this.fullscreen ? 'fullscreen' : ''}`;
    }

    fullScreenIcon() {
        return `pi ${this.fullscreen ? 'pi-window-minimize' : 'pi-window-maximize'}`;
    }

    code: Code = {
        basic: `
<p-galleria
    #galleria
    [(value)]="images"
    [(activeIndex)]="activeIndex"
    [numVisible]="5"
    [showThumbnails]="showThumbnails"
    [showItemNavigators]="true"
    [showItemNavigatorsOnHover]="true"
    [circular]="true"
    [autoPlay]="true"
    [transitionInterval]="3000"
    [containerStyle]="{ 'max-width': '640px' }"
    [containerClass]="galleriaClass()"
>
    <ng-template pTemplate="item" let-item>
        <img [src]="item.itemImageSrc" [ngStyle]="{ width: !fullscreen ? '100%' : '', display: !fullscreen ? 'block' : '' }" />
    </ng-template>
    <ng-template pTemplate="thumbnail" let-item>
        <div class="grid grid-nogutter justify-content-center">
            <img [src]="item.thumbnailImageSrc" />
        </div>
    </ng-template>
    <ng-template pTemplate="footer" let-item>
        <div class="custom-galleria-footer">
            <button type="button" pButton icon="pi pi-list" (click)="onThumbnailButtonClick()"></button>
            <span *ngIf="images" class="title-container">
                <span>{{ activeIndex + 1 }}/{{ images.length }}</span>
                <span class="title">{{ images[activeIndex].title }}</span>
                <span>{{ images[activeIndex].alt }}</span>
            </span>
            <button type="button" pButton [icon]="fullScreenIcon()" (click)="toggleFullScreen()" class="fullscreen-button"></button>
        </div>
    </ng-template>
</p-galleria>`,
        html: `
 <div class="card">
    <p-galleria #galleria [(value)]="images" [(activeIndex)]="activeIndex" [numVisible]="5" [showThumbnails]="showThumbnails" [showItemNavigators]="true" [showItemNavigatorsOnHover]="true" [circular]="true" [autoPlay]="true" [transitionInterval]="3000" [containerStyle]="{'width':'100%'}" [containerClass]="galleriaClass()"> 
        <ng-template pTemplate="item" let-item>
            <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
        </ng-template>
        <ng-template pTemplate="thumbnail" let-item>
            <div class="grid grid-nogutter justify-content-center">
                <img [src]="item.thumbnailImageSrc" style="display: block;" />
            </div>
        </ng-template>
    </p-galleria>
</div>`,
        typescript: `
import { ChangeDetectorRef, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Galleria } from 'primeng/galleria';
import { PhotoService } from '../../service/photoservice';

@Component({
    selector: 'galleria-advanced-demo',
    templateUrl: './galleria-advanced-demo.html',
    styleUrls: ['./galleria-advanced-demo.scss']
})
export class GalleriaAdvancedDemo implements OnInit, OnDestroy {

    images: any[] | undefined;

    showThumbnails: boolean | undefined;

    fullscreen: boolean = false;

    activeIndex: number = 0;

    onFullScreenListener: any;

    @ViewChild('galleria') galleria: Galleria | undefined;

    responsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];
    
    ngOnInit() {
        this.photoService.getImages().then((images) => (this.images = images));
        this.bindDocumentListeners();
    }

    onThumbnailButtonClick() {
        this.showThumbnails = !this.showThumbnails;
    }

    toggleFullScreen() {
        if (this.fullscreen) {
            this.closePreviewFullScreen();
        } else {
            this.openPreviewFullScreen();
        }

        this.cd.detach();
    }

    openPreviewFullScreen() {
        let elem = this.galleria?.element.nativeElement.querySelector('.p-galleria');
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem['mozRequestFullScreen']) {
            /* Firefox */
            elem['mozRequestFullScreen']();
        } else if (elem['webkitRequestFullscreen']) {
            /* Chrome, Safari & Opera */
            elem['webkitRequestFullscreen']();
        } else if (elem['msRequestFullscreen']) {
            /* IE/Edge */
            elem['msRequestFullscreen']();
        }
    }

    onFullScreenChange() {
        this.fullscreen = !this.fullscreen;
        this.cd.detectChanges();
        this.cd.reattach();
    }

    closePreviewFullScreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document['mozCancelFullScreen']) {
            document['mozCancelFullScreen']();
        } else if (document['webkitExitFullscreen']) {
            document['webkitExitFullscreen']();
        } else if (document['msExitFullscreen']) {
            document['msExitFullscreen']();
        }
    }

    bindDocumentListeners() {
        this.onFullScreenListener = this.onFullScreenChange.bind(this);
        document.addEventListener('fullscreenchange', this.onFullScreenListener);
        document.addEventListener('mozfullscreenchange', this.onFullScreenListener);
        document.addEventListener('webkitfullscreenchange', this.onFullScreenListener);
        document.addEventListener('msfullscreenchange', this.onFullScreenListener);
    }

    unbindDocumentListeners() {
        document.removeEventListener('fullscreenchange', this.onFullScreenListener);
        document.removeEventListener('mozfullscreenchange', this.onFullScreenListener);
        document.removeEventListener('webkitfullscreenchange', this.onFullScreenListener);
        document.removeEventListener('msfullscreenchange', this.onFullScreenListener);
        this.onFullScreenListener = null;
    }

    ngOnDestroy() {
        this.unbindDocumentListeners();
    }

    galleriaClass() {
        return \`custom-galleria \${this.fullscreen ? 'fullscreen' : ''}\`;
    }

    fullScreenIcon() {
        return \`pi \${this.fullscreen ? 'pi-window-minimize' : 'pi-window-maximize'}\`;
    }
}`,
        data: `
/* PhotoService */
{
    itemImageSrc: 'https://primeng.org/images/galleria/galleria1.jpg',
    thumbnailImageSrc: 'https://primeng.org/images/galleria/galleria1s.jpg',
    alt: 'Description for Image 1',
    title: 'Title 1'
},
...`,
        scss: `
:host ::ng-deep {
    .custom-galleria {
        &.p-galleria {
            &.fullscreen {
                display: flex;
                flex-direction: column;
    
                .p-galleria-content {
                    flex-grow: 1;
                    justify-content: center;
                }
            }
    
            .p-galleria-content {
                position: relative;
            }
    
            .p-galleria-thumbnail-wrapper {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
            }
    
            .p-galleria-thumbnail-items-container {
                width: 100%;
            }
    
            .custom-galleria-footer {
                display: flex;
                align-items: center;
                background-color: rgba(0, 0, 0, .9);
                color: #ffffff;
    
                > button {
                    background-color: transparent;
                    color: #ffffff;
                    border: 0 none;
                    border-radius: 0;
                    margin: .2rem 0;
    
                    &.fullscreen-button {
                        margin-left: auto;
                    }
    
                    &:hover {
                        background-color: rgba(255, 255, 255, 0.1);
                    }
                }
            }
    
            .title-container {
                > span {
                    font-size: .9rem;
                    padding-left: .829rem;
    
                    &.title {
                        font-weight: bold;
                    }
                }
            }
        }
    }
}`,
        service: ['PhotoService']
    };
}
