document.querySelector('#searchName').addEventListener('input', function () {
  let valueName = document.querySelector('#searchName').value
  searchCustmor(valueName)
  // console.log(Name);
})

document.querySelector('#searchAmou').addEventListener('input', function () {
  let valueAmount = document.querySelector('#searchAmou').value
  searchAmount(valueAmount)
  // console.log(valueAmount);
})

let custm = []
let transact = []

async function api() {
  try {
    let data = await fetch('../data/data.json')
    let nData = await data.json()
    custm = nData.customers
    transact = nData.transactions
    display()
    // console.log(custm);
    // console.log(transact);
    
  }
  catch (error) {
    // console.log(error);
  }
}
api()

function display() {
  let cartona = ``
  for (let i = 0; i < custm.length; i++) {
    cartona += `
    <tr>
        <td>${transact[i].customer_id}</td>
        <td><a href="#"><i class="fa-solid fa-user pe-3 text-info"></i>${custm[i].name}</td>
         <td>${transact[i].amount}</td>
         <td>${transact[i].date}</td>
         <td><button class="btn btn-success">View Chart</button></td>
       </tr>
    
    `
  }
  document.querySelector('#tbody').innerHTML = cartona

  $('td .btn').click(function () {
    chart()
    chart2()
  })
}


function searchCustmor(A) {
  var cartona = "";

  for (let i = 0; i < custm.length; i++) {
    if (custm[i].name.toLowerCase().includes(A.toLowerCase())) {
      cartona += `
    <tr>
         <td>${transact[i].customer_id}</td>
        <td><a href="#"><i class="fa-solid fa-user pe-3 text-info"></i>${custm[i].name}</a></td>
         <td>${transact[i].amount}</td>
         <td>${transact[i].date}</td>
        <td><button class="btn btn-success">View Chart</button></td>

       </tr>
    
    `
    }
  }

  document.querySelector('#tbody').innerHTML = cartona


  $('td').click(function () {
    chart()
    chart2()
  })
}

function searchAmount(N) {
  var cartona = "";

  for (let i = 0; i < custm.length; i++) {
    if (toString(transact[i].amount).includes(toString(N))) {
      cartona += `
    <tr>
         <td>${transact[i].customer_id}</td>
        <td><a href="#"><i class="fa-solid fa-user pe-3 text-info"></i>${custm[i].name}</a></td>
         <td>${transact[i].amount}</td>
         <td>${transact[i].date}</td>
        <td><button class="btn btn-success">View Chart</button></td>
       </tr>
    
    `
    }
  }
  document.querySelector('#tbody').innerHTML = cartona

}


function chart() {
  const xValues = [50,60,70,80,90,100,110,120,130,140,150];
const yValues = [7,8,8,9,9,9,10,11,14,14,15];

new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.1)",
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: 6, max:16}}],
    }
  }
});



}

function chart2 (){
  let data = {
    labels: ['Label 1', 'Label 2',
             'Label 3', 'Label 4', 
             'Label 5'],
    datasets: [{
        label: 'Sample Bar Chart',
        data: [12, 17, 3, 8, 5],
        backgroundColor: 'rgba(70, 192, 192, 0.6)',
        borderColor: 'rgba(150, 100, 255, 1)',
        borderWidth: 1
    }]
  };
  
  // Configuration options for the chart
  let options = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
  };
  
  // Get the canvas element
  let ctx = document.getElementById('myBarChart')
    .getContext('2d');
  
  // Create the bar chart
  let myBarChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
  });
}
