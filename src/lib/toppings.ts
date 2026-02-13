import type { ToppingConfig } from '@/types/pizza';

// Fixed positions within each slice: af = angle fraction (0-1), rf = radius fraction (0-1)
export const SLICE_POSITIONS: Array<{ af: number; rf: number }> = [
  { af: 0.50, rf: 0.15 }, // 0: inner center
  { af: 0.30, rf: 0.37 }, // 1: mid-inner left
  { af: 0.70, rf: 0.37 }, // 2: mid-inner right
  { af: 0.22, rf: 0.58 }, // 3: middle left
  { af: 0.50, rf: 0.55 }, // 4: middle center
  { af: 0.78, rf: 0.58 }, // 5: middle right
  { af: 0.22, rf: 0.80 }, // 6: outer left
  { af: 0.50, rf: 0.78 }, // 7: outer center
  { af: 0.78, rf: 0.80 }, // 8: outer right
];

/** Distribute 9 slot positions among N toppings — more toppings = fewer per topping. */
export function distributePositions(count: number): number[][] {
  if (count === 0) return [];
  if (count === 1) return [[0, 1, 4, 6, 8]];
  if (count === 2) return [[0, 2, 5, 7], [1, 3, 6, 8]];
  if (count === 3) return [[0, 4, 8], [1, 5, 6], [2, 3, 7]];
  return [[0, 8], [1, 5], [4, 6], [3, 7]];
}

export const MAX_TOPPINGS = 4;

/** Neon colour assigned to each pizza element for the zone-map neon filter. */
export const NEON_TOPPING_COLORS: Record<string, [number, number, number]> = {
  pepperoni: [255, 20, 30],
  mushroom:  [180, 220, 255],
  olive:     [30, 180, 200],
  pepper:    [30, 255, 80],
  pineapple: [255, 200, 30],
  ham:       [255, 110, 170],
  chicken:   [255, 180, 50],
  onion:     [200, 50, 255],
  bacon:     [200, 30, 20],
  ranch:     [235, 240, 255],
};

export const TOPPING_CONFIGS: Record<string, ToppingConfig> = {
  pepperoni: {
    label: 'Pepperoni',
    type: 'positioned',
    render: (ctx, x, y) => {
      ctx.fillStyle = '#C23B22';
      ctx.beginPath();
      ctx.arc(x, y, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#A83020';
      ctx.beginPath();
      ctx.arc(x - 3, y - 2, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + 2, y + 3, 2.5, 0, Math.PI * 2);
      ctx.fill();
    },
  },
  mushroom: {
    label: 'Mushrooms',
    type: 'positioned',
    render: (ctx, x, y) => {
      ctx.fillStyle = '#F5F0E0';
      ctx.fillRect(x - 3, y, 6, 8);
      ctx.fillStyle = '#C4A87C';
      ctx.beginPath();
      ctx.arc(x, y, 8, Math.PI, 0);
      ctx.fill();
      ctx.fillStyle = '#A88B60';
      ctx.beginPath();
      ctx.arc(x, y, 5, Math.PI, 0);
      ctx.fill();
    },
  },
  olive: {
    label: 'Olives',
    type: 'positioned',
    render: (ctx, x, y) => {
      ctx.fillStyle = '#2D2D2D';
      ctx.beginPath();
      ctx.arc(x, y, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#8B8B3A';
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    },
  },
  pepper: {
    label: 'Peppers',
    type: 'positioned',
    render: (ctx, x, y) => {
      ctx.fillStyle = '#4A8C3F';
      ctx.fillRect(x - 5, y - 7, 10, 14);
      ctx.fillStyle = '#367030';
      ctx.fillRect(x - 2, y - 7, 4, 14);
    },
  },
  pineapple: {
    label: 'Pineapple',
    type: 'positioned',
    render: (ctx, x, y) => {
      ctx.fillStyle = '#E8A317';
      ctx.strokeStyle = '#8B6914';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x, y - 8);
      ctx.lineTo(x + 7, y + 6);
      ctx.lineTo(x - 7, y + 6);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = '#C47F10';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(x - 3, y - 1);
      ctx.lineTo(x + 3, y - 1);
      ctx.moveTo(x - 5, y + 3);
      ctx.lineTo(x + 5, y + 3);
      ctx.stroke();
    },
  },
  ham: {
    label: 'Ham',
    type: 'positioned',
    render: (ctx, x, y) => {
      ctx.fillStyle = '#F0A0B0';
      ctx.strokeStyle = '#D07888';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x - 8, y - 5);
      ctx.lineTo(x + 6, y - 7);
      ctx.lineTo(x + 8, y + 5);
      ctx.lineTo(x - 6, y + 7);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#F8C8D0';
      ctx.fillRect(x - 4, y - 1, 3, 2);
      ctx.fillRect(x + 1, y + 1, 3, 2);
    },
  },
  chicken: {
    label: 'Chicken',
    type: 'positioned',
    render: (ctx, x, y) => {
      ctx.fillStyle = '#E8C888';
      ctx.fillRect(x - 12, y - 4, 24, 8);
      ctx.beginPath();
      ctx.arc(x - 12, y, 4, Math.PI * 0.5, Math.PI * 1.5);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + 12, y, 4, -Math.PI * 0.5, Math.PI * 0.5);
      ctx.fill();
      ctx.strokeStyle = '#A07830';
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(x - 7, y - 4);
      ctx.lineTo(x - 7, y + 4);
      ctx.moveTo(x - 1, y - 4);
      ctx.lineTo(x - 1, y + 4);
      ctx.moveTo(x + 5, y - 4);
      ctx.lineTo(x + 5, y + 4);
      ctx.stroke();
    },
  },
  onion: {
    label: 'Onions',
    type: 'positioned',
    render: (ctx, x, y) => {
      ctx.strokeStyle = '#8B2252';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = '#C44D80';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = '#D87DA0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.stroke();
    },
  },
  bacon: {
    label: 'Bacon',
    type: 'positioned',
    render: (ctx, x, y) => {
      ctx.fillStyle = '#8B2500';
      ctx.beginPath();
      ctx.moveTo(x - 9, y - 3);
      ctx.quadraticCurveTo(x - 4, y - 7, x, y - 3);
      ctx.quadraticCurveTo(x + 4, y + 1, x + 9, y - 3);
      ctx.lineTo(x + 9, y + 3);
      ctx.quadraticCurveTo(x + 4, y + 7, x, y + 3);
      ctx.quadraticCurveTo(x - 4, y - 1, x - 9, y + 3);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#C87050';
      ctx.fillRect(x - 5, y - 1, 4, 2);
      ctx.fillRect(x + 2, y - 1, 3, 2);
    },
  },
  ranch: {
    label: 'Ranch',
    type: 'overlay',
    renderSlice: (ctx, cx, cy, startAngle, sliceWidth, innerR, outerR) => {
      ctx.strokeStyle = '#FAF8F0';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalAlpha = 0.8;

      ctx.beginPath();
      const steps = 40;
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const r = innerR * 0.5 + t * (outerR * 0.93 - innerR * 0.5);
        const wave = Math.sin(t * Math.PI * 6) * 0.28;
        const a = startAngle + (0.5 + wave) * sliceWidth;
        const px = cx + Math.cos(a) * r;
        const py = cy + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.globalAlpha = 1.0;
      ctx.lineCap = 'butt';
      ctx.lineJoin = 'miter';
    },
  },
};
