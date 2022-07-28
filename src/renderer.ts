import { marked } from "marked";

import { blockType, FencedCodeChunkToken } from "./tokenizer";
import { escape } from "./utils";

import RendererExtension = marked.RendererExtension;
import RendererThis = marked.RendererThis;
import Tokens = marked.Tokens;

const renderer: RendererExtension = {
  name: `${blockType}`,
  renderer(this: RendererThis, token: Tokens.Generic): string | false {
    if (token.type !== blockType) {
      return false;
    }
    const codeChunkToken = token as unknown as FencedCodeChunkToken;
    const lang = codeChunkToken.lang || "";
    let escaped = false;
    let code = codeChunkToken.text;
    if (this.parser.options.highlight) {
      const out = this.parser.options.highlight(code, lang);
      if (out != null && out !== code) {
        escaped = true;
        code = out;
      }
    }

    code = code.replace(/\n$/, "") + "\n";

    const attrs = Object.keys(codeChunkToken.attributes).map((key) => {
      const value = codeChunkToken.attributes[key];
      if (Array.isArray(value)) {
        return `data-${key}="${escape(JSON.stringify(value), true)}"`;
      }
      return `data-${key}="${value}"`;
    });

    if (lang !== "") {
      attrs.push(
        `class="${this.parser.options.langPrefix + escape(lang, true)}"`
      );
    }
    return (
      "<pre>" +
      `<code ${attrs.join(" ")}>` +
      (escaped ? code : escape(code, true)) +
      "</code>" +
      "</pre>\n"
    );
  },
};

export default renderer;
