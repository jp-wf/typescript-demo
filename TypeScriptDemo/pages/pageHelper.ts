﻿export module PageHelper {
    export function wrapCodeViewer(code: HTMLElement) {
        let parent: HTMLElement = code.parentElement;

        if (!parent.classList.contains("is-wrapped")) {
            let backdrop: HTMLElement = document.createElement("div");
            backdrop.className = "backdrop";
            parent.insertBefore(backdrop, parent.firstChild);

            let close: HTMLElement = document.createElement("i");
            close.className = "fa fa-window-close close-button";
            close.addEventListener("click", (e: Event) => {
                e.stopPropagation();
                parent.classList.remove("modal");
            });

            parent.appendChild(close);

            parent.addEventListener("click", () => {
                if ((code.innerHTML || "").trim() !== "") {
                    parent.classList.add("modal");
                }
            });

            parent.classList.add("is-wrapped");
        }
    }

    export function wrapImage(img: HTMLImageElement) {
        let parent: HTMLElement = img.parentElement;

        if (!parent.classList.contains("is-wrapped")) {
            let backdrop: HTMLElement = document.createElement("div");
            backdrop.className = "backdrop";
            parent.insertBefore(backdrop, parent.firstChild);

            let close: HTMLElement = document.createElement("i");
            close.className = "fa fa-window-close close-button";
            close.addEventListener("click", (e: Event) => {
                e.stopPropagation();
                parent.classList.remove("modal");
            });

            parent.appendChild(close);

            parent.addEventListener("click", () => {
                parent.classList.add("modal");
            });

            parent.classList.add("is-wrapped");
        }
    }

    export function addCopyToClipboard(element: HTMLElement) {
        let entityMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '/': '&#x2F;',
            '`': '&#x60;',
            '=': '&#x3D;'
        };

        let escapeHtml = (value: string) => {
            return value.replace(/[&<>"'`=\/]/g, (s) => {
                return entityMap[s];
            });
        };

        let parent: HTMLElement = element.parentElement;

        if (!parent.classList.contains("has-clipboard-icon")) {
            let copyNotification = document.createElement("div");
            copyNotification.classList.add("copy-notification");
            copyNotification.classList.add("hidden");

            let iconNotification = document.createElement('i');
            iconNotification.classList.add("fa");

            let copyAnchor = document.createElement("div");
            copyAnchor.classList.add("copy-anchor");

            let copyIcon = document.createElement("i");
            copyIcon.classList.add("fa");
            copyIcon.classList.add("fa-clipboard");
            copyIcon.title = "Copy to clipboard";
            copyIcon.addEventListener("click", (e: MouseEvent) => {
                e.stopPropagation();
                e.preventDefault();

                let success = () => {
                    copyNotification.classList.remove("hidden");
                    copyNotification.innerText = "Copy Successful";
                    copyNotification.classList.add("success");

                    iconNotification.classList.add("fa-thumbs-o-up");
                    iconNotification.classList.remove("fa-thumbs-o-down");
                    copyNotification.appendChild(iconNotification);
                };

                let failure = () => {
                    copyNotification.classList.remove("hidden");
                    copyNotification.innerText = "Copy Failed";
                    copyNotification.classList.add("error");

                    iconNotification.classList.remove("fa-thumbs-o-up");
                    iconNotification.classList.add("fa-thumbs-o-down");
                    copyNotification.appendChild(iconNotification);
                };

                try {
                    copyNotification.classList.add("hidden");
                    copyNotification.classList.remove("success");
                    copyNotification.classList.remove("error");

                    let range = document.createRange();
                    // add 'text' childNode of target element
                    let tempDiv = document.createElement("div");
                    tempDiv.style.whiteSpace = "pre";
                    tempDiv.innerHTML = escapeHtml(element.innerText);
                    document.body.appendChild(tempDiv);
                    range.selectNode(tempDiv.childNodes[0]);                    
                    window.getSelection().empty();
                    window.getSelection().addRange(range);
                    document.execCommand("copy");
                    window.getSelection().empty();
                    tempDiv.remove();
                    success();
                } catch (ex) {
                    failure();
                }
            });

            copyAnchor.appendChild(copyIcon);            
            copyAnchor.appendChild(copyNotification);
            parent.appendChild(copyAnchor);
            parent.classList.add("has-clipboard-icon");
        } else {
            let copyNotification = parent.querySelector(".copy-notification");
            if (copyNotification) {
                copyNotification.classList.add("hidden");
            }
        }
    }
}