export class DomHandler {

    public static zindex: number = 1000;
    private static calculatedScrollbarWidth: number = null;
    private static calculatedScrollbarHeight: number = null;
    private static browser: any;

    public static addClass(element: any, className: string): void {
        if (element.classList) {
            element.classList.add(className);
        } else {
            element.className += ' ' + className;
        }
    }

    public static addMultipleClasses(element: any, className: string): void {
        if (element.classList) {
            const styles: string[] = className.split(' ');
            for (let i = 0; i < styles.length; i++) {
                element.classList.add(styles[i]);
            }

        } else {
            const styles: string[] = className.split(' ');
            for (let i = 0; i < styles.length; i++) {
                element.className += ' ' + styles[i];
            }
        }
    }

    public static removeClass(element: any, className: string): void {
        if (element.classList) {
            element.classList.remove(className);
        } else {
            element.className = element.className.replace(new RegExp('(^|\\b)' +
                className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    public static hasClass(element: any, className: string): boolean {
        return element.classList ?
            element.classList.contains(className) : new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
    }

    public static siblings(element: any): any {
        return Array.prototype.filter.call(element.parentNode.children, function (child) {
            return child !== element;
        });
    }

    public static find(element: any, selector: string): any[] {
        return Array.from(element.querySelectorAll(selector));
    }

    public static findSingle(element: any, selector: string): any {
        if (element) {
            return element.querySelector(selector);
        }
        return null;
    }

    public static index(element: any): number {
        const children = element.parentNode.childNodes;
        let num = 0;
        for (const i = 0; i < children.length; i++) {
            if (children[i] === element) {
                return num;
            }
            if (children[i].nodeType === 1) {
                num++;
            }
        }
        return -1;
    }

    public static indexWithinGroup(element: any, attributeName: string): number {
        const children = element.parentNode.childNodes;
        let num = 0;
        for (const i = 0; i < children.length; i++) {
            if (children[i] === element) {
                return num;
            }
            if (children[i].attributes && children[i].attributes[attributeName] && children[i].nodeType === 1) {
                num++;
            }
        }
        return -1;
    }

    public static relativePosition(element: any, target: any): void {
        const elementDimensions = element.offsetParent ?
            { width: element.offsetWidth, height: element.offsetHeight } :
            this.getHiddenElementDimensions(element),
            targetHeight = target.offsetHeight,
            targetOffset = target.getBoundingClientRect(),
            viewport = this.getViewport();
        let top: number, left: number;

        if ((targetOffset.top + targetHeight + elementDimensions.height) > viewport.height) {
            top = -1 * (elementDimensions.height);
            if (targetOffset.top + top < 0) {
                top = -1 * targetOffset.top;
            }
        } else {
            top = targetHeight;
        }

        if (elementDimensions.width > viewport.width) {
            // element wider then viewport and cannot fit on screen (align at left side of viewport)
            left = targetOffset.left * -1;
        } else if ((targetOffset.left + elementDimensions.width) > viewport.width) {
            // element wider then viewport but can be fit on screen (align at right side of viewport)
            left = (targetOffset.left + elementDimensions.width - viewport.width) * -1;
        } else {
            // element fits on screen (align with target)
            left = 0;
        }

        element.style.top = top + 'px';
        element.style.left = left + 'px';
    }

    public static absolutePosition(element: any, target: any): void {
        const elementDimensions = element.offsetParent ?
                { width: element.offsetWidth, height: element.offsetHeight } :
                this.getHiddenElementDimensions(element),
            elementOuterHeight = elementDimensions.height,
            elementOuterWidth = elementDimensions.width,
            targetOuterHeight = target.offsetHeight,
            targetOuterWidth = target.offsetWidth,
            targetOffset = target.getBoundingClientRect(),
            windowScrollTop = this.getWindowScrollTop(),
            windowScrollLeft = this.getWindowScrollLeft(),
            viewport = this.getViewport(),
        var top, left;

        if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
            top = targetOffset.top + windowScrollTop - elementOuterHeight;
            if (top < 0) {
                top = windowScrollTop;
            }
        } else {
            top = targetOuterHeight + targetOffset.top + windowScrollTop;
        }

        if (targetOffset.left + targetOuterWidth + elementOuterWidth > viewport.width) {
            left = Math.max(0, targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth);
        } else {
            left = targetOffset.left + windowScrollLeft;
        }

        element.style.top = top + 'px';
        element.style.left = left + 'px';
    }

    public static getHiddenElementOuterHeight(element: any): number {
        element.style.visibility = 'hidden';
        element.style.display = 'block';
        const elementHeight = element.offsetHeight;
        element.style.display = 'none';
        element.style.visibility = 'visible';

        return elementHeight;
    }

    public static getHiddenElementOuterWidth(element: any): number {
        element.style.visibility = 'hidden';
        element.style.display = 'block';
        const elementWidth = element.offsetWidth;
        element.style.display = 'none';
        element.style.visibility = 'visible';

        return elementWidth;
    }

    public static getHiddenElementDimensions(element: any): any {
        const dimensions: any = {};
        element.style.visibility = 'hidden';
        element.style.display = 'block';
        dimensions.width = element.offsetWidth;
        dimensions.height = element.offsetHeight;
        element.style.display = 'none';
        element.style.visibility = 'visible';

        return dimensions;
    }

    public static scrollInView(container, item) {
        const borderTopValue: string = getComputedStyle(container).getPropertyValue('borderTopWidth'),
            borderTop: number = borderTopValue ? parseFloat(borderTopValue) : 0,
            paddingTopValue: string = getComputedStyle(container).getPropertyValue('paddingTop'),
            paddingTop: number = paddingTopValue ? parseFloat(paddingTopValue) : 0,
            containerRect = container.getBoundingClientRect(),
            itemRect = item.getBoundingClientRect(),
            offset = (itemRect.top + document.body.scrollTop) - (containerRect.top + document.body.scrollTop) - borderTop - paddingTop,
            scroll = container.scrollTop,
            elementHeight = container.clientHeight,
            itemHeight = this.getOuterHeight(item);

        if (offset < 0) {
            container.scrollTop = scroll + offset;
        } else if ((offset + itemHeight) > elementHeight) {
            container.scrollTop = scroll + offset - elementHeight + itemHeight;
        }
    }

    public static fadeIn(element, duration: number): void {
        element.style.opacity = 0;

        let last = +new Date(),
            opacity = 0;
        function tick(): void {
            opacity = +element.style.opacity.replace(',', '.') + (new Date().getTime() - last) / duration;
            element.style.opacity = opacity;
            last = +new Date();

            if (+opacity < 1) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
            }
        }

        tick();
    }

    public static fadeOut(element, ms) {
        let opacity = 1,
        const interval = 50,
            duration = ms,
            gap = interval / duration;

        let fading = setInterval(() => { opacity = opacity - gap;

            if (opacity <= 0) {
                opacity = 0;
                clearInterval(fading);
            }

            element.style.opacity = opacity;
        }, interval);
    }

    public static getWindowScrollTop(): number {
        const doc = document.documentElement;
        return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    }

    public static getWindowScrollLeft(): number {
        const doc = document.documentElement;
        return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    }

    public static matches(element, selector: string): boolean {
        const p = Element.prototype,
            f = p['matches'] || p.webkitMatchesSelector || p['mozMatchesSelector'] || p['msMatchesSelector'] || function (s) {
            return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
        };
        return f.call(element, selector);
    }

    public static getOuterWidth(el, margin?) {
        let width = el.offsetWidth;

        if (margin) {
            const style = getComputedStyle(el);
            width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        }

        return width;
    }

    public static getHorizontalPadding(el) {
        const style = getComputedStyle(el);
        return parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    }

    public static getHorizontalMargin(el) {
        const style = getComputedStyle(el);
        return parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    }

    public static innerWidth(el) {
        const style = getComputedStyle(el);
        return el.offsetWidth + parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    }

    public static width(el) {
        const style = getComputedStyle(el);
        return el.offsetWidth - (parseFloat(style.paddingLeft) + parseFloat(style.paddingRight));
    }

    public static getInnerHeight(el) {
        const style = getComputedStyle(el);
        return el.offsetHeight + parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    }

    public static getOuterHeight(el, margin?) {
        let height = el.offsetHeight;

        if (margin) {
            const style = getComputedStyle(el);
            height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
        }
        return height;
    }

    public static getHeight(el): number {
        const style = getComputedStyle(el);
        return el.offsetHeight - (parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) +
            parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth));
    }

