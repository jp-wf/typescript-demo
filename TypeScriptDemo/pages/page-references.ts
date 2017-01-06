import { IPage } from "./IPage";

export class PageReferences implements IPage {
    private _source: string;

    get source(): string {
        return this._source;
    }

    set source(value: string) {
        this._source = value;
    }

    private _name: string;

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    private _description: string;

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    private _index: number;

    get index(): number {
        return this._index;
    }

    set index(value: number) {
        this._index = value;
    }

    constructor() {
        this.source = "pages/references.html";
        this.name = "References";
        this.description = "A list of references used to put together this presentation";
        this.index = 0;
    }

    run(reverse?: boolean): void {
    }

    forward(): boolean {
        return true;
    }

    backward(): boolean {
        return true;
    }

    canGoForward(): boolean {
        return false;
    }

    canGoBackward(): boolean {
        return false;
    }
}