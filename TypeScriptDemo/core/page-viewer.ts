import { IPage } from "../pages/IPage";

export class PageViewer {
    private _currentPage: IPage;
    private _pageIndex: number;
    private _pages: Array<IPage>;
    private _contentRoot: HTMLElement;
    private _navigationRoot: HTMLElement;
    private _isInitialized: boolean;

    constructor(contentRoot: HTMLElement, navRoot: HTMLElement) {
        this._isInitialized = false;

        if (!contentRoot) {
            console.log("Content Root element is required to create a PageViewer.");
        }

        if (!navRoot) {
            console.log("Navigation Root element is required to create a PageViewer.");
        }

        if (contentRoot && navRoot) {
            this._initialize(contentRoot, navRoot);
        }
    }

    private _initialize(contentRoot: HTMLElement, navRoot: HTMLElement): void {
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

        // setup key listeners
        document.body.addEventListener("keyup", (e) => {
            switch (e.key) {
                case "ArrowLeft":
                    this.previous();
                    break;
                case "ArrowRight":
                    this.next();
                    break;
            }
        });

        this._setNavigationStatus();

        this._isInitialized = true;
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
        return this._currentPage && this._currentPage.canGoForward()
            || (this._pageIndex < this._pages.length - 1);
    }

    canGoPrevious(): boolean {
        return this._currentPage && this._currentPage.canGoBackward()
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

    get numberOfPages(): number {
        return this._pages.length;
    }

    get allPages(): Array<IPage> {
        return this._pages;
    }

    get currentPage(): IPage {
        return this._currentPage;
    }

    get currentPageIndex(): number {
        return this._pageIndex;
    }

    get isInitialized(): boolean {
        return this._isInitialized;
    }

    private _loadPage(reverse?: boolean): void {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", this._currentPage.source, true);
        xhr.responseType = "text";
        xhr.onload = (): void => {
            if (xhr.status >= 200 && xhr.status < 300) {
                this._contentRoot.innerHTML = xhr.responseText;
                this._currentPage.run(() => {
                    let title: HTMLElement = <HTMLElement>this._navigationRoot
                        .querySelector(".section-header-title");
                    if (title) title.innerText = this._currentPage.name;

                    this._setNavigationStatus();
                }, reverse);
            }
        };
        xhr.send();
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