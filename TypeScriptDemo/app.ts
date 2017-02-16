/// <reference path="library-definitions/highlightjs.d.ts" />

import { IPage } from "./pages/IPage";
import { PageWhatIsTypescript } from "./pages/page-what-is-typescript";
import { PageHelloWorld } from "./pages/page-hello-world";
import { PageTypeDeclaration } from "./pages/page-type-declaration";
import { PageReferences } from "./pages/page-references";
import { PageGettingStarted } from "./pages/page-getting-started";
import { PageMyFirstTypescriptApp } from "./pages/page-my-first-typescript-app";
import { PageTesting } from "./pages/page-testing";
import { PageViewer } from "./core/page-viewer";

class Application {
    private _rootElement: HTMLElement;
    private _pageViewer: PageViewer;

    constructor(element: HTMLDivElement) {
        this._rootElement = element;

        let pages: Array<IPage> = [
            new PageWhatIsTypescript(),
            new PageHelloWorld(),
            new PageTypeDeclaration(),
            new PageGettingStarted(),
            new PageMyFirstTypescriptApp(),
            new PageTesting(),
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

var el = <HTMLDivElement>document.getElementById('content');
if (el) {
    var app = new Application(el);
}

