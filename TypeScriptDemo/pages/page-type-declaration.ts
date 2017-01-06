import { IPage } from "./IPage";

export class PageTypeDeclaration implements IPage {
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
        this.source = "pages/type-declaration.html";
        this.name = "Type Declaration";
        this.description = "A section on the core concept within TypeScript, types.";
        this.index = 0;
    }

    run(reverse?: boolean): void {
        this._internalIndex = (reverse || 0) ? 3 : 0;
        this._setSection();
    }

    forward(): boolean {
        this._internalIndex++;
        this._setSection();

        return this._internalIndex > 3;
    }

    backward(): boolean {
        this._internalIndex--;
        this._setSection();

        return this._internalIndex < 0;
    }

    canGoForward(): boolean {
        return this._internalIndex < 3;
    }

    canGoBackward(): boolean {
        return this._internalIndex > 0;
    }

    private _setSection() {
        let sections: NodeListOf<Element> = document.querySelectorAll(".page-section");
        for (let i: number = 0; i < sections.length; i++) {
            sections[i].classList.add("hidden");
        }

        if (0 <= this._internalIndex && this._internalIndex <= 3) {
            let currentSection: Element = document.querySelector("#page-section-" + this._internalIndex);
            if (currentSection) {
                currentSection.classList.remove("hidden");
            }

            switch (this._internalIndex) {
                case 0:
                    this._runAddingTypes();
                    break;
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    break;               
            }
        }
    }

    private _runAddingTypes(): void {
        let transpile = () => {
            let compiledOutput: HTMLElement = document.getElementById("code-hello-world-compiled");
            let sourceOutput: HTMLElement = document.getElementById("code-hello-world-source");

            compiledOutput.classList.remove("code-out");
            sourceOutput.classList.remove("code-in");

            var xhrCompiled = new XMLHttpRequest();
            xhrCompiled.open("GET", "example-source/adding-types.js", true);
            xhrCompiled.responseType = "text";
            xhrCompiled.onload = function () {
                if (xhrCompiled.status >= 200 && xhrCompiled.status < 300) {
                    compiledOutput.innerText = xhrCompiled.responseText;
                    compiledOutput.classList.add("code-out");
                    sourceOutput.classList.add("code-in");
                    hljs.highlightBlock(compiledOutput);
                }
            };
            xhrCompiled.send();

            let existingScript = document.getElementById("script-adding-types");
            if (existingScript) {
                existingScript.parentElement.removeChild(existingScript);
            }

            let script: HTMLScriptElement = document.createElement("script");
            script.setAttribute("src", "example-source/adding-types.js");
            script.setAttribute("id", "script-adding-types");
            script.onload = () => {
                let results: HTMLElement = document.getElementById("adding-types-results");
                if (results) {
                    results.classList.remove("hidden");
                }
            }
            document.body.appendChild(script);
        }

        let transpileButton: HTMLElement = document.getElementById("adding-types-transpile");
        if (transpileButton) {
            transpileButton.addEventListener("click", (e) => {
                transpile();
            });
        }
    }
}