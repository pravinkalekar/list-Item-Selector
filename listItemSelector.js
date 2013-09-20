(function($) {

	var defaults = {
			listBox : {
				height : 150,
				width : 250
			},
			listSelectorTitle : "Title"
	};

	$.fn.listItemSelector = function(options) {
		var settings = $.extend({}, defaults, options);
		return this.each(function() {

			var leftList = $(this).find("ul#leftUL:last");
			var rightList = $(this).find("ul#rightUL:last");
			
			if(leftList.length==0){
				leftList=$(this).find("ul:last");
			}
			if(rightList.length==0){
				rightList='<ul id="rightUL"></ul>';
			}

			$(this).empty();

			$(this).prepend('<div class="listSelectorTitle"></div>\
					<table>\
					<tbody>\
					<tr>\
					<td>\
					<div id="leftListPanel" class="listPanel"></div>\
					</td>\
					<td style="vertical-align: middle;">\
					<div class="controlsPanel">\
					<button id="moveAllRight" class="buttonControl">&gt;&gt;</button>\
					<button id="moveRight" class="buttonControl">&gt;</button>\
					<button id="moveLeft" class="buttonControl">&lt;</button>\
					<button id="moveAllLeft" class="buttonControl">&lt;&lt;</button>\
					</div>\
					</td>\
					<td><div id="rightListPanel" class="listPanel">\
					</div></td>\
					</tr>\
					</tbody>\
					</table>');


			$(this).find("#leftListPanel").append(leftList);
			$(this).find("#rightListPanel").append(rightList);

			$(this).addClass("listItemSelector");


			$(this).find("li").live("click",
					listItemSelectorLIClick);
			$(this).find("#moveAllRight").live(
					"click", listItemSelectorMoveAllRight);
			$(this).find("#moveRight").live(
					"click", listItemSelectorMoveRight);
			$(this).find("#moveLeft").live("click",
					listItemSelectorMoveLeft);
			$(this).find("#moveAllLeft").live(
					"click", listItemSelectorMoveAllLeft);

			if(settings.listBox.height) $(this).find('.listPanel').css("height",settings.listBox.height);
			if(settings.listBox.width) $(this).find('.listPanel').css("width",settings.listBox.width);
			if(settings.listSelectorTitle) $(this).find('.listSelectorTitle').text(settings.listSelectorTitle);
		});

		function listItemSelectorLIClick() {

			var selecteList = $(this).parents('div.listPanel');
			var allElements = $(selecteList).find("li");
			
			$(allElements).removeClass("selectedListItem");
			$(this).addClass("selectedListItem");

//			for (var i = 0; i < allElements.length; i++) {
//				if ($(allElements[i]).text() == $(this).text()) {
//
//					$(allElements[i]).addClass("selectedListItem");
//
//				}
//				else {
//					if ($(allElements[i]).hasClass("selectedListItem")) {
//						$(allElements[i]).removeClass("selectedListItem");
//					}
//				}
//			}

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
		
		
		function getRightList() {
			
			
		}

	};
	
	
})(jQuery);
