import { dataList, readingDataList, modalState, idState } from '../../../atoms/fishBreadList';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { useCallback } from 'react';

const BREAD_DATA_ID = {
  Type: '팥/앙금',
  message: 'string',
  createdAt: '',
  senderNickname: 'nick1',
};

function DetailListItems({ currentIndex, baseUrl }) {
  const breadList = useRecoilValue(dataList);
  const [readingData, setReadingData] = useRecoilState(readingDataList);
  const [isOpened, setIsOpened] = useRecoilState(modalState);
  const setReadingId = useSetRecoilState(idState);

  const getBreadDetail = useCallback(async (id) => {
    console.log('fetching...');
    /*const { data, status } = await requestApi('get', `${baseUrl}/${id}`, {
      withCredentials: true,
      headers: {
        'X-NYANG-AUTH-TOKEN': '',
      },
    });*/
    const data = BREAD_DATA_ID,
      status = 200;
    if (status === 200) {
      setReadingData((state) => [
        ...state,
        {
          id,
          ...data,
        },
      ]);
    }
  }, []);

  const onClickBread = (id) => {
    if (isOpened) return;
    setIsOpened(true);
    setReadingId(id);
    const hasReadingData = readingData.find((e) => e.id === id);
    hasReadingData ?? getBreadDetail(id);
  };

  return (
    <ul>
      {breadList[currentIndex]?.map((e) => (
        <li
          key={e.id}
          onClick={() => onClickBread(e.id)}
        >{`Type:${e.Type} / Statue:${e.status} / Nickname:${e.senderNickname} Id:${e.id}`}</li>
      ))}
    </ul>
  );
}

export default DetailListItems;
