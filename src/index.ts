export * from "./block-attributes/types";
export * from "./block-info/types";
export * from "./rules";
export * from "./tokenizer";

import { marked } from "marked";

import renderer from "./renderer";
import tokenizer from "./tokenizer";

import MarkedExtension = marked.MarkedExtension;

export const ren = renderer;
export const token = tokenizer;

export default function (): MarkedExtension {
  return {
    extensions: [renderer, tokenizer],
  };
}
