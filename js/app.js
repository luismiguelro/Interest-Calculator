const context = document.getElementById("data-set").getContext("2d");
let line = new Chart(context,{});

// message
const message = document.getElementById("message")
// values from the from
const initialAmount = document.getElementById("initial-amount"),
      years = document.getElementById("investment-years"),
      rates = document.getElementById("estimated-rate"),
      compound = document.getElementById("compound");

// calculate butoton
const button = document.querySelector(".input-group button");

// attach an event listenet
button.addEventListener("click",calculateGrowth)

//declare arrays
const data =[];
const labels =[];

function calculateGrowth(e){
    data.length=0;
    labels.length=0;
    let growth =0;
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
        //
        message.innerText = `You will have this amount ${growth} after ${period} years`;
        drawGraph();
    } catch (error) {
        console.error(error)
    }
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
                backgroundColor: "rgb(255, 182, 193)",
                borderWidth: 3
            }]
        }
    });
}

//  format the values with a given number of decimal places.
function toDecimal(value,decimals){
    return +value.toFixed(decimals)
}
