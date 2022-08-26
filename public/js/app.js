// console.log("this is getting loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector(".dataLocation");
const weatherUpdate = document.querySelector(".weatherUpdate");

// messageOne.textContent = "from a javascript";
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputFields = search.value;

  fetch(
    `https://weather-app76.herokuapp.com/weather?address=${inputFields}`
  ).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        weatherUpdate.textContent = data.location;
        // console.log(data.error);
      } else {
        messageOne.textContent = data.location;
        weatherUpdate.textContent = data.forecast;
        // console.log(data.location);
        // console.log(data.forecast);
      }
    });
  });

  // console.log(search.value);
});
