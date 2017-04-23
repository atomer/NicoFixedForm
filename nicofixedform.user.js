// ==UserScript==
// @name        NicoFixedForm
// @namespace   http://www.atomer.sakura.ne.jp
// @description ニコニコ動画のマイリストページの編集コントロールをスクロールに追従させる
// @include     http://www.nicovideo.jp/my/mylist*
// @version     0.3
// ==/UserScript==

let boot = () => {
    let id = setInterval(() => {
        let article = document.querySelector(".articleBody");
        if (article) {
            clearInterval(id);
            main(article);
        }
    }, 500);
};

let main = article => {
	// box float
    let box = article.querySelector(".spBox");
    let boxParent = box.parentNode;
    boxParent.style.height = boxParent.clientHeight + "px";
    let html = document.querySelector("html");
    let isFixed = false;
    let fixed = isfxd => {
        if (isfxd === isFixed) {
            return;
        }
        if (isfxd) {
            box.style.background = "none repeat scroll 0 0 #FFFFFF";
            box.style.border = "1px solid #555555";
            box.style.position = "fixed";
            box.style.top = "50px";
            box.style.zIndex = "1000";
        } else {
            box.style.background = "";
            box.style.border = "";
            box.style.position = "";
            box.style.top = "";
            box.style.zIndex = "";
        }
        isFixed = isfxd;
    };

    let onScroll = () => {
        if (article.parentNode) {
            fixed(html.scrollTop > window.innerHeight);
        } else {
            window.removeEventListener("scroll", onScroll);
            boot();
        }
    };

    window.addEventListener("scroll", onScroll);

	// all select
	let INPUT_ID = "__nicofixedform-input";
	if (!document.getElementById(INPUT_ID)) {
		let listOption = article.querySelector(".listOption");
		if (listOption) {
			let div = document.createElement("div");
			let input = document.createElement("input");
			input.id = INPUT_ID;
			input.type = "checkbox";
			input.addEventListener("change", () => {
				let inputs = document.body.querySelectorAll("[name=checkbox]");
				inputs.forEach((el) => el.checked = input.checked);
			}, false);
			div.appendChild(input);
			div.style.position = "absolute";
			div.style.top = "127px";
			div.style.left = "6px";
			document.getElementById("mylist").appendChild(div);
		}
	}
};

boot();