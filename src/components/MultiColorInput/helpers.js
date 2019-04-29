const mciFunctions = {
  getSelection,
  getString,
  getAfterErase,
  getSelectionElement,
  selectElementContents,
  getCurrentPartIndex
}

function getSelection(target) {
  const range = window.getSelection().getRangeAt(0);
  const nodes = Array.prototype.slice.call(target.children);
  const startIndex = nodes.indexOf(range.startContainer.parentElement);
  const endIndex = nodes.indexOf(range.endContainer.parentElement);
  if (startIndex === -1) {
    return { startIndex, endIndex, selectionStart: 0, selectionEnd: 0 }
  }
  const texts = nodes.map(node => node.textContent);
  let selectionStart = 0;
  let selectionEnd = 0
  for (var i = 0; i < endIndex; i++) {
    if (i < startIndex) {
      selectionStart += texts[i].length;
    }
    selectionEnd += texts[i].length;
  }
  selectionStart += range.startOffset;
  selectionEnd += range.endOffset;

  return { startIndex, endIndex, selectionStart, selectionEnd }
}

function getCurrentPartIndex(parts,startIndex) {
  let partIndex = 0;
  for(var i =0;i< parts.length;i++){
    partIndex += parts[i].length;
    if(partIndex >= startIndex){
      return i;
    }
  }
  return -1;
}

function getSelectionElement(target, selectionIndex) {
  const nodes = Array.prototype.slice.call(target.children);
  const texts = nodes.map(node => node.textContent);
  let holder = 0;
  for (var i = 0; i < texts.length; i++) {
    if (holder + texts[i].length >= selectionIndex) {
      return { elIndex: i, selectionIndex: selectionIndex - holder };
    }
    holder += texts[i].length;
  }
}

function selectElementContents(el, start, end) {
  var range = document.createRange();
  var sel = window.getSelection();

  range.setStart(el.firstChild, start);
  range.setEnd(el.firstChild, end);
  sel.removeAllRanges();
  sel.addRange(range);
}

function getString(target) {
  const nodes = Array.prototype.slice.call(target.children);
  return nodes.reduce((res, item) => res + item.textContent, "");
  // return nodes.map(node => node.textContent).join("");
}

function getAfterErase(value, selection) {
  return value.slice(0, selection.selectionStart) + value.slice(selection.selectionEnd);
}

export { mciFunctions }