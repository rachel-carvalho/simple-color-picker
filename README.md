# simpleColorPicker

A simple color picker jQuery plugin that appears as the user focuses the input.

Check out the latest version at http://github.com/rachel-carvalho/simple-color-picker.

## Usage
Just attach the simpleColorPicker to an input text and when it gains focus the color palette appears aligned to its bottom right corner.

### Samples

#### Default options

    $(document).ready(function() {
        $('input#color').simpleColorPicker();
    });

#### More colors per line

    $(document).ready(function() {
        $('input#color2').simpleColorPicker({ colorsPerLine: 16 });
    });

#### Different colors

    $(document).ready(function() {
        var colors = ['#000000', '#444444', '#666666', '#999999', '#cccccc', '#eeeeee', '#f3f3f3', '#ffffff'];
        $('input#color3').simpleColorPicker({ colors: colors });
    });

#### Effects

    $(document).ready(function() {
        $('input#color4').simpleColorPicker({ showEffect: 'fade', hideEffect: 'slide' });
    });

#### Non-input elements

    $(document).ready(function() {
        $('button#color5').simpleColorPicker({ onChangeColor: function(color) { $('label#color-result').text(color); } });
    });

#### a little extra
    
    // ===================================
    // = converts html color code to HSL =
    // ===================================
    var colorToHSL = function (color) {
      var rgb, min, max, delta, h, s, l;
      if (color.length == 7) {
          rgb = [parseInt(color.substring(1, 3), 16) / 255,
                  parseInt(color.substring(3, 5), 16) / 255,
                  parseInt(color.substring(5, 7), 16) / 255];
      } else if (color.length == 4) {
          rgb = [parseInt(color.substring(1, 2), 16) / 15,
                  parseInt(color.substring(2, 3), 16) / 15,
                  parseInt(color.substring(3, 4), 16) / 15];
      }

      var r = rgb[0], 
          g = rgb[1], 
          b = rgb[2];
      min = Math.min(r, Math.min(g, b));
      max = Math.max(r, Math.max(g, b));
      delta = max - min;
      l = (min + max) / 2;
      s = 0;
      if (l > 0 && l < 1) {
        s = delta / (l < 0.5 ? (2 * l) : (2 - 2 * l));
      }
      h = 0;
      if (delta > 0) {
        if (max == r && max != g) {
          h += (g - b) / delta;
        }
        if (max == g && max != b) {
          h += (2 + (b - r) / delta);
        }
        if (max == b && max != r) {
          h += (4 + (r - g) / delta);
        }
        h /= 6;
      }
      return [h, s, l];
    };
    
    $('input#color6').simpleColorPicker({
      onChangeColor: function(color) {
        $(this).css({
            "background-color": color,
            "color": colorToHSL(color)[2] > 0.5 ? '#000' : '#fff'
        });
      },
      showEffect: 'slide',
      hideEffect: 'slide'
    });