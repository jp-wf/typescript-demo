export interface IPage {
    source: string;
    name: string;
    description: string;
    index: number;
    run: (callback: Function, reverse?: boolean) => void;
    forward: () => boolean;
    backward: () => boolean;
    canGoForward: () => boolean;
    canGoBackward: () => boolean;    
}