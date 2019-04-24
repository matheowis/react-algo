class CellSelections{
  constructor(size){
    this.size = size;
    this._set = [];
    this._selectionNames = [];
  }

  CellInitialization = (func) => {
    this._set.push(func) - 1;
  }

  ChangeSelection = (index,start,end) => {
    end = end || start;
    this._selectionNames[index] = {start,end};
    this._set[index](start,end);
  }

  GetSelection = (index) => {
    return this._selectionNames[index];
  } 
}

export {CellSelections};