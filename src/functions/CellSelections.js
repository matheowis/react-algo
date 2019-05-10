class CellSelections {
  constructor(size) {
    this.size = size;
    this._set = [];
    this._selectionNames = [];
    this._setFianl = (start, end) => { };
  }

  CellInitialization = (func) => {
    // this._set.push(func) - 1;// -1???
    this._set.push(func);
  }
  finalInitialization = (func) => {
    this._setFianl = func;
  }

  ChangeSelection = (index, start, end) => {
    end = end || start;
    this._selectionNames[index] = { start, end };
    this._set[index](start, end);
  }

  FinalSelection = (name) => {
    this._setFianl(name, name);
  }

  GetSelection = (index) => {
    return this._selectionNames[index];
  }

  clearSelection = (keepMain) => {
    for (var i = keepMain ? 1 : 0; i < this._set.length; i++) {
      this.ChangeSelection(i, "");
    }
  }
}

export { CellSelections };