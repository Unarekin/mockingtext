import { expert, should, assert } from 'chai';
import { default as mock } from '../src/mocker';

describe("Text Generation", () => {
  it("Can generate mock text", () => {
    let text: string = mock("Text");
    assert.notEqual(text, "Text");
  });
});