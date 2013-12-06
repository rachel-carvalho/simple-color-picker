var txt = null;
describe('Simple color picker', function() {

	var get_box = function() {
		return $('div#' + txt.attr('id').replace(/-/g, '') + '_color-picker');
	};

	beforeEach(function() {
		// add an input id="txt"
		txt = $(document.createElement('input'));
		txt.attr('id', 'txt');
		$('body').append(txt);
	});

	afterEach(function() {
		get_box().remove();
		txt.remove();
	});

	describe('default markup', function() {
		beforeEach(function() {
			txt.simpleColorPicker();
		});

		it('appends div#txt_color-picker to the body', function() {
			expect(get_box().length).toBe(1);
		});

		it('which is hidden', function() {
			expect(get_box().is(':hidden')).toBeTruthy();
		});

		it('with a ul inside', function() {
			expect(get_box().find('ul').length).toBe(1);
		});

		it('and 64 li.color-box', function() {
			expect(get_box().find('li.color-box').length).toBe(64);
		});

		it('of which 8 have clear:both (according to colorsPerLine default value)', function() {
			expect(get_box().find('li.color-box[style*="clear: both"]').length).toBe(8);
		});

		it('the first li.color-box has background-color #000000', function() {
			expect(get_box().find('li.color-box:first').attr('style').indexOf('background-color: #000000')).toBeGreaterThan(-1);
		});

		it('and title #000000', function() {
			expect(get_box().find('li.color-box:first').attr('title')).toBe('#000000');
		});
	});

	describe('options', function() {
		it('16 colors per line makes 4 clear:boths', function() {
			txt.simpleColorPicker({ colorsPerLine: 16 });
			expect(get_box().find('li.color-box[style*="clear: both"]').length).toBe(4);
		});

		describe('black and white only', function() {
			beforeEach(function(){
				txt.simpleColorPicker({ colors: ['#000000', '#ffffff'] });
			});

			it('makes 2 li.color-box', function() {
				expect(get_box().find('li.color-box').length).toBe(2);
			});

			it('one has background-color: #000000', function() {
				expect(get_box().find('li.color-box[style*="background-color: #000000"]').length).toBe(1);
			});

			it('another has background-color: #ffffff', function() {
				expect(get_box().find('li.color-box[style*="background-color: #ffffff"]').length).toBe(1);
			});

			it('one of which has clear:both', function() {
				expect(get_box().find('li.color-box[style*="clear: both"]').length).toBe(1);
			});
		});
	});

	describe('behavior', function() {
		var box = null;

		beforeEach(function() {
			txt.simpleColorPicker();
			box = get_box();
		});

		describe('focusing input', function() {
			it('positions color picker aligned to input right', function() {
				txt.focus();
				expect(box.offset().left + box.outerWidth()).toBe(txt.offset().left + txt.outerWidth());
			});

			it('or to left, if picker is wider than input', function() {
				txt.width(10).focus();
				expect(box.offset().left).toBe(txt.offset().left);
			});

			it('shows color picker', function() {
				expect(box.is(':hidden')).toBeTruthy();
				txt.focus();
				expect(box.is(':hidden')).not.toBeTruthy();
			});
		});

		describe('after picker is open', function() {
			beforeEach(function() {
				txt.focus();
			});

			it('clicking outside closes it', function() {
				expect(box.is(':hidden')).not.toBeTruthy();
				$('body').click();
				expect(box.is(':hidden')).toBeTruthy();
			});

			it('clicking another element closes it', function() {
				expect(box.is(':hidden')).not.toBeTruthy();
				var btn = $(document.createElement('button'));
				$('body').append(btn);
				btn.click();
				expect(box.is(':hidden')).toBeTruthy();
				btn.remove();
			});

			describe('clicking a color', function() {
				var color_li = null;
				var jq_hide_spy = null;
				beforeEach(function() {
					jq_hide_spy = spyOn($.fn, 'hide').and.callThrough();
					color_li = box.find('li.color-box:first');
					color_li.click();
				});

				it('fills the input with the right color code', function() {
					expect(txt.val()).toBe(color_li.attr('title'));
				});

				it('hides the picker', function() {
					expect(box.is(':hidden')).toBeTruthy();
				});

				it('by calling $.fn.hide on it', function() {
					expect(jq_hide_spy).toHaveBeenCalled();
					expect(jq_hide_spy.calls.count()).toEqual(1);
					expect(jq_hide_spy.calls.mostRecent().object[0]).toBe(box[0]);
				});
			});
		});
	});
});
