function initializeSlider(slideInterval) {
  const slides = document.querySelectorAll(".slider_with_text_container li");
  const sliderContainer = document.querySelector(".slider_with_text_container");
  const indicatorsContainer = document.querySelector(".indicator_container");
  let currentSlide = 0;
  let timer;

  // Create indicators dynamically
  slides.forEach((_, index) => {
    const indicator = document.createElement("div");
    indicator.classList.add("indicator");
    if (index === 0) indicator.classList.add("active");
    indicatorsContainer.appendChild(indicator);
  });

  const indicators = document.querySelectorAll(".indicator");

  // Function to update slide immediately
  function updateSlide(index) {
    sliderContainer.style.transform = `translateX(-${index * 100}%)`;
    updateIndicators(index);
  }

  // Update active indicator immediately
  function updateIndicators(index) {
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle("active", i === index);
    });
  }

  // Auto-slide functionality (changes after the first slide is displayed)
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlide(currentSlide);
  }

  // Start auto-slide immediately
  function startAutoSlide() {
    // Initialize the first slide immediately, then start the interval
    updateSlide(currentSlide);
    timer = setInterval(nextSlide, slideInterval);
  }

  // Pause auto-slide on hover
  sliderContainer.addEventListener("mouseenter", () => {
    clearInterval(timer);
  });

  sliderContainer.addEventListener("mouseleave", () => {
    startAutoSlide();
  });

  // Indicator click functionality
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentSlide = index;
      updateSlide(currentSlide);
      clearInterval(timer); // Stop the auto-slide when an indicator is clicked
      startAutoSlide(); // Restart the auto-slide after the click
    });
  });

  // Initialize the slider and immediately show the first slide
  startAutoSlide();
}
