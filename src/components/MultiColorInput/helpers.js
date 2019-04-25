const mciFunctions = {
  getSelection,
  getString,
  getAfterErase
}

function getSelection(target) {
  const range = window.getSelection().getRangeAt(0)
  const nodes = Array.prototype.slice.call(target.children);
  const startIndex = nodes.indexOf(range.startContainer.parentElement);
  const endIndex = nodes.indexOf(range.endContainer.parentElement);
  const texts = nodes.map(node => node.textContent);
  let startSelection = 0;
  for (var i = 0; i < startIndex; i++) {
    startSelection += texts[i].length
  }
  startSelection += range.startOffset;
  let endSelection = texts[startIndex].length - range.startOffset;
  for (var i = startIndex + 1; i < endIndex; i++) {
    endSelection += texts[i].length;
  }
  endSelection += range.endOffset + startSelection;

  return { startIndex, endIndex, startSelection, endSelection }
}

function getString(target) {
  const nodes = Array.prototype.slice.call(target.children);
  return nodes.reduce((res,item) => res+item.textContent,"");
  // return nodes.map(node => node.textContent).join("");
}

function getAfterErase(event) {
  const selection = getSelection(event.target);
  const value = getString(event.target);
  return value.slice(0,selection.startSelection) + value.slice(selection.endSelection);
}

export { mciFunctions }