/*
 * jQuery counter - ui tool for controlling count of item by +/- buttons
 */
if (jQuery)(function($) {
	$.extend($.fn, {
		counter: function(method, data) {
			//
			// Private methods
			//
			var getSettings = function (input) {
				return input.settings;
			};

			var setSettings = function (input, obj) {
				var settings = input.settings;
				for(var name in obj) {
					if(obj.hasOwnProperty(name)) {
						settings[name] = obj[name];
					}
				}
			};

			var getValue = function (input) {
				return parseInt(input.val() || 0);
			};

			var setValue = function (input, value) {

				if((input.settings.minVal == undefined || input.settings.minVal <= value) && (input.settings.maxVal == undefined || input.settings.maxVal >= value)){
					var oldVal = getValue(input);
					var name = getItemName(input, value);

					if(value === 0) { //value becomes 0
						input.screen.addClass('ui-counter-value-empty');
					} else if(oldVal === 0) { // value was 0
						input.screen.removeClass('ui-counter-value-empty');
					}
					input.val(value);

					var text = value + ((name) ? ' ' + name : '');
					input.screen.html(text);
					if(oldVal !== value) {
						input.trigger('change');
					}
				}
			};

			var getItemName = function (input, count) {
				var defaultName = input.settings.defaultName || '';

				var twoDig = Math.abs(count) % 100;
				if(twoDig > 4 && twoDig < 21) { // 5 - 20
					var name = input.settings.fiveToNineName;
				} else {
					var oneDig = twoDig % 10;
					if(oneDig == 1){ // 1
						var name = input.settings.singleName;
					}else if(oneDig >1 && oneDig < 5){ // 2 - 4
						var name = input.settings.twoToFourName;
					}else{ // 5 - 10
						var name = input.settings.fiveToNineName;

					}
				}
				return name || defaultName;
			};

			var increaseValue = function (input) {
				setValue(input, getValue(input) + 1);
			};

			var decreaseValue = function (input) {
				setValue(input, getValue(input) - 1);
			};

			var init = function (input, settings) {
				var increaseControl = $('<div class="ui-counter-button ui-counter-button-plus"><span class="ui-counter-button-text">+</span></div>'),
					decreaseControl = $('<div class="ui-counter-button ui-counter-button-minus"><span class="ui-counter-button-text">&ndash;</span></div>'),
					screen = $('<span class="ui-counter-value-text"></span>'),
					screenContainer = $('<div class="ui-counter-value"></div>').append(screen),
					container = $('<div class="ui-counter-container"></div>').append(decreaseControl).append(screenContainer).append(increaseControl);

				input.screen = screen;
				input.settings = settings || {};
				input.data('input', input);

				increaseControl.click(function (e) {
					increaseValue(input);
				});

				decreaseControl.click(function (e) {
					decreaseValue(input);
				});

				setValue(input, getValue(input));

				container.width(input.width());
				input.before(container);
				input.css('display','none');

				screenContainer.width(container.width() - increaseControl.width() - decreaseControl.width());
			};


			//
			// Public methods
			//
			var input = this.data('input') || this;
			switch(method) {
				case 'value' :
					if(data) {
						setValue(this, data);
					} else {
						return getValue(this);
					}
					break;
				case 'settings' :
					if(data) {
						setSettings(this, data);
					} else {
						return getSettings(this);
					}
					break;
				default:
					init(this, method);
					break;
			}
		}
	});
})(jQuery);
