export type NormalizedValue = boolean | number | string;

export enum NodeType {
  stringInQuotes,
  stringWithBrackets,
  word,
  array,
}
export type NodeValue = NormalizedValue | NormalizedValue[];

export type Node = [NodeValue, number, NodeType];

export interface BlockAttributes {
  [key: string]: NodeValue;
}
