export const eventFunctions = {
  mouseRight: () => {}
}

document.addEventListener("mouseup", event => {
  const {clientX, clientY} = event
  eventFunctions.mouseRight(clientY,clientX);
});
document.addEventListener("contextmenu", event => {
  event.preventDefault();
})