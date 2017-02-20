namespace ClassesExample {
    class Animal {
        private _position: number;
        private _field: HTMLElement;
        private _renderNode: HTMLElement;
        private _isForward: boolean; 

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
            callBubble.innerText = ". . .";
        }        
    }

    class Sheep extends Animal {
        call(): void {
        }
    }

    class Cow extends Animal {
        call(): void {
        }
    }

    // Example Usage
    //  ===============================================
    export function execute(targetId: string): void {
       
    }
}