import { IPage } from "./IPage";
import { PageHelper } from "./pageHelper";

export class PageMyFirstTypescriptApp implements IPage {
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
        this.source = "/pages/my-first-typescript-app.html";
        this.name = "My First TypeScript App";
        this.description = "A quick walkthrough of creating a simple HTML app using TypeScript.";
        this.index = 0;
    }

    run(callback: Function, reverse?: boolean): void {
        this._internalIndex = (reverse || 0) ? 4 : 0;
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

    private _runCreateProject(): void {
        let createProjectImage: HTMLImageElement = <HTMLImageElement>document.getElementById("img-create-project");

        PageHelper.wrapImage(createProjectImage);
    }

    private _runStartingFiles(): void {
        let appSource: HTMLElement = document.getElementById("code-app-source");
        let indexSource: HTMLElement = document.getElementById("code-index-source");

        let xhrAppSource = new XMLHttpRequest();
        xhrAppSource.open("GET", "example-source/my-first-typescript-app/app.ts", true);
        xhrAppSource.responseType = "text";
        xhrAppSource.onload = function () {
            if (xhrAppSource.status >= 200 && xhrAppSource.status < 300) {
                appSource.innerText = xhrAppSource.responseText;
                hljs.highlightBlock(appSource);
            }
        };
        xhrAppSource.send();

        let xhrIndexSource = new XMLHttpRequest();
        xhrIndexSource.open("GET", "example-source/my-first-typescript-app/index.html", true);
        xhrIndexSource.responseType = "text";
        xhrIndexSource.onload = function () {
            if (xhrIndexSource.status >= 200 && xhrAppSource.status < 300) {
                indexSource.innerText = xhrIndexSource.responseText;
                hljs.highlightBlock(indexSource);
            }
        };
        xhrIndexSource.send();
       
        PageHelper.wrapCodeViewer(appSource);
        PageHelper.wrapCodeViewer(indexSource);
    }

    private _runStepOne(): void {
        let appSource: HTMLElement = document.getElementById("code-app1-source");

        let xhrAppSource = new XMLHttpRequest();
        xhrAppSource.open("GET", "example-source/my-first-typescript-app/app-1.ts", true);
        xhrAppSource.responseType = "text";
        xhrAppSource.onload = function () {
            if (xhrAppSource.status >= 200 && xhrAppSource.status < 300) {
                appSource.innerText = xhrAppSource.responseText;
                hljs.highlightBlock(appSource);
            }
        };
        xhrAppSource.send();

        PageHelper.wrapCodeViewer(appSource);
    }

    private _runStepTwo(): void {
        let appSource: HTMLElement = document.getElementById("code-app2-source");

        let xhrAppSource = new XMLHttpRequest();
        xhrAppSource.open("GET", "example-source/my-first-typescript-app/app-2.ts", true);
        xhrAppSource.responseType = "text";
        xhrAppSource.onload = function () {
            if (xhrAppSource.status >= 200 && xhrAppSource.status < 300) {
                appSource.innerText = xhrAppSource.responseText;
                hljs.highlightBlock(appSource);
            }
        };
        xhrAppSource.send();

        PageHelper.wrapCodeViewer(appSource);
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
                    this._runCreateProject();
                    break;
                case 1:
                    this._runStartingFiles();
                    break;
                case 2:
                    this._runStepOne();
                    break;
                case 3:
                    this._runStepTwo();
                    break;
            }
        }
    }
}