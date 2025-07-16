import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";

document.querySelector("#app").innerHTML = `
  
      <header>
        <h1>Pocket Pebble Shop</h1>

        <h3>Welcome to Pocket Pebble Shop</h3>
        <h3>
          We create custom potraits for you, featuring drawings of pets,
          friends, cars, anything you like!
        </h3>
        <h3>We also have a collection of pre-made pebbles you can purchase.</h3>
        <h3>
          
          <a href="#custom-pebbles">browse our collection</a>
        </h3>
      </header>
      <main>
        <section id="custom-pebbles">
        <h2 class="section-title">Custom Pebbles</h2>
        <p>ushuioshfsuoio</p>
        </section>
        <section id="premade-pebbles">
        <h2 class="section-title">Pre Made Pebbles</h2>
         <p>ushuioshfsuoio</p>
        </section>
        <section id="about-section">
        <h2 class="section-title">About Pocket Pebble Shop</h2>
        </section>
        <section id="contact-form">Contact us to make a purchase!</section>
      </main>
      <footer>copyright stuff blah blah blah</footer>
    
`;

setupCounter(document.querySelector("#counter"));
