import { REST_API_KEY, REDIRECT_URI } from '../../utils/OAuth';
import { getUser, isTokenExpired } from '../../utils/userAuth';
import { useRedirectPage } from '../../hooks/useRedirectPage';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styled from 'styled-components';

import { fishCartState } from '../../atoms/fishCartData';
import { useRecoilValue } from 'recoil';
import ButtonText from '../../components/member/elements/ButtonText';

function Login() {
  const [setPage] = useRedirectPage();
  const user = getUser();
  const navigate = useNavigate();

  const fishCart = useRecoilValue(fishCartState);
  console.log(fishCart);

  /** 랜딩 페이지에서 토큰 확인 후 리디렉션합니다. */
  const redirectHandler = () => {
    if (!user) return;

    const token = user?.token;
    if (!token) return;

    const isExpired = isTokenExpired(token);
    if (isExpired) return localStorage.removeItem('user');

    navigate(`/${user?.uuid}`);
  };

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const onClickKakaoLoginButton = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  useEffect(() => {
    redirectHandler();
  }, [redirectHandler]);

  return (
    <LoginWrap>
      <div className="contents_area">
        <IntroTitle>
          냥냥편지
          <img src="/assets/images/logos/main_title_border.png" alt="냥냥편지 로고" />
        </IntroTitle>
        <div className="imageWrap">
          <img
            className="catTruck"
            src="/assets/images/member/catTruck/cat_truck_3.png"
            alt="Cat Truck"
          />
        </div>

        <div className="button_container">
          <KakaoLogin onClick={onClickKakaoLoginButton}>
            <KakaoLoginImage
              src="/assets/images/logos/kakao_login_large_wide.png"
              alt="카카오 로그인 버튼"
            />
          </KakaoLogin>

          <ButtonText goTo="/nyangle" text="사장에게 붕어빵 보내기" type="text" />
        </div>
      </div>
    </LoginWrap>
  );
}

export default Login;

const LoginWrap = styled.div`
  height: 100%;

  background: linear-gradient(to bottom, #e3edf2 68%, #000 68%, #000 68.3%, #faeac7 68.3%);

  .contents_area {
    height: 100%;
    max-width: 450px;
    margin: 0 auto;
    padding: 0 40px;
    position: relative;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
  }

  .button_container {
    width: 100%;
    margin: 5% 0;
  }

  .imageWrap {
    width: 100%;
    height: 47%;
    position: relative;
    display: flex;
    justify-content: center;
  }

  .catTruck {
    height: 100%;
    max-width: 100%;
    object-fit: contain;
  }
`;

const IntroTitle = styled.h1`
  margin-top: 15%;
  margin-bottom: 18%;

  font-family: 'EF_jejudoldam';
  font-size: 0px;
  text-align: center;
  text-indent: -9999px;

  color: #ed9a00;
  text-shadow: -2px 0 #000, 0 2px #000, 2px 0 #000, 0 -2px #000;

  img {
    display: block;
    width: 70%;
    margin: 0 auto;

    @media (max-width: 500px) {
      width: 90%;
    }

    animation: up 0.5s 0.2s forwards;
    opacity: 0;
  }

  @keyframes up {
    0% {
      transform: translateY(10px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const KakaoLogin = styled.button`
  width: 100%;
  height: 55px;
  border-radius: 10px;
  overflow: hidden;
  padding: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  background-color: #fee500;
  position: relative;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px) scale(1.01);
    box-shadow: 0px 2px 4px rgba(55, 55, 55, 0.1);
  }

  @media (max-width: 280px) {
    background-color: transparent;
  }
`;

const KakaoLoginImage = styled.img`
  width: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
