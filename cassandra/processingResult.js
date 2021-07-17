const fs = require('fs')


const data = JSON.parse(fs.readFileSync('result.json'))

const MONTH_COUNT = 12;
const YEAR_COUNT = 2020;
const ATTRS = ["cbo", "lcom", "loc", "wmc"]
const DEFAULT_ATTRS = {
    cbo: [],
    lcom: [],
    loc: [],
    wmc: []
}

const COLORS = [
    '#4dc9f6',
    '#f67019',
    '#f53794',
    '#537bc4',
    '#acc236',
    '#166a8f',
    '#00a950',
    '#58595b',
    '#8549ba'
  ];
const labels = [];

// get name of all classes
const classesnames = new Set(data.map(item => item.class_name))
const datasetByClass = {}
const a = {}

const b = [...classesnames].map(cls => a[cls] = 0)

const datasets = [...classesnames].map((classname)=> {
    a[classname] += 1;
    const filteredByClassname = data.filter(item => item.class_name == classname)

    datasetByClass[classname] = {
        cbo: [],
        lcom: [],
        loc: [],
        wmc: []
    }
    
    // const uniqueClassStart = filteredByClassname.filter( item => item.commit_date.startsWith(`2009-02-15`)).pop()
    // ATTRS.map(attr => {
    //     datasetByClass[classname][attr].push(uniqueClassStart != undefined ? uniqueClassStart[attr] : NaN)
    // })


    for (let year = 2009; year <= YEAR_COUNT; year++) {
        
        // 2010-DEC 2020-DEC
        const uniqueClass =  filteredByClassname.filter(item =>
            item.commit_date.startsWith(`${year}-12-27`) ||
            item.commit_date.startsWith(`${year}-12-28`) || 
            item.commit_date.startsWith(`${year}-12-29`) ||
            item.commit_date.startsWith(`${year}-12-30`) ||
            item.commit_date.startsWith(`${year}-12-31`)).pop()
            
        ATTRS.map(attr => {
            datasetByClass[classname][attr].push((uniqueClass != undefined ? uniqueClass[attr] : NaN))
        })

        
      }

    return {
        classname, 
        datasets: ATTRS.map((attr, index) => ({
            label: attr,
            data: datasetByClass[classname][attr],
            borderColor: COLORS[index],
            fill: false,
            cubicInterpolationMode: "monotone",
            tension: 0.4,
        }))
    }   
})

fs.writeFileSync('gouped.json', JSON.stringify(datasets, null, 4)+",\n")

console.log(Object.keys(a).filter(key => a[key] > 1))





