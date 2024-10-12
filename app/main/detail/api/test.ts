'use server'

const cheerio = require('cheerio')
const axios = require('axios')

export async function getTest(url : string) {
  url = 'https://www.youtube.com/watch?v=Y2E71oe0aSM';

  try {
    const videoId = url.split('v=')[1];
    

    // 2. 썸네일 URL 생성
    const link = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    
    const { data } = await axios.get('https://www.youtube.com/@DanAndShay');

    // cheerio로 HTML 파싱
    const $ = cheerio.load(data);

    // 프로필 이미지 URL 찾기
    const profileImageUrl = $('link[rel="image_src"]').attr('href');

    console.log('Profile Image URL:', profileImageUrl);

    return link

  } catch (error : any) {
    console.log(error.message)
  }
}