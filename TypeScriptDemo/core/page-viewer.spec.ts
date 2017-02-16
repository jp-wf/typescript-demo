import "jasmine";

// Class under test
import { PageViewer } from "./page-viewer";

// Pages are not under test but used for testing
import { IPage } from "../pages/IPage";
import { PageWhatIsTypescript } from "../pages/page-what-is-typescript";
import { PageHelloWorld } from "../pages/page-hello-world";
import { PageTypeDeclaration } from "../pages/page-type-declaration";
import { PageReferences } from "../pages/page-references";
import { PageGettingStarted } from "../pages/page-getting-started";

describe("PageViewer", () => {
    const PAGE_LOAD_TIMEOUT: number = 100;

    let sut: PageViewer = null;    
    let contentElement: HTMLElement = null;
    let navigationElement: HTMLElement = null;
    let titleElement: HTMLElement = null;
    let backElement: HTMLElement = null;
    let forwardElement: HTMLElement = null;
    let page1: IPage = null;
    let page2: IPage = null;
    let page3: IPage = null;
    let page4: IPage = null;
    let page5: IPage = null;
    let defaultPages: Array<IPage> = null;

    let createContent = (testContainer: HTMLElement): HTMLElement => {
        let retVal: HTMLElement = document.createElement("div");

        testContainer.appendChild(retVal);

        return retVal;
    };

    let createNavigation = (testContainer: HTMLElement): HTMLElement => {
        let retVal: HTMLElement = document.createElement("div");

        titleElement = document.createElement("div");
        titleElement.classList.add("section-header-title");
        retVal.appendChild(titleElement);

        backElement = document.createElement("div");
        backElement.classList.add("page-viewer-back");
        retVal.appendChild(backElement);

        forwardElement = document.createElement("div");
        forwardElement.classList.add("page-viewer-forward");
        retVal.appendChild(forwardElement);

        testContainer.appendChild(retVal);

        return retVal;
    };

    let getTitle = (): string => {
        console.log(titleElement);
        return titleElement.innerHTML;
    };

    let hasClass = (element: HTMLElement, className: string) => {
        return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
    };

    let createDefaultPages = () => {
        page1 = new PageWhatIsTypescript();
        page2 = new PageHelloWorld();
        page3 = new PageTypeDeclaration();
        page4 = new PageGettingStarted();
        page5 = new PageReferences();

        defaultPages = [
            page1,
            page2,
            page3,
            page4,
            page5
        ];
    };

    let sendKeyEvent = (eventType: string, key: string, target: HTMLElement) => {
        let keyboardEvent = new KeyboardEvent(eventType, {
            key: key,
            view: window,
            repeat: false
        });

        target.dispatchEvent(keyboardEvent);
    };

    beforeEach(() => {
        let testContainer = document.createElement("div");
        testContainer.id = "test-container";
        testContainer.style.display = "none";
        document.body.appendChild(testContainer);

        // set up simulated HTML elements
        contentElement = createContent(testContainer);
        navigationElement = createNavigation(testContainer);
    });

    afterEach(() => {
        let testContainer = document.getElementById("test-container");
        if (testContainer) testContainer.remove();
    });

    it("should be initialized after construction", () => {
        // arrange
        sut = new PageViewer(contentElement, navigationElement);

        // act
        let result = sut.isInitialized;

        // assert
        expect(result).toBeTruthy();
    });

    it ("should have a null current page after construction", () => {
        // arrange
        sut = new PageViewer(contentElement, navigationElement);

        // act
        let result = sut.currentPage;

        // assert
        expect(result).toBeNull();
    });
        
    it("should have a current page index of 0 after construction", () => {
        // arrange
        sut = new PageViewer(contentElement, navigationElement);

        // act
        let result = sut.currentPageIndex;

        // assert
        expect(result).toEqual(0);
    });
    
    it("should have an empty page array after construction", () => {
        // arrange
        sut = new PageViewer(contentElement, navigationElement);

        // act
        let result = sut.allPages;

        // assert
        expect(result).toEqual([]);
    });

    it("should call previous on keyup of ArrowLeft", () => {
        // arrange
        let previousSpy = spyOn(sut, "previous");
        sut = new PageViewer(contentElement, navigationElement);

        // act
        sendKeyEvent("keyup", "ArrowLeft", document.body);

        // assert
        expect(previousSpy).toHaveBeenCalledTimes(1);
    });

    it("should not call previous on keydown of ArrowLeft", () => {
        // arrange
        let previousSpy = spyOn(sut, "previous");
        sut = new PageViewer(contentElement, navigationElement);

        // act
        sendKeyEvent("keydown", "ArrowLeft", document.body);

        // assert
        expect(previousSpy).not.toHaveBeenCalled();
    });

    it("should not call next on keyup of ArrowLeft", () => {
        // arrange
        let nextSpy = spyOn(sut, "next");
        sut = new PageViewer(contentElement, navigationElement);

        // act
        sendKeyEvent("keyup", "ArrowLeft", document.body);

        // assert
        expect(nextSpy).not.toHaveBeenCalled();
    });


    it("should call next on keyup of ArrowRight", () => {
        // arrange
        let nextSpy = spyOn(sut, "next");
        sut = new PageViewer(contentElement, navigationElement);

        // act
        sendKeyEvent("keyup", "ArrowRight", document.body);

        // assert
        expect(nextSpy).toHaveBeenCalledTimes(1);
    });

    it("should not call next on keydown of ArrowRight", () => {
        // arrange
        let nextSpy = spyOn(sut, "next");
        sut = new PageViewer(contentElement, navigationElement);

        // act
        sendKeyEvent("keydown", "ArrowRight", document.body);

        // assert
        expect(nextSpy).not.toHaveBeenCalled();
    });

    it("should not call previous on keyup of ArrowRight", () => {
        // arrange
        let previousSpy = spyOn(sut, "previous");
        sut = new PageViewer(contentElement, navigationElement);

        // act
        sendKeyEvent("keyup", "ArrowRight", document.body);

        // assert
        expect(previousSpy).not.toHaveBeenCalled();
    });

    it("should not allow construction of PageViewer without content element", () => {
        // arrange
        let consoleSpy = spyOn(console, "log");
        sut = new PageViewer(null, navigationElement);

        // act
        // construction is the act

        // assert
        expect(consoleSpy).toHaveBeenCalledTimes(1);
        expect(consoleSpy).toHaveBeenCalledWith("Content Root element is required to create a PageViewer.");
        expect(sut.isInitialized).toBeFalsy();  
    });

    it("should not allow construction of PageViewer without navigation element", () => {
        // arrange
        let consoleSpy = spyOn(console, "log");
        sut = new PageViewer(contentElement, null);

        // act
        // construction is the act

        // assert
        expect(consoleSpy).toHaveBeenCalledTimes(1);
        expect(consoleSpy).toHaveBeenCalledWith("Navigation Root element is required to create a PageViewer.");
        expect(sut.isInitialized).toBeFalsy();
    });

    it("should not allow construction of PageViewer without content element or navigation", () => {
        // arrange
        let consoleSpy = spyOn(console, "log");
        sut = new PageViewer(null, null);

        // act
        // construction is the act

        // assert
        expect(consoleSpy).toHaveBeenCalledTimes(2);
        expect(consoleSpy).toHaveBeenCalledWith("Content Root element is required to create a PageViewer.");
        expect(consoleSpy).toHaveBeenCalledWith("Navigation Root element is required to create a PageViewer.");
        expect(sut.isInitialized).toBeFalsy();
    });

    it("should report false for canGoPrevious with no pages loaded", () => {
        // arrange
        sut = new PageViewer(contentElement, navigationElement);

        // act
        let result = sut.canGoPrevious();

        // assert
        expect(result).toBeFalsy();
    });

    it("should decorate the back element with 'icon-disabled' by default", () => {
        // arrange
        sut = new PageViewer(contentElement, navigationElement);

        // act
        let result = hasClass(backElement, "icon-disabled");

        // assert
        expect(result).toBeTruthy();
    });

    it("should report false for canGoNext with no pages loaded", () => {
        // arrange
        sut = new PageViewer(contentElement, navigationElement);

        // act
        let result = sut.canGoNext();

        // assert
        expect(result).toBeFalsy();
    });

    it("should decorate the next element with 'icon-disabled' by default", () => {
        // arrange
        sut = new PageViewer(contentElement, navigationElement);

        // act
        let result = hasClass(forwardElement, "icon-disabled");

        // assert
        expect(result).toBeTruthy();
    });

    it("should load the correct pages", () => {
        // arrange
        sut = new PageViewer(contentElement, navigationElement);
        createDefaultPages();            

        // act
        sut.loadPages(defaultPages);

        // assert
        expect(sut.allPages).toEqual(defaultPages);
    });

    it("should reflect correct page count after load pages", () => {
        // arrange
        sut = new PageViewer(contentElement, navigationElement);
        createDefaultPages();

        // act
        sut.loadPages(defaultPages);

        // assert
        expect(sut.numberOfPages).toEqual(5);
    });

    it("should set the current page to the first page after load pages", () => {
        // arrange
        sut = new PageViewer(contentElement, navigationElement);
        createDefaultPages();

        // act
        sut.loadPages(defaultPages);

        // assert
        expect(sut.currentPage).toEqual(page1);
    });

    it("should set the current page index to 0 after load pages", () => {
        // arrange
        sut = new PageViewer(contentElement, navigationElement);
        createDefaultPages();

        // act
        sut.loadPages(defaultPages);

        // assert
        expect(sut.currentPageIndex).toEqual(0);
    });

    it("should report canGoNext of true after loading multiple pages", () => {
        // arrange
        sut = new PageViewer(contentElement, navigationElement);
        createDefaultPages();

        // act
        sut.loadPages(defaultPages);
        let result = sut.canGoNext();

        // assert
        expect(result).toBeTruthy();
    });

    it("should report canGoPrevious of false after loading multiple pages", () => {
        // arrange
        sut = new PageViewer(contentElement, navigationElement);
        createDefaultPages();

        // act
        sut.loadPages(defaultPages);
        let result = sut.canGoPrevious();

        // assert
        expect(result).toBeFalsy();
    });


    it("should goToPage correctly", (done) => {
        // arrange
        sut = new PageViewer(contentElement, navigationElement);
        createDefaultPages();

        // act
        sut.loadPages(defaultPages);
        sut.goToPage(4);
      
        // page content is loading via xhr, give enough time for it to have been loaded
        setTimeout(() => {
            // assert
            expect(sut.currentPage).toEqual(page5, "Current page not correct.");
            expect(sut.currentPageIndex).toEqual(4, "Current page index not correct.");
            expect(sut.canGoNext()).toBeFalsy("canGoNext should be false.");
            expect(sut.canGoPrevious()).toBeTruthy("canGoNext should be true.");  
            expect(titleElement.innerText).toEqual(page5.name); 
            done();
        }, PAGE_LOAD_TIMEOUT);
    });

    it("should not advance on one next due to subpage", (done) => {
        // arrange
        sut = new PageViewer(contentElement, navigationElement);
        createDefaultPages();

        // act
        sut.loadPages(defaultPages);

        // wait for initial load to finish
        setTimeout(() => {
            sut.next();

            // page content is loading via xhr, give enough time for it to have been loaded
            setTimeout(() => {
                // assert
                expect(sut.currentPage).toEqual(page1, "Current page not correct.");
                expect(sut.currentPageIndex).toEqual(0, "Current page index not correct.");
                expect(sut.canGoNext()).toBeTruthy("canGoNext should be true.");
                expect(sut.canGoPrevious()).toBeTruthy("canGoPrevious should be true.");
                expect(titleElement.innerText).toEqual(page1.name);
                done();
            }, PAGE_LOAD_TIMEOUT);
        }, PAGE_LOAD_TIMEOUT);
    });

    it("should advance on two next calls", (done) => {
        // arrange
        sut = new PageViewer(contentElement, navigationElement);
        createDefaultPages();

        // act
        sut.loadPages(defaultPages);

        // wait for initial load to finish
        setTimeout(() => {
            sut.next();
            sut.next();

            // page content is loading via xhr, give enough time for it to have been loaded
            setTimeout(() => {
                // assert
                expect(sut.currentPage).toEqual(page2, "Current page not correct.");
                expect(sut.currentPageIndex).toEqual(1, "Current page index not correct.");
                expect(sut.canGoNext()).toBeTruthy("canGoNext should be true.");
                expect(sut.canGoPrevious()).toBeTruthy("canGoNext should be true.");
                expect(titleElement.innerText).toEqual(page2.name);
                done();
            }, PAGE_LOAD_TIMEOUT);
        }, PAGE_LOAD_TIMEOUT);
    });

    it("should go to previous page correctly", (done) => {
        // arrange
        sut = new PageViewer(contentElement, navigationElement);
        createDefaultPages();

        // act
        sut.loadPages(defaultPages);
        sut.goToPage(3);

        // wait for initial load to finish
        setTimeout(() => {
            sut.previous();

            // page content is loading via xhr, give enough time for it to have been loaded
            setTimeout(() => {
                // assert
                expect(sut.currentPage).toEqual(page3, "Current page not correct.");
                expect(sut.currentPageIndex).toEqual(2, "Current page index not correct.");
                expect(sut.canGoNext()).toBeTruthy("canGoNext should be true.");
                expect(sut.canGoPrevious()).toBeTruthy("canGoNext should be true.");
                expect(titleElement.innerText).toEqual(page3.name);
                done();
            }, PAGE_LOAD_TIMEOUT);
        }, PAGE_LOAD_TIMEOUT);
    });
});