const countdown = document.querySelector(".countdown");

// Set Launch Date

const launchDate = new Date('March 20, 2019 00:00:00').getTime();


// Update every second

const intv1=setInterval(()=>{
    // Get todays date and time(ms)
    const now = new Date().getTime();

    // Distance from now to the launch date
    const distance = launchDate - now;

    // Time calculation
    const days = Math.floor(distance / (1000 * 60 * 60 *24));
    const hours = Math.floor(distance % (1000 * 60 * 60 *24) / (1000 * 60 * 60));
    const mins = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
    const seconds = Math.floor(distance % (1000 * 60) / 1000);

    // Display result
    countdown.innerHTML ='<div>'+days+'<span>Days</span></div><div>'+hours+'<span>Hours</span></div><div>'+mins+'<span>Mins</span></div><div>'+seconds+'<span>Seconds</span></div>';

    // if launch date passed

    if(distance < 0){
        // stop countdown
        clearInterval(intv1);
        // style and coutput text
        countdown.style.color="#17a2b8";
        countdown.innerHTML='Launched';
    }

},1000);