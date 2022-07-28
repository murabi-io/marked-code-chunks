import { escape, indentCodeCompensation } from "../utils";

describe("utils", () => {
  describe("escape function", () => {
    describe("given a code", () => {
      it("should escape the code, without encoding", () => {
        const html = `
        <div class="token-line css-k008qs" style="color:rgb(214, 222, 235)">
          <span class="css-15">1</span>
          <span class="token function" style="color:rgb(130, 170, 255)">npm</span>
          <span class="token plain"> </span>
          <span class="token function" style="color:rgb(130, 170, 255)">install</span>
          <span class="token plain"> npm-dts --save-dev</span>
         </div>
      `;
        expect(escape(html, false)).toMatchSnapshot();
      });
      it("should escape the code, with encoding", () => {
        const code = `
        const { build } = require('esbuild')
  
        build({
          entryPoints: ['src/index.ts'],
          outdir: 'dist',
          bundle: true,
        })
      `;
        expect(escape(code, true)).toMatchSnapshot();
      });
    });
  });
  describe("indentCodeCompensation function", () => {
    describe("given a code", () => {
      it("should properly indent the given code", () => {
        const text = `
        const { build } = require('esbuild')
        build({
          entryPoints: ['src/index.ts'],
          outdir: 'dist',
          bundle: true,
        })`;
        const raw = `
        \`\`\`js {cmd=node output=txt modify_source}
              ${text}
        \`\`\`
        `;
        expect(indentCodeCompensation(raw, text)).toMatchSnapshot();
      });
    });
  });
});
