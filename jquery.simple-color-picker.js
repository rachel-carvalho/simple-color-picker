
$.fn.simpleColorPicker = function(options) {
    var defaults = {
        colorsPerLine: 9,
        colors: [ '#000000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#9900ff', '#ff00ff',
                  '#444444', '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#cfe2f3', '#d9d2e9', '#ead1dc',
                  '#666666', '#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a2c4c9', '#9fc5e8', '#b4a7d6', '#d5a6bd',
                  '#999999', '#e06666', '#f6b26b', '#ffd966', '#93c47d', '#76a5af', '#6fa8dc', '#8e7cc3', '#c27ba0',
                  '#cccccc', '#cc0000', '#e69138', '#f1c232', '#6aa84f', '#45818e', '#3d85c6', '#674ea7', '#a64d79',
                  '#eeeeee', '#990000', '#b45f06', '#bf9000', '#38761d', '#134f5c', '#0b5394', '#351c75', '#741b47',
                  '#f3f3f3', '#660000', '#783f04', '#7f6000', '#274e13', '#0c343d', '#073763', '#20124d', '#4C1130'],
        showEffect: '',
        hideEffect: '',
        effectDuration: 'fast',
        onChangeColor: false,
        ieHackListItem: '<li style="float: none; clear: both; overflow: hidden; background-color: #fff; display: block; height: 1px; line-height: 1px; font-size: 1px; margin-bottom: -2px;"></li>',
        templates: {
            colorPicker: '<div id="${prefix}color-picker" class="color-picker" style="position: absolute; left: 0px; top: 0px;"><ul>{{html listItems}}</ul><div style="clear: both;"></div></div>',
            listItem: '<li id="${prefix}color-${idx}" class="color-box" style="${breakline}background-color: ${color}" title="${color}"></li>'
        }
    };

    var opts = $.extend(defaults, options);

    return this.each(function() {
        var elem = $(this),
            colorsMarkup = '',
            prefix = String(elem.attr('id')).replace(/-/g, '') + '_';
        
       
        
        for (var i = 0; i < opts.colors.length; i++) {
            var color = opts.colors[i],
                breakline = '';
            
            if (i % opts.colorsPerLine == 0) {
                breakline = 'clear: both; ';
            }
            
            if (i > 0 && breakline && $.browser && $.browser.msie && $.browser.version <= 7) {
                breakline = '';
                colorsMarkup += opts.ieHackListItem;
            }
            
            // NOTE ugly hack...sorry
            colorsMarkup += $("<div />").append($.tmpl(opts.templates.listItem, {
                "prefix": prefix,
                "idx": i,
                "breakline": breakline,
                "color": color
            })).html();
        }
        
        var box = $.tmpl(opts.templates.colorPicker, {
            "prefix": prefix,
            "listItems": colorsMarkup
        });
        
        $('body').append(box);
        box.hide();

        box.find('li.color-box').click(function() {
            var selected_color = opts.colors[this.id.substr(this.id.indexOf('-') + 1)];
            if (elem.is('input')) {
                elem.val(selected_color);
                elem.blur();
            }
            if ($.isFunction(defaults.onChangeColor)) {
                try {
                    defaults.onChangeColor.call(elem, selected_color);
                } catch (e) {
                    if (console && console.log) {
                        console.log("ERROR @ onChangeColor:", e);
                    }
                }
            }
            hideBox(box);
        });

        $('body').live('click', function() {
            hideBox(box);
        });

        box.click(function(event) {
            event.stopPropagation();
        });

        var positionAndShowBox = function(box) {
          var pos = elem.offset();
          var left = pos.left + elem.outerWidth() - box.outerWidth();
          if (left < pos.left) left = pos.left;
          box.css({ left: left, top: (pos.top + elem.outerHeight()) });
          showBox(box);
        };

        elem.click(function(event) {
          event.stopPropagation();
          if (!elem.is('input')) {
            // element is not an input so probably a link or div which requires the color box to be shown
            positionAndShowBox(box);
          }
        });

        elem.focus(function() {
          positionAndShowBox(box);
        });

        function hideBox(box) {
            if (opts.hideEffect == 'fade')
                box.fadeOut(opts.effectDuration);
            else if (opts.hideEffect == 'slide')
                box.slideUp(opts.effectDuration);
            else
                box.hide();
        }

        function showBox(box) {
            if (opts.showEffect == 'fade') {
                box.fadeIn(opts.effectDuration);
            } else if (opts.showEffect == 'slide') {
                box.slideDown(opts.effectDuration);
            } else {
                box.show();
            }
        }
    });
};
