		var main = document.querySelector('main');
		var body = document.querySelector('body');

		//body.addEventListener("load", initBody, false);
		function fetchPage(pageId) {
			//console.log(pageId);
			//console.log(path);
			if (pageId === undefined || pageId == "/") pageId = "home";
			var myRequest = new Request(pageId + '.html');

			fetch(myRequest)
				.then(function (response) { return response.text() })
				.then(function (text) {
					main.innerHTML = text;
				});
		}

		el = document.querySelectorAll("a");
		function preventRedirection(e) {
			e.preventDefault();
			history.pushState({}, "", this.getAttribute("href"));
			//console.log(this.getAttribute("href"));
			if (this.getAttribute("href") == '/') fetchPage(); else fetchPage(e.target);
		}
		for (var i = 0; i < el.length; i++) {
			el[i].addEventListener("click", preventRedirection);
		}
		function initBody() {
			var initdiv = document.querySelector('div#init');
			var path = location.pathname.substring(1);
			pageId = path; if (path == "") pageId = "home";
			initdiv.style.display = "none";
			fetchPage(pageId);
			//console.log(pageId);
		}
