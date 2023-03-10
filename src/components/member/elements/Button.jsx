import styled from 'styled-components';
import ButtonText from './ButtonText';

const Button = ({ text, goTo, myUid, fishData }) => {
  return (
    <StButton text={text} goTo={goTo}>
      <img src="/assets/images/member/button.png" alt={text + ' 버튼'} />

      {goTo === `/list/${myUid}` && fishData?.unreadCount > 0 && (
        <UnReadText>
          <img src="/assets/images/member/pink_jelly.png" alt="냥젤리" />
          <span>{fishData && fishData?.unreadCount}</span>
        </UnReadText>
      )}
    </StButton>
  );
};

export default Button;

const StButton = styled(ButtonText)``;

const UnReadText = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-60%, -60%) !important;
  width: 33px;
  height: 34px;
  text-align: center;
  z-index: 10;

  img {
    position: relative;
    top: auto;
    left: auto;
    transform: none;
    display: inline-block;
    width: 100%;
  }

  span {
    padding-top: 20px;
    padding-left: 2.5px;
    color: #a54e09;
    font-size: 16px;
  }

  @media (max-width: 280px) {
    width: 28px;
    height: 29px;
    transform: translate(-30%, -60%) !important;

    span {
      padding-top: 18px;
      padding-left: 2.5px;
      color: #a54e09;
      font-size: 14px;
    }
  }
`;
