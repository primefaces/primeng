import {Injectable} from 'angular2/core';

@Injectable()
export class DomHandler {
    
    public addClass(element: any, className: string):void {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }
    
    public removeClass(element: any, className: string):void {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
    
    public hasClass(element: any, className: string):boolean {
        if (element.classList)
            return element.classList.contains(className);
        else
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
    }
    
    public siblings(element: any):any {
        return Array.prototype.filter.call(element.parentNode.children, function(child){
            return child !== element;
        });
    }
    
    public find(element: any, selector: string):any[] {
        return element.querySelectorAll(selector);
    }
    
    public findSingle(element: any, selector: string):any {
        return element.querySelector(selector);
    }
    
    public index(element: any): number {
        let children = element.parentNode.childNodes;
        let num = 0;
        for (var i=0; i < children.length; i++) {
            if (children[i]==element) return num;
            if (children[i].nodeType==1) num++;
        }
        return -1;
    }
    
    public relativePosition(element: any, target: any):void {
        let elementOuterHeight = this.getHiddenElementOuterHeight(element);
        let targetHeight = target.offsetHeight;
        let targetOffset = target.getBoundingClientRect();
        let top;
        
        if((targetOffset.top + targetHeight + elementOuterHeight) > window.innerHeight)
            top = -1* (elementOuterHeight);
        else
            top = targetHeight;
                
        element.style.top = top+ 'px';
        element.style.left = 0 + 'px';
    }
    
    public absolutePosition(element: any, target: any): void {
        let elementOuterHeight = element.offsetParent ? element.offsetHeight : this.getHiddenElementOuterHeight(element);
        let targetOuterHeight = target.offsetHeight;
        let targetOffset = target.getBoundingClientRect();
        let windowScrollTop = this.getWindowScrollTop();
        let top;

        if(targetOffset.top + targetOuterHeight + elementOuterHeight > window.innerHeight)
            top = targetOffset.top + windowScrollTop - elementOuterHeight;
        else
            top = targetOuterHeight + targetOffset.top + windowScrollTop;
        
        element.style.top = top + 'px';
        element.style.left = targetOffset.left + 'px';
    }
    
    public getHiddenElementOuterHeight(element: any): number {
        element.style.visibility = 'hidden';
        element.style.display = 'block';
        let elementHeight = element.offsetHeight;
        element.style.display = 'none';
        element.style.visibility = 'visible';
        
        return elementHeight;
    }
    
    public scrollInView(container, item) {   
        let borderTopValue: string = getComputedStyle(container).getPropertyValue('borderTopWidth');
        let borderTop: number = borderTopValue ? parseFloat(borderTopValue) : 0;
        let paddingTopValue: string = getComputedStyle(container).getPropertyValue('paddingTop');
        let paddingTop: number = paddingTopValue ? parseFloat(paddingTopValue) : 0;
        let containerRect = container.getBoundingClientRect();
        let itemRect = item.getBoundingClientRect();
        let offset = (itemRect.top + document.body.scrollTop) - (containerRect.top + document.body.scrollTop) - borderTop - paddingTop;
        let scroll = container.scrollTop;
        let elementHeight = container.clientHeight;
        let itemHeight = this.getOuterHeight(item);
        
        if(offset < 0) {
            container.scrollTop = scroll + offset;
        }
        else if((offset + itemHeight) > elementHeight) {
            container.scrollTop = scroll + offset - elementHeight + itemHeight;
        }
    }
        
    public getOuterHeight(element): number {
        let height: number = element.offsetHeight;
        let style: any = getComputedStyle(element);

        height += parseInt(style.marginTop) + parseInt(style.marginBottom);
        return height;
    }
    
    public fadeIn(element, duration: number):void {
        element.style.opacity = 0;

        let last = +new Date();
        let tick = function() {
            element.style.opacity = +element.style.opacity + (new Date().getTime() - last) / duration;
            last = +new Date();

            if (+element.style.opacity < 1) {
              (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
            }
        };

        tick();
    }
    
    public getWindowScrollTop(): number {
        let doc = document.documentElement;
        return (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
    }
}