    public static getWidth(el): number {
        const style = getComputedStyle(el);
        return el.offsetWidth - (parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) +
            parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth));
    }

    public static getViewport(): any {
        const win = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            w = win.innerWidth || e.clientWidth || g.clientWidth,
            h = win.innerHeight || e.clientHeight || g.clientHeight;
        return { width: w, height: h };
    }

    public static getOffset(el) {
        const rect = el.getBoundingClientRect();
        return {
            top: rect.top + document.body.scrollTop,
            left: rect.left + document.body.scrollLeft
        };
    }

    public static replaceElementWith(element: any, replacementElement: any): any {
        const parentNode = element.parentNode;
        if (!parentNode) {
            throw `Can't replace element`;
        }
        return parentNode.replaceChild(replacementElement, element);
    }

    public static getUserAgent(): string {
        return navigator.userAgent;
    }

    public static isIE() {
        const ua = window.navigator.userAgent;
        if ( ua.indexOf('MSIE ') !== -1) {
            return true; // IE 10 or older => return version number
        }
        if (ua.indexOf('Trident/') !== -1) {
            let rv = ua.indexOf('rv:'); // IE 11 => return version number
            return true;
        }
        if (ua.indexOf('Edge/') !== -1) {
            return true; // Edge (IE 12+) => return version number
        }
        // other browser
        return false;
    }

    public static isIOS() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window['MSStream'];
    }

    public static isAndroid() {
        return /(android)/i.test(navigator.userAgent);
    }

    public static appendChild(element: any, target: any) {
        if (this.isElement(target)) {
            target.appendChild(element);
        } else if (target.el && target.el.nativeElement) {
            target.el.nativeElement.appendChild(element);
        } else {
            throw 'Cannot append ' + target + ' to ' + element;
        }
    }

    public static removeChild(element: any, target: any) {
        if (this.isElement(target)) {
            target.removeChild(element);
        } else if (target.el && target.el.nativeElement) {
            target.el.nativeElement.removeChild(element);
        } else {
            throw 'Cannot remove ' + element + ' from ' + target;
        }
    }

    public static isElement(obj: any) {
        return (typeof HTMLElement === 'object' ? obj instanceof HTMLElement :
            obj && typeof obj === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string'
        );
    }

    public static calculateScrollbarWidth(el?: HTMLElement): number {
        if (el) {
            let style = getComputedStyle(el);
            return (el.offsetWidth - el.clientWidth - parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth));
        } else {
            if (this.calculatedScrollbarWidth !== null) {
                return this.calculatedScrollbarWidth;
            }
            const scrollDiv = document.createElement('div');
            scrollDiv.className = 'ui-scrollbar-measure';
            document.body.appendChild(scrollDiv);
            this.calculatedScrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            document.body.removeChild(scrollDiv);
            return this.calculatedScrollbarWidth;
        }
    }

    public static calculateScrollbarHeight(): number {
        if (this.calculatedScrollbarHeight !== null) {
            return this.calculatedScrollbarHeight;
        }
        const scrollDiv = document.createElement('div');
        scrollDiv.className = 'ui-scrollbar-measure';
        document.body.appendChild(scrollDiv);
        this.calculatedScrollbarWidth = scrollDiv.offsetHeight - scrollDiv.clientHeight;
        document.body.removeChild(scrollDiv);
        return this.calculatedScrollbarWidth;
    }

    public static invokeElementMethod(element: any, methodName: string, args?: any[]): void {
        (element as any)[methodName].apply(element, args);
    }

    public static clearSelection(): void {
        if (window.getSelection) {
            if (window.getSelection().empty) {
                window.getSelection().empty();
            } else if (window.getSelection().removeAllRanges && window.getSelection().rangeCount > 0 &&
                window.getSelection().getRangeAt(0).getClientRects().length > 0) {
                window.getSelection().removeAllRanges();
            }
        } else if (document['selection'] && document['selection'].empty) {
            try {
                document['selection'].empty();
            } catch (error) { } // ignore IE bug
        }
    }

    public static getBrowser() {
        if (!this.browser) {
            const matched = this.resolveUserAgent();
            this.browser = {};
            if (matched.browser) {
                this.browser[matched.browser] = true;
                this.browser['version'] = matched.version;
            }
            if (this.browser['chrome']) {
                this.browser['webkit'] = true;
            } else if (this.browser['webkit']) {
                this.browser['safari'] = true;
            }
        }
        return this.browser;
    }

    public static resolveUserAgent() {
        const ua = navigator.userAgent.toLowerCase(),
            match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
            /(webkit)[ \/]([\w.]+)/.exec(ua) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
            /(msie) ([\w.]+)/.exec(ua) ||
            ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
            [];

        return {
            browser: match[1] || '',
            version: match[2] || '0'
        };
    }

    public static isInteger(value): boolean {
        if (Number.isInteger) {
            return Number.isInteger(value);
        }
        else {
            return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
        }
    }

    public static isHidden(element: HTMLElement): boolean {
        return element.offsetParent === null;
    }
}
