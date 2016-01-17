export class UIComponent {

    addClasses(element: any, classNames: string) {
        var tokens: string[] = classNames.split(' ');
        for (var i = 0; i < tokens.length; i++) {
            this.addClass(element, tokens[i]);
        }
    }

    addClass(element: any, className: string) {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    removeClass(element: any, className: string) {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
}