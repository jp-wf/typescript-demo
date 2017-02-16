namespace Serpinski {
    export function initialize(): void {
        let baseSize: number = 400;
        let currentIteration: number = 0;

        let root: HTMLElement = document.createElement("div");
        let s: CSSStyleDeclaration = root.style;
        s.width = baseSize + "px";
        s.height = baseSize + "px";
        s.background = "#000";
        s.position = "absolute";
        s.top = "50%";
        s.left = "50%";
        s.transform = "translate(-50%, -50%)";

        let baseTriangle: HTMLElement = document.createElement("div");
        s = baseTriangle.style;
        s.display = "block";
        s.position = "absolute";
        s.width = "0";
        s.height = "0";
        s.borderLeft = (baseSize / 2) + "px solid transparent";
        s.borderRight = (baseSize / 2) + "px solid transparent";
        s.borderBottom = (baseSize) + "px solid lime";

        let deg2rad = (deg: number) => { return deg * (Math.PI / 180); };

        let createBlackout = (index: number, total: number, size: number): void => {
            let x: number = baseSize / 2;
            let y: number = baseSize / 2;

            for (let i: number = currentIteration; i > 0; i--) {
                let subIterationTotal = total / Math.pow(3, i);
                //switch (pos) {

                //}
            }

            // add triangle
        };

        let nextIteration = (): void => {
            let total: number = Math.pow(3, currentIteration);
            let size: number = baseSize / Math.pow(2, currentIteration);
            for (let i: number = 0; i < total; i++) {
                createBlackout(i, total, size);
            }           
        };

        let reset
    }
}