import { writeFileSync } from "fs";

const base = "https://dohapark81.github.io/k-kingdom";
const today = new Date().toISOString().split("T")[0];

const dynasties = [
  { id: "goryeo", kings: ["taejo-goryeo","hyejong","jeongjong-goryeo","gwangjong","gyeongjong-goryeo","seongjong-goryeo","mokjong","hyeonjong-goryeo","deokjong","jeongjong2-goryeo","munjong-goryeo","sunjong-goryeo","seonjong-goryeo","heonjong-goryeo","sukjong-goryeo","yejong-goryeo","injong-goryeo","uijong","myeongjong","sinjong","huijong","gangjong","gojong-goryeo","wonjong","chungnyeol","chungseon","chungsuk","chunghye","chungmok","chungjeong","gongmin","u-wang","chang-wang","gongyang"] },
  { id: "joseon", kings: ["taejo-joseon","jeongjong","taejong","sejong","munjong","danjong","sejo","yejong","seongjong-joseon","yeonsan","jungjong","injong","myeongjong-joseon","seonjo","gwanghae","injo","hyojong","hyeonjong","sukjong","gyeongjong","yeongjo","jeongjo","sunjo","heonjong","cheoljong","gojong","sunjong"] },
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

const add = (loc, priority) => {
  xml += `  <url><loc>${loc}</loc><lastmod>${today}</lastmod><priority>${priority}</priority></url>\n`;
};

add(base, "1.0");
add(`${base}/compare`, "0.7");

for (const d of dynasties) {
  add(`${base}/timeline/${d.id}`, "0.9");
  for (const k of d.kings) {
    add(`${base}/timeline/${d.id}/${k}`, "0.8");
  }
}

xml += `</urlset>\n`;

writeFileSync("public/sitemap.xml", xml);
console.log(`Sitemap generated: ${xml.split("<url>").length - 1} URLs`);
