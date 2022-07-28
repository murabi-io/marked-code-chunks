import { marked } from "marked";

import { BlockAttributes } from "./block-attributes";
import { parseBlockInfo } from "./block-info";
import { Rules } from "./rules";

import { indentCodeCompensation } from "./utils";

import TokenizerExtension = marked.TokenizerExtension;
import TokenizerThis = marked.TokenizerThis;
import Tokens = marked.Tokens;

export const blockType = "fencedCodeChunk";
export type FencedCodeChunkToken = Tokens.Generic & {
  type: "fencedCodeChunk";
  codeBlockStyle?: "indented" | undefined;
  lang?: string | undefined;
  text: string;
  attributes: BlockAttributes;
};

const tokenizer: TokenizerExtension = {
  name: blockType,
  level: "block",
  start(this: TokenizerThis, src: string): number {
    const cap = src.match(Rules.Fences);
    // ensure that the block has code fences and code chunk meta
    if (!cap || cap[2].indexOf("{") === -1) {
      return -1;
    }
    return cap.index || -1;
  },
  tokenizer(this: TokenizerThis, src: string): FencedCodeChunkToken | void {
    const cap = Rules.Fences.exec(src);
    if (cap) {
      const raw = cap[0];
      const text = indentCodeCompensation(raw, cap[3] || "");
      const blockInfo = parseBlockInfo(cap[2]);

      if (Object.keys(blockInfo.attributes).length > 0) {
        return {
          type: blockType,
          lang: blockInfo.language,
          attributes: blockInfo.attributes,
          raw,
          text,
        };
      }
    }
  },
};

export default tokenizer;
