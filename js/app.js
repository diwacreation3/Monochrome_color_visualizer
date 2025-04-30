const picker = document.getElementById('colorPicker');

    const sky = document.getElementById('sky');
    const mountains = document.getElementById('mountains');
    const hills = document.getElementById('hills');
    const foreground = document.getElementById('foreground');

    const skyBox = document.getElementById('skyBox');
    const mountainsBox = document.getElementById('mountainsBox');
    const hillsBox = document.getElementById('hillsBox');
    const foregroundBox = document.getElementById('foregroundBox');

    const skyLabel = document.getElementById('skyLabel');
    const mountainsLabel = document.getElementById('mountainsLabel');
    const hillsLabel = document.getElementById('hillsLabel');
    const foregroundLabel = document.getElementById('foregroundLabel');

    function hexToHSL(hex) {
      let r = parseInt(hex.slice(1, 3), 16) / 255;
      let g = parseInt(hex.slice(3, 5), 16) / 255;
      let b = parseInt(hex.slice(5, 7), 16) / 255;
      let max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;

      if (max === min) {
        h = s = 0;
      } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h *= 60;
      }
      return [h, s * 100, l * 100];
    }

    function hslToHex(h, s, l) {
      s /= 100;
      l /= 100;
      let c = (1 - Math.abs(2 * l - 1)) * s;
      let x = c * (1 - Math.abs((h / 60) % 2 - 1));
      let m = l - c / 2;
      let r, g, b;

      if (h < 60) { r = c; g = x; b = 0; }
      else if (h < 120) { r = x; g = c; b = 0; }
      else if (h < 180) { r = 0; g = c; b = x; }
      else if (h < 240) { r = 0; g = x; b = c; }
      else if (h < 300) { r = x; g = 0; b = c; }
      else { r = c; g = 0; b = x; }

      r = Math.round((r + m) * 255);
      g = Math.round((g + m) * 255);
      b = Math.round((b + m) * 255);

      return "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
    }

    function updateScene(hex) {
      const [h, s, l] = hexToHSL(hex);

      const colors = {
        sky: hslToHex(h, s, Math.min(l + 20, 100)),
        mountains: hslToHex(h, s, l),
        hills: hslToHex(h, s, Math.max(l - 10, 0)),
        foreground: hslToHex(h, s, Math.max(l - 20, 0))
      };

      sky.setAttribute("fill", colors.sky);
      mountains.setAttribute("fill", colors.mountains);
      hills.setAttribute("fill", colors.hills);
      foreground.setAttribute("fill", colors.foreground);

      skyBox.style.backgroundColor = colors.sky;
      mountainsBox.style.backgroundColor = colors.mountains;
      hillsBox.style.backgroundColor = colors.hills;
      foregroundBox.style.backgroundColor = colors.foreground;

      skyLabel.textContent = `Sky - ${colors.sky}`;
      mountainsLabel.textContent = `Mountains - ${colors.mountains}`;
      hillsLabel.textContent = `Hills - ${colors.hills}`;
      foregroundLabel.textContent = `Foreground - ${colors.foreground}`;
    }

    updateScene(picker.value);
    picker.addEventListener('input', () => updateScene(picker.value));