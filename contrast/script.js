  
      
  
  
 
 























if (CSS.supports('not (color: color-contrast(red vs black, white))')) {
  const elements = document.querySelectorAll('.contrast');
  elements.forEach(element => {
    const bgColor = window.getComputedStyle(element)
      .getPropertyValue('background-color'); 

    // Parse rgb values from color() function
    const rgb = bgColor.match(/color\((srgb|rgb) ([\d.]+) ([\d.]+) ([\d.]+)\)/i)
      .slice(2)
      .map(v => Math.round(v * 255)); 

    if (rgb) {
      const [r,g,b] = rgb;
      const brightness = (299 * r + 587 * g + 114 * b) / 1000;
      element.style.setProperty('--contrast-color', brightness <= 100 ? '#fff' : '#000')
    }
  });
}