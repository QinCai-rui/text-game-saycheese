/*
Originally made by Devarsh(@webdev03)
Revised by @QinCai-rui (aka myself)

This program is licensed under the CC0 license. 
See https://github.com/webdev03/quick-maths-saycheese/blob/main/LICENSE for more info
*/


import { toFile } from "qrcode";
import { minify } from "html-minifier-terser";
import { readFileSync } from "node:fs";

const originalHTML = await minify(readFileSync("index.html").toString(), {
  minifyJS: {compress: {
    drop_console: false,
  },
  mangle: true,
  },
  minifyCSS: true,
  html5: true,
  removeComments: true,
  collapseWhitespace: true,
});

console.log(originalHTML + "\n")

async function compress(str: string) {
  const compressedData = btoa(
    String.fromCharCode(...new Uint8Array(Bun.deflateSync(str))),
  );
  return await minify(
    `<script>
      let bs = atob('${compressedData}');
      let q = new Uint8Array(bs.length);
      for (let i = 0; i < bs.length; i++) q[i] = bs.charCodeAt(i);
      (async () => {
        document.write(
          await (new Response(new ReadableStream({
            start(c) {
              c.enqueue(q);
              c.close(
              );
            }
          }).pipeThrough(new DecompressionStream('deflate-raw'))
          ).text())
        )
      })();
    </script>`,
    {
      minifyJS: true,
      removeComments: true,
      collapseWhitespace: true,
    },
  );
}

const compressedHTML = await compress(originalHTML);

const properHTML =
  compressedHTML.length < originalHTML.length ? compressedHTML : originalHTML;

console.log(properHTML, properHTML.length);

toFile("qr.png", `data:text/html,${properHTML}`, {
  type: "png",
  errorCorrectionLevel: "L"
});
