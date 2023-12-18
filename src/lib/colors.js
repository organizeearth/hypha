// @TODO add sin() rule to stretch red-yellow through to the 
import chroma from 'chroma-js';


const cycles = [
  // 6 colors (blue-purple)
  ["red", "orange", "yellow", "green", "blue", "purple", "red"],
  
  [
    "rgb(255,0,0)", //  F00 red
    "rgb(255,127,0)",
    "rgb(255,255,0)",
    "rgb(127,255,0)",
    "rgb(0,255,0)", /// 0F0 green
    "rgb(0,255,127)",
    "rgb(0,255,255)",
    "rgb(0,127,255)",
    "rgb(0,0,255)", // 00F blue
    "rgb(127,0,255)",
    "rgb(255,0,255)",
    "rgb(255,0,127)",
    "rgb(255,0,0)",
  ],
  [
    "rgb(255,0,0)",
    "rgb(255,255,0)",
    "rgb(0,255,0)",
    "rgb(0,255,255)",
    "rgb(0,0,255)",
    "rgb(255,0,255)",
    "rgb(255,0,0)",
  ],
  // 7 colors (cyan-blue-purple)
  ["red", "orange", "yellow", "green", "cyan", "blue", "purple", "red"],
  // 7 colors (cyan-indigo-purple)
  ["red", "orange", "yellow", "green", "cyan", "indigo", "purple", "red"],
  // 7 colors (cyan-blue-indigo)
  ["red", "orange", "yellow", "green", "cyan", "blue", "indigo", "red"],
  // 7 colors (blue-indigo-purple)
  ["red", "orange", "yellow", "green", "blue", "indigo", "purple", "red"],
];


function myScaledColor(degree, luminance, ratio) {
  if (typeof luminance === "undefined") {
    luminance = 0.1;
  }
  if (typeof luminance === "undefined") {
    ratio = 1.0;
  }

  const scale1 = chroma.scale(cycles[1]).mode("lch");

  const color1 = getHue(degree, 50, 80);
  const color2 = chroma(scale1(degree)).luminance(luminance); //chroma(scale1(degree)).luminance(luminance);
  const mixed = chroma.mix(color1, color2, ratio);

  return mixed;
}

/**
 *
 * @param {number} degree
 * @param {number} l
 * @param {number} c
 * @returns {chroma.Color}
 */
function getHue(degree, l, c) {
  const hue = (degree * 360 + 30) % 360;
  if (typeof l === "undefined") {
    l = 50;
  }
  if (typeof chroma === "undefined") {
    c = 80;
  }
  return chroma.lch(l, c, hue);
}

function myPerfectColor(degree, luminance) {
    if (typeof luminance === 'undefined') { luminance = 0.1; }

    const scale1 = chroma
      .scale(["red", "orange", "yellow", "green", "blue", "purple", "red"])
      .mode("lch");

    // @TODO play around????
    const scale2 = chroma
      .scale(["red", "orange", "darkorange", "yellow", "green", "blue", "purple", "red"])
      //.domain([0, 0.25, 0.5, 0.6, 0.7, 0.8, 0.9, 1])
      .mode("lch");
      
    const ratio = 0.5;
    const color1 = chroma.lch(50, 80, (degree * 360 + 30) % 360);
    const color2 = chroma(scale1(degree)).luminance(luminance); //chroma(scale1(degree)).luminance(luminance);
    const mixed = chroma.mix(color1, color2, ratio);

    return mixed;
}

function myPerfectGradient(degree, luminance) {
  if (typeof luminance === 'undefined') { luminance = 0.5; }

  const scale1 = chroma
    .scale(["red", "orange", "yellow", "green", "blue", "purple", "red"])
    .mode("lch");

  // @TODO play around????
  const scale2 = chroma
    .scale(["red", "orange", "darkorange", "yellow", "green", "blue", "purple", "red"])
    //.domain([0, 0.25, 0.5, 0.6, 0.7, 0.8, 0.9, 1])
    .mode("lch");
    
  const ratio = 0.5;
  const color1 = chroma.lch(50, 80, (degree * 360 + 30) % 360);
  const color2 = chroma(scale1(degree)).luminance(luminance); //chroma(scale1(degree)).luminance(luminance);
  const mixed = chroma.mix(color1, color2, ratio);
  const gradientStart = mixed.alpha(0.5).rgba();
  const gradientEnd = mixed.luminance(0.1).alpha(0).rgba();
  
  return `radial-gradient(ellipse at center, rgba(${gradientStart}) 0%, rgba(${gradientEnd}) 70.3%);`;
}

export { myScaledColor, myPerfectColor, myPerfectGradient }