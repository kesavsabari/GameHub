const gameForm = document.getElementById("gameForm");
const formMessage = document.getElementById("formMessage");

gameForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  // getting values from Form
  const gameName = document.getElementById("name").value;
  const gamePrice = document.getElementById("price").value;
  const gamePlatform = document.getElementById("platform").value;

  if (gameName == "" || gamePrice == "" || gamePlatform == "") {
    formMessage.textContent = "Please fill all boxes";
    formMessage.style.color = "red";
    return;
  }

  const gameData = {
    name: gameName,
    price: gamePrice,
    platform: gamePlatform
  };

  try {
    // send data to backend
    const response = await fetch("/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(gameData)
    });

    if (response.ok) {
      formMessage.textContent = "Game added successfully";
      formMessage.style.color = "green";
      gameForm.reset();
    } else {
      formMessage.textContent = "Could not add game";
      formMessage.style.color = "red";
    }
  } catch (error) {
    formMessage.textContent = "Server error";
    formMessage.style.color = "red";
  }
});
