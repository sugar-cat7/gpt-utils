const axios = require("axios");
const cheerio = require("cheerio");
const TurndownService = require("turndown");
const MarkdownIt = require("markdown-it");
const { mathjax } = require("mathjax-full/js/mathjax.js");
const { TeX } = require("mathjax-full/js/input/tex.js");
const { CHTML } = require("mathjax-full/js/output/chtml.js");
const { liteAdaptor } = require("mathjax-full/js/adaptors/liteAdaptor.js");
const { RegisterHTMLHandler } = require("mathjax-full/js/handlers/html.js");
const { AllPackages } = require("mathjax-full/js/input/tex/AllPackages.js");
const { convert: htmlToText } = require("html-to-text");

if (process.argv.length < 3) {
  console.error("URLが指定されていません。");
  process.exit(1);
}

const url = process.argv[2];
axios
  .get(url)
  .then((response) => {
    const $ = cheerio.load(response.data);
    const $main = $("main");
    const $root = $main.length > 0 ? $main : $("body");

    $root.find("header, footer, nav, script").remove();

    // HTML を Markdown に変換
    const turndownService = new TurndownService();
    const markdown = turndownService.turndown($root.html());

    // Markdown を HTML に変換
    const md = new MarkdownIt();
    const html = md.render(markdown);

    // LaTeX の処理
    const input = new TeX({ packages: AllPackages });
    const output = new CHTML();
    const adaptor = liteAdaptor();
    RegisterHTMLHandler(adaptor);

    const convertLatex = (latex) => {
      const document = mathjax.document("", {
        InputJax: input,
        OutputJax: output,
      });
      document.convert(latex, { display: false });
      return adaptor.outerHTML(adaptor.root(document.document));
    };

    const $latexProcessedHtml = cheerio.load(html);

    // インライン LaTeX 要素を処理
    $latexProcessedHtml("span.math-tex").each((_, elem) => {
      const latex = $latexProcessedHtml(elem).text();
      const htmlOutput = convertLatex(latex);
      $latexProcessedHtml(elem).replaceWith(htmlOutput);
    });

    // ブロック要素の LaTeX を処理
    $latexProcessedHtml("div.math-tex").each((_, elem) => {
      const latex = $latexProcessedHtml(elem).text();
      const htmlOutput = convertLatex(latex);
      $latexProcessedHtml(elem).replaceWith(htmlOutput);
    });

    // HTML をテキストに変換
    const textForChatGPT = htmlToText($latexProcessedHtml.html(), {
      wordwrap: null,
      ignoreHref: true,
      ignoreImage: true,
      singleNewLineParagraphs: true,
      preserveNewLines: true,
    });

    console.log(textForChatGPT);
  })
  .catch((error) => {
    console.error("スクレイピングに失敗しました: ", error);
  });
