(function($) {

	// Plugin definition.
	$.fn.listItemSelector = function(options) {
		var settings = $.extend({}, $.fn.listItemSelector.defaults, options);
		return this.each(function() {

			var $wrapper = $(this);
			//$wrapper.empty();
			$wrapper.addClass("listItemSelector");

			var $titleDIV = $("<div/>");
			$titleDIV.addClass("listSelectorTitle");

			var $table = $("<table/>");
			var $tbody = $("<tbody>");
			var $tr = $("<tr>");

			var $td = $("<td>");
			var $leftListPanel = $("<div/>");
			$leftListPanel.attr("id","leftListPanel");
			$leftListPanel.addClass("listPanel");
			$td.append($leftListPanel);
			$tr.append($td);

			$td = $("<td>");
			$td.css("vertical-align", "middle");
			var $controlsPanel = $("<div/>");
			$controlsPanel.addClass("controlsPanel");
			var $moveAllRight = $('<button id="moveAllRight" class="buttonControl">&gt;&gt;</button>');
			var $moveRight = $('<button id="moveRight" class="buttonControl">&gt;</button>');
			var $moveLeft = $('<button id="moveLeft" class="buttonControl">&lt;</button>');
			var $moveAllLeft = $('<button id="moveAllLeft" class="buttonControl">&lt;&lt;</button>');

			$td.append($controlsPanel);
			$tr.append($td);

			$td = $("<td>");
			var $rightListPanel = $("<div/>");
			$rightListPanel.attr("id","rightListPanel");
			$rightListPanel.addClass("listPanel");
			$td.append($rightListPanel);
			$tr.append($td);

			$tbody.append($tr);
			$table.append($tbody);

			var $leftList=$('<ul id="leftUL"></ul>');
			var $rightList=$('<ul id="rightUL"></ul>');

			if(settings.leftArray && settings.leftArray.length>0){
				for ( var i = 0; i < settings.leftArray.length; i++) {
					var $LI = $("<li/>");
					$LI.attr("value",settings.leftArray[i]).text(settings.leftArray[i]);
					$leftList.append($LI);
				}

			}else{
				$leftList = $wrapper.find("ul#leftUL:last");
				if($leftList.length==0){
					$leftList=$wrapper.find("ul:last");
				}
			}

			if(settings.rightArray && settings.rightArray.length>0){
				for ( var i = 0; i < settings.rightArray.length; i++) {
					var $LI = $("<li/>");
					$LI.attr("value",settings.rightArray[i]).text(settings.rightArray[i]);
					$rightList.append($LI);
				}
			}else{
				$rightList = $wrapper.find("ul#rightUL:last");
				if($rightList.length==0){
					$rightList='<ul id="rightUL"></ul>';
				}
			}
			$leftListPanel.append($leftList);
			$rightListPanel.append($rightList);

			$wrapper.empty();

			$wrapper.append($titleDIV);
			$wrapper.append($table);

			if(settings.listBox.height) $wrapper.find('.listPanel').css("height",settings.listBox.height);
			if(settings.listBox.width) $wrapper.find('.listPanel').css("width",settings.listBox.width);
			if(settings.listSelectorTitle) $titleDIV.text(settings.listSelectorTitle);

			if(settings.controls.moveAllRight) $controlsPanel.append($moveAllRight);
			if(settings.controls.moveRight) $controlsPanel.append($moveRight);
			if(settings.controls.moveLeft) $controlsPanel.append($moveLeft);
			if(settings.controls.moveAllLeft) $controlsPanel.append($moveAllLeft);

			$wrapper.find("li").live("click",listItemSelectorLIClick);
			$moveAllRight.live("click", listItemSelectorMoveAllRight);
			$moveRight.live("click", listItemSelectorMoveRight);
			$moveLeft.live("click",listItemSelectorMoveLeft);
			$moveAllLeft.live("click", listItemSelectorMoveAllLeft);

		});

		function listItemSelectorLIClick() {

			var selecteList = $(this).parents('div.listPanel');
			var allElements = $(selecteList).find("li");

			$(allElements).removeClass("selectedListItem");
			$(this).addClass("selectedListItem");

			return false;
		}
		function listItemSelectorMoveAllRight() {

			var rightList = $(this).parents(".listItemSelector").find('div#rightListPanel ul');
			var leftList = $(this).parents(".listItemSelector").find('div#leftListPanel ul');

			$(leftList).find("li").each(function() {
				var selectedItem = $(this).text();

				var newLI = $('<li/>');
				if($(this).attr("op") != "rem"){
					$(newLI).attr("op","add");
				}

				var selectedValue = $(this).attr("value");
				$(newLI).attr("value",selectedValue);

				$(newLI).text(selectedItem).appendTo(rightList);
				$(this).remove();
			});


			return false;
		}
		function listItemSelectorMoveRight() {

			var rightList = $(this).parents(".listItemSelector").find('div#rightListPanel ul');
			var leftList = $(this).parents(".listItemSelector").find('div#leftListPanel ul');

			var selectedLI = $(leftList).find("li.selectedListItem:last");

			if($(selectedLI).length >0){
				var selectedItem = $(selectedLI).text();
				var newLI = $('<li/>');
				if($(selectedLI).attr("op") != "rem"){
					$(newLI).attr("op","add");
				}

				var selectedValue = $(selectedLI).attr("value");
				$(newLI).attr("value",selectedValue);

				$(newLI).text(selectedItem).appendTo(rightList);
				$(selectedLI).remove();
			}


			return false;
		}
		function listItemSelectorMoveLeft() {

			var rightList = $(this).parents(".listItemSelector").find('div#rightListPanel ul');
			var leftList = $(this).parents(".listItemSelector").find('div#leftListPanel ul');

			var selectedLI = $(rightList).find("li.selectedListItem:last");

			if($(selectedLI).length >0){
				var selectedItem = $(selectedLI).text();

				var newLI = $('<li/>');
				if($(selectedLI).attr("op") != "add"){
					$(newLI).attr("op","rem");
				}

				var selectedValue = $(selectedLI).attr("value");
				$(newLI).attr("value",selectedValue);

				$(newLI).text(selectedItem).appendTo(leftList);
				$(selectedLI).remove();
			}


			return false;
		}

		function listItemSelectorMoveAllLeft() {
			var rightList = $(this).parents(".listItemSelector").find('div#rightListPanel ul');
			var leftList = $(this).parents(".listItemSelector").find('div#leftListPanel ul');


			$(rightList).find("li").each(function() {
				var selectedItem = $(this).text();

				var newLI = $('<li/>');
				if($(this).attr("op") != "add"){
					$(newLI).attr("op","rem");
				}

				var selectedValue = $(this).attr("value");
				$(newLI).attr("value",selectedValue);

				$(newLI).text(selectedItem).appendTo(leftList);
				$(this).remove();
			});

			return false;
		}

	};
	
	// Plugin defaults Ð added as a property on our plugin function.
	$.fn.listItemSelector.defaults = {
			listBox : {
				height : 150,
				width : 250
			},
			controls : {
				moveAllRight : true,
				moveRight : true,
				moveLeft : true,
				moveAllLeft : true
			},
			listSelectorTitle : "Title",
			leftArray : [],
			rightArray: []
	};

})(jQuery);
