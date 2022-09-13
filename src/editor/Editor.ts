export interface CursorPosition {
  line: number,
  col: number
}

const EditorEvents = {
  Input: "input"
}

export type Line = [string];

export class Editor extends EventTarget {
  cursor: CursorPosition = {line: 0, col: 0} as CursorPosition
  lines: Map<number, Line> = new Map();

  moveCursor(lineNumber: number, col: number) {
    // create line if it doesn't exist
    this.getLine(lineNumber);
    this.cursor = {
      line: lineNumber, col
    }
    return this;
  }

  getLine(lineNumber: number): Line {
    // const line = this.getLine(lineNumber);
    if (!this.lines.has(lineNumber)) this.lines.set(lineNumber, [""]);
    return this.lines.get(lineNumber) || [""];

    // logic to create lines in between
    // console.log('need to dreate line', lineNumber, this.lines);
    // const linesToCreate: number = this.lines.size() - lineNumber + 1;
    // const newLines: Line[] = (new Array(linesToCreate)).map(_ => { return [""] });
    // this.lines = [...this.lines, ...(newLines)];

    // return newLines[-1];
    // return this.getLine(lineNumber);
  }

  writeAtCursor(char: string) {
    const line = this.getLine(this.cursor.line)
    const charr = line[0]
    console.log('char is', char)
    line[this.cursor.col] = char;

    this.dispatchEvent(new CustomEvent(EditorEvents.Input))
  }

  writeAtCursorAndFwd(char: string) {

    if (['Enter'].includes(char)) {
      this.moveCursor(this.cursor.line += 1, 0);
      this.writeAtCursor("\n");
    } else  {
      this.cursor.col += 1
      this.writeAtCursor(char);
    }

    return this
  }
}
