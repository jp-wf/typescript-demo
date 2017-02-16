namespace IndexerExample {
    export interface ColorArray {
        [index: string]: string;
    }

    // Example Usage
    //  ===============================================
    export function execute(targetId: string): void {
        let target: HTMLElement = document.getElementById(targetId);

        if (target && !target.querySelector("div")) {
            // Create instance of interface
            let myColorArray: ColorArray = {
                "red": "#f00",
                "green": "#0f0",
                "blue": "#00f",
                "periwinkle": "#ccccff"
            };

            let newDiv = document.createElement("div");
            newDiv.style.width = "100px";
            newDiv.style.height = "100px";
            newDiv.style.display = "block";
            newDiv.style.position = "absolute";
            newDiv.style.top = "50%";
            newDiv.style.left = "50%";
            newDiv.style.transform = "translate(-50%, -50%)";

            // Here's indexed reference
            newDiv.style.background = myColorArray["red"];

            newDiv.addEventListener("click",
                () => { target.removeChild(newDiv); });
            newDiv.addEventListener("mouseover",
                () => { newDiv.style.background = myColorArray["periwinkle"]; });
            newDiv.addEventListener("mouseout",
                () => { newDiv.style.background = myColorArray["red"]; });
            target.appendChild(newDiv);
        }
    }
}