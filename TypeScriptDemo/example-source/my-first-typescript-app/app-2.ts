namespace app2 {
    class MyFirstApp {
        private _iteration: number;

        constructor() {
            this._iteration = -1;

            document.body.innerHTML = "";
            document.body.style.backgroundColor = "#333";
            document.body.style.position = "relative";
            document.body.style.display = "block";
            document.body.style.width = "400px";
            document.body.style.height = "260px";
            document.body.style.margin = "0 auto";
            document.body.style.transform = "translate3d(0,0,0)";

            let goButton: HTMLElement = document.createElement("button");
            goButton.style.position = "absolute";
            goButton.style.top = "10px";
            goButton.style.left = "0";
            goButton.innerHTML = "Go!";
            goButton.addEventListener("click", () => { this.go(); });

            document.body.appendChild(goButton);
        }

        private _renderIteration(iteration: number, x: number, y: number, size: number): void {
            if (this._iteration > 6) {
                let total: number = 0;
                for (let i: number = 0; i < this._iteration; i++) { total += Math.pow(3, i); }
                alert("There are already " + total +
                    " triangles on the screen.  Iterating again might not be a good idea.");
                this._iteration--;
                return;
            } else if (this._iteration == -1) {
                let t: Triangle = new Triangle(
                    document.body,
                    document.body.clientWidth / 2,
                    document.body.clientHeight / 2 + 10,
                    120);
            } else if (iteration == 0) {
                let t: Triangle = new Triangle(document.body, x, y, size, true);
            } else {
                for (let i: number = iteration; i > 0; i--) {
                    for (let j: number = 0; j < 3; j++) {
                        this._renderIteration(
                            i - 1, // iteration count
                            x + (j - 1) * size, // x position
                            (j == 1 ? y - 1.5 * size : y + 0.5 * size), // y position
                            size / 2); // render size
                    }
                }
            }
        }

        go(): void {
            this._renderIteration(
                this._iteration,
                document.body.clientWidth / 2,
                (document.body.clientHeight / 2) + 60 + 10,
                60);
            this._iteration++;
        }
    }

    class Triangle {
        constructor(root: HTMLElement, x: number, y: number, size: number, subtract?: boolean) {
            let triangle = document.createElement("div");
            triangle.style.position = "absolute";
            triangle.style.top = y + "px";
            triangle.style.left = x + "px";
            triangle.style.borderLeft = size + "px solid transparent";
            triangle.style.borderRight = size + "px solid transparent";

            if (subtract) {
                triangle.style.borderTop = 2 * size + "px solid #333";
            } else {
                triangle.style.borderBottom = 2 * size + "px solid #33ff33";
            }

            triangle.style.transform = "translate(-50%, -50%)";
            root.appendChild(triangle);
        }
    }

    window.onload = () => {
        var app = new MyFirstApp();
    };
}