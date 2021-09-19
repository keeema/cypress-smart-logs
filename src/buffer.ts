import { Suite } from "mocha";
import { FileLog } from "./fileLog";
import { writeFailedTestInfo as writeFileLogs } from "./fileUtils";

export let buffer: FileLog[] = [];

before(() => cy.task("clean-smart-logs", {}, { log: false }));

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

function writeFile(this: Mocha.Context): void {
  if (!buffer.length) {
    return;
  }

  writeFileLogs(this, buffer.map((log) => log.fileText).join("\n") + "\n");
  buffer = [];
}
