const fs = require("fs");
const moment = require("moment");

const data = JSON.parse(fs.readFileSync("result.json"));

const COLORS = [
  "#4dc9f6",
  "#f67019",
  "#f53794",
  "#537bc4",
  "#acc236",
  "#166a8f",
  "#00a950",
  "#58595b",
  "#8549ba",
  "#4dc9f6",
  "#f67019",
  "#f53794",
  "#537bc4",
  "#acc236",
  "#166a8f",
  "#00a950",
  "#58595b",
  "#8549ba",
  "#4dc9f6",
  "#f67019",
  "#f53794",
  "#537bc4",
  "#acc236",
  "#166a8f",
  "#00a950",
  "#58595b",
  "#8549ba",
  "#4dc9f6",
  "#f67019",
  "#f53794",
  "#537bc4",
  "#acc236",
  "#166a8f",
  "#00a950",
  "#58595b",
  "#8549ba",
  "#4dc9f6",
  "#f67019",
  "#f53794",
  "#537bc4",
  "#acc236",
  "#166a8f",
  "#00a950",
  "#58595b",
  "#8549ba",
  "#4dc9f6",
  "#f67019",
  "#f53794",
  "#537bc4",
  "#acc236",
  "#166a8f",
  "#00a950",
  "#58595b",
  "#8549ba",
];

// get name of all classes
const projects = new Set(data.map((item) => item.project));

let dates = [
  ...new Set(
    data
      .map((d) => d.initial)
      .map((d) =>
        d.split("-")[1] == 12 ? +d.split("-")[0] : +d.split("-")[0] - 1
      )
  ),
].sort()

dates = new Array(2021 - dates[0]).fill(1).map((date, i) => dates[0]+i)


const d = ["mean" , "median", "std"].map((analised) => {
  const r = ["cbo", "lcom", "loc", "wmc"].map((metric) => {
    const r = [...projects].map((projectName, index) => {
      const item = data.find((item) => item.project == projectName);
      console.log('aaaa',dates.length - item[metric].map((m) => m[analised]).length);
      const datesDiff = new Array(dates.length - item[metric].map((m) => m[analised]).length).fill(null);
      const defaultItem = {
        label: item.project,
        data: [...item[metric].map((m) => m[analised])]
          .reverse()
          .concat(datesDiff)
          .reverse(),
        borderColor: COLORS[index],
        fill: false,
        cubicInterpolationMode: "monotone",
        tension: 0.4,
      };

      return { metric: metric, data: defaultItem };
    });

    return {metric, data: r}
  });

  return {analised, data: r}
});

fs.writeFileSync("gouped.json", JSON.stringify(d, null, 4) + ",\n");

