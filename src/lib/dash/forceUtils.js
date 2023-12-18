import { centerCircleId } from "./dashUtils";

export const gap = 3;
export const smallestCircleWidth = 10;
export const frontlineFactor = 10;
export const radiusScale = 0.25;
export const collabScale = 10;
export const centerRadius = 70;
//export const largestCircleWidth = 50;
export const equalSectors = false;
export const equalFrontline = false;

export const orgRadius = (node) => {
  if (node.id === centerCircleId) {
    return centerRadius;
  }
  const factors = [
    smallestCircleWidth,
    (node?.collabs?.length ? 1 : 0 || 0) * collabScale,
    //equalSectors ? 0 : (node.r || 0) * radiusScale,
    //equalFrontline ? 0 : node.isFrontline || 0 ? frontlineFactor : 0,
  ];
  return factors.reduce((a, b) => a + b, 0);
  //return smallestCircleWidth + (equalSectors ? 0 : (node.r || 0) * radiusScale)
};

export const orgCollide = (node) => {
  if (node.id === centerCircleId) {
    return centerRadius + gap;
  }
  const factors = [
    gap,
    smallestCircleWidth,
    (node?.collabs?.length ? 1 : 0 || 0) * collabScale,
    //equalSectors ? 0 : (node.r || 0) * radiusScale,
    //equalFrontline ? 0 : node.isFrontline || 0 ? frontlineFactor : 0,
  ];
  return factors.reduce((a, b) => a + b, 0);
};
