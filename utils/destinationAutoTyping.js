export const destinationAutoTyping = (locationName) => {
  const scrollToTop = document.getElementById("scrollToTopBtn");
  scrollToTop.click();
  const destinationInput = document.getElementById("destinationInput");
  destinationInput.focus();
  const typeWithDelay = (text, index) => {
    if (index < text.length) {
      destinationInput.value += text.charAt(index);
      const inputEvent = new Event("input", {
        bubbles: true,
        cancelable: false,
      });
      destinationInput.dispatchEvent(inputEvent);
      setTimeout(() => {
        typeWithDelay(text, index + 1);
      }, 100);
    } else {
      setTimeout(() => {
        const datePicker = document.getElementById("searchFormDatePicker");
        console.log("datePicker click ok",datePicker);
        datePicker.click();
      }, 1000);
    }
  };
  setTimeout(() => {
    destinationInput.value = "";
    typeWithDelay(locationName, 0);
  }, 1000);
};
