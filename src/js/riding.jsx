import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/gallery.css';

const user = JSON.parse(sessionStorage.getItem('user'));

const Riding = () => {
  const navigate = useNavigate();
  const [imageList, setImageList] = useState([]);

  useEffect(() => {

    // 이미지 fetch
    const fetchImages = async (userId) => {
      const apiUrl = `http://15.164.219.39:8079/find-image/by-kakaoId?kakaoId=${userId}`;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch image');
        let tmp = await response.json()
        // await JSON.parse(response);
        setImageList(tmp);
        console.log(imageList);

        // 데이터가 배열인지 확인
        if (Array.isArray(tmp)) {
          setImageList(tmp);
        } else {
          console.error('Fetched data is not an array:', tmp);
        }

        // return `https://greenboogiebucket.s3.ap-northeast-2.amazonaws.com/${imageUrl}`;

      } catch (error) {
        console.error('Error fetching image:', error);
        return null;
      }
    }

    fetchImages(user.userId);
  }, [user.userId]);

  return (
    <div className="container">
      {/* 메뉴 스크린 생성 */}
      <div className="menu-container">
        <div className="menu-screen">
          <h1 className="menu-title" style={{ fontFamily: 'IBM Plex Sans KR, sans-serif' }}>GreenBoogie</h1>
          <h2 className="menu-id" style={{ fontFamily: 'IBM Plex Sans KR, sans-serif' }}>{user.userName} 님</h2>
          <button className="menu-button" onClick={() => navigate('/locationMap')} style={{ fontFamily: 'IBM Plex Sans KR, sans-serif' }}>나가기</button>
        </div>
      </div>

      <div className='gallery'>

        {/* {imageList.map((image, index) => (
          <div className='gallery-item' key={index} >
            {image.yoloOrRide === "탑승" &&
              <img src={`https://greenboogiebucket.s3.ap-northeast-2.amazonaws.com/${image.imageUUID}`} alt={`Gallery image ${index + 1}`} />}
          </div>
        ))} */}


      </div>

      <table>
        <tr>
          <th>승차정보</th>
        </tr>

        {imageList.map((image, index) => {
          <tr>
            <td>  {image.yoloOrRide === "탑승" &&
              <img src={`https://greenboogiebucket.s3.ap-northeast-2.amazonaws.com/${image.imageUUID}`} alt={`Gallery image ${index + 1}`} />}</td>
          </tr>
        })}

      </table>
    </div>
  );
}
export default Riding;