// PANEL FUNCTIONALITY
document.addEventListener("DOMContentLoaded", function () {
  // for loading: Fetch the heart animation and display it for 5 seconds
  //   fetch("heart-animation.html")
  //     .then((response1) => response1.text())
  //     .then((data1) => {
  //       console.log("Heart animation loaded");
  //       const heartAnimationContainer = document.getElementById(
  //         "heart-animation-container"
  //       );
  //       const mainContent = document.querySelector("body > .panel.one");
  //       heartAnimationContainer.innerHTML = data1;
  //       heartAnimationContainer.style.display = "block";
  //       mainContent.style.display = "none";

  //       // Hide the heart animation and show the main content after 5 seconds
  //       setTimeout(() => {
  //         console.log("Starting fade out");
  //         heartAnimationContainer.classList.add("heart-animation-fade-out-effect");

  //         // After the fade-out transition, hide the container and show the main content
  //         setTimeout(() => {
  //           console.log("Switching to main content");
  //           heartAnimationContainer.remove(); // Completely remove the heart animation
  //           mainContent.style.display = "block";
  //         }, 1000); // Match this time with the CSS transition duration
  //       }, 2000);
  //     })
  //     .catch((error1) => {
  //       console.error("Error loading heart-animation.html:", error1);
  //     });

  //   //fetch the heart animation to PANEL ONE
  //   fetch("heart-animation.html")
  //     .then((response1) => response1.text())
  //     .then((data1) => {
  //       document.querySelector(".heart-animation").innerHTML = data1;
  //     })
  //     .catch((error1) =>
  //       console.error("Error loading heart-animation.html:", error1)
  //     );

  //GSAP animation:
  // Scroll animations for the website imported from GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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

  tl.from(".four *", {
    scale: 0.3,
    rotation: 25,
    autoAlpha: 0,
    ease: "power2",
  })
    .from(
      ".line-3",
      { scaleX: 0, transformOrigin: "left center", ease: "none" },
      0
    )
    .to(".four", { backgroundColor: "#0082c8" }, 0);

  //fetch GO BACK TO TOP icon
  let goBackToTop = document.querySelector(".go-back-to-top");
  goBackToTop.addEventListener("click", function () {
    gsap.to(window, { duration: 4, scrollTo: { y: 0 } });
  });

  //button light change on hover
  function handleMouseMove(e) {
    let rect = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    e.currentTarget.style.setProperty("--x", x + "px");
    e.currentTarget.style.setProperty("--y", y + "px");
  }

  //PANEL TWO download resume button
  let colorButton = document.querySelector(".panel2-download-button");
  if (colorButton) {
    colorButton.addEventListener("mousemove", handleMouseMove);

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

  //PANEL FOUR more project button
  let moreProjectsButton = document.querySelector(
    ".panel4-more-project-button"
  );
  if (moreProjectsButton) {
    moreProjectsButton.addEventListener("mousemove", handleMouseMove);
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

  //PANEL FOUR: fetch panel4.html to PANEL FOUR
  fetch("panel4.html")
    .then((response4) => response4.text())
    .then((data4) => {
      document.querySelector(".panel4-content-container").innerHTML = data4;
    })
    .catch((error4) => console.error("Error loading page4.html:", error4));

  //fetch panel5.html to PANEL FIVE
  fetch("newpanel5.html")
    .then((response5) => response5.text())
    .then((data5) => {
      const contactSection = document.getElementById(
        "panel5-contact-container"
      );
      contactSection.innerHTML = data5;

      //set up INPUT and TEXTAREA
      const inputs = contactSection.querySelectorAll("input, textarea");
      inputs.forEach((input) => {
        input.style.display = "block";
      });

      // For submitting the form
      var form = document.getElementById("contact-form");

      if (form) {
        form.addEventListener("submit", function (event) {
          event.preventDefault();

          fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: {
              Accept: "application/json",
            },
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error("Network response was not ok.");
              }
            })
            .then((data) => {
              console.log(data);
              form.reset();
            })
            .catch((error) => {
              console.log("Error", error);
            });
        });

        // For RESET button
        var resetButton = document.getElementById("panel5-reset");
        if (resetButton) {
          resetButton.addEventListener("click", function () {
            form.reset();
          });
        }
      }

      // For change hover effect to social media links
      var emailLink = document.getElementById("email-link");
      var emailImage = document.getElementById("email-image");
      var emailText = document.getElementById("email-text");

      var githubLink = document.getElementById("github-link");
      var githubImage = document.getElementById("github-image");
      var githubText = document.getElementById("github-text");

      var linkedinLink = document.getElementById("linkedin-link");
      var linkedinImage = document.getElementById("linkedin-image");
      var linkedinText = document.getElementById("linkedin-text");

      var instagramLink = document.getElementById("instagram-link");
      var instagramImage = document.getElementById("instagram-image");
      var instagramText = document.getElementById("instagram-text");

      if (emailLink && emailText && emailImage) {
        emailLink.addEventListener("mouseover", function () {
          emailText.textContent = "jiaying.yu.fs@gmail.com";
          emailImage.style.opacity = 0;
          emailText.style.marginLeft = "-74px";
        });
        emailLink.addEventListener("mouseout", function () {
          emailText.textContent = "Email";
          emailImage.style.opacity = 1;
          emailText.style.marginLeft = "0";
        });
      }

      if (githubLink && githubText && githubImage) {
        githubLink.addEventListener("mouseover", function () {
          githubText.textContent = "github.com/JiayingYu152";
          githubImage.style.opacity = 0;
          githubText.style.marginLeft = "-74px";
        });
        githubLink.addEventListener("mouseout", function () {
          githubText.textContent = "GitHub";
          githubImage.style.opacity = 1;
          githubText.style.marginLeft = "0";
        });
      }

      if (linkedinLink && linkedinText && linkedinImage) {
        linkedinLink.addEventListener("mouseover", function () {
          linkedinText.textContent = "/jiaying-yu-belle/";
          linkedinImage.style.opacity = 0;
          linkedinText.style.marginLeft = "-74px";
        });
        linkedinLink.addEventListener("mouseout", function () {
          linkedinText.textContent = "LinkedIn";
          linkedinImage.style.opacity = 1;
          linkedinText.style.marginLeft = "0";
        });
      }

      if (instagramLink && instagramText && instagramImage) {
        instagramLink.addEventListener("mouseover", function () {
          instagramText.textContent = "/biubiu125";
          instagramImage.style.opacity = 0;
          instagramText.style.marginLeft = "-74px";
        });
        instagramLink.addEventListener("mouseout", function () {
          instagramText.textContent = "Instagram";
          instagramImage.style.opacity = 1;
          instagramText.style.marginLeft = "0";
        });
      }
    })
    .catch((error5) => console.error("Error loading newpanel5.html:", error5));
});
