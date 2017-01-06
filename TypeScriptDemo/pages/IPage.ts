export interface IPage {
    source: string;
    name: string;
    description: string;
    index: number;
    run: (reverse?: boolean) => void;
    forward: () => boolean;
    backward: () => boolean;
    canGoForward: () => boolean;
    canGoBackward: () => boolean;    
}