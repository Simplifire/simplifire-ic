import { rust_simplifire } from "../../declarations/rust_simplifire";

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = e.target.querySelector("button");

  const name = document.getElementById("name").value.toString();

  button.setAttribute("disabled", true);

  // Interact with foo actor, calling the greet method
  // here be dragons
  const greeting = await rust_simplifire.greet(name);
  console.log("Greet function has been called: ", name);

  button.removeAttribute("disabled");

  console.log("Setting reply:", greeting);
  document.getElementById("greeting").innerText = greeting;

  return false;
});
