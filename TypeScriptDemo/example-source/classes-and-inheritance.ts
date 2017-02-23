namespace ClassesExample {
    class Animal {
        protected _position: number;
        protected _field: HTMLElement;
        protected _renderNode: HTMLElement;
        protected _contentNode: HTMLElement;
        protected _isForward: boolean;
        protected _depth: number;
        protected _scale: number;
        protected _id: string;

        constructor(field: HTMLElement, depth: number, id: string) {
            let existing: HTMLElement = document.getElementById(id);
            if (existing) existing.remove();

            this._field = field;
            this._renderNode = document.createElement("div");
            this._renderNode.style.zIndex = (250 - depth).toString();
            this._renderNode.style.bottom = depth + "px";
            this._renderNode.id = id;

            // set up scaling
            this._scale = (500 - depth) / 500;
            this._renderNode.style.transform = "scale(" + this._scale + ")";

            this._isForward = true;
            this._position = 0;

            this._contentNode = document.createElement("div");
            this._contentNode.classList.add("content");
            this._contentNode.addEventListener("click", (e: MouseEvent) => {
                e.stopPropagation();
                this.call();
            });
            this._renderNode.appendChild(this._contentNode);

            // add move left
            let moveLeft: HTMLElement = document.createElement("i");
            moveLeft.classList.add("fa");
            moveLeft.classList.add("fa-chevron-circle-left");
            moveLeft.classList.add("animal-move");
            moveLeft.classList.add("left");
            moveLeft.addEventListener("click", (e: MouseEvent) => {
                e.stopPropagation();
                this.move(true);
            });
            this._renderNode.appendChild(moveLeft);

            // add move right
            let moveRight: HTMLElement = document.createElement("i");
            moveRight.classList.add("fa");
            moveRight.classList.add("fa-chevron-circle-right");
            moveRight.classList.add("animal-move");
            moveRight.classList.add("right");
            moveRight.addEventListener("click", (e: MouseEvent) => {
                e.stopPropagation();
                this.move(false);
            });
            this._renderNode.appendChild(moveRight);     

            this._renderNode.style.left = this._position + "px";

            this._field.appendChild(this._renderNode);
        }

        move(backward?: boolean): void {
            if (backward) {
                if (this._position > 0) {
                    this._position -= this._renderNode.clientWidth * this._scale;
                    this._renderNode.style.left = this._position + "px";
                }
                this._contentNode.classList.add("reverse");
                this._isForward = false;

                let callBubbles = this._renderNode.querySelectorAll(".call-bubble");
                for (let i: number = 0; i < callBubbles.length; i++) {
                    callBubbles[i].classList.add("reverse");
                }
            } else {
                if (this._position < (this._field.clientWidth - this._renderNode.clientWidth)) {
                    this._position += this._renderNode.clientWidth * this._scale;
                    this._renderNode.style.left = this._position + "px";
                }
                this._contentNode.classList.remove("reverse");
                this._isForward = true;

                let callBubbles = this._renderNode.querySelectorAll(".call-bubble");
                for (let i: number = 0; i < callBubbles.length; i++) {
                    callBubbles[i].classList.remove("reverse");
                }
            }
        }

        protected renderCallBubble(call: string) {
            let callBubble = document.createElement("div");
            callBubble.classList.add("call-bubble");
            if (!this._isForward) {
                callBubble.classList.add("reverse");
            }
            callBubble.innerText = call;
            this._renderNode.appendChild(callBubble);
            setTimeout(() => { callBubble.remove(); }, 3000);
        }

        call(): void {
            this.renderCallBubble("...");
        }        
    }

    class Sheep extends Animal {
        constructor(field: HTMLElement, depth: number, id: string) {
            super(field, depth, id);

            this._renderNode.classList.add("sheep");
        }

        call(): void {
            this.renderCallBubble("Baaaaa");
        }
    }

    class Pig extends Animal {
        constructor(field: HTMLElement, depth: number, id: string) {
            super(field, depth, id);

            this._renderNode.classList.add("pig");
        }

        call(): void {
            this.renderCallBubble("Oink!");
        }
    }

    class Fox extends Animal {
        constructor(field: HTMLElement, depth: number, id: string) {
            super(field, depth, id);

            this._renderNode.classList.add("fox");
        }

        call(): void {
            this.renderCallBubble("Ringa-ding-ding-a-ding-a-ding-ding!");
        }
    }

    // Example Usage
    //  ===============================================
    export function execute(targetId: string): void {
        let field: HTMLElement = document.getElementById(targetId);
        if (field) {
            let sheep0 = new Sheep(field, 100, "sheep-0");
            let pig0 = new Pig(field, 200, "pig-0");
            let fox0 = new Fox(field, 150, "fox-0");
        }  
    }
}