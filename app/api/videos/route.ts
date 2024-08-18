'use server'

import { JSDOM } from 'jsdom';

export default async function handler(req : any, res : any) {
  const { url } = req.query;

  try {
    // HTML 가져오기
    const response = await fetch(url);
    const html = await response.text();

    // DOM 파싱
    const dom = new JSDOM(html);
    const imgElement = dom.window.document.querySelector('img');

    //썸네일
    // <link as="image" rel="preload" href="https://i.ytimg.com/vi/cJlypCqudBA/hqdefault.jpg" fetchpriority="high">

    //제목
    // <yt-formatted-string force-default-style="" class="style-scope ytd-watch-metadata">반에서 일진이었던 애들 인생2 l 〈탱커〉 EP.1</yt-formatted-string>

    // 제작자
    // <a class="yt-simple-endpoint style-scope yt-formatted-string" spellcheck="false" href="/@jinyongjin_official">진용진</a>

    //


    // img 태그의 src 추출
    const src = imgElement?.getAttribute('src');

    if (src) {
      res.status(200).json({ src });
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (error : any) {
    res.status(500).json({ message: 'Error fetching image', error: error.message });
  }
}