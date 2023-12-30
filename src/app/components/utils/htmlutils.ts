export class HTMLUtils {
    public static isInput(event): boolean {
        const { tagName } = event.target;
        return tagName?.toLowerCase() === 'input';
    }

    public static isTextArea(event): boolean {
        const { tagName } = event.target;
        return tagName?.toLowerCase() === 'textarea';
    }
}
