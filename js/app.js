const context = document.getElementById("data-set").getContext("2d");
let line = new Chart(context,{});

// message
const message = document.getElementById("message")
// values from the from
const initialAmount = document.getElementById("initial-amount"),
      years = document.getElementById("investment-years"),
      rates = document.getElementById("estimated-rate"),
      compound = document.getElementById("compound"),
      form = document.getElementById("compoun-form");

// calculate butoton
const button = document.querySelector(".input-group button");
// attach an event listenet
button.addEventListener("click",calculateGrowth)

const table = document.querySelector(".styled-table");
const buttonShowTable = document.querySelector("#show-table")
buttonShowTable.addEventListener('click',()=>{
    
    if(table.classList.contains('inactive')){
      table.classList.remove('inactive');
      buttonShowTable.innerText = "Hide Table" 
    } else{
        table.classList.add('inactive');
        buttonShowTable.innerText = "Show Table"
    }
})

//declare arrays
const data =[];
const labels =[];

function calculateGrowth(e){
    data.length=0;
    labels.length=0;
    let growth =0;
    if(initialAmount.value=== "" || years.value === "" ||rates.value === "" || compound.value === "" ){
        alert("Todos los campos son obbligatorios, llenalos completamente");

    } else{
        e.preventDefault();
    try {
        //values we're gonna need in our formula
        const initial = parseInt(initialAmount.value),
              period = parseInt(years.value),
              interest = parseInt(rates.value),
              comp = parseInt(compound.value);

        // calculation for year
        for(let i=1; i <= period; i++){
            const final = initial * Math.pow(1 + ((interest / 100) / comp), comp * i);

            // send results
            data.push(toDecimal(final,2));
            labels.push("Years "+i);
            growth =toDecimal(final,2);
        }
        const results = document.getElementById("results");
        message.innerText = `You will have this amount ${growth} after ${period} years`;
        drawGraph();
        showTable()
        
        
    } catch (error) {
        console.error(error)
    }
    }
    
}
function showTable() {
    const thead = document.getElementById("thead-show"),
        tbody = document.getElementById("tbody-show");
    let th=`
    <th>Years</th>
    <th>Future Value (${rates.value}%)</th>
    <th>Total Contributions</th>`;
    thead.innerHTML=th;
    
    let tr ="<tr>";
    
    for (var i = 0; i < labels.length; i++) {
        tr += "<td>" + labels[i] + "</td>";
        tr += "<td>" + "$ "+data[i] + "</td>";
        tr += "<td>" + "$ "+ (initialAmount.value) + "</td>";
        tr+="</tr>"
      }
     
      
      tbody.innerHTML=tr;
}
  
function drawGraph(){
    line.destroy();
    // constructor
    line = new Chart(context,{
        type: 'line',
        data:{
            labels,
            datasets: [{
                label: "Compound",
                data,
                fill: true,
                backgroundColor: "#7C9070",
                borderWidth: 3
            }]
        }
    });
}

//  format the values with a given number of decimal places.
function toDecimal(value,decimals){
    return +value.toFixed(decimals)
}

//validate fields
