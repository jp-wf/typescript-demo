import { IPage } from "./IPage";
import { PageHelper } from "./pageHelper";

export class PageHelloWorld implements IPage {
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
        this.source = "/pages/hello-world.html";
        this.name = "Hello World";
        this.description = "The requisite 'Hello World' example.";
        this.index = 0;                
    }

    run(callback: Function): void {
        this._internalIndex = 0;

        let xhrSource = new XMLHttpRequest();
        xhrSource.open("GET", "/example-source/hello-world.ts", true);
        xhrSource.responseType = "text";
        xhrSource.onload = function () {
            if (xhrSource.status >= 200 && xhrSource.status < 300) {
                let sourceOutput: HTMLElement = document.getElementById("code-hello-world-source");
                sourceOutput.innerText = xhrSource.responseText;
                hljs.highlightBlock(sourceOutput);
            }

            callback();
        };
        xhrSource.send();

        let compiledOutput: HTMLElement = document.getElementById("code-hello-world-compiled");
        let sourceOutput: HTMLElement = document.getElementById("code-hello-world-source");

        PageHelper.wrapCodeViewer(compiledOutput);
        PageHelper.wrapCodeViewer(sourceOutput);

        let transpile = () => {
            let grinderHandler: HTMLElement = document.getElementById("grinder-handle");

            compiledOutput.classList.remove("code-out");
            sourceOutput.classList.remove("code-in");            
            grinderHandler.classList.remove("active");

            var xhrCompiled = new XMLHttpRequest();
            xhrCompiled.open("GET", "/example-source/hello-world.js", true);
            xhrCompiled.responseType = "text";
            xhrCompiled.onload = function () {
                if (xhrCompiled.status >= 200 && xhrCompiled.status < 300) {
                    compiledOutput.innerText = xhrCompiled.responseText;
                    compiledOutput.classList.add("code-out");
                    sourceOutput.classList.add("code-in");
                    grinderHandler.classList.add("active");
                    hljs.highlightBlock(compiledOutput);
                }
            };
            xhrCompiled.send();

            let existingScript = document.getElementById("script-hello-world");
            if (existingScript) {
                existingScript.parentElement.removeChild(existingScript);
            }

            let script: HTMLScriptElement = document.createElement("script");
            script.setAttribute("src", "/example-source/hello-world.js");
            script.setAttribute("id", "script-hello-world");
            script.onload = () => {
                let results: HTMLElement = document.getElementById("hello-world-results");
                if (results) {
                    results.classList.remove("hidden");
                }
            }
            document.body.appendChild(script);
        }

        let grinderHandler: HTMLElement = document.getElementById("grinder-handle");
        if (grinderHandler) {
            grinderHandler.addEventListener("click", (e) => {
                transpile();
            });
        }
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