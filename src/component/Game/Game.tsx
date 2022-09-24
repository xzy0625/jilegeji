import { useEffect, useMemo, useState } from "react";
import { useCardValue, calcuCover, useMap, findItemIndex } from "./useGame";
import { Badge, message } from "antd";
import './index.css'

const SVG_LIST = {
  SAVE: (<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9952" width="40" height="40"><path d="M695.15 479.59c-132.66 0-240.2 107.54-240.2 240.2S562.49 960 695.15 960A238.47 238.47 0 0 0 868 888a234.15 234.15 0 0 0 67.11-169.64c-0.16-132-107.31-238.92-239.33-238.76zM698 899.22A178.28 178.28 0 0 1 695.15 543a181.44 181.44 0 0 1 182.6 176.55 177.7 177.7 0 0 1-175.66 179.67q-2.03 0.02-4.09 0z" fill="#f4ea2a" p-id="9953"></path><path d="M753 605.45l-69.41 66.82a28.8 28.8 0 0 0-19.3 28.8v135.65a28.8 28.8 0 0 0 30.82 30.82 31.68 31.68 0 0 0 31.1-30.82v-120.1l67.11-67.39a28.8 28.8 0 0 0 0-43.49 27.07 27.07 0 0 0-40.32-0.29z" fill="#f4ea2a" p-id="9954"></path><path d="M483.18 883.09H218.79A135.36 135.36 0 0 1 84 748V198.79A135.08 135.08 0 0 1 218.79 64h538.28a135.08 135.08 0 0 1 134.79 134.79v339l-22.75-22.46a254.6 254.6 0 0 0-39.75-32.54l-5.76-4V198.5a66.53 66.53 0 0 0-51-64.23V311.4a92.45 92.45 0 0 1-92.45 92.45H298.57a92.45 92.45 0 0 1-92.45-92.45V133.7a66.82 66.82 0 0 0-53.57 65.09V748a66.53 66.53 0 0 0 66.53 66.53h220.61l3.46 7.49a294.34 294.34 0 0 0 24.48 39.75zM274.66 132.55V311.4a23.9 23.9 0 0 0 23.9 23.9h381a24.48 24.48 0 0 0 24.19-23.9V132.55z" fill="#f4ea2a" p-id="9955"></path><path d="M593.2 306.21a40.32 40.32 0 0 1-40.32-40.32v-60.77a40.32 40.32 0 1 1 80.64 0v60.48a40.32 40.32 0 0 1-40 40.61z" fill="#f4ea2a" p-id="9956"></path></svg>),
  RETRY: (<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1739" width="40" height="40"><path d="M921.6 585.728c0 226.304-184.32 409.6-409.6 409.6s-409.6-182.272-409.6-409.6c0-78.848 21.504-152.576 62.464-215.04l133.12 76.8c-25.6 39.936-39.936 87.04-39.936 138.24 0 142.336 114.688 254.976 254.976 254.976 142.336 0 257.024-114.688 257.024-254.976 0-118.784-79.872-219.136-189.44-247.808v131.072L196.608 248.832 577.536 28.672v151.552C772.096 214.016 921.6 381.952 921.6 585.728z" fill="#f4ea2a" p-id="1740"></path></svg>),
  SHUFFLE: (<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4374" width="40" height="40"><path d="M6.070857 731.648c0 27.428571 20.150857 46.281143 50.578286 46.281143h97.718857c73.691429 0 118.272-21.430857 171.428571-83.565714l96.420572-112.292572 96 112.274286c53.138286 62.171429 97.28 84.004571 172.288 84.004571h78.427428v95.140572c0 23.149714 14.573714 37.723429 38.582858 37.723428 10.276571 0 20.992-3.84 28.708571-10.715428l161.993143-133.705143c19.712-15.872 19.291429-41.581714 0-57.435429l-162.011429-134.582857a44.105143 44.105143 0 0 0-28.708571-10.697143c-23.990857 0-38.582857 14.573714-38.582857 37.705143v83.145143H692.662857c-44.141714 0-71.570286-14.134857-106.715428-54.857143l-102.418286-119.570286 102.418286-119.149714c35.145143-41.142857 62.573714-55.277714 106.715428-55.277714h76.288v86.125714c0 23.168 14.573714 37.723429 38.582857 37.723429 10.276571 0 20.992-3.84 28.708572-10.715429l161.993143-133.705143c19.712-15.853714 19.291429-41.142857 0-57.417143l-162.011429-134.582857a44.105143 44.105143 0 0 0-28.708571-10.715428c-23.990857 0-38.582857 14.573714-38.582858 37.705143v92.580571h-78.409142c-75.008 0-119.149714 21.851429-172.288 84.004571l-96 112.274286-96.420572-112.274286c-53.156571-62.153143-97.718857-84.004571-171.446857-84.004571H56.649143c-30.427429 0-50.578286 18.852571-50.578286 46.72 0 27.428571 20.571429 46.701714 50.578286 46.701714h99.419428c41.581714 0 67.712 14.153143 102.436572 54.857143l102.418286 119.149714-102.418286 119.588572c-35.145143 40.704-61.293714 54.857143-102.436572 54.857143H56.649143c-29.988571 0-50.578286 19.273143-50.578286 46.701714z" p-id="4375" fill="#f4ea2a"></path></svg>),
}

interface IProps {
  config: IConfig;
  changeWin: (win: boolean) => void;
  [props: string]: any;
}
const Gaming = ({config, changeWin}: IProps) => {
  const { x, y, baseWidth, baseHeight, retryNumber, shuffleNumber, saveNumber } = config;
  // 展示区域宽度
  const width = useMemo(() => ((x - 1) * 2 + 2) * baseWidth, [config]);
  // 展示区域高度
  const height = useMemo(() => ((y - 1) * 2 + 1) * baseHeight, [config]);
  // 初始偏移量
  const leftOffset = useMemo(() => (width - (x + 2) * baseWidth * 2) / 2, [config]);
  // 总的方块数
  const [totalCard, setTotalCard] = useState(0);
  // 已经完成的方块数
  const [doneCard, setDoneCard] = useState(0);
  // 能否撤回
  const [canWithdraw, setCanWithdraw] = useState(true);
  // 地图
  const [cardMap, setCardMap] = useState([]);
  // 卡片列表
  const [cardItemList, setCardItemList] = useState([] as ICardItem[]);
  // 已选择的列表
  const [selectList, setSelectList] = useState([] as ICardItem[]);
  // 消除完的列表
  const [clearList, setClearList] = useState([] as ICardItem[]);
  // 保存的卡片
  const [saveList, setSaveList] = useState([] as ICardItem[]);
  // 历史操作过的卡片
  const [historyList, setHistoryList] = useState([] as ICardItem[]);
  // 能使用的次数
  const [retryCount, setRetryCount] = useState(retryNumber);
  const [saveCount, setSaveCount] = useState(saveNumber);
  const [shuffleCount, setShuffleCount] = useState(shuffleNumber);


  useEffect(() => {
    // 初始化游戏
    initGame();
  }, [])

  const initGame = () => {
    // 获取初始化的地图和卡片列表
    const [initMap, initCardItemList] = useMap(config);
    // 填充物品
    const fillValueItemList = useCardValue(config, initCardItemList);
    setTotalCard(fillValueItemList.length);
    // 返回计算层级之后的东西
    setCardItemList(calcuCover(config, fillValueItemList));
  }

  // 格式化样式
  const formatItemList = (cardList: ICardItem[]) => {
    return cardList.map((item, index) => {
      return {
        ...item,
        style: {
          ...item.style,
          top: 0,
          left: leftOffset + (index + 1) * baseWidth * 2 + "px",
        }
      }
    })
  }

  // 判断是否有三个一样的
  const handleSelectItem = (selectList: ICardItem[], item: ICardItem) => {
    let index = -1;
    let count = 1;
    let tempClearList: ICardItem[] = [];
    // 自己实现一个findLastIndex的方法，es6没有
    for (let i = selectList.length - 1; i >= 0; i -= 1) {
      if (selectList[i].content === item.content) {
        index = index === -1 ? i : index;
        count += 1;
      }
    }
    // 有三个一样的了
    if (count === 3) {
      // 更新已经消除的和已经选择的
      tempClearList = [...selectList.filter(selectItem => selectItem.content === item.content), item];
      selectList = selectList.filter(selectItem => selectItem.content !== item.content);
    } else {
      if (index > -1) {
        selectList.splice(index, 0, item);
      } else {
        selectList.push(item);
      }
    }
    // 更新状态
    tempClearList = tempClearList.map((item) => {
      return {
        ...item,
        style: {
          ...item.style,
          top: '120%',
          left: leftOffset - 60 + "px",
        }
      }
    })

    setClearList([...clearList, ...tempClearList]);
    setSelectList(formatItemList(selectList));

    // 已完成的卡片
    setDoneCard([...clearList, ...tempClearList].length);

    // 判断输赢
    if (selectList.length >= 7) {
      changeWin(false);
      return;
    }
    if ([...clearList, ...tempClearList].length === totalCard) {
      changeWin(true);
    }
  }
  // 点击卡片
  const onCardClick = (item: ICardItem, index: number) => {
    // 设置历史方块
    setHistoryList([...historyList, item]);
    // 如果是点击的暂存
    if (findItemIndex(item, saveList) > -1) {
      saveList.splice(index, 1);
      setSaveList(formatItemList(saveList));
    }
    // 显示不可见
    cardItemList[index].show = false;
    handleSelectItem(selectList, item);

    // 重新计算覆盖率
    setCardItemList(calcuCover(config, cardItemList));
  }

  // 点击使用暂存道具
  const saveCard = () => {
    if (saveList.length !== 0 || selectList.length === 0) {
      message.info('您现在不能使用暂存道具')
      return;
    }
    if (!saveCount) {
      message.warn('您的暂存次数已用完')
      return;
    }
    setSaveCount(saveCount - 1)

    setSaveList(formatItemList(selectList.slice(0, 3)));
    setSelectList(formatItemList(selectList.slice(3)));
  }

  // 随机打乱牌
  const shuffle = () => {
    if (!shuffleCount) {
      message.warn('您的洗牌次数已用完');
      return;
    }
    const length = cardItemList.length;
    cardItemList.forEach((item, index) => {
      const randNum = Math.floor(length * Math.random());
      const newItem = cardItemList[randNum];
      const temp = item;
      cardItemList[index] = {
        ...item,
        x: newItem.x,
        y: newItem.y,
        z: newItem.z,
        style: {
          ...item.style,
          left: newItem.style.left,
          top: newItem.style.top,
        }
      }
      cardItemList[randNum] = {
        ...newItem,
        x: temp.x,
        y: temp.y,
        z: temp.z,
        style: {
          ...newItem.style,
          left: temp.style.left,
          top: temp.style.top,
        }
      }
    });

    cardItemList.sort((a: ICardItem, b: ICardItem) => a.z - b.z);
    setCardItemList([...calcuCover(config, cardItemList)]);
    setShuffleCount(shuffleCount - 1)
  }

  // 点击使用撤回道具
  const onClickWithDraw = () => {
    if (!historyList.length) {
      message.info('你暂时还没有任何操作');
      return;
    }
    if (!retryCount) {
      message.warn('您的撤回次数已用完');
      return;
    }
    while(historyList.length) {
      let withDrawItem = historyList.pop() as ICardItem;
      if (findItemIndex(withDrawItem, clearList) < 0) {
        let selectIndex = findItemIndex(withDrawItem, selectList);
        let saveIndex = findItemIndex(withDrawItem, saveList);
        let cardIndex = findItemIndex(withDrawItem, cardItemList)
        if (selectIndex > -1) {
          selectList.splice(selectIndex, 1);
        }
        if (saveIndex > -1) {
          saveList.splice(saveIndex, 1);
        }
        cardItemList[cardIndex] = {
          ...withDrawItem,
          show: true,
        }
        // 卡片类型
        setCardItemList([...cardItemList])
        setSaveList(formatItemList(saveList));
        setSelectList(formatItemList(selectList));
        setRetryCount(retryCount - 1);
        break;
      }
    }
    // 设置历史卡片
    setHistoryList([...historyList])
    // 重新计算覆盖率
    setCardItemList(calcuCover(config, cardItemList));
  }

  return (
    <div style={{ width, height }} className="card-wrap">
      <div className="tips">已消除卡片: {doneCard} / {totalCard}</div>
      {
        cardItemList.map((item, index) => 
          // 展示列表
          {
            return item.show 
          ?
            <div
              key={item.key}
              style={item.style}
              className={[item.cover && 'item-cover' , 'card-item'].filter(Boolean).join(' ')}
              onClick={() => onCardClick(item, index)}
            >
              { item.content }
            </div>
          : ''
          }
        )
      }
      <div className="save-list" style={{ width: 3 * baseWidth * 2, height: baseHeight * 2 }}>
        {
          saveList.map((item, index) =>
            // 暂存列表
            <div
              key={item.key}
              style={item.style}
              className='card-item'
              onClick={() => onCardClick(item, index)}
            >
              { item.content }
            </div>
          )
        }
      </div>
      <div className="select-list" style={{ width: 7 * baseWidth * 2, height: baseHeight * 2 }}>
        {
          selectList.map((item, index) =>
            // 已选列表
            <div
              key={item.key}
              style={item.style}
              className='card-item'
            >
              { item.content }
            </div>
          )
        }
      </div>
      <div className="tools">
        <Badge count={saveCount} showZero><div className="tools-item" onClick={saveCard}>{ SVG_LIST.SAVE }</div></Badge>
        <Badge count={retryCount} showZero><div className="tools-item" onClick={onClickWithDraw}>{ SVG_LIST.RETRY }</div></Badge>
        <Badge count={shuffleCount} showZero><div className="tools-item" onClick={shuffle}>{ SVG_LIST.SHUFFLE }</div></Badge>
      </div>
      {
        clearList.map((item) => 
          // 已选列表
          <div
            key={item.key}
            style={item.style}
            className='card-item'
          >
            { item.content }
          </div>
        )
      }
    </div>
  )
}

export default Gaming;