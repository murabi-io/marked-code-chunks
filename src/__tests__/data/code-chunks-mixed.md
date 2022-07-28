## Table of contents with TOC {ignore=true}

The above header should not appear in TOC

[TOC]

## Table of contents with code chunk {ignore=true}

The above header should not appear in TOC

<!-- @import "[TOC]" {depthFrom:1, depthTo:6, orderedList:true} -->

<!-- code_chunk_output -->

<!-- /code_chunk_output -->

## Bash

`bash {cmd=true}`

```bash
ls .
```

---

## JavaScript

`js {cmd=node output=html}`

```js
const date = Date.now();
console.log(date.toString());
```

---

`js {cmd=node output=markdown}`

```js {cmd=node output=markdown}
var greeting = "Hello _world_";
console.log(greeting);
```

---

`js {cmd=node output=markdown output_first}`

```js {cmd=node output=markdown output_first}
var greeting = "Hello _world_";
console.log(greeting);
```

---

`js {cmd=node output=none}`

```js {cmd=node output=none}
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
      swap(items, i, j); //sawpping two elements
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
```

---

`js {cmd=node output=txt modify_source}`

```js {cmd=node output=txt modify_source}
var greeting = "Hello world!";
console.log(greeting);
```

---

`js {cmd=node output=txt modify_source run_on_save}`

```js {cmd=node output=txt modify_source run_on_save}
var greeting = "Hello world!!!";
console.log(greeting);
```

---

## Python

`gnuplot {cmd=true output="html"}`

```gnuplot {cmd=true output="html"}
set terminal svg
set title "Simple Plots" font ",20"
set key left box
set samples 50
set style data points

plot [-10:10] sin(x),atan(x),cos(atan(x))
```

---

`python {cmd=true args=["-v"]}`

```python
print("Verbose will be printed first")
```

---

`python {hide=true}`

```python {hide=true}
print('you can see this output message, but not this code')
```

---

`python {cmd=true id="izdlk700"}`

```python {cmd=true id="izdlk700"}
x = 1
```

`python {cmd=true id="izdlkdim"}`

```python
x = 2
```

`python {cmd=true continue="izdlk700" id="izdlkhso"}`

```python {cmd=true continue="izdlk700" id="izdlkhso"}
print(x) # will print 1
```

---

`js {cmd=node output=text .line-numbers}`

```js {cmd=node output=text .line-numbers}
const date = Date.now();
console.log(date.toString());
```

---

## LaTeX

`latex {cmd=true}`

```latex {cmd=true}
\documentclass{standalone}
\begin{document}
   Hello world!
\end{document}
```

---

`latex {cmd latex_zoom=2}`

```latex
\documentclass{standalone}
\begin{document}
   Hello world!
\end{document}
```

---

`erd {cmd=true output="html" args=["-i", "$input_file" "-f", "svg"]}`

```erd {cmd=true output="html" args=["-i", "$input_file" "-f", "svg"]}
[Person]
*name
height
weight
+birth_location_id

[Location]
*id
city
state
country

Person *--1 Location
```
