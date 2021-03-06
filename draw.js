(function (window) {
	'use strict';
	var startCode;
	var endCode;
	var length;
	var time = 4000;
	var num;
	
	window.onload = function() {
		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			document.getElementById("logo").style.display = "none";
		}
		document.getElementById("settings-card").classList.add('expand');
	}
	
	function initial() {
		for (var i = 1; i < num; i++) {
			var numEle = document.createElement("div");
			numEle.classList.add("year-disp");
			numEle.classList.add("transitive");
			numEle.classList.add("mdl-cell");
			numEle.classList.add("mdl-cell--12-col");
			numEle.setAttribute("id", "year-disp" + i)
			numEle.innerHTML = "????";
			document.getElementById("numbers-disp").appendChild(numEle);
		}
		document.getElementById("info-disp").style.height = 3 * num + "em";
	}
	
	var random_under = function (upbound) {
		return Math.floor(Math.random() * upbound);
	};
	
	var random = function () {
		return Math.floor(Math.random() * length) + startCode;
	}
	
	var roll = function () {
		for (var i = 0; i < num; i++) {
			document.getElementById('year-disp' + i).classList.remove('highlight-text');
		}
		var roll_progress = 0;
		var sel_years = new Array();
		var last_idxs = new Array();
		for (var i = 0; i < num; i++) {
			sel_years.push(-1);
			last_idxs.push(0);
		}
		var timer_id;
		timer_id = setInterval(function () {
			var len = length;
			var idxs = new Array();
			for (var i = 0; i < num; i++) {
				idxs.push(random());
			}
			if (roll_progress === 1) {
				// stop rolling
				return;
			}
			if (roll_progress === 0) {
				// keep rolling
				for (var i = 0; i < num; i++) {
					if (idxs[i] === last_idxs[i]) {
						idxs[i] = random();
					}
				}
				for (var i = 0; i < num; i++) {
					last_idxs[i] = idxs[i];
				}
				while (hasDuplicate(idxs)) {	// if the results has duplicates
					for (var i = 0; i < num; i++) {
						if (idxs[i] === last_idxs[i]) {
							idxs[i] = random();
						}
					}
					for (var i = 0; i < num; i++) {
						last_idxs[i] = idxs[i];
					}
				}
				for (var i = 0; i < num; i++) {
					document.getElementById('year-disp' + i).innerText = idxs[i];
				}
			} else if (roll_progress === 0.5) {
				// keep half rolling
				for (var i = 0; i < Math.ceil(num / 2); i++) {
					if (idxs[i + Math.floor(num / 2)] == last_idxs[i + Math.floor(num / 2)]) {
						idxs[i + Math.floor(num / 2)] = random();
					}
				}
				for (var i = 0; i < Math.ceil(num / 2); i++) {
					last_idxs[i + Math.floor(num / 2)] = idxs[i + Math.floor(num / 2)];
				}
				while (hasDuplicate(idxs)) {	// if the results has duplicates
					for (var i = 0; i < Math.ceil(num / 2); i++) {
						if (idxs[i + Math.floor(num / 2)] == last_idxs[i + Math.floor(num / 2)]) {
							idxs[i + Math.floor(num / 2)] = random();
						}
					}
					for (var i = 0; i < Math.ceil(num / 2); i++) {
						last_idxs[i + Math.floor(num / 2)] = idxs[i + Math.floor(num / 2)];
					}
				}
				for (var i = 0; i < Math.ceil(num / 2); i++) {
					document.getElementById('year-disp' + (i + Math.floor(num / 2))).innerText = idxs[i];
				}
			}
		}, 40);
		
		function hasDuplicate(ary) {
			if (ary.length > 1) {
				var nary = ary.sort(); 
				for(var i = 0; i < ary.length; i++){ 
					if (nary[i] === nary[i+1]){ 
						return true;
					} 
				}
				return false;
			} else {
				return false;
			}
		}
		
		document.getElementById('btn-stop').onclick = function() {
			roll_progress = 1;
			for (var i = 0; i < num; i++) {
				sel_years[i] = last_idxs[i];
			}
			for (var i = 0; i < num; i++) {
				document.getElementById('year-disp' + i).classList.add('highlight-text');
			}
			document.getElementById('btn-stop').classList.add('collapse');
			document.getElementById('btn-more').classList.remove('collapse');
			document.getElementById('btn-okay').classList.remove('collapse');
			var disp_card = document.getElementById('main-card');
			disp_card.classList.remove('expand');
			disp_card.classList.add('expand-more');
			disp_card.style.height = (3 * num + 9) + "em";
			document.getElementById('list-card').classList.add('expand');
			setTimeout(function () {
				document.getElementById('list-card').classList.remove('expand');
				document.getElementById('list-card').classList.add('expand-more');
			}, 700);  // > 600ms
			var winner_list = document.getElementById('winner-list');
			for (var i = 0; i < num; i++) {
				var item = document.createElement('div');
				item.classList.add('transitive');
				item.classList.add('winner-list-item');
				if (winner_list.children.length % 2 === 0) item.classList.add('odd');
				item.innerHTML = document.getElementById('year-disp' + i).innerHTML.toString();
				if (winner_list.children.length === 0)
					winner_list.appendChild(item);
				else
					winner_list.insertBefore(item, winner_list.firstElementChild);
			}
			var items = document.querySelectorAll(".winner-list-item");
			for (var i = 0; i < items.length; i++) {
				items[i].classList.add("expand");
			}
			document.getElementById('btn-half').classList.add('collapse');
		};
		
			
		document.getElementById('btn-half').onclick = function() {
			if (roll_progress == 0) {
				roll_progress = 0.5;
				for (var i = 0; i < Math.floor(num / 2); i++) {
					sel_years[i] = last_idxs[i];
				}
				for (var i = 0; i < Math.floor(num / 2); i++) {
					document.getElementById('year-disp' + i).classList.add('highlight-text');
				}
				document.getElementById('btn-stop').classList.add('collapse');
				var disp_card = document.getElementById('main-card');
				disp_card.classList.remove('expand');
				disp_card.classList.add('expand-more');
				disp_card.style.height = (3 * num + 9) + "em";
				document.getElementById('list-card').classList.add('expand');
				setTimeout(function () {
					document.getElementById('list-card').classList.remove('expand');
					document.getElementById('list-card').classList.add('expand-more');
				}, 700);  // > 600ms
				var winner_list = document.getElementById('winner-list');
				for (var i = 0; i < Math.floor(num / 2); i++) {
					var item = document.createElement('div');
					item.classList.add('transitive');
					item.classList.add('winner-list-item');
					if (winner_list.children.length % 2 === 0) item.classList.add('odd');
					item.innerHTML = document.getElementById('year-disp' + i).innerHTML.toString();
					if (winner_list.children.length === 0)
						winner_list.appendChild(item);
					else
						winner_list.insertBefore(item, winner_list.firstElementChild);
				}
				var items = document.querySelectorAll(".winner-list-item");
				for (var i = 0; i < items.length; i++) {
					items[i].classList.add("expand");
				}
			} else if (roll_progress == 0.5) {
				roll_progress = 1;
				for (var i = 0; i < Math.ceil(num / 2); i++) {
					sel_years[i + Math.floor(num / 2)] = last_idxs[i + Math.floor(num / 2)];
				}
				for (var i = 0; i < Math.ceil(num / 2); i++) {
					document.getElementById('year-disp' + (i + Math.floor(num / 2))).classList.add('highlight-text');
				}
				document.getElementById('btn-half').classList.add('collapse');
				document.getElementById('btn-more').classList.remove('collapse');
				document.getElementById('btn-okay').classList.remove('collapse');
				var disp_card = document.getElementById('main-card');
				disp_card.classList.remove('expand');
				disp_card.classList.add('expand-more');
				disp_card.style.height = (3 * num + 9) + "em";
				document.getElementById('list-card').classList.add('expand');
				setTimeout(function () {
					document.getElementById('list-card').classList.remove('expand');
					document.getElementById('list-card').classList.add('expand-more');
				}, 700);  // > 600ms
				var winner_list = document.getElementById('winner-list');
				for (var i = 0; i < Math.ceil(num / 2); i++) {
					var item = document.createElement('div');
					item.classList.add('transitive');
					item.classList.add('winner-list-item');
					if (winner_list.children.length % 2 === 0) item.classList.add('odd');
					item.innerHTML = document.getElementById('year-disp' + (i + Math.floor(num / 2))).innerHTML.toString();
					if (winner_list.children.length === 0)
						winner_list.appendChild(item);
					else
						winner_list.insertBefore(item, winner_list.firstElementChild);
				}
				var items = document.querySelectorAll(".winner-list-item");
				for (var i = 0; i < items.length; i++) {
					items[i].classList.add("expand");
				}
			}
		}
		// setTimeout(function () { roll_progress = 1; sel_year = last_idx; document.getElementById('year-disp').classList.add('highlight-text'); }, time);
		
		
		/*setTimeout(function () {
		document.getElementById('btn-more').classList.remove('collapse');
		document.getElementById('btn-okay').classList.remove('collapse');
		var disp_card = document.getElementById('main-card');
		disp_card.classList.remove('expand');
		disp_card.classList.add('expand-more');
		document.getElementById('list-card').classList.add('expand');
		setTimeout(function () {
		document.getElementById('list-card').classList.remove('expand');
		document.getElementById('list-card').classList.add('expand-more');
		}, 700);  // > 600ms
		var winner_list = document.getElementById('winner-list');
		var item = document.createElement('div');
		item.classList.add('transitive');
		item.classList.add('winner-list-item');
		if (winner_list.children.length % 2 === 0) item.classList.add('odd');
		item.innerHTML = last_idx.toString();
		if (winner_list.children.length === 0) winner_list.appendChild(item);
		else winner_list.insertBefore(item, winner_list.firstElementChild);
		setTimeout(function () { item.classList.add('expand'); }, 200);
		}, time + 1000);
		*/
	};
	
	
	
	document.getElementById('btn-go').onclick = function () {
		num = parseInt(document.getElementById("number").value);
		startCode = parseInt(document.getElementById("startNum").value);
		endCode = parseInt(document.getElementById("endNum").value);
		length = endCode - startCode + 1;
		if (num > 0 && endCode > startCode && startCode !== null && isFinite(startCode) && 
			endCode !== null && isFinite(endCode) && length >= num) {
			initial();
			document.getElementById('btn-go').classList.add('collapse');
			document.getElementById('main-card').classList.add('expand');
			$('#settings-card').animate({height: '0px'}, 50);
			document.getElementById("main-card").style.height = (3 * num + 9) + "em";
			document.getElementById('btn-stop').classList.remove('collapse');
			if (num > 1) {
				document.getElementById('btn-half').classList.remove('collapse');
			}
			roll();
		}
	};
	document.getElementById('btn-more').onclick = function () {
		document.getElementById('btn-more').classList.add('collapse');
		document.getElementById('btn-okay').classList.add('collapse');
		if (num > 1) {
			document.getElementById('btn-half').classList.remove('collapse');
		}
		document.getElementById('main-card').classList.remove('expand-more');
		document.getElementById('main-card').classList.add('expand');
		document.getElementById("main-card").style.height = (3 * num + 9) + "em";
		document.getElementById('btn-stop').classList.remove('collapse');
		roll();
	};
	document.getElementById('btn-okay').onclick = function () {
		document.getElementById('main-card').classList.remove('expand-more');
		document.getElementById('main-card').style.height = 0;
		document.getElementById('winner-list').classList.add('largetext');
		//document.getElementById('winners-caption').classList.add('largetext');
		document.getElementById('congrats').classList.add('expand');
		document.getElementById('btn-prize').classList.remove('collapse');
	};
	document.getElementById('btn-prize').onclick = function () {
		document.getElementById('list-card').classList.remove('expand-more');
		document.getElementById('btn-prize').classList.add('collapse');
		document.getElementById('prize-card').classList.add('expand');
	};
}(window));