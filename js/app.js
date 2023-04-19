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
            data.push(final);
            labels.push("Years "+i);
        }
        console.table(data);
    } catch (error) {
        console.error(error)
    }
}

//  format the values with a given number of decimal places.
function toDecimal(value,decimals){
    return +value.toFixed(decimals)
}
