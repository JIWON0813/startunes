'use server'

export async function getTest() {
  const url = 'https://www.youtube.com/watch?v=u8wu6fDGK44';

  const axios = require('axios');

  try {
    // // HTML 가져오기
    let html
    await axios.get(url).then((res : any) =>{
      html = res.data;
    });
    
    const cheerio = require('cheerio');

    const $ = cheerio.load(html);
    // const link = $('link[rel="preload"][as="image"]').attr('href');
    // console.log(link)
    // DOM 파싱

    //$('meta[name="title"]').attr('content') 제목
    const asd = $('link[rel="preload"][as="image"]').attr('href');
    console.log(asd)
    const videoId = url.split('v=')[1];
    
    // 2. 썸네일 URL 생성
    const link = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    
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