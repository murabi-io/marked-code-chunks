import { marked } from "marked";

import extension from "../index";
import { trimLines } from "./helpers";

marked.use(extension());

describe("marked-code-chunks", () => {
  describe("given a code chunk", () => {
    it("should render chunks correctly with ~~~ fences", () => {
      const md = trimLines(`
      ~~~bash {osx, cmd="/bin/bash"}
            ls .
      ~~~
    `);
      expect(marked(md)).toMatchSnapshot();
    });
  });
});
