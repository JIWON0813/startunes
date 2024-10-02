'use server'

import axios from 'axios';

export async function getTest() {
  const url = 'https://www.youtube.com/watch?v=u8wu6fDGK44';

  try {
    // HTML 가져오기
    let html
    await axios.get(url,  {
      timeout: 60000,
      decompress: true,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive'
      }
    }).then((res) =>{
      html = res.data;
    });
    
    const cheerio = require('cheerio');

    const $ = cheerio.load(html);
    const link = $('link[rel="preload"][as="image"]').attr('href');
    console.log(link)
    // DOM 파싱
    
    return link
    //썸네일
    // <link as="image" rel="preload" href="https://i.ytimg.com/vi/cJlypCqudBA/hqdefault.jpg" fetchpriority="high">

    //제목
    // <yt-formatted-string force-default-style="" class="style-scope ytd-watch-metadata">반에서 일진이었던 애들 인생2 l 〈탱커〉 EP.1</yt-formatted-string>

    // 제작자
    // <a class="yt-simple-endpoint style-scope yt-formatted-string" spellcheck="false" href="/@jinyongjin_official">진용진</a>

  } catch (error : any) {
    console.log(error.message)
    // res.status(500).json({ message: 'Error fetching image', error: error.message });
  }
}