/* Maze of Triangles — HTML story + one hanging scroll. Dialogue and maths unchanged. */
(function () {
  "use strict";

  var ART = "../../comics/Special lines and centres in triangles/maze/";

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  function svg(html, w, h) {
    var wrap = el("div", "scroll-figs");
    wrap.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' +
      w +
      " " +
      h +
      '" width="' +
      w +
      '" height="' +
      h +
      '">' +
      html +
      "</svg>";
    return wrap;
  }

  function tri(ax, ay, bx, by, cx, cy, marks) {
    marks = marks || {};
    var d = "M " + ax + " " + ay + " L " + bx + " " + by + " L " + cx + " " + cy + " Z";
    var out = '<path d="' + d + '" fill="none" stroke="#3a2a18" stroke-width="2.2" stroke-linejoin="round"/>';
    function ticks(x1, y1, x2, y2, n) {
      var mx = (x1 + x2) / 2;
      var my = (y1 + y2) / 2;
      var dx = x2 - x1;
      var dy = y2 - y1;
      var len = Math.sqrt(dx * dx + dy * dy) || 1;
      var px = (-dy / len) * 6;
      var py = (dx / len) * 6;
      var i, ox;
      for (i = 0; i < n; i++) {
        ox = (i - (n - 1) / 2) * 4.2;
        out +=
          '<line x1="' +
          (mx + px + (dx / len) * ox) +
          '" y1="' +
          (my + py + (dy / len) * ox) +
          '" x2="' +
          (mx - px + (dx / len) * ox) +
          '" y2="' +
          (my - py + (dy / len) * ox) +
          '" stroke="#9b1c1c" stroke-width="1.6"/>';
      }
    }
    if (marks.ab) ticks(ax, ay, bx, by, marks.ab);
    if (marks.bc) ticks(bx, by, cx, cy, marks.bc);
    if (marks.ac) ticks(ax, ay, cx, cy, marks.ac);
    function dot(x, y, lab, col) {
      out +=
        '<circle cx="' +
        x +
        '" cy="' +
        y +
        '" r="4" fill="' +
        col +
        '"/>' +
        '<text x="' +
        (x + 7) +
        '" y="' +
        (y - 6) +
        '" font-size="12" font-weight="700" fill="' +
        col +
        '">' +
        lab +
        "</text>";
    }
    if (marks.labs) {
      dot(ax, ay, marks.labs[0], "#9b1c1c");
      dot(bx, by, marks.labs[1], "#1d4e89");
      dot(cx, cy, marks.labs[2], "#2f6b3a");
    }
    if (marks.lens) {
      function midLab(x1, y1, x2, y2, t) {
        out +=
          '<text x="' +
          ((x1 + x2) / 2 + 2) +
          '" y="' +
          ((y1 + y2) / 2 - 4) +
          '" font-size="11" fill="#3a2a18">' +
          t +
          "</text>";
      }
      if (marks.lens.ab) midLab(ax, ay, bx, by, marks.lens.ab);
      if (marks.lens.bc) midLab(bx, by, cx, cy, marks.lens.bc);
      if (marks.lens.ac) midLab(ax, ay, cx, cy, marks.lens.ac);
    }
    if (marks.angB) {
      out +=
        '<path d="M ' +
        (bx + 14) +
        " " +
        by +
        " A 14 14 0 0 0 " +
        bx +
        " " +
        (by - 14) +
        '" fill="none" stroke="#1d4e89" stroke-width="2"/>';
      if (marks.angB !== true) {
        out +=
          '<text x="' +
          (bx + 16) +
          '" y="' +
          (by - 16) +
          '" font-size="11" fill="#1d4e89">' +
          marks.angB +
          "</text>";
      }
    }
    if (marks.right) {
      out +=
        '<path d="M ' +
        (cx - 10) +
        " " +
        cy +
        " L " +
        (cx - 10) +
        " " +
        (cy - 10) +
        " L " +
        cx +
        " " +
        (cy - 10) +
        '" fill="none" stroke="#1d4e89" stroke-width="1.6"/>';
    }
    if (marks.incDot) {
      out += '<circle cx="' + bx + '" cy="' + by + '" r="5" fill="#6b3fa0"/>';
    }
    if (marks.outDot) {
      out += '<circle cx="' + cx + '" cy="' + cy + '" r="5" fill="#6b3fa0"/>';
    }
    return out;
  }

  function pairColor(scaleRight) {
    var s = scaleRight ? 1.15 : 1;
    return svg(
      '<g transform="translate(8,8)">' +
        tri(8, 78, 8, 18, 78, 78, { labs: ["A", "B", "C"], right: true }) +
        '</g><g transform="translate(' +
        (scaleRight ? 118 : 118) +
        ',8) scale(' +
        s +
        ')">' +
        tri(8, 78, 8, 18, 78, 78, { labs: ["D", "E", "F"], right: true }) +
        "</g>",
      240,
      96
    );
  }

  function pair345(k) {
    return svg(
      '<g transform="translate(4,6)">' +
        tri(10, 80, 10, 20, 86, 80, {
          labs: ["A", "B", "C"],
          right: true,
          lens: { ab: String(3 * k), ac: String(4 * k), bc: String(5 * k) },
        }) +
        '</g><g transform="translate(118,6)">' +
        tri(10, 80, 10, 20, 86, 80, {
          labs: ["D", "E", "F"],
          right: true,
          lens: { ab: String(6 * (k === 1 ? 1 : k)), ac: String(8 * (k === 1 ? 1 : k)), bc: String(10 * (k === 1 ? 1 : k)) },
        }) +
        "</g>",
      240,
      96
    );
  }

  var PAGES = {
    ch1: {
      banner: "The Entrance Gate",
      kicker: "Maze of Triangles · 1",
      art: ART + "ch1-story.png",
      rows: [
        {
          lines: [
            { who: "kai", text: "A triangle gate?" },
            { who: "emi", text: "It wants matching vertices." },
          ],
          title: "1. The Rune Gate",
          fig: function () { return pairColor(false); },
        },
        {
          lines: [
            { who: "emi", text: "A matches D." },
            { who: "ren", text: "Then B–E and C–F." },
          ],
          title: "2. Read the Order",
          notes: [
            { text: "A ↔ D    B ↔ E    C ↔ F" },
            { text: "Triangle ABC ~ Triangle DEF", cls: "emph" },
            { text: "first–first, second–second, third–third", cls: "muted" },
          ],
        },
        {
          lines: [
            { who: "ren", text: "So AB matches DE." },
            { who: "kai", text: "And BC matches EF!" },
          ],
          title: "3. Match the Sides",
          notes: [
            { text: "AB ↔ DE" },
            { text: "BC ↔ EF" },
            { text: "AC ↔ DF" },
          ],
        },
        {
          lines: [
            { who: "kai", text: "ABC matches DFE?" },
            { who: "emi", text: "No! B would match F." },
          ],
          title: "4. Trap Answer",
          notes: [
            { text: "WRONG: Triangle ABC ~ Triangle DFE", cls: "bad" },
            { text: "B would match F." },
          ],
        },
        {
          lines: [
            { who: "emi", text: "Write ABC ~ DEF." },
            { who: "kai", text: "Look—the gate is opening!" },
          ],
          title: "5. Gate Unlocked",
          fig: function () { return pairColor(false); },
          seal: "Checkpoint: C matches F",
        },
      ],
    },
    ch2: {
      banner: "The Mirror Corridor",
      kicker: "Maze of Triangles · 2",
      art: ART + "ch2-story.png",
      rows: [
        {
          lines: [
            { who: "kai", text: "Why is my reflection larger?" },
            { who: "emi", text: "Same shape, different size." },
          ],
          title: "1. Mirror Shapes",
          fig: function () { return pairColor(true); },
          notes: [{ text: "same shape; different size", cls: "ok" }],
        },
        {
          lines: [
            { who: "emi", text: "Each matching side is doubled." },
            { who: "ren", text: "One ratio links them all." },
          ],
          title: "2. Side Ratios",
          fig: function () {
            return svg(
              '<g transform="translate(4,6)">' +
                tri(10, 80, 10, 20, 86, 80, { labs: ["A", "B", "C"], right: true, lens: { ab: "3", ac: "4", bc: "5" } }) +
                '</g><g transform="translate(118,6)">' +
                tri(10, 80, 10, 20, 86, 80, { labs: ["D", "E", "F"], right: true, lens: { ab: "6", ac: "8", bc: "10" } }) +
                "</g>",
              240,
              96
            );
          },
          notes: [{ text: "3/6 = 4/8 = 5/10", cls: "emph" }],
        },
        {
          lines: [
            { who: "ren", text: "The scale factor is 2." },
            { who: "kai", text: "So every side doubles." },
          ],
          title: "3. Scale Factor",
          notes: [
            { text: "3 × 2 = 6" },
            { text: "4 × 2 = 8" },
            { text: "5 × 2 = 10" },
            { text: "scale factor = 2", cls: "emph" },
          ],
        },
        {
          lines: [
            { who: "kai", text: "The unknown side is x." },
            { who: "emi", text: "Scale 6 by 1.5: x = 9." },
          ],
          title: "4. Find the Missing Side",
          notes: [{ text: "6/4 = 1.5,   x = 6 × 1.5 = 9", cls: "emph" }],
        },
        {
          lines: [
            { who: "ren", text: "The mirrors agree!" },
            { who: "kai", text: "A hidden passage!" },
          ],
          title: "5. Passage Open",
          notes: [
            { text: "ANGLES: equal", cls: "ok" },
            { text: "SIDES: proportional", cls: "ok" },
          ],
          seal: "Passage open",
        },
      ],
    },
    ch3: {
      banner: "The Crystal Bridge",
      kicker: "Maze of Triangles · 3",
      art: ART + "ch3-story.png",
      rows: [
        {
          lines: [
            { who: "kai", text: "Two angle marks glow." },
            { who: "ren", text: "That proves AA similarity." },
          ],
          title: "1. Angle Crystal",
          fig: function () {
            return svg(
              '<g transform="translate(6,8)">' +
                tri(10, 80, 18, 18, 92, 80, { labs: ["A", "B", "C"], angB: true }) +
                '</g><g transform="translate(120,8)">' +
                tri(10, 80, 18, 18, 92, 80, { labs: ["D", "E", "F"], angB: true }) +
                "</g>",
              240,
              96
            );
          },
          seal: "AA",
        },
        {
          lines: [
            { who: "emi", text: "These side ratios match." },
            { who: "ren", text: "The angle is included: SAS." },
          ],
          title: "2. Prism of SAS",
          fig: function () {
            return svg(
              '<g transform="translate(4,8)">' +
                tri(12, 82, 40, 18, 96, 82, { labs: ["A", "B", "C"], lens: { ab: "4", bc: "6" }, angB: "60°" }) +
                '</g><g transform="translate(120,8)">' +
                tri(12, 82, 40, 18, 96, 82, { labs: ["D", "E", "F"], lens: { ab: "6", bc: "9" }, angB: "60°" }) +
                "</g>",
              240,
              96
            );
          },
          notes: [{ text: "4/6 = 6/9;  angle B = angle E = 60°" }],
        },
        {
          lines: [
            { who: "ren", text: "All three ratios match." },
            { who: "kai", text: "Then it is SSS." },
          ],
          title: "3. Three-Side Rune",
          fig: function () {
            return svg(
              '<g transform="translate(4,6)">' +
                tri(10, 80, 10, 20, 86, 80, { labs: ["A", "B", "C"], right: true, lens: { ab: "3", ac: "4", bc: "5" } }) +
                '</g><g transform="translate(118,6)">' +
                tri(10, 80, 10, 20, 86, 80, { labs: ["D", "E", "F"], right: true, lens: { ab: "6", ac: "8", bc: "10" } }) +
                "</g>",
              240,
              96
            );
          },
          notes: [{ text: "3/6 = 4/8 = 5/10", cls: "emph" }],
        },
        {
          lines: [
            { who: "kai", text: "Equal angles mean congruent?" },
            { who: "ren", text: "No—only shape is fixed." },
          ],
          title: "4. False Clue",
          fig: function () { return pairColor(true); },
          notes: [
            { text: "AA fixes SHAPE only." },
            { text: "Similar, not congruent.", cls: "bad" },
          ],
        },
        {
          lines: [
            { who: "emi", text: "The checkpoint is AA." },
            { who: "kai", text: "The bridge is back—run!" },
          ],
          title: "5. Bridge Restored",
          notes: [
            { text: "70° at A and D" },
            { text: "50° at B and E" },
          ],
          seal: "Similar by AA",
        },
      ],
    },
    ch4: {
      banner: "The Twin Statues",
      kicker: "Maze of Triangles · 4",
      art: ART + "ch4-story.png",
      rows: [
        {
          lines: [
            { who: "kai", text: "The seals fit exactly." },
            { who: "emi", text: "Same shape and same size." },
          ],
          title: "1. Identical Guards",
          fig: function () { return pairColor(false); },
          notes: [{ text: "same shape + same size", cls: "ok" }],
        },
        {
          lines: [
            { who: "emi", text: "Keep the vertex order." },
            { who: "ren", text: "A–D, B–E, C–F." },
          ],
          title: "2. Order Still Matters",
          notes: [
            { text: "Triangle ABC ≅ Triangle DEF", cls: "emph" },
            { text: "A–D    B–E    C–F" },
          ],
        },
        {
          lines: [
            { who: "ren", text: "Three side pairs are equal." },
            { who: "kai", text: "The tick marks confirm it." },
          ],
          title: "3. Equal Sides",
          fig: function () {
            return svg(
              '<g transform="translate(4,8)">' +
                tri(12, 82, 18, 16, 96, 82, { labs: ["A", "B", "C"], ab: 1, bc: 2, ac: 3, lens: { ab: "5", bc: "6", ac: "7" } }) +
                '</g><g transform="translate(120,8)">' +
                tri(12, 82, 18, 16, 96, 82, { labs: ["D", "E", "F"], ab: 1, bc: 2, ac: 3, lens: { ab: "5", bc: "6", ac: "7" } }) +
                "</g>",
              240,
              96
            );
          },
        },
        {
          lines: [
            { who: "kai", text: "What about the angles?" },
            { who: "emi", text: "Every matching angle is equal." },
          ],
          title: "4. Equal Angles",
          notes: [{ text: "all corresponding angles equal", cls: "emph" }],
        },
        {
          lines: [
            { who: "ren", text: "Scale factor one." },
            { who: "kai", text: "The statues are moving!" },
          ],
          title: "5. Stairs Revealed",
          notes: [
            { text: "Congruent ⇒ Similar", cls: "ok" },
            { text: "scale factor = 1", cls: "emph" },
            { text: "Similar need not be congruent", cls: "bad" },
          ],
        },
      ],
    },
    ch5: {
      banner: "The Gear Gate",
      kicker: "Maze of Triangles · 5",
      art: ART + "ch5-story.png",
      rows: [
        {
          lines: [
            { who: "kai", text: "Three pairs of side gears!" },
            { who: "ren", text: "That checkpoint is SSS." },
          ],
          title: "1. Three Side Gears",
          fig: function () {
            return svg(
              '<g transform="translate(4,8)">' +
                tri(14, 84, 22, 14, 98, 84, { labs: ["A", "B", "C"], ab: 1, bc: 2, ac: 3 }) +
                '</g><g transform="translate(120,8)">' +
                tri(14, 84, 22, 14, 98, 84, { labs: ["D", "E", "F"], ab: 1, bc: 2, ac: 3 }) +
                "</g>",
              240,
              96
            );
          },
          seal: "SSS",
        },
        {
          lines: [
            { who: "emi", text: "Lengths 5, 7 and 8 match." },
            { who: "kai", text: "Both shields are congruent." },
          ],
          title: "2. SSS Check",
          fig: function () {
            return svg(
              '<g transform="translate(4,8)">' +
                tri(14, 84, 22, 14, 98, 84, { labs: ["A", "B", "C"], lens: { ab: "5", bc: "7", ac: "8" } }) +
                '</g><g transform="translate(120,8)">' +
                tri(14, 84, 22, 14, 98, 84, { labs: ["D", "E", "F"], lens: { ab: "5", bc: "7", ac: "8" } }) +
                "</g>",
              240,
              96
            );
          },
          notes: [{ text: "5 = 5,  7 = 7,  8 = 8", cls: "emph" }],
        },
        {
          lines: [
            { who: "ren", text: "Two sides and one angle." },
            { who: "emi", text: "Only if the angle is included." },
          ],
          title: "3. Included Dial",
          fig: function () {
            return svg(
              '<g transform="translate(4,8)">' +
                tri(12, 84, 40, 16, 100, 84, { labs: ["A", "B", "C"], lens: { ab: "6", bc: "8" }, angB: "60°", incDot: true }) +
                '</g><g transform="translate(120,8)">' +
                tri(12, 84, 40, 16, 100, 84, { labs: ["D", "E", "F"], lens: { ab: "6", bc: "8" }, angB: "60°", incDot: true }) +
                "</g>",
              240,
              96
            );
          },
          notes: [
            { text: "angle ABC = angle DEF = 60°" },
            { text: "two sides + INCLUDED angle", cls: "emph" },
          ],
        },
        {
          lines: [
            { who: "emi", text: "Six, eight, and 60 degrees." },
            { who: "ren", text: "Yes—SAS unlocks it." },
          ],
          title: "4. SAS Check",
          fig: function () {
            return svg(
              '<g transform="translate(4,8)">' +
                tri(12, 84, 40, 16, 100, 84, { labs: ["A", "B", "C"], lens: { ab: "6", bc: "8" }, angB: "60°" }) +
                '</g><g transform="translate(120,8)">' +
                tri(12, 84, 40, 16, 100, 84, { labs: ["D", "E", "F"], lens: { ab: "6", bc: "8" }, angB: "60°" }) +
                "</g>",
              240,
              96
            );
          },
          notes: [{ text: "6 = 6,  8 = 8", cls: "emph" }],
          seal: "SAS",
        },
        {
          lines: [
            { who: "kai", text: "Should I pull the SSA lever?" },
            { who: "emi", text: "Stop! SSA is a trap." },
          ],
          title: "5. SSA Trap",
          fig: function () {
            return svg(
              '<g transform="translate(4,8)">' +
                tri(12, 84, 40, 16, 100, 84, { labs: ["A", "B", "C"], lens: { ab: "5", ac: "8" }, outDot: true }) +
                '</g><g transform="translate(120,8)">' +
                tri(12, 84, 40, 16, 100, 84, { labs: ["D", "E", "F"], lens: { ab: "5", ac: "8" }, outDot: true }) +
                "</g>",
              240,
              96
            );
          },
          notes: [
            { text: "SSA is NOT a general test.", cls: "bad" },
            { text: "Angle is NOT between the two known sides." },
          ],
        },
      ],
    },
    ch6: {
      banner: "The Final Seal",
      kicker: "Maze of Triangles · 6",
      art: ART + "ch6-story.png",
      rows: [
        {
          lines: [
            { who: "emi", text: "Two angles surround this side." },
            { who: "ren", text: "That makes ASA." },
          ],
          title: "1. ASA Seal",
          notes: [{ text: "included side AB", cls: "muted" }],
          seal: "ASA",
        },
        {
          lines: [
            { who: "kai", text: "Here the side is outside." },
            { who: "ren", text: "Then the test is AAS." },
          ],
          title: "2. AAS Seal",
          notes: [{ text: "non-included side BC", cls: "muted" }],
          seal: "AAS",
        },
        {
          lines: [
            { who: "kai", text: "A right-triangle door!" },
            { who: "emi", text: "Use right angle, hypotenuse, side." },
          ],
          title: "3. Right-Triangle Door",
          fig: function () {
            return svg(
              '<g transform="translate(6,8)">' +
                tri(10, 80, 10, 18, 88, 80, { labs: ["A", "B", "C"], right: true }) +
                '</g><g transform="translate(120,8)">' +
                tri(10, 80, 10, 18, 88, 80, { labs: ["D", "E", "F"], right: true }) +
                "</g>",
              240,
              96
            );
          },
          seal: "RHS",
        },
        {
          lines: [
            { who: "emi", text: "Similar means same shape." },
            { who: "ren", text: "Congruent also means same size." },
          ],
          title: "4. Final Comparison",
          notes: [
            { text: "SIMILAR — same shape" },
            { text: "CONGRUENT — same shape + size", cls: "emph" },
            { text: "Both have equal corresponding angles." },
          ],
        },
        {
          lines: [
            { who: "kai", text: "We solved the final seal!" },
            { who: "emi", text: "The treasure is our summary!" },
          ],
          title: "5. Treasure Vault",
          notes: [{ text: "Treasure = summary scroll", cls: "muted" }],
          seal: "Maze cleared",
        },
      ],
    },
  };

  var LAW = {
    banner: "The Treasure of Triangles",
    kicker: "Similar & congruent — quick reference",
    sections: [
      {
        title: "Similar — properties",
        notes: [
          { text: "Same shape; size may differ." },
          { text: "Corresponding angles are equal." },
          { text: "Corresponding sides are proportional." },
          { text: "One scale factor links every side." },
        ],
      },
      {
        title: "Similarity tests",
        notes: [
          { text: "AA: two equal angle pairs." },
          { text: "SAS: 2 sides in ratio, included angle." },
          { text: "SSS: 3 sides in ratio." },
        ],
      },
      {
        title: "Congruent — properties",
        notes: [
          { text: "Same shape and same size." },
          { text: "All corresponding sides are equal." },
          { text: "All corresponding angles are equal." },
          { text: "Scale factor = 1." },
        ],
      },
      {
        title: "Congruence tests",
        notes: [
          { text: "SSS, SAS, ASA, AAS, RHS." },
          { text: "RHS: right angle, hypotenuse, one side." },
          { text: "Do not use SSA as a general test.", cls: "bad" },
        ],
      },
    ],
  };

  function whoLabel(who) {
    return who === "kai" ? "Kai" : who === "emi" ? "Emi" : "Ren";
  }

  function renderBubbles(lines) {
    var box = el("div", "maze-bubbles");
    (lines || []).forEach(function (line) {
      var b = el("div", "maze-bubble " + line.who);
      var who = el("span", "who", whoLabel(line.who) + ":");
      b.appendChild(who);
      b.appendChild(document.createTextNode(" " + line.text));
      box.appendChild(b);
    });
    return box;
  }

  function renderSection(row) {
    var sec = el("section", "scroll-section");
    sec.appendChild(el("p", "scroll-kicker", row.title));
    if (typeof row.fig === "function") sec.appendChild(row.fig());
    (row.notes || []).forEach(function (n) {
      sec.appendChild(el("p", "scroll-note" + (n.cls ? " " + n.cls : ""), n.text));
    });
    if (row.seal) sec.appendChild(el("span", "scroll-seal", row.seal));
    return sec;
  }

  function renderScrollCell(row, index, total) {
    var cell = el("div", "maze-scroll-cell");
    if (index === 0) cell.classList.add("is-first");
    if (index === total - 1) cell.classList.add("is-last");
    if (index === 0) cell.appendChild(el("div", "scroll-rod"));
    var sheet = el("div", "scroll-sheet");
    sheet.appendChild(renderSection(row));
    cell.appendChild(sheet);
    if (index === total - 1) cell.appendChild(el("div", "scroll-rod"));
    return cell;
  }

  function mountChapter(host, page) {
    var root = el("div", "maze-page");
    var banner = el("header", "maze-banner");
    var titles = el("div");
    titles.appendChild(el("p", "maze-banner-kicker", page.kicker));
    titles.appendChild(el("h3", "", page.banner));
    banner.appendChild(titles);
    root.appendChild(banner);

    var rows = el("div", "maze-rows");
    page.rows.forEach(function (row, i) {
      var pair = el("div", "maze-row");
      var panel = el("div", "maze-panel");
      panel.setAttribute("data-slice", String(i));
      var img = document.createElement("img");
      img.src = page.art;
      img.alt = page.banner + " panel " + (i + 1);
      panel.appendChild(img);
      panel.appendChild(renderBubbles(row.lines));
      pair.appendChild(panel);
      pair.appendChild(renderScrollCell(row, i, page.rows.length));
      rows.appendChild(pair);
    });
    root.appendChild(rows);
    host.appendChild(root);
  }

  function mountLaw(host) {
    var vault = el("div", "maze-vault");
    var art = document.createElement("img");
    art.className = "maze-vault-art";
    art.src = ART + "treasure-vault-tall.png";
    art.alt = LAW.banner;
    vault.appendChild(art);
    var ui = el("div", "maze-vault-ui");
    var banner = el("header", "maze-banner");
    var titles = el("div");
    titles.appendChild(el("p", "maze-banner-kicker", LAW.kicker));
    titles.appendChild(el("h3", "", LAW.banner));
    banner.appendChild(titles);
    ui.appendChild(banner);
    var col = el("aside", "maze-scroll");
    col.appendChild(el("div", "scroll-rod"));
    var sheet = el("div", "scroll-sheet");
    LAW.sections.forEach(function (row) {
      sheet.appendChild(renderSection(row));
    });
    col.appendChild(sheet);
    col.appendChild(el("div", "scroll-rod"));
    ui.appendChild(col);
    vault.appendChild(ui);
    host.appendChild(vault);
  }

  window.JM28Maze = {
    attach: function (comics) {
      return (comics || []).map(function (comic) {
        var page = PAGES[comic.id];
        if (page) {
          comic.mount = function (host) { mountChapter(host, page); };
          delete comic.image;
        } else if (comic.id === "law1" || /treasure|quick reference/i.test(comic.title || "")) {
          comic.mount = function (host) { mountLaw(host); };
          delete comic.image;
        }
        return comic;
      });
    },
  };
})();
