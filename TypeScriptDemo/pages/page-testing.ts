﻿import { IPage } from "./IPage";
import { PageHelper } from "./pageHelper";

export class PageTesting implements IPage {
    private _internalIndex: number;

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
        this.source = "/pages/testing.html";
        this.name = "Testing";
        this.description = "An overview on how to test your TypeScript.";
        this.index = 0;
    }

    run(callback: Function, reverse?: boolean): void {
        this._internalIndex = (reverse || 0) ? 1 : 0;
        this._setSection();
        callback();
    }

    forward(): boolean {
        this._internalIndex++;
        this._setSection();

        return this._internalIndex > 4;
    }

    backward(): boolean {
        this._internalIndex--;
        this._setSection();

        return this._internalIndex < 0;
    }

    canGoForward(): boolean {
        return this._internalIndex == 0;
    }

    canGoBackward(): boolean {
        return this._internalIndex > 0;
    }

    private _runSpecRunner(): void {
        let runner: HTMLIFrameElement = <HTMLIFrameElement>document.querySelector("iframe.jasmine-frame");
        let reloadIcon = runner.parentElement.querySelector(".reload-icon");
        reloadIcon.addEventListener("click", () => {
            runner.contentWindow.location.reload();
        });        
    }
    
    private _setSection() {
        let sections: NodeListOf<Element> = document.querySelectorAll(".page-section");
        for (let i: number = 0; i < sections.length; i++) {
            sections[i].classList.add("hidden");
        }

        if (0 <= this._internalIndex && this._internalIndex <= 4) {
            let currentSection: Element = document.querySelector("#page-section-" + this._internalIndex);
            if (currentSection) {
                currentSection.classList.remove("hidden");
            }

            switch (this._internalIndex) {
                case 0:
                    this._runSpecRunner();
                    break;
                case 2:
                   // this._runOtherTooling();
                    break;
            }
        }
    }
}