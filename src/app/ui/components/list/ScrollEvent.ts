export interface ScrollEvent {
    target: Target | null;
}

export interface Target extends EventTarget {
    scrollingElement?: ScrollingElement;
}

export interface ScrollingElement {
    scrollHeight?: number;
    scrollTop?: number;
    offsetHeight?: number;
}
