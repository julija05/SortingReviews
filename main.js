"use strict";
const orderText = document.getElementById("text");
const filterMinRating = document.getElementById("rating");
const orderRating = document.getElementById("reviews");
const orderDate = document.getElementById("data");

const btnSubmit = document.getElementById("submit");
const results = document.querySelector(".results");

const json = await fetch("reviews.json").then((response) =>
  response.json().then((r) => r)
);

const sortText = (data, value) => {
  if (value === "Yes") {
    return data.filter((f) => f.reviewText != "");
  }

  if (value === "No") {
    return data.filter((f) => f.reviewText === "");
  }

  return data;
};

const filterByRating = (data, rating) => {
  console.log(rating);
  return data.filter((f) => f.rating >= rating);
};

const orderByRatingAndDate = (data, valueRating, valueDate) => {
  return data.sort((a, b) => {
    if (a.rating === b.rating) {
      if (valueDate === "New")
        return b.reviewCreatedOnTime - a.reviewCreatedOnTime;
      else {
        return a.reviewCreatedOnTime - b.reviewCreatedOnTime;
      }
    }

    if (a.rating > b.rating) {
      if (valueRating === "High") {
        return b.rating - a.rating;
      } else {
        return a.rating - b.rating;
      }
    }
    if (a.rating < b.rating) {
      if (valueRating === "Low") {
        return a.rating - b.rating;
      } else {
        return b.rating - a.rating;
      }
    }

    /////asdfasdsdfasdfasdasdf

    // b.reviewCreatedOnTime - a.reviewCreatedOnTime || b.rating - a.rating
    //   });

    // b.reviewCreatedOnTime - a.reviewCreatedOnTime || b.rating - a.rating
  });
};

const sortedJSON = (data) => {
  //   data = sortText(data, orderText.value);
  data = filterByRating(data, +filterMinRating.value);
  data = orderByRatingAndDate(data, orderRating.value, orderDate.value);
  return data;
};

const displayResults = (data) => {
  const html = `
  <div>
        <p>
        id:${data.id}, </br>
             reviewerName:${data.reviewerName}, </br> 
             rating:${data.rating}, </br>
             reviewText:${data.reviewText} </br>
              createdOn:${data.reviewCreatedOnDate},
              </p>
            
      </div>
    `;
  results.insertAdjacentHTML("beforeend", html);
};

const printResults = (data) => {
  data.forEach((element) => {
    displayResults(element);
  });
};

btnSubmit.addEventListener("click", (e) => {
  results.innerHTML = "";

  e.preventDefault();
  const sorted = sortedJSON(json);
  console.log(sorted);

  const text = sortText(sorted, "Yes");
  const notext = sortText(sorted, "No");

  results.insertAdjacentHTML("beforeend", `totalResults:${sorted.length}<br/>`);

  if (orderText.value === "Yes") {
    printResults(text);
    printResults(notext);
  } else {
    printResults(notext);
    printResults(text);
  }
});

// console.log(orderByRatingAndDate(json, "Old"));
