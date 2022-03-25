import { rust_simplifire } from "../../declarations/rust_simplifire";

const doc = ({
      id: 1,
      docName: "Employment Contract",
      docText: "This employment agreement is made and effective as of 25th January 2020 by and between Employer and Employee",
      date_created: "2022/01/03"        
  })

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = e.target.querySelector("button");

  const name = document.getElementById("name").value.toString();

  button.setAttribute("disabled", true);

  // Interact with foo actor, calling the greet method
  console.log("doc: ",  doc);
  console.log("name: ",  name);
  const greeting = await rust_simplifire.greet(name);
  // const addDocument = await rust_simplifire.addDoc(doc);
  
  console.log("Greet function has been called: ", name);

  button.removeAttribute("disabled");

  console.log("Setting reply:", greeting);
  document.getElementById("greeting").innerText = greeting;

  return false;
});

