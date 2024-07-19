document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("container");
  const pages = [
    "page1.html",
    "page2.html",
    "page3.html",
    "page4.html",
    "page5.html",
  ];

  let loadedPages = 0;

  pages.forEach((page) => {
    fetch(page)
      .then((response) => response.text())
      .then((html) => {
        const div = document.createElement("div");
        div.innerHTML = html;

        container.appendChild(div);
        console.log(`Loaded ${page}`); // for testing
        loadedPages++;

        // Initilize ScrollTrigger After the page is loaded
        if (loadedPages === pages.length) {
          initializeScrollTrigger();
        }
      })
      .catch((error) => {
        console.error(`Error loading ${page}:`, error);
      });
  });

  function initializeScrollTrigger() {
    gsap.registerPlugin(ScrollTrigger);

    console.log("Container height:", container.scrollHeight); // for testing

    // ScrollTrigger animation
    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: () => "+=" + (container.scrollHeight - window.innerHeight),
      scrub: true,
      markers: true, //show markers
    });

    console.log("ScrollTrigger initialized"); // for testing
  }
});
