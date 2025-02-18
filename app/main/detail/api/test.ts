'use server'

const cheerio = require('cheerio')
const axios = require('axios')

export async function getInfoFromUrl(url : string, artist_id : string) {
  // url = 'https://www.youtube.com/watch?v=Y2E71oe0aSM';

  try {
    const videoId = url; //.split('v=')[1]
    artist_id = '@DanAndShay';

    // 2. 썸네일 URL 생성
    const link = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    
    const { data } = await axios.get(`https://www.youtube.com/${artist_id}`);

    // cheerio로 HTML 파싱
    const $ = cheerio.load(data);

    // 프로필 이미지 URL 찾기
    const profileImageUrl = $('link[rel="image_src"]').attr('href');

    console.log('Profile Image URL:', profileImageUrl);

    return {
      link : link,
      profile : profileImageUrl
    }

  } catch (error : any) {
    console.log('error' + error.message)
  }
}