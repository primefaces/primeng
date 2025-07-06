import { Code } from '@/domain/code';
import { PhotoService } from '@/service/photoservice';
import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Galleria } from 'primeng/galleria';

@Component({
    selector: 'galleria-advanced-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
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
                [autoPlay]="isAutoPlay"
                [transitionInterval]="3000"
                [containerStyle]="{ 'max-width': '640px' }"
                [containerClass]="galleriaClass()"
            >
                <ng-template #item let-item>
                    <img [src]="item.itemImageSrc" [ngStyle]="{ width: !fullscreen ? '100%' : '', display: !fullscreen ? 'block' : '' }" />
                </ng-template>
                <ng-template #thumbnail let-item>
                    <div class="grid gap-4 justify-center">
                        <img [src]="item.thumbnailImageSrc" style="display: block" />
                    </div>
                </ng-template>
                <ng-template #footer let-item>
                    <div class="flex items-stretch bg-surface-950 text-white h-10">
                        <button
                            type="button"
                            pButton
                            icon="pi pi-th-large"
                            (click)="onThumbnailButtonClick()"
                            class="bg-transparent border-none rounded-none hover:bg-white/10 text-white inline-flex justify-center items-center cursor-pointer px-3"
                        ></button>
                        <button
                            type="button"
                            pButton
                            [icon]="slideButtonIcon()"
                            (click)="toggleAutoSlide()"
                            class="bg-transparent border-none rounded-none hover:bg-white/10 text-white inline-flex justify-center items-center cursor-pointer px-3"
                        ></button>
                        <span *ngIf="images" class="flex items-center gap-4 ml-3">
                            <span class="text-sm">{{ activeIndex + 1 }}/{{ images.length }}</span>
                            <span class="font-bold text-sm">{{ images[activeIndex].title }}</span>
                            <span class="text-sm">{{ images[activeIndex].alt }}</span>
                        </span>
                        <button
                            type="button"
                            pButton
                            [icon]="fullScreenIcon()"
                            (click)="toggleFullScreen()"
                            class="bg-transparent border-none rounded-none hover:bg-white/10 text-white inline-flex justify-center items-center cursor-pointer px-3 ml-auto"
                        ></button>
                    </div>
                </ng-template>
            </p-galleria>
        </div>
        <app-code [code]="code" selector="galleria-advanced-demo"></app-code>
    `
})
export class AdvancedDoc implements OnInit, OnDestroy {
    images: any[] | undefined;

    showThumbnails: boolean = false;

    fullscreen: boolean = false;

    activeIndex: number = 0;

    isAutoPlay: boolean = true;

    onFullScreenListener: any;

    @ViewChild('galleria') galleria: Galleria | undefined;

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private photoService: PhotoService,
        private cd: ChangeDetectorRef
    ) {}

    responsiveOptions: any[] = [
        {
            breakpoint: '1300px',
            numVisible: 4
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];

    ngOnInit() {
        this.photoService.getImages().then((images) => {
            this.images = images;
            this.cd.markForCheck();
        });
        this.bindDocumentListeners();
    }

    onThumbnailButtonClick() {
        this.showThumbnails = !this.showThumbnails;
    }

    toggleAutoSlide() {
        this.isAutoPlay = !this.isAutoPlay;
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

    slideButtonIcon() {
        return this.isAutoPlay ? 'pi pi-pause' : 'pi pi-play';
    }

    fullScreenIcon() {
        return `pi ${this.fullscreen ? 'pi-window-minimize' : 'pi-window-maximize'}`;
    }

    code: Code = {
        basic: `<p-galleria #galleria [(value)]="images" [(activeIndex)]="activeIndex" [numVisible]="5" [showThumbnails]="showThumbnails" [showItemNavigators]="true" [showItemNavigatorsOnHover]="true"
    [circular]="true" [autoPlay]="isAutoPlay" [transitionInterval]="3000" [containerStyle]="{ 'max-width': '640px' }" [containerClass]="galleriaClass()"
>
    <ng-template #item let-item>
        <img [src]="item.itemImageSrc" [ngStyle]="{ width: !fullscreen ? '100%' : '', display: !fullscreen ? 'block' : '' }" />
    </ng-template>
    <ng-template #thumbnail let-item>
        <div class="grid gap-4 justify-center">
            <img [src]="item.thumbnailImageSrc" style="display: block" />
        </div>
    </ng-template>
    <ng-template #footer let-item>
        <div class="flex items-stretch bg-surface-950 text-white h-10">
            <button
                type="button"
                pButton
                icon="pi pi-th-large"
                (click)="onThumbnailButtonClick()"
                class="bg-transparent border-none rounded-none hover:bg-white/10 text-white inline-flex justify-center items-center cursor-pointer px-3"
            ></button>
            <button
                type="button"
                pButton
                [icon]="slideButtonIcon()"
                (click)="toggleAutoSlide()"
                class="bg-transparent border-none rounded-none hover:bg-white/10 text-white inline-flex justify-center items-center cursor-pointer px-3"
            ></button>
            <span *ngIf="images" class="flex items-center gap-4 ml-3">
                <span class="text-sm">{{ activeIndex + 1 }}/{{ images.length }}</span>
                <span class="font-bold text-sm">{{ images[activeIndex].title }}</span>
                <span class="text-sm">{{ images[activeIndex].alt }}</span>
            </span>
            <button
                type="button"
                pButton
                [icon]="fullScreenIcon()"
                (click)="toggleFullScreen()"
                class="bg-transparent border-none rounded-none hover:bg-white/10 text-white inline-flex justify-center items-center cursor-pointer px-3 ml-auto"
            ></button>
        </div>
    </ng-template>
</p-galleria>`,
        html: `<div class="card">
    <p-galleria #galleria [(value)]="images" [(activeIndex)]="activeIndex" [numVisible]="5" [showThumbnails]="showThumbnails" [showItemNavigators]="true" [showItemNavigatorsOnHover]="true"
        [circular]="true" [autoPlay]="isAutoPlay" [transitionInterval]="3000" [containerStyle]="{ 'max-width': '640px' }" [containerClass]="galleriaClass()"
    >
        <ng-template #item let-item>
            <img [src]="item.itemImageSrc" [ngStyle]="{ width: !fullscreen ? '100%' : '', display: !fullscreen ? 'block' : '' }" />
        </ng-template>
        <ng-template #thumbnail let-item>
            <div class="grid gap-4 justify-center">
                <img [src]="item.thumbnailImageSrc" style="display: block" />
            </div>
        </ng-template>
        <ng-template #footer let-item>
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
        typescript: `import { ChangeDetectorRef, Component, OnInit, OnDestroy, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { Galleria } from 'primeng/galleria';
import { PhotoService } from '@/service/photoservice';

@Component({
    selector: 'galleria-advanced-demo',
    templateUrl: './galleria-advanced-demo.html',
    styles: [
        \`:host ::ng-deep {
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
                }
            }
        }\`
    ],
    standalone: true,
    imports: [ButtonModule, GalleriaModule],
    providers: [PhotoService]
})
export class GalleriaAdvancedDemo implements OnInit, OnDestroy {

    images: any[] | undefined;

    showThumbnails: boolean = false;

    fullscreen: boolean = false;

    activeIndex: number = 0;

    isAutoPlay: boolean = true;

    onFullScreenListener: any;

    @ViewChild('galleria') galleria: Galleria | undefined;

    constructor(@Inject(PLATFORM_ID) private platformId: any, private photoService: PhotoService, private cd: ChangeDetectorRef) {}

    responsiveOptions: any[] = [
        {
            breakpoint: '1300px',
            numVisible: 4
        },
        {
            breakpoint: '575px',
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

    toggleAutoSlide() {
        this.isAutoPlay = !this.isAutoPlay;
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

    slideButtonIcon() {
        return this.isAutoPlay ? 'pi pi-pause' : 'pi pi-play';
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

        service: ['PhotoService']
    };
}
