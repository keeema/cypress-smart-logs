import { Suite } from "mocha";
import { IWithText } from "./fileLog";
import { writeFailedTestInfo as writeFileLogs } from "./fileUtils";

export let buffer: IWithText[] = [];

const origDescribe = describe;

function newDescribe(this: Suite, title: string): Suite;
function newDescribe(this: Suite, title: string, fn: (this: Suite) => void): Suite;
function newDescribe(this: Suite, title: string, fn?: (this: Suite) => void): Suite {
  const result = fn ? origDescribe(title, fn) : origDescribe(title);
  if (result.root || result.parent === undefined || result.parent.root) {
    result.afterAll(writeFile);
    result.afterEach(writeFile);
  }

  return result;
}
newDescribe.only = origDescribe.only;
newDescribe.skip = origDescribe.skip;

describe = newDescribe;

Cypress.on("fail", (err) => {
  const enhancedErr = err as Error & {
    codeFrame?: { originalFile: string; frame: string; line: number; column: number };
    sourceMappedStack: string;
  };

  buffer.push({
    getText: enhancedErr.sourceMappedStack + "\n",
  });
  enhancedErr.codeFrame &&
    buffer.push({
      getText: `Original File: ${enhancedErr.codeFrame.originalFile}:${enhancedErr.codeFrame.line}:${enhancedErr.codeFrame.column}\n`,
    });

  enhancedErr.codeFrame &&
    buffer.push({
      getText: enhancedErr.codeFrame.frame + "\n",
    });
  throw err;
});

function writeFile(this: Mocha.Context): void {
  if (!buffer.length) {
    return;
  }

  writeFileLogs(this, buffer.map((log) => log.getText).join("\n") + "\n");
  buffer = [];
}
