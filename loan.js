document.getElementById('load-form').addEventListener('submit', function(e){
//hide ressult
document.getElementById('results').style.display = 'none';
//hide loader
document.getElementById('loading').style.display = 'block'

setTimeout(calculateResults, 3000);
    e.preventDefault();
});

//calculating results
function calculateResults(e){
    console.log('calculating.......');
    // Ui VARS
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');


    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest)/(x-1);

    if (isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        document.getElementById('results').style.display = 'block';
//hide loader
      document.getElementById('loading').style.display = 'none'
    }else{
        //console.log('please check your number')
        showError('please check your number')
    }
    
}

//erroe

function showError(error){
    //hide error during error display
    document.getElementById('results').style.display = 'none';
    //hide loader
    document.getElementById('loading').style.display = 'none'
    // create the error element
    const errorDiv = document.createElement('div');

    //get element
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
//add a class
    errorDiv.className = 'alert alert-danger';
 //append created element to text node
    errorDiv.appendChild(document.createTextNode(error));
// insert it before header
    card.insertBefore(errorDiv, heading);

    //clear error timeout 

    setTimeout(clearError, 2000);

}

function clearError(){
    document.querySelector('.alert').remove();
}
