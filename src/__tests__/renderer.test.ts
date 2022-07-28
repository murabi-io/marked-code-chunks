import { marked } from "marked";

import renderer from "../renderer";
import tokenizer from "../tokenizer";
import { trimLines } from "./helpers";

marked.use({ extensions: [tokenizer, renderer] });

describe("renderer", () => {
  describe("given a code chunk", () => {
    it("should render chunks correctly with ~~~ fences", () => {
      const md = trimLines(`
      ~~~bash {osx, cmd="/bin/bash"}
            ls .
      ~~~
    `);
      expect(marked(md)).toMatchSnapshot();
    });
    it("should render chunks correctly with ``` fences", () => {
      const md = trimLines(`
        \`\`\`bash {osx, inputs=["1", "2", "3"]}
              var items = [5,3,7,6,2,9];
              function swap(items, leftIndex, rightIndex){
                  var temp = items[leftIndex];
                  items[leftIndex] = items[rightIndex];
                  items[rightIndex] = temp;
              }
              function partition(items, left, right) {
                  var pivot   = items[Math.floor((right + left) / 2)], //middle element
                      i       = left, //left pointer
                      j       = right; //right pointer
                  while (i <= j) {
                      while (items[i] < pivot) {
                          i++;
                      }
                      while (items[j] > pivot) {
                          j--;
                      }
                      if (i <= j) {
                          swap(items, i, j); //swapping two elements
                          i++;
                          j--;
                      }
                  }
                  return i;
              }
              
              function quickSort(items, left, right) {
                  var index;
                  if (items.length > 1) {
                      index = partition(items, left, right); //index returned from partition
                      if (left < index - 1) { //more elements on the left side of the pivot
                          quickSort(items, left, index - 1);
                      }
                      if (index < right) { //more elements on the right side of the pivot
                          quickSort(items, index, right);
                      }
                  }
                  return items;
              }
              // first call to quick sort
              var sortedArray = quickSort(items, 0, items.length - 1);
              console.log(sortedArray); //prints [2,3,5,6,7,9]
        \`\`\`
      `);
      const highlight = (code: string, lang: string): string | void => {
        return `<span class="${lang}">${code}</span>`;
      };
      expect(marked(md, { highlight })).toMatchSnapshot();
    });
  });
});
