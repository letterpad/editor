const rows = 6;
const columns = 8;
const grid = [];
const images = [{ w: 100, h: 250 }, { w: 200, h: 100 }];

// aspect ratios
const ars = [1, 1 / 2, 2 / 3, 3 / 4, 4 / 5, 5 / 4, 4 / 3, 3 / 2, 2 / 1];

// 1:2   2:1
for (let i = 0; i < images.length; i++) {
  const diff = [];
  const img = images[i];
  let r = img.w / img.h;
  for (let j = 0; j < ars.length; j++) {
    const ar = ars[j];
    diff.push(Math.abs(ar - r));
  }
  const closest = Math.min(...diff);

  img.ar = ars[diff.indexOf(closest)];
}
console.log("images :", images);
// const boundary = images.reduce(
//   (acc, initial) => {
//     return {
//       w: acc.w + initial.w,
//       h: Math.max(acc.h, initial.h)
//     };
//   },
//   { w: 0, h: 0 }
// );

// console.log("boundary :", boundary);

// // create the grid
// for (let i = 0; i < rows; i++) {
//   const row = [];
//   for (let j = 0; j < columns; j++) {
//     row.push(0);
//   }
//   grid.push(row);
// }
