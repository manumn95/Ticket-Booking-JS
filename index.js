const moviesList = [
  { movieName: "Flash", price: 7 },
  { movieName: "Spiderman", price: 5 },
  { movieName: "Batman", price: 4 },
];

// DOM Elements
const movieNameEl = document.getElementById("movieName");
const moviePriceEl = document.getElementById("moviePrice");
const totalPriceEl = document.getElementById("totalPrice");
const selectedSeatsHolder = document.getElementById("selectedSeatsHolder");
const numberOfSeatEl = document.getElementById("numberOfSeat");
const selectMovieDropdown = document.getElementById("selectMovie");
const proceedBtn = document.getElementById("proceedBtn");
const cancelBtn = document.getElementById("cancelBtn");
const seats = document.querySelectorAll("#seatCont .seat:not(.occupied)");

let selectedSeats = [];
let currentMovie = moviesList[0];

// 1. Populate movie dropdown
moviesList.forEach((movie, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.textContent = movie.movieName;
  if (movie.movieName.toLowerCase() === "flash") option.selected = true;
  selectMovieDropdown.appendChild(option);
});

// 2. Update movie details on change
selectMovieDropdown.addEventListener("change", (e) => {
  const selectedIndex = e.target.value;
  currentMovie = moviesList[selectedIndex];
  updateMovieDetails();
  updatePrice();
});

// 3. Update Movie Name & Price
function updateMovieDetails() {
  movieNameEl.textContent = currentMovie.name;
  moviePriceEl.textContent = `$ ${currentMovie.price}`;
}

// 4. Update total price & selected seat count
function updatePrice() {
  const total = selectedSeats.length * currentMovie.price;
  totalPriceEl.textContent = `$ ${total}`;
  numberOfSeatEl.textContent = selectedSeats.length;
}

// 5. Update Selected Seats Display
function updateSelectedSeatsDisplay() {
  selectedSeatsHolder.innerHTML = "";
  if (selectedSeats.length === 0) {
    const span = document.createElement("span");
    span.className = "noSelected";
    span.textContent = "No Seat Selected";
    selectedSeatsHolder.appendChild(span);
  } else {
    selectedSeats.forEach((seat, index) => {
      const span = document.createElement("span");
      span.textContent = `S${index + 1}`;
      span.style.marginRight = "5px";
      selectedSeatsHolder.appendChild(span);
    });
  }
}

// 6. Seat Click Events
seats.forEach((seat) => {
  seat.addEventListener("click", () => {
    if (seat.classList.contains("occupied")) return;
  
    if (seat.classList.contains("selected")) {
      seat.classList.remove("selected");
      selectedSeats = selectedSeats.filter((s) => s !== seat);
    } else {
      seat.classList.add("selected");
      selectedSeats.push(seat);
    }
  
    updatePrice();
    updateSelectedSeatsDisplay();
  });
  
});

// 7. Continue Booking
proceedBtn.addEventListener("click", () => {
  if (selectedSeats.length === 0) {
    alert("Oops no seat Selected");
    return;
  }

  alert("Yayy! Your Seats have been booked");

  selectedSeats.forEach((seat) => {
    seat.classList.remove("selected");
    seat.classList.add("occupied");
  });

  selectedSeats = [];
  updatePrice();
  updateSelectedSeatsDisplay();
});

// 8. Cancel Booking
cancelBtn.addEventListener("click", () => {
  selectedSeats.forEach((seat) => {
    seat.classList.remove("selected");
  });

  selectedSeats = [];
  updatePrice();
  updateSelectedSeatsDisplay();
});

// Initialize
updateMovieDetails();
updatePrice();
updateSelectedSeatsDisplay();
