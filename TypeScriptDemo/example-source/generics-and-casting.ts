namespace GenericsExample {
    class Animal {
        protected _position: number;
        protected _field: HTMLElement;
        protected _renderNode: HTMLElement;
        protected _isForward: boolean;

        constructor(field: HTMLElement) {
            this._field = field;
            this._renderNode = document.createElement("div");
            this._isForward = true;

        }

        move(backward?: boolean): void {

        }

        call(): void {
            let callBubble = document.createElement("div");
            callBubble.classList.add("call-bubble");
            callBubble.innerText = "...";
        }
    }

    class Sheep extends Animal {
        call(): void {
            let callBubble = document.createElement("div");
            callBubble.classList.add("call-bubble");
            callBubble.innerText = "Baaaa";
            this._renderNode.appendChild(callBubble);
            setTimeout(() => { callBubble.remove(); }, 3000);
        }
    }

    class Wolf extends Animal {
        call(): void {
            let callBubble = document.createElement("div");
            callBubble.classList.add("call-bubble");
            callBubble.innerText = "GrrRrRRRrr!";
            this._renderNode.appendChild(callBubble);
            setTimeout(() => { callBubble.remove(); }, 3000);
        }
    }

    // Example Usage
    //  ===============================================
    export function execute(targetId: string): void {

    }
}