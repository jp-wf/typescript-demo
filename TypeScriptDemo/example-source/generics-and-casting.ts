namespace GenericsExample {
    interface Tool {
        use(context: CanvasRenderingContext2D, x: number, y: number): void;
    }

    interface IButton {
        element: HTMLElement;
        select(): any;
    }

    class SimpleDraw {
        private _canvas: HTMLCanvasElement;
        private _currentTool: Tool;
        private _buttons: Array<IButton>;
        private _downCount: number;
        private _toolbar: HTMLElement;

        constructor(canvas: HTMLCanvasElement) {
            this._canvas = canvas;
            this._downCount = 0;
            this._currentTool = null;
            this._buttons = [];

            this._toolbar = document.createElement("div");
            this._toolbar.classList.add("draw-toolbar");
            this._canvas.parentElement.appendChild(this._toolbar);

            this._canvas.addEventListener("mousedown", (e) => {
                this._downCount++;

                if (this._currentTool) {
                    this._currentTool.use(this._canvas.getContext("2d"), e.offsetX, e.offsetY);
                }
            });

            this._canvas.addEventListener("mouseup", (e) => {
                this._downCount--;
            });

            this._canvas.addEventListener("mousemove", (e) => {
                if (this._downCount > 0 && this._currentTool) {
                    this._currentTool.use(this._canvas.getContext("2d"), e.offsetX, e.offsetY);
                }
            });
        }

        addButton(item: IButton) {
            item.element.addEventListener("click", (e: MouseEvent) => {
                e.stopPropagation();
                e.preventDefault();

                this._currentTool = <Tool>item.select();

                for (let i: number = 0; i < this._buttons.length; i++) {
                    this._buttons[i].element.classList.remove("active");
                }

                item.element.classList.add("active");
            });
            this._buttons.push(item);
            this._toolbar.appendChild(item.element);
        }
    }

    class Button<T> implements IButton {
        private _element: HTMLElement;
        private _item: T;

        constructor(item: T, iconClass: string) {
            this._item = item;
            this._element = document.createElement("div");
            this._element.classList.add("draw-tool-icon");
            this._element.classList.add(iconClass);
        }

        get element(): HTMLElement {
            return this._element;
        }

        select(): T {
            return this._item;
        }
    }

    class Brush implements Tool {        
        use(context: CanvasRenderingContext2D, x: number, y: number): void {
            let gradient = context.createRadialGradient(x, y, 50, 20, 20, 5);
            gradient.addColorStop(0, "transparent");
            gradient.addColorStop(1, "#000");
            context.beginPath();
            context.arc(x, y, 20, 0, 2 * Math.PI);
            context.fillStyle = gradient;
            context.fill();
        }
    }

    class Pencil implements Tool {
        use(context: CanvasRenderingContext2D, x: number, y: number): void {
            context.beginPath();
            context.arc(x, y, 10, 0, 2 * Math.PI);
            context.fillStyle = '#000';
            context.fill();
        }
    }

    class Eraser implements Tool {
        use(context: CanvasRenderingContext2D, x: number, y: number): void {
            console.log("using eraser");
            let gradient = context.createRadialGradient(x, y, 50, 20, 20, 5);
            gradient.addColorStop(0, "transparent");
            gradient.addColorStop(1, "green");
            context.beginPath();
            context.arc(x, y, 20, 0, 2 * Math.PI);
            context.fillStyle = gradient;
            context.fill();
        }
    }

    // Example Usage
    //  ===============================================
    export function execute(): void {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("generics-canvas");
        let example: SimpleDraw = new SimpleDraw(canvas);
        example.addButton(new Button(new Pencil(), "pencil"));
        example.addButton(new Button(new Brush(), "brush"));
        example.addButton(new Button(new Eraser(), "eraser"));
    }
}