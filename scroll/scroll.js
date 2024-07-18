// Scroll animations for the website imported from GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// --- PANEL ONE ---
gsap.to(".panel1-left-content-container", {
  x: -500,
  scrollTrigger: {
    trigger: ".one",
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
});

gsap.to(".panel1-right-content-container", {
  x: 500,
  scrollTrigger: {
    trigger: ".one",
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
});

// --- PANEL TWO ---
gsap.from(".line-1", {
  scrollTrigger: {
    trigger: ".line-1",
    scrub: true,
    start: "top bottom",
    end: "top top",
  },
  scaleX: 0,
  transformOrigin: "left center",
  ease: "none",
});

// --- PANEL THREE ---
gsap.from(".line-2", {
  scrollTrigger: {
    trigger: ".three",
    scrub: true,
    pin: true,
    start: "top top",
    end: "+=100%",
  },
  scaleX: 0,
  transformOrigin: "left center",
  ease: "none",
});

// --- PANEL FOUR ---
var tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".four",
    scrub: true,
    pin: true,
    start: "top top",
    end: "+=100%",
  },
});

tl.from(".four p", { scale: 0.3, rotation: 45, autoAlpha: 0, ease: "power2" })
  .from(
    ".line-3",
    { scaleX: 0, transformOrigin: "left center", ease: "none" },
    0
  )
  .to(".four", { backgroundColor: "#003973" }, 0);

// PANEL FUNCTIONALITY
document.addEventListener("DOMContentLoaded", function () {
  //fetch the heart animation to PANEL ONE
  fetch("heart-animation.html")
    .then((response1) => response1.text())
    .then((data1) => {
      document.querySelector(".heart-animation").innerHTML = data1;
    })
    .catch((error1) =>
      console.error("Error loading heart-animation.html:", error1)
    );

  //fetch panel5.html to PANEL FIVE
  fetch("panel5.html")
    .then((response5) => response5.text())
    .then((data5) => {
      document.querySelector(".panel.five").innerHTML = data5;
    })
    .catch((error5) => console.error("Error loading page5.html:", error5));

  //PANEL TWO download resume button: change color on hover & click
  let colorButton = document.querySelector(".panel2-download-button");
  if (colorButton) {
    colorButton.addEventListener("mousemove", (e) => {
      let rect = colorButton.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;

      colorButton.style.setProperty("--x", x + "px");
      colorButton.style.setProperty("--y", y + "px");
    });

    colorButton.addEventListener("click", function (e) {
      e.preventDefault();
      var link = document.createElement("a");
      link.href =
        "https://docs.google.com/document/d/1NikSYvBNIepRH4_BMxNu2msqPOO855ADhMhe8YLhhFw/export?format=pdf";
      link.download = "Jiaying Yu's Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  //PANEL THREE: pause the animation when i hover over the tag
  let panel3Tags = document.querySelectorAll(".panel3-tag");
  panel3Tags.forEach((tag) => {
    tag.addEventListener("mouseenter", () => {
      tag.closest(".panel3-right-inner").style.animationPlayState = "paused";
    });
    tag.addEventListener("mouseleave", () => {
      tag.closest(".panel3-right-inner").style.animationPlayState = "running";
    });
  });
});
