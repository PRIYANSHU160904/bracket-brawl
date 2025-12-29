const problems = [
  {
    id: 1,
    title: "Sum of Two Numbers",
    description:
      "Write a function `sum(a, b)` that returns the sum of two numbers.",
    template: "function sum(a, b) {\n  // write your code here\n}",
    testCases: [
      { input: "sum(1, 2)", output: "3" },
      { input: "sum(5, 10)", output: "15" },
      { input: "sum(-1, 1)", output: "0" },
    ],
  },
  {
    id: 2,
    title: "Check Even or Odd",
    description:
      "Write a function `isEven(n)` that returns 'Even' if n is even, else 'Odd'.",
    template: "function isEven(n) {\n  // write your code here\n}",
    testCases: [
      { input: "isEven(2)", output: "'Even'" },
      { input: "isEven(3)", output: "'Odd'" },
    ],
  },
];

module.exports = problems;
