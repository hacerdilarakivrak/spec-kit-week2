import { validateQuote } from "../models/quote.js";

const rawQuotes = [
  {
    id: "q-01",
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    id: "q-02",
    text: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra",
  },
  {
    id: "q-03",
    text: "Make it work, make it right, make it fast.",
    author: "Kent Beck",
  },
  {
    id: "q-04",
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
  },
  {
    id: "q-05",
    text: "Premature optimization is the root of all evil.",
    author: "Donald Knuth",
  },
  {
    id: "q-06",
    text: "Quality is not an act, it is a habit.",
    author: "Aristotle",
  },
  {
    id: "q-07",
    text: "Before software can be reusable it first has to be usable.",
    author: "Ralph Johnson",
  },
  {
    id: "q-08",
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },
  {
    id: "q-09",
    text: "In programming, the hard part isn't solving problems, but deciding what problems to solve.",
    author: "Paul Graham",
  },
  {
    id: "q-10",
    text: "Code is like humor. When you have to explain it, it’s bad.",
    author: "Cory House",
  },
  {
    id: "q-11",
    text: "Experience is the name everyone gives to their mistakes.",
    author: "Oscar Wilde",
  },
  {
    id: "q-12",
    text: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds",
  },
];

// Validate all quotes at load time to ensure dataset integrity
export const BUILT_IN_QUOTES = Object.freeze(rawQuotes.map(validateQuote));
