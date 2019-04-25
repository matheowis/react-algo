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
  let selectionStart = 0;
  for (var i = 0; i < startIndex; i++) {
    selectionStart += texts[i].length
  }
  selectionStart += range.startOffset;
  let selectionEnd = texts[startIndex].length - range.startOffset;
  for (var i = startIndex + 1; i < endIndex; i++) {
    selectionEnd += texts[i].length;
  }
  selectionEnd += range.endOffset + selectionStart;

  return { startIndex, endIndex, selectionStart, selectionEnd }
}

function getString(target) {
  const nodes = Array.prototype.slice.call(target.children);
  return nodes.reduce((res,item) => res+item.textContent,"");
  // return nodes.map(node => node.textContent).join("");
}

function getAfterErase(event) {
  const selection = getSelection(event.target);
  const value = getString(event.target);
  return value.slice(0,selection.selectionStart) + value.slice(selection.selectionEnd);
}

export { mciFunctions }