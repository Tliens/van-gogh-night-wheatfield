// 梵高·麦田（新片）：同一构图 × 三个方向，一次注册 vg_a / vg_b / vg_c。
//   vg_a 夜·星月夜   vg_b 昼·麦田群鸦   vg_c 暮·灯下麦田
// 构图：上 55% 天空（漩涡＋月/日），右侧丝柏，左侧小屋，下方麦浪；少女坐在麦田的椅子上喝茶，
//       橘猫在旁，乌鸦飞过（主动作），麦浪/星漩/花瓣为母题循环。
// 管线照 09_postimp 标杆：平涂底稿 → 流场笔触 → 道具层细笔触 → 深色线稿（8fps 沸腾）→ 会动的高光 → 角色。
(() => {
  const W = 1920, H = 1080, P = PAINT;
  const HZ = 580, VP = [960, HZ];                       // 地平线与麦浪透视消失点
  const swirls = [[430, 230, 80], [640, 180, 55], [770, 310, 45]];
  const stars = [[360, 150, 15], [520, 130, 11], [680, 240, 13], [300, 320, 10], [840, 140, 10], [560, 350, 9], [250, 220, 8]];
  const girlPal0 = { skin: '#f8dcc6', hair: '#f2c552', hairLine: '#c4922c', dress: '#3a5fb4', fold: '#2a4386', apron: '#f6f1e6', hat: '#ecc860', hatBand: '#2f50a8',
    cheek: 'rgba(240,120,110,.45)', lip: '#d0504e', iris: '#2a4d90', lw: 4, cupBody: '#2a50b0', cupRim: '#4a2a12' };
  const catPal = { orange: '#ec9433', white: '#fbf1dd', stripe: '#c0621a', lw: 4, eye: '#7ec850' };

  const MK = (id, V) => {
    SCENES[id] = (() => {
      const C = V.c;
      const SUN = V.sun ? [480, 200, 46] : null, MOON = V.moon ? [830, 160, 28] : null;
      const girlPal = { ...girlPal0, line: C.line }, SW = {
        sky: P.swatch(C.skyCols, 0.45), wheat: P.swatch(C.wheat, 0.35),
      };

      function base(g, t) {
        const sg = g.createLinearGradient(0, 0, 0, HZ); sg.addColorStop(0, C.sky[0]); sg.addColorStop(1, C.sky[1]);
        g.fillStyle = sg; g.fillRect(0, 0, W, HZ + 4);
        g.lineCap = 'round';
        swirls.forEach(([x, y, r], k) => { for (let ring = 0; ring < 3; ring++) { g.strokeStyle = ring % 2 ? C.swirl[0] : C.swirl[1]; g.lineWidth = 14 - ring * 3; g.beginPath();
          for (let a = 0; a < Math.PI * 3; a += 0.15) { const rr = r * (0.25 + a / (Math.PI * 3)) * (1 - ring * 0.12), aa = a + t * (0.9 + k * 0.2) * (k % 2 ? -1 : 1); const px = x + Math.cos(aa) * rr, py = y + Math.sin(aa) * rr * 0.8; a ? g.lineTo(px, py) : g.moveTo(px, py); } g.stroke(); } });
        if (SUN) { g.fillStyle = C.star; g.beginPath(); g.arc(SUN[0], SUN[1], SUN[2], 0, Math.PI * 2); g.fill();
          g.strokeStyle = C.star; g.lineWidth = 8; g.beginPath(); g.arc(SUN[0], SUN[1], SUN[2] + 16, 0, Math.PI * 2); g.stroke(); }
        if (MOON) { g.fillStyle = C.star; g.beginPath(); g.arc(MOON[0], MOON[1], MOON[2], 0, Math.PI * 2); g.fill();
          g.fillStyle = C.sky[0]; g.beginPath(); g.arc(MOON[0] - 13, MOON[1] - 8, MOON[2] * 0.82, 0, Math.PI * 2); g.fill(); }
        const wg = g.createLinearGradient(0, HZ, 0, H); wg.addColorStop(0, C.wheatFar); wg.addColorStop(1, C.wheat[0]);
        g.fillStyle = wg; g.fillRect(0, HZ, W, H - HZ);
        g.strokeStyle = C.wheatRow; g.lineWidth = 5;
        for (let i = -10; i <= 10; i++) { g.beginPath(); g.moveTo(VP[0] + i * 80, HZ); g.lineTo(VP[0] + i * 300, H); g.stroke(); }
        g.fillStyle = C.wheatRow; g.fillRect(0, HZ - 3, W, 8);
      }

      function props(g, t) {
        // 小屋（左，坐在地平线上）
        g.fillStyle = C.house; g.fillRect(170, 462, 250, 118);
        g.fillStyle = C.roof; g.beginPath(); g.moveTo(150, 466); g.lineTo(295, 388); g.lineTo(440, 466); g.closePath(); g.fill();
        g.fillStyle = C.win; g.fillRect(255, 500, 62, 56);
        g.strokeStyle = C.line; g.lineWidth = 5; g.strokeRect(255, 500, 62, 56);
        g.beginPath(); g.moveTo(286, 500); g.lineTo(286, 556); g.moveTo(255, 528); g.lineTo(317, 528); g.stroke();
        g.fillStyle = C.roof; g.fillRect(345, 512, 46, 68);
        // 丝柏（右，火焰形两层）
        g.fillStyle = C.cypress; g.beginPath(); g.moveTo(1700, 640); g.bezierCurveTo(1660, 500, 1712, 360, 1722, 180); g.bezierCurveTo(1752, 340, 1790, 500, 1768, 640); g.closePath(); g.fill();
        g.fillStyle = C.cypress2; g.beginPath(); g.moveTo(1728, 620); g.bezierCurveTo(1706, 500, 1736, 380, 1742, 240); g.bezierCurveTo(1758, 380, 1770, 500, 1758, 620); g.closePath(); g.fill();
        // 椅子（少女背后）
        g.fillStyle = '#e3ad38'; [[1432, 470, 16, 440], [1478, 480, 16, 430]].forEach(r => g.fillRect(...r));
        for (let k = 0; k < 4; k++) g.fillRect(1436, 510 + k * 55, 56, 10);
        g.fillRect(1250, 742, 250, 16); g.fillRect(1262, 750, 14, 160);
        // 向日葵一丛（猫身后，花头随时间轻摆）
        const fl = [[380, 900, 760], [455, 915, 700], [520, 895, 810]];
        g.strokeStyle = '#4d8a3a'; g.lineWidth = 6;
        fl.forEach(([x0, y0, y1]) => { g.beginPath(); g.moveTo(x0, y0); g.quadraticCurveTo(x0 + 14, (y0 + y1) / 2, x0 + 6, y1); g.stroke(); });
        fl.forEach(([x0, , y1], k) => { const x1 = x0 + 6, sp = Math.sin(t * 2.2 + k) * 0.08;
          g.fillStyle = '#f2b51c'; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + sp; g.beginPath(); g.ellipse(x1 + Math.cos(a) * 22, y1 + Math.sin(a) * 18, 10, 4.5, a, 0, Math.PI * 2); g.fill(); }
          g.fillStyle = '#8a4b14'; g.beginPath(); g.arc(x1, y1, 10, 0, Math.PI * 2); g.fill(); });
      }

      // 笔触方向场：天空沿漩涡切线，麦浪沿透视线加波浪
      const angle = (x, y, t) => {
        if (y < HZ + 4) {
          let best = null, bd = 1e9; swirls.forEach(s => { const d = Math.hypot(x - s[0], y - s[1]) / s[2]; if (d < bd) { bd = d; best = s; } });
          if (bd < 1.6) return Math.atan2(y - best[1], x - best[0]) + Math.PI / 2 + 0.25 * Math.sin(t * 0.5 + best[0] * 0.01);
          return 0.12 * Math.sin(x * 0.01 + t * 0.35) + 0.06 * Math.sin(y * 0.02);
        }
        return Math.atan2(y - VP[1], x - VP[0]) + V.wave * Math.sin(t * 1.3 + x * 0.012 + y * 0.008);
      };

      function lines(c, t) {
        const sd = P.boilSeed(t, 8); c.save(); c.strokeStyle = C.line; c.lineWidth = 4.5; c.lineJoin = 'round';
        const R_ = (pts, closed = true) => { P.roughPath(c, pts, { amp: 2.2, seed: sd * 31 + pts.length + (pts[0][0] | 0), closed, step: 14 }); c.stroke(); };
        R_([[150, 466], [295, 388], [440, 466]]);
        R_([[170, 462], [420, 462], [420, 580], [170, 580]]);
        R_([[255, 500], [317, 500], [317, 556], [255, 556]]);
        R_([[345, 512], [391, 512], [391, 580], [345, 580]]);
        R_([[1432, 470], [1448, 470], [1448, 910], [1432, 910]]); R_([[1478, 480], [1494, 480], [1494, 910], [1478, 910]]);
        for (let k = 0; k < 4; k++) R_([[1436, 510 + k * 55], [1492, 510 + k * 55], [1492, 520 + k * 55], [1436, 520 + k * 55]]);
        R_([[0, HZ], [W, HZ]], false);
        c.restore();
      }

      function crows(c, t) {
        c.strokeStyle = C.crow; c.lineCap = 'round';
        V.crows.forEach(([bx, by, s], k) => {
          const span = W + 400, x = ((bx - t * 85 * s) % span + span) % span - 200, y = by + Math.sin(t * 0.9 + k * 1.7) * 16;
          const f = Math.sin(t * 8 + k * 1.3) * 7 * s, w = 26 * s;
          c.lineWidth = 5 * s;
          c.beginPath(); c.moveTo(x - w, y + f); c.quadraticCurveTo(x - w * 0.4, y - 8 * s - f, x, y); c.quadraticCurveTo(x + w * 0.4, y - 8 * s - f, x + w, y + f); c.stroke();
        });
      }

      return {
        draw(c, lt, t) {
          const ch = P.choreo(lt, t);
          const b = P.scratch('vgBase'), bg = b.getContext('2d');
          base(bg, t); c.drawImage(b, 0, 0);
          const inHouse = (x, y) => x > 140 && x < 460 && y > 380 && y < HZ;
          const inCyp = (x, y) => x > 1640 && y < 660;
          const nearDisc = (x, y) => (SUN && Math.hypot(x - SUN[0], y - SUN[1]) < SUN[2] + 34) || (MOON && Math.hypot(x - MOON[0], y - MOON[1]) < MOON[2] + 26);
          const isSky = (x, y) => y < HZ + 4 && !inHouse(x, y) && !inCyp(x, y) && !nearDisc(x, y);
          P.strokes(c, b, { cell: 14, len: 56, width: 8, angle, seed: 11, t, boil: 0, outline: 0.8, outlineMix: 0.4, outlineCol: C.outline, palette: (x, y, col, r) => SW.sky(col, r), mask: isSky });
          P.strokes(c, b, { cell: 12, len: 44, width: 8, angle, seed: 23, t, boil: 0, outline: 0.85, outlineMix: 0.45, outlineCol: C.outline, palette: (x, y, col, r) => SW.wheat(col, r), mask: (x, y) => y > HZ + 2 && !inCyp(x, y) });
          // 道具层：小屋、丝柏、椅子、向日葵——单独画、单独上细肌理
          const Pr = P.scratch('vgProps'), pg = Pr.getContext('2d'); pg.clearRect(0, 0, W, H); props(pg, t);
          pg.save(); pg.globalCompositeOperation = 'source-atop';
          P.strokes(pg, Pr, { cell: 7, len: 14, width: 4.5, seed: 7, t, boil: 0, outline: 0.5, outlineMix: 0.35, jitterCol: 34, alphaMask: true,
            angle: (x, y) => inCyp(x, y) ? -Math.PI / 2 + 0.1 * Math.sin(y * 0.03) : (inHouse(x, y) ? 0.04 : 0.08) });
          pg.restore(); c.drawImage(Pr, 0, 0);
          lines(c, t);
          // 高光：日/月晕一圈圈向外脉动；暮色小屋窗里透灯
          const disc = SUN || MOON;
          if (disc) { c.save(); c.globalCompositeOperation = 'lighter'; c.lineCap = 'round';
            for (let k = 0; k < 3; k++) { const ph = ((t * 0.9 + k / 3) % 1), r = 30 + ph * 100; c.strokeStyle = `rgba(255,236,140,${0.26 * (1 - ph)})`; c.lineWidth = 16; c.setLineDash([22, 14]); c.lineDashOffset = -t * 60; c.beginPath(); c.arc(disc[0], disc[1], r, 0, Math.PI * 2); c.stroke(); }
            c.setLineDash([]); c.restore(); }
          if (V.glow) { c.save(); c.globalCompositeOperation = 'lighter';
            const gg = c.createRadialGradient(286, 528, 10, 286, 528, 240); gg.addColorStop(0, 'rgba(255,230,128,.5)'); gg.addColorStop(1, 'rgba(255,230,128,0)');
            c.fillStyle = gg; c.fillRect(46, 288, 480, 480);
            for (let k = 0; k < 3; k++) { const ph = ((t * 0.8 + k / 3) % 1), r = 20 + ph * 130; c.strokeStyle = `rgba(255,230,140,${0.3 * (1 - ph)})`; c.lineWidth = 10; c.setLineDash([16, 12]); c.lineDashOffset = -t * 50; c.beginPath(); c.arc(286, 528, r, 0, Math.PI * 2); c.stroke(); }
            c.setLineDash([]); c.restore(); }
          // 星星：闪烁＋光圈
          stars.slice(0, V.nStars).forEach(([x, y, r], k) => { const tw = 0.75 + 0.35 * Math.sin(t * 5 + k * 1.7);
            c.fillStyle = `rgba(251,238,160,${V.starA})`; c.beginPath(); c.arc(x, y, r * 1.9 * tw, 0, Math.PI * 2); c.fill();
            c.fillStyle = C.star; c.beginPath(); c.arc(x, y, r * 0.75 * tw, 0, Math.PI * 2); c.fill(); });
          crows(c, t);
          // 角色：平涂 → 细笔触 → 补线（同 09）
          const L = P.scratch('vgChars'), lg = L.getContext('2d'); lg.clearRect(0, 0, W, H);
          const K = RIG.cat({ tail: ch.tail, blink: ch.blink, breathe: ch.breathe });
          const G = RIG.girl({ cup: ch.cup, sip: ch.sip, hat: 'straw', breathe: ch.breathe });
          RIG.drawCat(lg, K, { ...catPal, lw: 0 }); RIG.drawGirl(lg, G, { ...girlPal, mode: 'fill' });
          lg.save(); lg.globalCompositeOperation = 'source-atop';
          P.strokes(lg, L, { cell: 8, len: 16, width: 5, seed: 4, t, boil: 0, outline: 0, jitterCol: 22, alphaMask: true,
            angle: (x, y) => (x < 760 ? Math.atan2(y - 760, x - 545) + Math.PI / 2 : -Math.PI / 2 + 0.3 * Math.sin(y * 0.02)) });
          lg.restore();
          lg.save(); lg.clip(K.body); lg.lineCap = 'round';
          for (let ring = 0; ring < 7; ring++) { lg.strokeStyle = ring % 2 ? '#f7c063' : '#c96a1e'; lg.lineWidth = 7; lg.beginPath();
            for (let a = 0; a < Math.PI * 1.7; a += 0.12) { const rr = 18 + ring * 17, aa = a + ring * 0.7 + t * 0.6; const px = 505 + Math.cos(aa) * rr, py = 805 + Math.sin(aa) * rr * 0.9; a ? lg.lineTo(px, py) : lg.moveTo(px, py); } lg.stroke(); }
          lg.restore();
          c.drawImage(L, 0, 0);
          c.drawImage(RIG.visibleLines('vgCat', (g, lc) => RIG.drawCat(g, K, { ...catPal, line: lc, whisker: lc }), C.line, [340, 500, 740, 940]), 0, 0);
          c.drawImage(RIG.visibleLines('vgGirl', (g, lc) => RIG.drawGirl(g, G, { ...girlPal, line: lc }), C.line, [1060, 200, 1520, 950]), 0, 0);
          // 线稿层会画穿帽檐：之后把帽子整顶重盖一遍（填色＋草编短笔＋外轮廓）
          c.save(); c.lineJoin = 'round'; c.lineCap = 'round';
          [G.brim, G.crown].forEach(p => { c.fillStyle = girlPal.hat; c.fill(p); });
          c.save(); c.clip(G.brim); c.clip(G.brim);
          const hr = U.rng(55); c.lineWidth = 3.5;
          for (let i = 0; i < 70; i++) { const x = G.A.headTop[0] - 140 + hr() * 280, y = G.A.headTop[1] - 40 + hr() * 70; c.strokeStyle = hr() < .5 ? '#f6d977' : '#c99a2e'; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 16, y + 2); c.stroke(); }
          c.restore();
          c.save(); c.clip(G.crown); for (let i = 0; i < 30; i++) { const x = G.A.headTop[0] - 60 + hr() * 130, y = G.A.headTop[1] - 50 + hr() * 50; c.strokeStyle = hr() < .5 ? '#f6d977' : '#c99a2e'; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 3, y + 14); c.stroke(); } c.restore();
          c.fillStyle = girlPal.hatBand; c.fill(G.band);
          c.strokeStyle = C.line; c.lineWidth = 4; c.stroke(G.brim); c.stroke(G.crown);
          c.restore();
          P.steam(c, t, G.cup.x, G.cup.y - 6, { h: 70, n: 2, color: 'rgba(240,244,255,.85)', width: 4, spread: 14, wobble: 9 });
        },
      };
    })();
  };

  MK('vg_a', {
    moon: true, nStars: 7, starA: 0.55, wave: 0.14, disc: true,
    crows: [[300, 210, 1.0], [900, 160, 0.75], [600, 300, 0.6]],
    c: { sky: ['#1d2c7c', '#3a5bc0'], swirl: ['#8fb3ec', '#5a82d6'], star: '#f6d84a',
      wheat: ['#b08828', '#8a6e20', '#6a6a3a', '#4a5a6a', '#3a4a5e', '#c9a030'], wheatFar: '#7a7a3a', wheatRow: '#3a4258',
      line: '#1c2458', outline: [24, 30, 78], cypress: '#1f4a2c', cypress2: '#2a5c38', house: '#2a3a7a', roof: '#1a2160', win: '#f2c94c', crow: '#141a40',
      skyCols: ['#22339a', '#2f4fb8', '#5c86dc', '#8fb6ee', '#1b2a78', '#3c6bd0'] },
  });
  MK('vg_b', {
    sun: true, nStars: 0, wave: 0.2, disc: true,
    crows: [[350, 190, 1.15], [1000, 150, 0.9], [650, 270, 0.7], [1250, 230, 0.55]],
    c: { sky: ['#4a8ad8', '#8fc4ee'], swirl: ['#f6e9b0', '#ffffff'], star: '#f8dc50',
      wheat: ['#f2c418', '#e6b60e', '#f8dc50', '#d0a20e', '#c08e12', '#e8c830'], wheatFar: '#d8b428', wheatRow: '#a8800e',
      line: '#3a2c14', outline: [58, 44, 20], cypress: '#2a5a2e', cypress2: '#3a7040', house: '#8a6a3a', roof: '#4a3a1e', win: '#3a2c14', crow: '#141414',
      skyCols: ['#4a8ad8', '#6fa8e4', '#8fc4ee', '#5a92d8', '#a8d4f2'] },
  });
  MK('vg_c', {
    glow: true, nStars: 4, starA: 0.4, wave: 0.16, disc: false,
    crows: [[500, 240, 0.6], [1100, 180, 0.5]],
    c: { sky: ['#3a2a7a', '#6a52a4'], swirl: ['#a892e0', '#7a66b8'], star: '#ffe680',
      wheat: ['#a08a2e', '#8a7a26', '#c0a030', '#6f6a30', '#565a3a', '#b09028'], wheatFar: '#8a7a3a', wheatRow: '#3a3448',
      line: '#241c4e', outline: [36, 28, 78], cypress: '#1a3a28', cypress2: '#265236', house: '#4a3a6e', roof: '#2a2050', win: '#ffe680', crow: '#1a1430',
      skyCols: ['#3a2a7a', '#54418f', '#6a52a4', '#443478', '#7a62b0'] },
  });
})();
