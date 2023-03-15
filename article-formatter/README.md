# Web Article Formatter

This script is a web article formatter that converts a webpage into a plain text format, which can be used for various applications such as input for a chatbot like OpenAI's GPT.

## Prerequisites

The following npm packages are required to run the script:

- axios
- cheerio
- turndown
- markdown-it
- mathjax-full
- html-to-text

## Usage

1. Install the required npm packages:

```bash
npm install axios cheerio turndown markdown-it mathjax-full html-to-text
```

2. Run the script with a URL as a command line argument:

```bash
node article-formatter.js <URL>
```

The script will then output the formatted text to the console.

## How it works

The script performs the following steps:

1. Fetch the HTML content of the provided URL.
2. Remove unnecessary elements like header, footer, nav, and script tags.
3. Convert the cleaned HTML to Markdown.
4. Convert the Markdown back to HTML.
5. Process inline and block LaTeX elements.
6. Convert the final HTML to plain text.

## Project Structure

```
.
├── Makefile
├── README.md
├── article-formatter.js
├── package-lock.json
└── package.json
```
