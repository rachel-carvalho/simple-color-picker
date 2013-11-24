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

});
