namespace app1 {
    class MyFirstApp {
        constructor() {
            document.body.innerHTML = "";
            document.body.style.backgroundColor = "#333";
            document.body.style.position = "relative";
            document.body.style.display = "block";
            document.body.style.width = "400px";
            document.body.style.height = "260px";
            document.body.style.margin = "0 auto";

            let goButton: HTMLElement = document.createElement("button");
            goButton.style.position = "absolute";
            goButton.style.top = "10px";
            goButton.style.left = "0";
            goButton.innerHTML = "Go!";
            goButton.addEventListener("click", this.go);

            document.body.appendChild(goButton);
        }

        go(): void {
            let t: Triangle = new Triangle(
                document.body,
                document.body.clientWidth / 2,
                document.body.clientHeight / 2 + 10,
                120);
        }
    }

    class Triangle {
        constructor(root: HTMLElement, x: number, y: number, size: number) {
            let triangle = document.createElement("div");
            triangle.style.position = "absolute";
            triangle.style.top = y + "px";
            triangle.style.left = x + "px";
            triangle.style.borderLeft = size + "px solid transparent";
            triangle.style.borderRight = size + "px solid transparent";
            triangle.style.borderBottom = 2 * size + "px solid #33ff33";
            triangle.style.transform = "translate(-50%, -50%)";
            root.appendChild(triangle);
        }
    }

    window.onload = () => {
        var app = new MyFirstApp();
    };
}