export class OneEuroFilter {
  minCutoff: number;
  beta: number;
  dCutoff: number;
  xPrev: number | null;
  dxPrev: number | null;
  tPrev: number | null;

  constructor(minCutoff = 1.0, beta = 0.0, dCutoff = 1.0) {
    this.minCutoff = minCutoff;
    this.beta = beta;
    this.dCutoff = dCutoff;
    this.xPrev = null;
    this.dxPrev = null;
    this.tPrev = null;
  }

  filter(t: number, x: number): number {
    if (this.tPrev === null) {
      this.xPrev = x;
      this.dxPrev = 0;
      this.tPrev = t;
      return x;
    }

    const dt = t - this.tPrev;
    const cutoff = this.minCutoff; // Fixed cutoff for simplicity, can be dynamic
    const alpha = this.alpha(cutoff, dt);
    
    const xHat = alpha * x + (1 - alpha) * (this.xPrev || 0);
    
    this.xPrev = xHat;
    this.tPrev = t;
    
    return xHat;
  }

  alpha(cutoff: number, dt: number): number {
    const tau = 1.0 / (2 * Math.PI * cutoff);
    return 1.0 / (1.0 + tau / dt);
  }
}

export const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor;
};
