/// <reference path="library-definitions/highlightjs.d.ts" />

import { IPage } from "./pages/IPage";
import { PageWhatIsTypescript } from "./pages/page-what-is-typescript";
import { PageHelloWorld } from "./pages/page-hello-world";
import { PageTypeDeclaration } from "./pages/page-type-declaration";
import { PageReferences } from "./pages/page-references";

class Application {
    private _rootElement: HTMLElement;
    private _pageViewer: PageViewer;

    constructor(element: HTMLDivElement) {
        this._rootElement = element;

        let pages: Array<IPage> = [
            new PageWhatIsTypescript(),
            new PageHelloWorld(),
            new PageTypeDeclaration(),
            new PageReferences()
        ];

        // set indicies to match the order they were added
        for (let i: number = 0; i < pages.length; i++) {
            pages[i].index = i;
        }

        this._pageViewer = new PageViewer(this._rootElement,
            document.getElementById("page-viewer"));
        this._pageViewer.loadPages(pages);
    }
}

class PageViewer {
    private _currentPage: IPage;
    private _pageIndex: number;
    private _pages: Array<IPage>;
    private _contentRoot: HTMLElement;
    private _navigationRoot: HTMLElement;

    constructor(contentRoot: HTMLElement, navRoot: HTMLElement) {
        this._contentRoot = contentRoot;
        this._navigationRoot = navRoot;
        this._currentPage = null;
        this._pageIndex = 0;
        this._pages = [];

        // set up click listeners
        let backButton: Element = this._navigationRoot
            .querySelector(".page-viewer-back");      
         
        if (backButton) {
            backButton.addEventListener("click", () => {
                this.previous();
            });
        }

        let forwardButton: Element = this._navigationRoot
            .querySelector(".page-viewer-forward");

        if (forwardButton) {
            forwardButton.addEventListener("click", () => {
                this.next();
            });
        }
    }

    next(): void {
        if (this.canGoNext()) {
            if (this._currentPage.forward()) {
                this._pageIndex++;
                this._currentPage = this._pages[this._pageIndex];
                this._loadPage();
            } else {
                this._setNavigationStatus();
            }
        }
    }

    previous(): void {
        if (this.canGoPrevious()) {
            if (this._currentPage.backward()) {
                this._pageIndex--;
                this._currentPage = this._pages[this._pageIndex];
                this._loadPage(true);
            } else {
                this._setNavigationStatus();
            }
        }
    }

    canGoNext(): boolean {
        return this._currentPage.canGoForward()
            || (this._pageIndex < this._pages.length - 1);
    }

    canGoPrevious(): boolean {
        return this._currentPage.canGoBackward()
            || (this._pageIndex > 0);
    }

    first(): void {
        this._pageIndex = 0;
        this._currentPage = this._pages[this._pageIndex];
        this._loadPage();
    }

    last(): void {
        this._pageIndex = this._pages.length - 1;
        this._currentPage = this._pages[this._pageIndex];
        this._loadPage(true);
    }

    goToPage(value: number): void {
        if (0 <= value && value <= this._pages.length - 1) {
            this._pageIndex = value;
            this._currentPage = this._pages[this._pageIndex];
            this._loadPage();
        }
    }

    loadPages(pages: Array<IPage>) {
        this._pages = pages.sort((a: IPage, b: IPage) => {
            return a.index - b.index;
        });
        this._pageIndex = 0;
        this._currentPage = this._pages[this._pageIndex];
        this._loadPage();
    }

    get currentPage(): IPage {
        return this._currentPage;
    }

    private _loadPage(reverse?: boolean): void {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", this._currentPage.source, true);
        xhr.responseType = "text";
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                this._contentRoot.innerHTML = xhr.responseText;
                this._currentPage.run(reverse);

                let title: HTMLElement = <HTMLElement>this._navigationRoot
                    .querySelector(".section-header-title");
                if (title) title.innerText = this._currentPage.name;
            }
        }
        xhr.send();

        this._setNavigationStatus();
    }

    private _setNavigationStatus(): void {
        let backButton: Element = this._navigationRoot
            .querySelector(".page-viewer-back");

        if (backButton) {
            if (this.canGoPrevious()) {
                backButton.classList.remove("icon-disabled");
            } else {
                backButton.classList.add("icon-disabled");
            }
        }

        let forwardButton: Element = this._navigationRoot
            .querySelector(".page-viewer-forward");

        if (forwardButton) {
            if (this.canGoNext()) {
                forwardButton.classList.remove("icon-disabled");
            } else {
                forwardButton.classList.add("icon-disabled");
            }
        }
    }
}

var el = <HTMLDivElement>document.getElementById('content');
if (el) {
    var app = new Application(el);
}

