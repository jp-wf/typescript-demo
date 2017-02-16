namespace AddingTypes {
    export function clickMe(): void {
        let pageLoaded: Function = (content: string): void => {
            let windowOptions: Array<string> = [
                "width=640",
                "height=480",
                "resizable=no",
                "menubar=no",
                "location=no",
                "scrollbar=no",
                "titlebar=no",
                "status=no",
                "toolbar=no"
            ];
            let myWindow: Window = window.open(
                "", "_blank", windowOptions.join(","));            
            myWindow.document.write(content);
            myWindow.document.title = "Adding Types Example";
        }

        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", "example-source/aycabtu.html", true);
        xhr.responseType = "text";
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                pageLoaded(xhr.responseText);
            }
        };
        xhr.send();
    }
}