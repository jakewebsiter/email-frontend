let interval = 50; // Starting interval duration in milliseconds
let variable = 0; // Initial variable value
const numberElement = document.getElementById('number');
const message = document.getElementById('message');

// Function to calculate logarithmic increase (twice as fast)
const logarithmicIncrease = (currentInterval) => {
  // Adjust the rate of increase here
  return currentInterval + 3 * Math.log(currentInterval + 1);
};

const updateVariable = () => {
  // Generate a random 2-digit number
  variable = Math.floor(Math.random() * 90) + 10; // Random number between 10 and 99
  numberElement.textContent = variable; // Update the text content of the h1 element

  // Increase the interval duration up to 750 milliseconds using logarithmic increase
  if (interval < 750) {
    interval = logarithmicIncrease(interval);
  }

  // Update the interval duration inside setInterval
  clearInterval(intervalId);
  intervalId = setInterval(updateVariable, interval);
};

// Call updateVariable function repeatedly with the increasing interval
let intervalId = setInterval(updateVariable, interval);

async function sendEmails(num) {
  const res = await fetch(
    `https://bc10-213-18-154-229.ngrok-free.app//api/send-emails/${num}/`,
    {
      method: 'GET',
      mode: 'no-cors',
      headers: { 'ngrok-skip-browser-warning': 0 },
    }
  );
  console.log(await res);
  resData = await res.json();
  return resData.message;
}
// Stop the interval after a certain time (optional)
setTimeout(async () => {
  clearInterval(intervalId);
  message.innerHTML = '...';
  message.innerHTML = await sendEmails(parseInt(numberElement.innerText));
}, 5000); // Stop after 10 seconds (10000 milliseconds)
