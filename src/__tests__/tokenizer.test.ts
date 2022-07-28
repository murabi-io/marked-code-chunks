import * as fs from "fs";
import * as path from "path";

import { marked } from "marked";
import tokenizer, { blockType, FencedCodeChunkToken } from "../tokenizer";
import { trimLines } from "./helpers";
import Tokens = marked.Tokens;

marked.use({ extensions: [tokenizer] });

describe("tokenizer", () => {
  describe("given a code chunk", () => {
    it("should parse parameters correctly with ~~~ fences", () => {
      const md = trimLines(`
      ~~~bash {osx, cmd="/bin/bash"}
            ls .
      ~~~
    `);
      const tokens = marked.lexer(md);
      const token = tokens.find(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (t) => t.type === blockType
      ) as unknown as FencedCodeChunkToken;
      expect(token).toBeDefined();
      expect(token.lang).toEqual("bash");
      expect(token.attributes["osx"]).toEqual(true);
      expect(token.attributes["cmd"]).toEqual("/bin/bash");
    });
    it("should parse parameters correctly with ``` fences", () => {
      const md = trimLines(`
      \`\`\`bash {osx, cmd="/bin/bash"}
            ls .
      \`\`\`
    `);
      const tokens = marked.lexer(md);

      const token = tokens.find(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (t) => t.type === blockType
      ) as unknown as FencedCodeChunkToken;
      expect(token).toBeDefined();
      expect(token.lang).toEqual("bash");
      expect(token.attributes["osx"]).toEqual(true);
      expect(token.attributes["cmd"]).toEqual("/bin/bash");
    });
  });
  describe("given a code chunks based md file", () => {
    const markdown = fs
      .readFileSync(path.resolve(__dirname, "data/code-chunks.md"))
      .toString();

    describe("when called", () => {
      const tokens = marked.lexer(markdown);
      // ignored as custom token type is not supported by the linter
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const codeChunkTokens = tokens.filter((el) => el.type === blockType);
      it("should contain code chunk blocks", () => {
        expect(codeChunkTokens.length).toBeGreaterThan(0);
      });
      it("should contain attributes", () => {
        codeChunkTokens.forEach((token) => {
          const fencedToken = token as unknown as FencedCodeChunkToken;
          expect(Object.keys(fencedToken.attributes).length).toBeGreaterThan(0);
        });
      });
      it("should have lang, text and raw fields populated", () => {
        codeChunkTokens.forEach((token) => {
          const fencedToken = token as unknown as FencedCodeChunkToken;
          expect(fencedToken.text).not.toBe("");
          expect(fencedToken.raw).not.toBe("");
          expect(fencedToken.lang).not.toBe("");
        });
      });
    });
  });
  describe("given a mixed code & code chunks based md file", () => {
    const markdown = fs
      .readFileSync(path.resolve(__dirname, "data/code-chunks-mixed.md"))
      .toString();

    describe("when called", () => {
      const tokens = marked.lexer(markdown);
      const code = tokens.filter((el) => el.type === "code");
      // ignored as custom token type is not supported by the linter
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const codeChunkTokens = tokens.filter((el) => el.type === blockType);
      it("should contain both normal code and fenced code chunk blocks", () => {
        expect(code.length).toBeGreaterThan(0);
        expect(codeChunkTokens.length).toBeGreaterThan(0);
      });
      it("should contain attributes", () => {
        codeChunkTokens.forEach((token) => {
          const fencedToken = token as unknown as FencedCodeChunkToken;
          expect(Object.keys(fencedToken.attributes).length).toBeGreaterThan(0);
        });
      });
      it("should have lang, text and raw fields populated", () => {
        code.forEach((token) => {
          const fencedToken = token as Tokens.Code;
          expect(fencedToken.text).not.toBe("");
          expect(fencedToken.raw).not.toBe("");
          expect(fencedToken.lang).not.toBe("");
        });
        codeChunkTokens.forEach((token) => {
          const fencedToken = token as unknown as FencedCodeChunkToken;
          expect(fencedToken.text).not.toBe("");
          expect(fencedToken.raw).not.toBe("");
          expect(fencedToken.lang).not.toBe("");
        });
      });
    });
  });
});
