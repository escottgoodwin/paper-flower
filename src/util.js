export function groupBy(arr, criteria) {
   return arr.reduce(function (obj, item) {
    var key = typeof criteria === 'function' ? criteria(item) : item[criteria];
      if (!obj.hasOwnProperty(key)) { obj[key] = [] }
      obj[key].push(item)
      return obj;
    }, {})
  }

export function pieChartSeries(grouped,column){
  const values = Object.values(grouped)
  const labels = Object.keys(grouped)
  //const valueSeries = values.map(v => v.map(s => parseFloat(s[column])).reduce((a,b) => a + b, 0))
  const valueSeries1 = values.map(s => s.map(p => p[column]).reduce((a,b) => a + b, 0))
  const total = valueSeries1.reduce((a,b) => a + b, 0)

  return {
  total:total,
  labels: labels,
  datasets: [
    {
      label: "Sales",
      backgroundColor: [
      'rgba(255, 99, 132,.4)',
      'rgba(54, 162, 235, 0.4)',
      'rgba(255, 206, 86, 0.4)',
      'rgba(255, 206, 186, 0.4)'
    ],
      data: valueSeries1
    }
  ]
 }

}

export function barChartSeries(grouped,column){
  const values = Object.values(grouped)
  const labels = Object.keys(grouped)
  const valueSeries1 = values.map(s => s.map(p => p[column]).reduce((a,b) => a + b, 0))
  const data = values.map((currElement, i) => valueSeries1[i])
  const salesnum = valueSeries1.reduce((a,b) => a + b, 0)

  var datasets = [{
  label: 'Sales ($)',
  data,
  backgroundColor: [
         'rgba(255, 99, 132, 0.4)',
         'rgba(54, 162, 235, 0.4)',
         'rgba(255, 206, 86, 0.4)',
         'rgba(255, 206, 186, 0.4)'
      ]
}]

  return {
      labels,
      datasets,
      salesnum
    }
  }

export function personSalesList1(arr){
    let salesman = []

    for (const [ key, value ] of Object.entries(arr)) {
      const number = value.map(c => c.price).length
      const salesmanId = value.map(c => c.salesmanId)[0]
      const sales = value.map(p => parseFloat(p.cartTotal)).reduce((a,b) => a + b, 0)
      let item = {salesmanId:salesmanId,name:key,sales:sales,number:number}
      salesman.push(item)
    }
    return salesman
}
