import { IPage } from "./IPage";
import { PageHelper } from "./pageHelper";

export class PageTypeDeclaration implements IPage {
    private _internalIndex: number;
    private _scriptBucket: HTMLElement;

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
        this.source = "/pages/type-declaration.html";
        this.name = "Type Declaration";
        this.description = "A section on the core concept within TypeScript, types.";
        this.index = 0;

        this._scriptBucket = document.getElementById("script-bucket");
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
        return this._internalIndex < 3;
    }

    canGoBackward(): boolean {
        return this._internalIndex > 0;
    }

    private _setSection() {
        this._removeAllResults();

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
                    this._runAddingTypes();
                    break;
                case 1:
                    this._runInterfaces();
                    break;
                case 2:
                    this._runIndexers();
                    break;
                case 3:
                    this._runClasses();
                    break;
                case 4:
                    this._runGenerics();
                    break;       
            }
        }
    }    

    private _removeAllResults(): void {
        let allCodeBlocks: NodeListOf<HTMLElement> = document.querySelectorAll("code");
        if (allCodeBlocks && allCodeBlocks.length > 0) {
            for (let i: number = 0; i < allCodeBlocks.length; i++) {
                allCodeBlocks[i].classList.remove("code-in");

                if (allCodeBlocks[i].classList.contains("code-out")) {
                    allCodeBlocks[i].innerHTML = "";
                    allCodeBlocks[i].classList.remove("code-out");
                }                
            }
        }

        let results: NodeListOf<Element> = document.querySelectorAll(".result-wrapper");
        if (results && results.length > 0) {
            for (let i: number = 0; i < results.length; i++) {
                results[i].classList.add("hidden");
            }
        }
    }

    private _runAddingTypes(): void {
        let xhrSource = new XMLHttpRequest();
        xhrSource.open("GET", "example-source/adding-types.ts", true);
        xhrSource.responseType = "text";
        xhrSource.onload = function () {
            if (xhrSource.status >= 200 && xhrSource.status < 300) {
                let sourceOutput: HTMLElement = document.getElementById("code-adding-types-source");
                sourceOutput.innerText = xhrSource.responseText;
                hljs.highlightBlock(sourceOutput);
            }
        };
        xhrSource.send();

        let compiledOutput: HTMLElement = document.getElementById("code-adding-types-compiled");
        let sourceOutput: HTMLElement = document.getElementById("code-adding-types-source");

        PageHelper.wrapCodeViewer(compiledOutput);        
        PageHelper.wrapCodeViewer(sourceOutput);
        PageHelper.addCopyToClipboard(sourceOutput);

        let transpile = () => {      
            compiledOutput.classList.remove("rainbow-in");            
            sourceOutput.classList.remove("rainbow-out");

            var sourceText = sourceOutput.innerText;
            sourceOutput.innerHTML = '';

            var colorArray = [
                "red",
                "orange",
                "yellow",
                "green",
                "blue",
                "purple"
            ];

            var outputHTML = '';
            var lines = sourceText.split('\n');
            for (let i = 0; i < lines.length; i++) {
                let cIdx = Math.min(Math.floor(i / 3),5);
                outputHTML += "<span class=\"rainbow-code " + colorArray[cIdx] + " saturate\">" + lines[i] + "</span>";
            }
            sourceOutput.innerHTML = outputHTML;

            var xhrCompiled = new XMLHttpRequest();
            xhrCompiled.open("GET", "example-source/adding-types.js", true);
            xhrCompiled.responseType = "text";
            xhrCompiled.onload = function () {
                if (xhrCompiled.status >= 200 && xhrCompiled.status < 300) {
                    //compiledOutput.innerText = xhrCompiled.responseText;

                    var outputHTML = '';
                    var lines = sourceText.split('\n');
                    for (let i = 0; i < lines.length; i++) {
                        let cIdx = Math.min(Math.floor(i / 3), 5);
                        outputHTML += "<span style=\"color: " + colorArray[cIdx] + ";\">" + lines[i] + "</span>\n";
                    }
                    compiledOutput.innerHTML = outputHTML;

                    compiledOutput.classList.add("rainbow-in");
                    sourceOutput.classList.add("rainbow-out");
                   // hljs.highlightBlock(compiledOutput);
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

    private _runInterfaces(): void {
        let xhrSource = new XMLHttpRequest();
        xhrSource.open("GET", "example-source/interfaces.ts", true);
        xhrSource.responseType = "text";
        xhrSource.onload = function () {
            if (xhrSource.status >= 200 && xhrSource.status < 300) {
                let sourceOutput: HTMLElement = document.getElementById("code-interfaces-source");
                sourceOutput.innerText = xhrSource.responseText;
                hljs.highlightBlock(sourceOutput);                
            }
        };
        xhrSource.send();

        let compiledOutput: HTMLElement = document.getElementById("code-interfaces-compiled");
        let sourceOutput: HTMLElement = document.getElementById("code-interfaces-source");

        PageHelper.wrapCodeViewer(compiledOutput);
        PageHelper.wrapCodeViewer(sourceOutput);

        let transpile = () => {
            compiledOutput.classList.remove("code-out");
            sourceOutput.classList.remove("code-in");

            var xhrCompiled = new XMLHttpRequest();
            xhrCompiled.open("GET", "example-source/interfaces.js", true);
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
        }

        let transpileButton: HTMLElement = document.getElementById("interfaces-transpile");
        if (transpileButton) {
            transpileButton.addEventListener("click", (e) => {
                transpile();
            });
        }
    }

    private _runIndexers(): void {
        let xhrSource = new XMLHttpRequest();
        xhrSource.open("GET", "example-source/interface-indexer.ts", true);
        xhrSource.responseType = "text";
        xhrSource.onload = function () {
            if (xhrSource.status >= 200 && xhrSource.status < 300) {
                let sourceOutput: HTMLElement = document.getElementById("code-interface-indexer-source");
                sourceOutput.innerText = xhrSource.responseText;
                hljs.highlightBlock(sourceOutput);
                PageHelper.wrapCodeViewer(sourceOutput);
            }
        };
        xhrSource.send();

        let existingScript = document.getElementById("script-interface-indexer");
        if(existingScript) {
            existingScript.parentElement.removeChild(existingScript);
        }

        let script: HTMLScriptElement = document.createElement("script");
        script.setAttribute("src", "example-source/interface-indexer.js");
        script.setAttribute("id", "script-interface-indexer");
        script.onload = () => {
            let results: HTMLElement = document.getElementById("execute-interface-indexer");
            if (results) {
                results.classList.remove("hidden");
            }
        }
        document.body.appendChild(script);
    }

    private _runClasses(): void {
        let classesResult = document.getElementById("classes-result");

        let xhrSource = new XMLHttpRequest();
        xhrSource.open("GET", "example-source/classes-and-inheritance.ts", true);
        xhrSource.responseType = "text";
        xhrSource.onload = function () {
            if (xhrSource.status >= 200 && xhrSource.status < 300) {
                let sourceOutput: HTMLElement = document.getElementById("code-classes-source");
                sourceOutput.innerText = xhrSource.responseText;
                hljs.highlightBlock(sourceOutput);
                PageHelper.wrapCodeViewer(sourceOutput);                                
            }
        };
        xhrSource.send();

        let existingScript = document.getElementById("script-classes");
        if (existingScript) {
            existingScript.parentElement.removeChild(existingScript);
        }

        let script: HTMLScriptElement = document.createElement("script");
        script.setAttribute("src", "example-source/classes-and-inheritance.js");
        script.setAttribute("id", "script-classes");
        script.onload = () => {
            PageHelper.wrapCodeViewer(classesResult);
            ClassesExample.execute("classes-field");
        }
        document.body.appendChild(script);
    }

    private _runGenerics(): void {
        let genericsResult = document.getElementById("generics-result");

        let xhrSource = new XMLHttpRequest();
        xhrSource.open("GET", "example-source/generics-and-casting.ts", true);
        xhrSource.responseType = "text";
        xhrSource.onload = function () {
            if (xhrSource.status >= 200 && xhrSource.status < 300) {
                let sourceOutput: HTMLElement = document.getElementById("code-generics-source");
                sourceOutput.innerText = xhrSource.responseText;
                hljs.highlightBlock(sourceOutput);
                PageHelper.wrapCodeViewer(sourceOutput);
            }
        };
        xhrSource.send();

        let existingScript = document.getElementById("script-generics");
        if (existingScript) {
            existingScript.parentElement.removeChild(existingScript);
        }

        let script: HTMLScriptElement = document.createElement("script");
        script.setAttribute("src", "example-source/generics-and-casting.js");
        script.setAttribute("id", "script-generics");
        script.onload = () => {
            PageHelper.wrapCodeViewer(genericsResult);
            GenericsExample.execute("generics-field");
        }
        document.body.appendChild(script);
    }
}