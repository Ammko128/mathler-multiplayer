const shuffleString = (str) => {
  const a = str.split("");
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }
  return a.join("");
};

const matched = (str) => {
  let count = 0;
  for (const i of str) {
    if (count < 0) return false;
    if (i == "(") count++;
    if (i == ")") count--;
  }
  return count === 0;
};

const regexFindAll = (str, re) => {
  const hits = [];
  let match = null;
  do {
    match = re.exec(str);
    if (match) {
      hits.push(match[0]);
    }
  } while (match);
  return hits;
};

function* product(arr1, repeat) {
  if (!repeat) {
    yield [];
  } else {
    for (const item of arr1) {
      for (const items of product(arr1, repeat - 1)) {
        yield [item, ...items];
      }
    }
  }
}

const guessLength = 8;
const maxOpCount = 3;
const alphabet = shuffleString("1234567890*/+-()");
const ops = "+-*/";
const digits = "0123456789";
const perms = product(alphabet.split(""), guessLength);
console.log(alphabet);

for (const permutation of perms) {
  const exp = permutation.join("");
  let invalid = false;
  if (exp[0] === "+" || exp[0] === "-") invalid = true;

  /* if (exp.includes("(")) {
    const parantheses = regexFindAll(exp, /\(([^)]+)\)/);
    for (const p of parantheses) {
      let operatorPresent = false;
      if (p.length > 0 && ops.includes(p[0])) invalid = true;
      for (const xyz of p) {
        if (xyz === "(") {
          invalid = true;
          break;
        }
        if (!ops.includes(xyz)) continue;
        operatorPresent = true;
        break;
      }
      if (!operatorPresent || invalid) {
        invalid = true;
        break;
      }
    }
  } */

  // if(exp.includes("(") && !(exp.includes("*") || exp.includes('/')) invalid = true;

  if (!invalid) {
    for (let i = 0; i < exp.length - 1; i++) {
      if (ops.includes(exp[i]) && ops.includes(exp[i + 1])) {
        invalid = true;
        break;
      }
      if (exp[i] === "0" && digits.includes(exp[i + 1])) {
        invalid = true;
        break;
      }
    }
  }
  if (!invalid && !matched(exp)) invalid = true;

  op_count = 0;
  for (const char of exp) {
    if (ops.includes(char)) {
      op_count++;
      if (op_count > maxOpCount) {
        invalid = true;
        break;
      }
    }
  }

  if (!invalid) {
    try {
      const result = eval(exp);
      const expWithoutParentheses = exp.replace("(", "").replace(")", "");
      if (result == eval(expWithoutParentheses)) invalid = true;
      if (result == Math.floor(result) && result < 1000 && result > 0 && !invalid)
        console.log(exp, result);
    } catch (e) {
      continue;
    }
  }
}
