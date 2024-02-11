export const destinationAutoTyping = (locationName) => {
  if (!locationName) return;
  const scrollToTop = document.getElementById("scrollToTopBtn");
  scrollToTop.click();
  const destinationInput = document.getElementById("destinationInput");
  destinationInput.focus();
  destinationInput.value = locationName;

  setTimeout(() => {
    const datePicker = document.getElementById("searchFormDatePicker");
    datePicker.focus();
    datePicker.click();
  }, 1000);
};
