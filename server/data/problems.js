
const problems = [

  {
    number: 1,
    title: "Sum of Two Numbers",
    difficulty: "easy",
    tags: ["math", "implementation"],
    constraints: "1 ≤ T ≤ 100\n−10^9 ≤ A, B ≤ 10^9",
    description: `Given T test cases, each containing two integers A and B, print their sum.

Input:
First line contains T — the number of test cases.
Each of the next T lines contains two integers A and B.

Output:
For each test case, print A + B on a new line.`,
    sampleTestCases: [
      {
        input: "3\n1 2\n-3 5\n100 200",
        output: "3\n2\n300",
        explanation: "1+2=3, -3+5=2, 100+200=300",
      },
    ],
    hiddenTestCases: [
      { input: "1\n1000000000 1000000000", output: "2000000000" },
      { input: "1\n-1000000000 -1000000000", output: "-2000000000" },
      { input: "1\n0 0", output: "0" },
      {
        input: "2\n999999999 1\n-500000000 500000000",
        output: "1000000000\n0",
      },
    ],
  },
  {
    number: 2,
    title: "Odd or Even",
    difficulty: "easy",
    tags: ["math", "implementation"],
    constraints: "1 ≤ T ≤ 100\n1 ≤ N ≤ 10^9",
    description: `Given T integers, for each integer print "ODD" if it is odd, or "EVEN" if it is even.

Input:
First line contains T.
Each of the next T lines contains a single integer N.

Output:
Print "ODD" or "EVEN" for each test case.`,
    sampleTestCases: [
      {
        input: "3\n4\n7\n0",
        output: "EVEN\nODD\nEVEN",
        explanation: "4 is even, 7 is odd, 0 is even",
      },
    ],
    hiddenTestCases: [
      { input: "1\n1000000000", output: "EVEN" },
      { input: "1\n999999999", output: "ODD" },
      { input: "3\n1\n2\n3", output: "ODD\nEVEN\nODD" },
    ],
  },
  {
    number: 3,
    title: "Reverse a String",
    difficulty: "easy",
    tags: ["strings", "implementation"],
    constraints:
      "1 ≤ T ≤ 100\n1 ≤ |S| ≤ 1000\nS contains only lowercase English letters",
    description: `Given T strings, print each string reversed.

Input:
First line contains T.
Each of the next T lines contains a string S.

Output:
Print the reversed string for each test case.`,
    sampleTestCases: [
      {
        input: "2\nhello\nabcde",
        output: "olleh\nedcba",
        explanation: "hello reversed is olleh",
      },
    ],
    hiddenTestCases: [
      { input: "1\na", output: "a" },
      { input: "1\nabcdefghij", output: "jihgfedcba" },
      { input: "2\nracecar\nzz", output: "racecar\nzz" },
    ],
  },
  {
    number: 4,
    title: "Count Vowels",
    difficulty: "easy",
    tags: ["strings", "implementation"],
    constraints:
      "1 ≤ T ≤ 100\n1 ≤ |S| ≤ 1000\nS contains only lowercase English letters",
    description: `Given T strings, for each string count the number of vowels (a, e, i, o, u).

Input:
First line contains T.
Each of the next T lines contains a string S.

Output:
Print the count of vowels for each test case.`,
    sampleTestCases: [
      {
        input: "2\nhello\naeiou",
        output: "2\n5",
        explanation: "hello has e,o = 2 vowels; aeiou has all 5",
      },
    ],
    hiddenTestCases: [
      { input: "1\nbcd", output: "0" },
      { input: "1\naaaaaa", output: "6" },
      { input: "1\nthequickbrownfox", output: "5" },
    ],
  },
  {
    number: 5,
    title: "Factorial",
    difficulty: "easy",
    tags: ["math", "implementation"],
    constraints: "1 ≤ T ≤ 100\n0 ≤ N ≤ 12",
    description: `Given T integers, print the factorial of each.

Input:
First line contains T.
Each of the next T lines contains a non-negative integer N.

Output:
Print N! for each test case.`,
    sampleTestCases: [
      {
        input: "3\n0\n1\n5",
        output: "1\n1\n120",
        explanation: "0!=1, 1!=1, 5!=120",
      },
    ],
    hiddenTestCases: [
      { input: "1\n10", output: "3628800" },
      { input: "1\n12", output: "479001600" },
      { input: "2\n6\n7", output: "720\n5040" },
    ],
  },
  {
    number: 6,
    title: "Maximum of Three",
    difficulty: "easy",
    tags: ["math", "implementation"],
    constraints: "1 ≤ T ≤ 100\n−10^9 ≤ A, B, C ≤ 10^9",
    description: `Given T test cases each with three integers A, B, C, print the maximum of the three.

Input:
First line contains T.
Each of the next T lines contains three integers A B C.

Output:
Print the maximum for each test case.`,
    sampleTestCases: [
      {
        input: "2\n1 5 3\n-1 -2 -3",
        output: "5\n-1",
        explanation: "max(1,5,3)=5, max(-1,-2,-3)=-1",
      },
    ],
    hiddenTestCases: [
      { input: "1\n1000000000 999999999 999999998", output: "1000000000" },
      { input: "1\n0 0 0", output: "0" },
      { input: "1\n-5 -5 -5", output: "-5" },
    ],
  },
  {
    number: 7,
    title: "Sum of Array",
    difficulty: "easy",
    tags: ["arrays", "implementation"],
    constraints: "1 ≤ T ≤ 100\n1 ≤ N ≤ 10^5\n−10^4 ≤ A[i] ≤ 10^4",
    description: `Given T arrays, print the sum of each array.

Input:
First line contains T.
For each test case:
- First line contains N (size of array).
- Second line contains N space-separated integers.

Output:
Print the sum for each test case.`,
    sampleTestCases: [
      {
        input: "2\n3\n1 2 3\n4\n-1 2 -3 4",
        output: "6\n2",
        explanation: "1+2+3=6, -1+2-3+4=2",
      },
    ],
    hiddenTestCases: [
      { input: "1\n5\n10000 10000 10000 10000 10000", output: "50000" },
      { input: "1\n1\n-10000", output: "-10000" },
      { input: "1\n3\n0 0 0", output: "0" },
    ],
  },
  {
    number: 8,
    title: "Palindrome Check",
    difficulty: "easy",
    tags: ["strings", "implementation"],
    constraints:
      "1 ≤ T ≤ 100\n1 ≤ |S| ≤ 1000\nS contains only lowercase English letters",
    description: `Given T strings, check if each string is a palindrome.

Input:
First line contains T.
Each of the next T lines contains a string S.

Output:
Print "YES" if S is a palindrome, "NO" otherwise.`,
    sampleTestCases: [
      {
        input: "3\nracecar\nhello\nmadam",
        output: "YES\nNO\nYES",
        explanation: "racecar and madam are palindromes",
      },
    ],
    hiddenTestCases: [
      { input: "1\na", output: "YES" },
      { input: "1\nab", output: "NO" },
      { input: "1\nabacaba", output: "YES" },
      { input: "1\nabcba", output: "YES" },
    ],
  },
  {
    number: 9,
    title: "Count Divisors",
    difficulty: "easy",
    tags: ["math", "number theory"],
    constraints: "1 ≤ T ≤ 100\n1 ≤ N ≤ 10^6",
    description: `Given T integers, for each print the number of divisors.

Input:
First line contains T.
Each of the next T lines contains a single integer N.

Output:
Print the number of divisors of N for each test case.`,
    sampleTestCases: [
      {
        input: "3\n1\n6\n12",
        output: "1\n4\n6",
        explanation: "divisors of 6 are 1,2,3,6 → 4",
      },
    ],
    hiddenTestCases: [
      { input: "1\n1000000", output: "49" },
      { input: "1\n2", output: "2" },
      { input: "1\n36", output: "9" },
    ],
  },
  {
    number: 10,
    title: "FizzBuzz",
    difficulty: "easy",
    tags: ["math", "implementation"],
    constraints: "1 ≤ T ≤ 100\n1 ≤ N ≤ 10^4",
    description: `For T test cases, given N print numbers from 1 to N. For multiples of 3 print "Fizz", for multiples of 5 print "Buzz", for multiples of both print "FizzBuzz", otherwise print the number.

Input:
First line contains T.
Each of the next T lines contains N.

Output:
For each test case, print N lines as described.`,
    sampleTestCases: [
      {
        input: "1\n5",
        output: "1\n2\nFizz\n4\nBuzz",
        explanation: "3→Fizz, 5→Buzz",
      },
    ],
    hiddenTestCases: [
      {
        input: "1\n15",
        output:
          "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz",
      },
      { input: "1\n1", output: "1" },
    ],
  },
  {
    number: 11,
    title: "GCD of Two Numbers",
    difficulty: "easy",
    tags: ["math", "number theory"],
    constraints: "1 ≤ T ≤ 100\n1 ≤ A, B ≤ 10^9",
    description: `Given T pairs of integers, find the GCD of each pair.

Input:
First line contains T.
Each of the next T lines contains two integers A and B.

Output:
Print GCD(A, B) for each test case.`,
    sampleTestCases: [
      {
        input: "2\n12 18\n100 75",
        output: "6\n25",
        explanation: "GCD(12,18)=6, GCD(100,75)=25",
      },
    ],
    hiddenTestCases: [
      { input: "1\n1000000000 999999999", output: "1" },
      { input: "1\n1 1", output: "1" },
      { input: "1\n48 64", output: "16" },
    ],
  },
  {
    number: 12,
    title: "Power of Two",
    difficulty: "easy",
    tags: ["math", "implementation"],
    constraints: "1 ≤ T ≤ 100\n1 ≤ N ≤ 10^9",
    description: `Given T integers, for each print "YES" if it is a power of 2, "NO" otherwise.

Input:
First line contains T.
Each of the next T lines contains an integer N.

Output:
Print "YES" or "NO" for each test case.`,
    sampleTestCases: [
      {
        input: "3\n1\n4\n6",
        output: "YES\nYES\nNO",
        explanation: "1=2^0, 4=2^2, 6 is not a power of 2",
      },
    ],
    hiddenTestCases: [
      { input: "1\n1073741824", output: "YES" },
      { input: "1\n3", output: "NO" },
      { input: "1\n1024", output: "YES" },
    ],
  },
  {
    number: 13,
    title: "Anagram Check",
    difficulty: "easy",
    tags: ["strings", "sorting"],
    constraints:
      "1 ≤ T ≤ 100\n1 ≤ |S|, |P| ≤ 1000\nStrings contain only lowercase English letters",
    description: `Given T pairs of strings, check if each pair is an anagram of each other.

Input:
First line contains T.
Each of the next T lines contains two strings S and P.

Output:
Print "YES" if they are anagrams, "NO" otherwise.`,
    sampleTestCases: [
      {
        input: "2\nlisten silent\nhello world",
        output: "YES\nNO",
        explanation: "listen and silent are anagrams",
      },
    ],
    hiddenTestCases: [
      { input: "1\nabc cab", output: "YES" },
      { input: "1\naab bba", output: "NO" },
      { input: "1\na a", output: "YES" },
    ],
  },
  {
    number: 14,
    title: "Sort Array Ascending",
    difficulty: "easy",
    tags: ["arrays", "sorting"],
    constraints: "1 ≤ T ≤ 100\n1 ≤ N ≤ 10^4\n−10^6 ≤ A[i] ≤ 10^6",
    description: `Given T arrays, print each array sorted in ascending order.

Input:
First line contains T.
For each test case:
- First line contains N.
- Second line contains N space-separated integers.

Output:
Print the sorted array for each test case on one line.`,
    sampleTestCases: [
      {
        input: "2\n4\n3 1 4 2\n3\n-1 5 0",
        output: "1 2 3 4\n-1 0 5",
        explanation: "Sort each array",
      },
    ],
    hiddenTestCases: [
      { input: "1\n5\n5 4 3 2 1", output: "1 2 3 4 5" },
      { input: "1\n1\n42", output: "42" },
      { input: "1\n3\n0 0 0", output: "0 0 0" },
    ],
  },
  {
    number: 15,
    title: "String Frequency",
    difficulty: "easy",
    tags: ["strings", "implementation"],
    constraints:
      "1 ≤ T ≤ 100\n1 ≤ |S| ≤ 1000\nS contains only lowercase English letters\nc is a lowercase English letter",
    description: `Given T test cases, each with a string S and a character c, print the number of times c appears in S.

Input:
First line contains T.
Each of the next T lines contains a string S and a character c.

Output:
Print the frequency of c in S for each test case.`,
    sampleTestCases: [
      {
        input: "2\nhello l\nbanana a",
        output: "2\n3",
        explanation: "l appears 2 times in hello, a appears 3 times in banana",
      },
    ],
    hiddenTestCases: [
      { input: "1\naaaaaa a", output: "6" },
      { input: "1\nabcdef z", output: "0" },
      { input: "1\nmississippi s", output: "4" },
    ],
  },
  {
    number: 16,
    title: "Prime Check",
    difficulty: "easy",
    tags: ["math", "number theory"],
    constraints: "1 ≤ T ≤ 100\n1 ≤ N ≤ 10^6",
    description: `Given T integers, for each print "YES" if it is prime, "NO" otherwise.

Input:
First line contains T.
Each of the next T lines contains an integer N.

Output:
Print "YES" or "NO" for each test case.`,
    sampleTestCases: [
      {
        input: "4\n1\n2\n7\n9",
        output: "NO\nYES\nYES\nNO",
        explanation: "2 and 7 are prime; 1 and 9 are not",
      },
    ],
    hiddenTestCases: [
      { input: "1\n999983", output: "YES" },
      { input: "1\n1000000", output: "NO" },
      { input: "1\n2", output: "YES" },
    ],
  },
  {
    number: 17,
    title: "Second Largest",
    difficulty: "easy",
    tags: ["arrays", "implementation"],
    constraints:
      "1 ≤ T ≤ 100\n2 ≤ N ≤ 10^5\n−10^9 ≤ A[i] ≤ 10^9\nAll elements are distinct",
    description: `Given T arrays, find the second largest element in each.

Input:
First line contains T.
For each test case:
- First line contains N.
- Second line contains N space-separated integers.

Output:
Print the second largest element for each test case.`,
    sampleTestCases: [
      {
        input: "2\n5\n3 1 4 1 5\n4\n10 20 30 40",
        output: "4\n30",
        explanation: "Second largest of [3,1,4,1,5] is 4",
      },
    ],
    hiddenTestCases: [
      { input: "1\n2\n1 2", output: "1" },
      { input: "1\n3\n-1 -2 -3", output: "-2" },
      { input: "1\n4\n1000000000 999999999 999999998 0", output: "999999999" },
    ],
  },
  {
    number: 18,
    title: "Count Words",
    difficulty: "easy",
    tags: ["strings", "implementation"],
    constraints:
      "1 ≤ T ≤ 100\n1 ≤ |S| ≤ 10^4\nWords are separated by single spaces",
    description: `Given T strings, count the number of words in each string.

Input:
First line contains T.
Each of the next T lines contains a string S.

Output:
Print the word count for each test case.`,
    sampleTestCases: [
      {
        input: "2\nhello world\nthe quick brown fox",
        output: "2\n4",
        explanation: "Count space-separated tokens",
      },
    ],
    hiddenTestCases: [
      { input: "1\nhello", output: "1" },
      { input: "1\na b c d e", output: "5" },
      { input: "1\none two three four five six", output: "6" },
    ],
  },
  {
    number: 19,
    title: "Binary to Decimal",
    difficulty: "easy",
    tags: ["math", "implementation"],
    constraints: "1 ≤ T ≤ 100\n1 ≤ |B| ≤ 30\nB contains only '0' and '1'",
    description: `Given T binary strings, convert each to its decimal equivalent.

Input:
First line contains T.
Each of the next T lines contains a binary string B.

Output:
Print the decimal value for each test case.`,
    sampleTestCases: [
      {
        input: "3\n1010\n1111\n0",
        output: "10\n15\n0",
        explanation: "1010 in binary is 10 in decimal",
      },
    ],
    hiddenTestCases: [
      { input: "1\n111111111111111111111111111111", output: "1073741823" },
      { input: "1\n1", output: "1" },
      { input: "1\n100000", output: "32" },
    ],
  },
  {
    number: 20,
    title: "LCM of Two Numbers",
    difficulty: "easy",
    tags: ["math", "number theory"],
    constraints: "1 ≤ T ≤ 100\n1 ≤ A, B ≤ 10^9",
    description: `Given T pairs of integers, find the LCM of each pair.

Input:
First line contains T.
Each of the next T lines contains two integers A and B.

Output:
Print LCM(A, B) for each test case.`,
    sampleTestCases: [
      {
        input: "2\n4 6\n3 5",
        output: "12\n15",
        explanation: "LCM(4,6)=12, LCM(3,5)=15",
      },
    ],
    hiddenTestCases: [
      { input: "1\n1 1000000000", output: "1000000000" },
      { input: "1\n12 18", output: "36" },
      { input: "1\n7 13", output: "91" },
    ],
  },

  {
    number: 21,
    title: "Two Sum",
    difficulty: "medium",
    tags: ["arrays", "hashing"],
    constraints:
      "1 ≤ T ≤ 10\n2 ≤ N ≤ 10^5\n−10^9 ≤ A[i] ≤ 10^9\n−2×10^9 ≤ target ≤ 2×10^9\nExactly one valid pair guaranteed",
    description: `Given an array of integers and a target sum, find two indices i and j (i < j) such that A[i] + A[j] = target. Print the indices (1-indexed).

Input:
First line contains T.
For each test case:
- First line contains N and target.
- Second line contains N integers.

Output:
Print two 1-indexed positions i j for each test case.`,
    sampleTestCases: [
      {
        input: "1\n4 9\n2 7 11 15",
        output: "1 2",
        explanation: "A[1]+A[2] = 2+7 = 9",
      },
    ],
    hiddenTestCases: [
      { input: "1\n3 6\n3 3 0", output: "1 2" },
      { input: "1\n5 0\n-1 0 1 2 -1", output: "1 3" },
      { input: "1\n2 -3\n-1 -2", output: "1 2" },
    ],
  },
  {
    number: 22,
    title: "Longest Common Prefix",
    difficulty: "medium",
    tags: ["strings", "implementation"],
    constraints:
      "1 ≤ T ≤ 10\n1 ≤ N ≤ 200\n1 ≤ |S| ≤ 200\nAll strings contain lowercase letters only",
    description: `Given T test cases, each with N strings, find the longest common prefix among all strings.

Input:
First line contains T.
For each test case:
- First line contains N.
- Each of the next N lines contains a string.

Output:
Print the longest common prefix. If none exists, print "NONE".`,
    sampleTestCases: [
      {
        input: "1\n3\nflower\nflow\nflight",
        output: "fl",
        explanation: "fl is the longest common prefix",
      },
    ],
    hiddenTestCases: [
      { input: "1\n3\ndog\ncar\nrace", output: "NONE" },
      { input: "1\n2\nabc\nabc", output: "abc" },
      { input: "1\n3\ninterstellar\ninterrupt\ninterview", output: "inter" },
    ],
  },
  {
    number: 23,
    title: "Subarray with Given Sum",
    difficulty: "medium",
    tags: ["arrays", "sliding window"],
    constraints: "1 ≤ T ≤ 10\n1 ≤ N ≤ 10^5\n0 ≤ A[i] ≤ 10^4\n0 ≤ S ≤ 10^9",
    description: `Given a non-negative integer array, find if there exists a contiguous subarray with sum equal to S. Print the 1-indexed start and end positions. If multiple exist, print the first one found. If none, print -1.

Input:
First line contains T.
For each test case:
- First line contains N and S.
- Second line contains N non-negative integers.

Output:
Print "l r" (1-indexed) or "-1" for each test case.`,
    sampleTestCases: [
      {
        input: "1\n5 15\n1 2 3 7 5",
        output: "1 5",
        explanation:
          "1+2+3+7+5=18 no wait 1+2+3+4+5=15: subarray from index 1 to 5",
      },
    ],
    hiddenTestCases: [
      { input: "1\n5 12\n1 2 3 7 5", output: "2 4" },
      { input: "1\n3 0\n0 0 0", output: "1 1" },
      { input: "1\n3 100\n1 2 3", output: "-1" },
    ],
  },
  {
    number: 24,
    title: "Balanced Parentheses",
    difficulty: "medium",
    tags: ["strings", "stack"],
    constraints:
      "1 ≤ T ≤ 100\n1 ≤ |S| ≤ 10^4\nS contains only '(', ')', '{', '}', '[', ']'",
    description: `Given T strings containing brackets, check if each is balanced.

Input:
First line contains T.
Each of the next T lines contains a string S.

Output:
Print "YES" if balanced, "NO" otherwise.`,
    sampleTestCases: [
      {
        input: "3\n()[]{}\n([)]\n{[]}",
        output: "YES\nNO\nYES",
        explanation: "([)] is not balanced because types mismatch",
      },
    ],
    hiddenTestCases: [
      { input: "1\n((((()))))", output: "YES" },
      { input: "1\n(]", output: "NO" },
      { input: "1\n{[()]}", output: "YES" },
      { input: "1\n", output: "YES" },
    ],
  },
  {
    number: 25,
    title: "Next Greater Element",
    difficulty: "medium",
    tags: ["arrays", "stack"],
    constraints: "1 ≤ T ≤ 10\n1 ≤ N ≤ 10^5\n0 ≤ A[i] ≤ 10^9",
    description: `For each element in the array, find the next greater element to its right. If none exists, output -1.

Input:
First line contains T.
For each test case:
- First line contains N.
- Second line contains N integers.

Output:
Print N space-separated integers for each test case.`,
    sampleTestCases: [
      {
        input: "1\n4\n4 5 2 25",
        output: "5 25 25 -1",
        explanation: "NGE of 4 is 5, 5 is 25, 2 is 25, 25 has none",
      },
    ],
    hiddenTestCases: [
      { input: "1\n5\n1 2 3 4 5", output: "2 3 4 5 -1" },
      { input: "1\n5\n5 4 3 2 1", output: "-1 -1 -1 -1 -1" },
      { input: "1\n3\n3 1 2", output: "-1 2 -1" },
    ],
  },
  {
    number: 26,
    title: "Matrix Transpose",
    difficulty: "medium",
    tags: ["arrays", "implementation"],
    constraints: "1 ≤ T ≤ 10\n1 ≤ N, M ≤ 500",
    description: `Given T matrices, print the transpose of each.

Input:
First line contains T.
For each test case:
- First line contains N and M.
- Next N lines contain M integers each.

Output:
Print the transposed matrix (M rows, N columns) for each test case.`,
    sampleTestCases: [
      {
        input: "1\n2 3\n1 2 3\n4 5 6",
        output: "1 4\n2 5\n3 6",
        explanation: "Rows become columns",
      },
    ],
    hiddenTestCases: [
      { input: "1\n1 1\n7", output: "7" },
      { input: "1\n3 3\n1 2 3\n4 5 6\n7 8 9", output: "1 4 7\n2 5 8\n3 6 9" },
    ],
  },
  {
    number: 27,
    title: "Frequency Map",
    difficulty: "medium",
    tags: ["arrays", "hashing"],
    constraints: "1 ≤ T ≤ 10\n1 ≤ N ≤ 10^5\n1 ≤ A[i] ≤ 10^6",
    description: `Given T arrays, for each print the most frequently occurring element. If tie, print the smallest.

Input:
First line contains T.
For each test case:
- First line contains N.
- Second line contains N integers.

Output:
Print the most frequent element for each test case.`,
    sampleTestCases: [
      {
        input: "1\n7\n1 2 2 3 3 3 4",
        output: "3",
        explanation: "3 appears most (3 times)",
      },
    ],
    hiddenTestCases: [
      { input: "1\n4\n1 1 2 2", output: "1" },
      { input: "1\n1\n42", output: "42" },
      { input: "1\n6\n5 5 4 4 3 3", output: "3" },
    ],
  },
  {
    number: 28,
    title: "Rotate Array",
    difficulty: "medium",
    tags: ["arrays", "implementation"],
    constraints: "1 ≤ T ≤ 10\n1 ≤ N ≤ 10^5\n0 ≤ K ≤ 10^9\n−10^6 ≤ A[i] ≤ 10^6",
    description: `Given T arrays, rotate each array to the right by K positions.

Input:
First line contains T.
For each test case:
- First line contains N and K.
- Second line contains N integers.

Output:
Print the rotated array for each test case.`,
    sampleTestCases: [
      {
        input: "1\n5 2\n1 2 3 4 5",
        output: "4 5 1 2 3",
        explanation: "Rotate right by 2: last 2 elements come to front",
      },
    ],
    hiddenTestCases: [
      { input: "1\n3 0", output: "1 2 3" },
      { input: "1\n3 3\n1 2 3", output: "1 2 3" },
      { input: "1\n4 6\n1 2 3 4", output: "3 4 1 2" },
    ],
  },
  {
    number: 29,
    title: "Longest Increasing Subsequence Length",
    difficulty: "medium",
    tags: ["arrays", "dynamic programming"],
    constraints: "1 ≤ T ≤ 10\n1 ≤ N ≤ 2500\n−10^9 ≤ A[i] ≤ 10^9",
    description: `Given T arrays, find the length of the longest strictly increasing subsequence in each.

Input:
First line contains T.
For each test case:
- First line contains N.
- Second line contains N integers.

Output:
Print the LIS length for each test case.`,
    sampleTestCases: [
      {
        input: "1\n8\n10 9 2 5 3 7 101 18",
        output: "4",
        explanation: "LIS is [2,3,7,101] with length 4",
      },
    ],
    hiddenTestCases: [
      { input: "1\n6\n0 1 0 3 2 3", output: "4" },
      { input: "1\n4\n7 7 7 7", output: "1" },
      { input: "1\n5\n1 2 3 4 5", output: "5" },
    ],
  },
  {
    number: 30,
    title: "Coin Change (Min Coins)",
    difficulty: "medium",
    tags: ["dynamic programming", "greedy"],
    constraints:
      "1 ≤ T ≤ 10\n1 ≤ N ≤ 12\n1 ≤ coins[i] ≤ 10^4\n0 ≤ amount ≤ 10^4",
    description: `Given T test cases, each with a set of coin denominations and an amount, find the minimum number of coins needed to make the amount. If impossible, print -1.

Input:
First line contains T.
For each test case:
- First line contains N (number of denominations) and amount.
- Second line contains N coin values.

Output:
Print the minimum number of coins or -1.`,
    sampleTestCases: [
      {
        input: "1\n3 11\n1 5 6",
        output: "2",
        explanation: "5+6=11, 2 coins",
      },
    ],
    hiddenTestCases: [
      { input: "1\n3 3\n2 3 4", output: "1" },
      { input: "1\n1 3\n2", output: "-1" },
      { input: "1\n1 0\n1", output: "0" },
    ],
  },
  {
    number: 31,
    title: "String Compression",
    difficulty: "medium",
    tags: ["strings", "implementation"],
    constraints:
      "1 ≤ T ≤ 100\n1 ≤ |S| ≤ 10^4\nS contains only lowercase letters",
    description: `Given T strings, compress each using run-length encoding. If compressed string is not shorter, return original.

Input:
First line contains T.
Each of the next T lines contains a string S.

Output:
Print the compressed or original string.`,
    sampleTestCases: [
      {
        input: "2\naabcccccaaa\nabc",
        output: "a2b1c5a3\nabc",
        explanation:
          "a2b1c5a3 is shorter; abc compressed is a1b1c1 which is longer",
      },
    ],
    hiddenTestCases: [
      { input: "1\naaaaaa", output: "a6" },
      { input: "1\nabcd", output: "abcd" },
      { input: "1\naaabbbccc", output: "a3b3c3" },
    ],
  },
  {
    number: 32,
    title: "Binary Search",
    difficulty: "medium",
    tags: ["arrays", "binary search"],
    constraints:
      "1 ≤ T ≤ 10\n1 ≤ N ≤ 10^6\n−10^9 ≤ A[i] ≤ 10^9\nArray is sorted in ascending order",
    description: `Given T sorted arrays and a target value, find the 1-indexed position of target. If not found, print -1.

Input:
First line contains T.
For each test case:
- First line contains N and target.
- Second line contains N sorted integers.

Output:
Print the 1-indexed position or -1.`,
    sampleTestCases: [
      {
        input: "1\n5 3\n1 2 3 4 5",
        output: "3",
        explanation: "3 is at index 3 (1-indexed)",
      },
    ],
    hiddenTestCases: [
      { input: "1\n5 6\n1 2 3 4 5", output: "-1" },
      { input: "1\n1 1\n1", output: "1" },
      { input: "1\n6 4\n1 2 3 4 5 6", output: "4" },
    ],
  },
  {
    number: 33,
    title: "Pascal's Triangle Row",
    difficulty: "medium",
    tags: ["math", "dynamic programming"],
    constraints: "1 ≤ T ≤ 100\n0 ≤ N ≤ 30",
    description: `Given T values of N, print the N-th row (0-indexed) of Pascal's triangle.

Input:
First line contains T.
Each of the next T lines contains N.

Output:
Print the N-th row space-separated for each test case.`,
    sampleTestCases: [
      {
        input: "3\n0\n1\n4",
        output: "1\n1 1\n1 4 6 4 1",
        explanation: "Row 4 is 1 4 6 4 1",
      },
    ],
    hiddenTestCases: [
      { input: "1\n5", output: "1 5 10 10 5 1" },
      { input: "1\n10", output: "1 10 45 120 210 252 210 120 45 10 1" },
    ],
  },
  {
    number: 34,
    title: "Merge Intervals",
    difficulty: "medium",
    tags: ["arrays", "sorting"],
    constraints: "1 ≤ T ≤ 10\n1 ≤ N ≤ 10^4\n0 ≤ start ≤ end ≤ 10^4",
    description: `Given T sets of intervals, merge all overlapping intervals.

Input:
First line contains T.
For each test case:
- First line contains N (number of intervals).
- Each of the next N lines contains two integers start and end.

Output:
Print the merged intervals sorted by start time, one per line.`,
    sampleTestCases: [
      {
        input: "1\n4\n1 3\n2 6\n8 10\n15 18",
        output: "1 6\n8 10\n15 18",
        explanation: "[1,3] and [2,6] overlap → merge to [1,6]",
      },
    ],
    hiddenTestCases: [
      { input: "1\n2\n1 4\n4 5", output: "1 5" },
      { input: "1\n1\n1 1", output: "1 1" },
      { input: "1\n3\n1 2\n3 4\n5 6", output: "1 2\n3 4\n5 6" },
    ],
  },
  {
    number: 35,
    title: "Count Inversions",
    difficulty: "medium",
    tags: ["arrays", "sorting"],
    constraints: "1 ≤ T ≤ 10\n1 ≤ N ≤ 10^5\n0 ≤ A[i] ≤ 10^9",
    description: `Given T arrays, count the number of inversions. A pair (i, j) is an inversion if i < j and A[i] > A[j].

Input:
First line contains T.
For each test case:
- First line contains N.
- Second line contains N integers.

Output:
Print the number of inversions for each test case.`,
    sampleTestCases: [
      {
        input: "1\n5\n2 4 1 3 5",
        output: "3",
        explanation: "Inversions: (2,1),(4,1),(4,3)",
      },
    ],
    hiddenTestCases: [
      { input: "1\n3\n3 2 1", output: "3" },
      { input: "1\n3\n1 2 3", output: "0" },
      { input: "1\n4\n4 3 2 1", output: "6" },
    ],
  },
  {
    number: 36,
    title: "Spiral Matrix Traversal",
    difficulty: "medium",
    tags: ["arrays", "implementation"],
    constraints: "1 ≤ T ≤ 10\n1 ≤ N, M ≤ 10^3",
    description: `Given T matrices of size N×M, print all elements in spiral order.

Input:
First line contains T.
For each test case:
- First line contains N and M.
- Next N lines contain M integers each.

Output:
Print all elements in spiral order, space-separated.`,
    sampleTestCases: [
      {
        input: "1\n3 3\n1 2 3\n4 5 6\n7 8 9",
        output: "1 2 3 6 9 8 7 4 5",
        explanation: "Spiral: top→right→bottom→left, inward",
      },
    ],
    hiddenTestCases: [
      { input: "1\n1 4\n1 2 3 4", output: "1 2 3 4" },
      { input: "1\n4 1\n1\n2\n3\n4", output: "1 2 3 4" },
      { input: "1\n2 2\n1 2\n3 4", output: "1 2 4 3" },
    ],
  },
  {
    number: 37,
    title: "Valid Sudoku Row",
    difficulty: "medium",
    tags: ["arrays", "hashing"],
    constraints:
      "1 ≤ T ≤ 10\nInput is always a 9-digit string using digits 1-9",
    description: `Given T strings each representing a row of a Sudoku grid (9 digits), check if the row is valid (all digits 1-9 appear exactly once).

Input:
First line contains T.
Each of the next T lines contains a 9-digit string.

Output:
Print "YES" if valid, "NO" otherwise.`,
    sampleTestCases: [
      {
        input: "2\n123456789\n123456788",
        output: "YES\nNO",
        explanation: "Second row repeats 8 and misses 9",
      },
    ],
    hiddenTestCases: [
      { input: "1\n987654321", output: "YES" },
      { input: "1\n111111111", output: "NO" },
    ],
  },
  {
    number: 38,
    title: "Majority Element",
    difficulty: "medium",
    tags: ["arrays", "hashing"],
    constraints:
      "1 ≤ T ≤ 10\n1 ≤ N ≤ 10^5\n−10^9 ≤ A[i] ≤ 10^9\nMajority element always exists (appears > N/2 times)",
    description: `Given T arrays, find the majority element (appears more than N/2 times) in each.

Input:
First line contains T.
For each test case:
- First line contains N.
- Second line contains N integers.

Output:
Print the majority element for each test case.`,
    sampleTestCases: [
      {
        input: "2\n7\n2 2 1 1 1 2 2\n3\n3 2 3",
        output: "2\n3",
        explanation: "2 appears 4 times in first, 3 appears 2 times in second",
      },
    ],
    hiddenTestCases: [
      { input: "1\n1\n1", output: "1" },
      { input: "1\n5\n1 1 1 1 1", output: "1" },
      { input: "1\n9\n1 2 3 1 1 2 1 1 1", output: "1" },
    ],
  },
  {
    number: 39,
    title: "Decode Run-Length Encoding",
    difficulty: "medium",
    tags: ["strings", "implementation"],
    constraints:
      "1 ≤ T ≤ 100\n1 ≤ |S| ≤ 100\nFormat: letter followed by count (e.g. a3b2)",
    description: `Given T encoded strings in run-length format (letter followed by count), decode each.

Input:
First line contains T.
Each of the next T lines contains an encoded string.

Output:
Print the decoded string for each test case.`,
    sampleTestCases: [
      {
        input: "2\na3b2c1\nx5y1",
        output: "aaabbc\nxxxxxy",
        explanation: "a3 means 'aaa', b2 means 'bb', etc.",
      },
    ],
    hiddenTestCases: [
      { input: "1\na1", output: "a" },
      { input: "1\nz9", output: "zzzzzzzzz" },
      { input: "1\na2b3c4", output: "aabbbcccc" },
    ],
  },
  {
    number: 40,
    title: "Number of Islands",
    difficulty: "medium",
    tags: ["graphs", "BFS/DFS"],
    constraints:
      "1 ≤ T ≤ 5\n1 ≤ N, M ≤ 300\nGrid contains only '0' (water) and '1' (land)",
    description: `Given T binary grids, count the number of islands. An island is a group of connected '1's (horizontally or vertically).

Input:
First line contains T.
For each test case:
- First line contains N and M.
- Next N lines contain a string of M characters ('0' or '1').

Output:
Print the number of islands for each test case.`,
    sampleTestCases: [
      {
        input: "1\n4 5\n11110\n11010\n11000\n00000",
        output: "1",
        explanation: "All connected 1s form one island",
      },
    ],
    hiddenTestCases: [
      {
        input: "1\n4 5\n11000\n11000\n00100\n00011",
        output: "3",
      },
      {
        input: "1\n1 1\n1",
        output: "1",
      },
      {
        input: "1\n2 2\n00\n00",
        output: "0",
      },
    ],
  },

  {
    number: 41,
    title: "Longest Palindromic Substring",
    difficulty: "hard",
    tags: ["strings", "dynamic programming"],
    constraints:
      "1 ≤ T ≤ 10\n1 ≤ |S| ≤ 1000\nS contains only lowercase English letters",
    description: `Given T strings, find the longest palindromic substring in each. If multiple have the same length, print the lexicographically smallest.

Input:
First line contains T.
Each of the next T lines contains a string S.

Output:
Print the longest palindromic substring for each test case.`,
    sampleTestCases: [
      {
        input: "2\nbabad\ncbbd",
        output: "aba\nbb",
        explanation: "babad → aba or bab (aba is lex smaller); cbbd → bb",
      },
    ],
    hiddenTestCases: [
      { input: "1\na", output: "a" },
      { input: "1\nracecar", output: "racecar" },
      { input: "1\nabcba", output: "abcba" },
      { input: "1\naacabdkacaa", output: "aca" },
    ],
  },
  {
    number: 42,
    title: "0/1 Knapsack",
    difficulty: "hard",
    tags: ["dynamic programming"],
    constraints:
      "1 ≤ T ≤ 10\n1 ≤ N ≤ 1000\n1 ≤ W ≤ 1000\n1 ≤ weight[i], value[i] ≤ 1000",
    description: `Given T test cases, each with N items (each with weight and value) and a knapsack of capacity W, find the maximum total value you can carry without exceeding W.

Input:
First line contains T.
For each test case:
- First line contains N and W.
- Each of the next N lines contains weight[i] and value[i].

Output:
Print the maximum value for each test case.`,
    sampleTestCases: [
      {
        input: "1\n4 8\n2 3\n3 4\n4 5\n5 6",
        output: "10",
        explanation: "Items with weight 3 (val 4) + weight 5 (val 6) = 10",
      },
    ],
    hiddenTestCases: [
      { input: "1\n3 50\n10 60\n20 100\n30 120", output: "220" },
      { input: "1\n1 1\n2 10", output: "0" },
      { input: "1\n2 10\n5 10\n5 10", output: "20" },
    ],
  },
  {
    number: 43,
    title: "Edit Distance",
    difficulty: "hard",
    tags: ["strings", "dynamic programming"],
    constraints:
      "1 ≤ T ≤ 10\n0 ≤ |S|, |P| ≤ 500\nStrings contain only lowercase letters",
    description: `Given T pairs of strings, find the minimum number of operations (insert, delete, replace) to convert S to P.

Input:
First line contains T.
Each of the next T lines contains two strings S and P.

Output:
Print the edit distance for each test case.`,
    sampleTestCases: [
      {
        input: "2\nhorse ros\nintention execution",
        output: "3\n5",
        explanation: "horse→ros requires 3 ops; intention→execution requires 5",
      },
    ],
    hiddenTestCases: [
      { input: "1\nabc abc", output: "0" },
      { input: "1\na b", output: "1" },
      { input: "1\n \nabc", output: "3" },
    ],
  },
  {
    number: 44,
    title: "Trapping Rain Water",
    difficulty: "hard",
    tags: ["arrays", "two pointers"],
    constraints: "1 ≤ T ≤ 10\n1 ≤ N ≤ 3×10^4\n0 ≤ height[i] ≤ 10^5",
    description: `Given T elevation maps (arrays of non-negative integers), compute how much water can be trapped after raining.

Input:
First line contains T.
For each test case:
- First line contains N.
- Second line contains N non-negative integers representing heights.

Output:
Print total trapped water units for each test case.`,
    sampleTestCases: [
      {
        input: "1\n12\n0 1 0 2 1 0 1 3 2 1 2 1",
        output: "6",
        explanation: "6 units of water are trapped",
      },
    ],
    hiddenTestCases: [
      { input: "1\n6\n4 2 0 3 2 5", output: "9" },
      { input: "1\n3\n1 0 1", output: "1" },
      { input: "1\n4\n3 0 0 2", output: "4" },
    ],
  },
  {
    number: 45,
    title: "Largest Rectangle in Histogram",
    difficulty: "hard",
    tags: ["arrays", "stack"],
    constraints: "1 ≤ T ≤ 10\n1 ≤ N ≤ 10^5\n0 ≤ heights[i] ≤ 10^4",
    description: `Given T histograms, find the area of the largest rectangle that can be formed.

Input:
First line contains T.
For each test case:
- First line contains N.
- Second line contains N non-negative integers (bar heights).

Output:
Print the maximum rectangular area for each test case.`,
    sampleTestCases: [
      {
        input: "1\n6\n2 1 5 6 2 3",
        output: "10",
        explanation: "Largest rectangle uses bars of height 5 and 6, area = 10",
      },
    ],
    hiddenTestCases: [
      { input: "1\n2\n2 4", output: "4" },
      { input: "1\n5\n1 1 1 1 1", output: "5" },
      { input: "1\n3\n6 2 5", output: "6" },
    ],
  },
  {
    number: 46,
    title: "Word Break",
    difficulty: "hard",
    tags: ["strings", "dynamic programming"],
    constraints:
      "1 ≤ T ≤ 10\n1 ≤ |S| ≤ 300\n1 ≤ dictionary size ≤ 1000\n1 ≤ |word| ≤ 20",
    description: `Given T test cases, each with a string S and a dictionary of words, determine if S can be segmented into space-separated dictionary words.

Input:
First line contains T.
For each test case:
- First line contains the string S.
- Second line contains K (dictionary size).
- Next K lines each contain a dictionary word.

Output:
Print "YES" if S can be broken, "NO" otherwise.`,
    sampleTestCases: [
      {
        input: "1\nleetcode\n2\nleet\ncode",
        output: "YES",
        explanation: "leetcode = leet + code",
      },
    ],
    hiddenTestCases: [
      { input: "1\napplepenapple\n3\napple\npen\napple", output: "YES" },
      { input: "1\ncatsandog\n5\ncats\ndog\nsand\nand\ncat", output: "NO" },
      { input: "1\na\n1\na", output: "YES" },
    ],
  },
  {
    number: 47,
    title: "Maximum Profit Stock",
    difficulty: "hard",
    tags: ["arrays", "dynamic programming"],
    constraints:
      "1 ≤ T ≤ 10\n1 ≤ N ≤ 10^5\n0 ≤ price[i] ≤ 10^4\nAt most 2 transactions allowed",
    description: `Given T arrays of stock prices, find the maximum profit using at most 2 transactions (buy then sell, then optionally buy and sell again). You cannot hold more than one stock at a time.

Input:
First line contains T.
For each test case:
- First line contains N.
- Second line contains N prices.

Output:
Print maximum profit for each test case.`,
    sampleTestCases: [
      {
        input: "1\n6\n3 3 5 0 0 3",
        output: "3",
        explanation: "Buy on day 4, sell on day 6: profit = 3",
      },
    ],
    hiddenTestCases: [
      { input: "1\n5\n1 2 3 4 5", output: "4" },
      { input: "1\n5\n7 6 4 3 1", output: "0" },
      { input: "1\n6\n1 2 4 2 5 7", output: "6" },
    ],
  },
  {
    number: 48,
    title: "Shortest Path in Grid",
    difficulty: "hard",
    tags: ["graphs", "BFS"],
    constraints:
      "1 ≤ T ≤ 5\n1 ≤ N, M ≤ 1000\nGrid contains 0 (open) or 1 (blocked)\nStart is (1,1), end is (N,M)",
    description: `Given T binary grids, find the shortest path from top-left (1,1) to bottom-right (N,M) moving only up/down/left/right through cells with value 0. Print path length (number of cells). If unreachable, print -1.

Input:
First line contains T.
For each test case:
- First line contains N and M.
- Next N lines contain M space-separated values (0 or 1).

Output:
Print shortest path length or -1.`,
    sampleTestCases: [
      {
        input: "1\n3 3\n0 0 0\n1 1 0\n1 1 0",
        output: "5",
        explanation: "Path: (1,1)→(1,2)→(1,3)→(2,3)→(3,3) = 5 cells",
      },
    ],
    hiddenTestCases: [
      { input: "1\n2 2\n0 0\n0 0", output: "3" },
      { input: "1\n2 2\n0 1\n1 0", output: "-1" },
      { input: "1\n1 1\n0", output: "1" },
    ],
  },
  {
    number: 49,
    title: "Distinct Subsequences",
    difficulty: "hard",
    tags: ["strings", "dynamic programming"],
    constraints: "1 ≤ T ≤ 10\n1 ≤ |S| ≤ 1000\n1 ≤ |P| ≤ 100\n|P| ≤ |S|",
    description: `Given T pairs (S, P), count the number of distinct subsequences of S that equal P.

Input:
First line contains T.
Each of the next T lines contains two strings S and P.

Output:
Print the count for each test case.`,
    sampleTestCases: [
      {
        input: "2\nrabbbit rabbit\nbabgbag bag",
        output: "3\n5",
        explanation:
          "rabbbit has 3 ways to form rabbit; babgbag has 5 ways to form bag",
      },
    ],
    hiddenTestCases: [
      { input: "1\naaa a", output: "3" },
      { input: "1\nabc abc", output: "1" },
      { input: "1\nabc d", output: "0" },
    ],
  },
  {
    number: 50,
    title: "Regular Expression Matching",
    difficulty: "hard",
    tags: ["strings", "dynamic programming"],
    constraints:
      "1 ≤ T ≤ 10\n0 ≤ |S| ≤ 20\n0 ≤ |P| ≤ 30\nS contains lowercase letters\nP contains lowercase letters, '.', and '*'",
    description: `Implement regex matching with '.' matching any single character and '*' matching zero or more of the preceding element.

Input:
First line contains T.
Each of the next T lines contains string S and pattern P.

Output:
Print "YES" if S matches P entirely, "NO" otherwise.`,
    sampleTestCases: [
      {
        input: "3\naa a\naa a*\nab .*",
        output: "NO\nYES\nYES",
        explanation: "a* means zero or more 'a'; .* means any sequence",
      },
    ],
    hiddenTestCases: [
      { input: "1\naab c*a*b", output: "YES" },
      { input: "1\nmississippi mis*is*p*.", output: "NO" },
      { input: "1\n a", output: "NO" },
    ],
  },
];

module.exports = problems;
