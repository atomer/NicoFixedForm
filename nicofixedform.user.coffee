###
// ==UserScript==
// @name        NicoFixedForm
// @namespace   http://www.atomer.sakura.ne.jp
// @description ニコニコ動画のマイリストページの編集コントロールをスクロールに追従させる
// @include     http://www.nicovideo.jp/my/mylist*
// @version     0.1
// ==/UserScript==
###

boot = ->
	id = setInterval(->
		article = document.querySelector(".articleBody")
		if article
			clearInterval(id)
			main(article)
		return
	, 500)
	return

main = (article)->
	box = article.querySelector(".spBox")
	boxParent = box.parentNode
	boxParent.style.height = boxParent.clientHeight + "px"
	html = document.querySelector("html")
	isFixed = false
	fixed = (isfxd)->
		if isfxd is isFixed
			return
		if isfxd
			box.style.background = "none repeat scroll 0 0 #FFFFFF"
			box.style.border = "1px solid #555555"
			box.style.position = "fixed"
			box.style.top = "50px"
			box.style.zIndex = "1000"
		else
			box.style.background = ""
			box.style.border = ""
			box.style.position = ""
			box.style.top = ""
			box.style.zIndex = ""
		isFixed = isfxd
		return

	onScroll = ->
		if article.parentNode
			fixed(html.scrollTop > window.innerHeight)
		else
			window.removeEventListener("scroll", onScroll)
			boot()
		return

	window.addEventListener("scroll", onScroll)
	return

boot()