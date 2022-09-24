import { useMemo, useState } from 'react';
import CardItem from '../../config/CardItem';

// 获取地图
export const useMap = ({ x, y, z, cardRandom, baseHeight, baseWidth }: IConfig) => {
  const width = (x - 1) * 2;
  const height = (y - 1) * 2 + 1;
  let key = 0;
  
  // 初始化地图
  const cardMap = new Array(z).fill(0).map(
    item => new Array(height).fill(0).map(
      heightItem => new Array(width).fill(0),
    ),
  );
  const cardItemList = [];

  for (let k = 0; k < z; k += 1) {
    // 边界收缩
    const shrink = Math.floor((z - k) / 3);
    for (let i = shrink; i < height - shrink; i += 1) {
      // 保证生成的方块左右对称，有美感
      const mid = Math.ceil((width - shrink) / 2);
      for (let j = shrink; j <= mid; j += 1) {
        // 判断当前点是否可以生成方块
        let canPlaceItem = true;
        // 左边有卡片
        if (j > 0 && cardMap[k][i][j - 1]) {
          canPlaceItem = false;
        }
        // 上边有卡片
        if (i > 0 && cardMap[k][i - 1][j]) {
          canPlaceItem = false;
        }
        // 左上有卡片
        if (i > 0 && j > 0 && cardMap[k][i - 1][j - 1]) {
          canPlaceItem = false;
        }
        // 右上有卡片
        if (i > 0 && cardMap[k][i - 1][j + 1]) {
          canPlaceItem = false;
        }
        // 卡片密度
        if (Math.random() > cardRandom) {
          canPlaceItem = false;
        }
        if (canPlaceItem) {
          key += 1;
          const cardItem = new CardItem({x: i, y: j, z: k, key, baseWidth, baseHeight});
          // 地图中这个点已经有了卡片
          cardMap[k][i][j] = cardItem;
          cardItemList.push(cardItem);
          // 对称放置
          if (j < mid) {
            key += 1;
            const cardItem = new CardItem({x: width - i, y: j, z: k, key, baseWidth, baseHeight});
            cardMap[k][i][width - j] = cardItem;
            cardItemList.push(cardItem);
          }
        }
      }
    }
  }

  // 保证得出来的卡片是3的倍数，即有解
  const leftCardList = cardItemList.splice(0, key % 3);

  // 地图置为没有卡片
  for (const {x, y, z} of leftCardList) {
    cardMap[z][y][x] = 0;
  }

  return [cardMap, cardItemList] as [typeof cardMap, typeof cardItemList];
}

// 填充内容和颜色
export const useCardValue = ({ maxCardType }: IConfig, cardItemList: ICardItem[]) => {
  const colorStack = new Array(maxCardType);

  // 填充文字和颜色
  cardItemList.forEach((item: ICardItem) => {
    // 随机取一个图片和颜色值
    const value = Math.ceil(Math.random() * maxCardType);
    colorStack[value] = colorStack[value] ?  [...colorStack[value], item] : [item];
    // 有三个了就清空
    if (colorStack[value]?.length % 3 == 0) {
      colorStack[value].map((cardItem: ICardItem) => {
        cardItem.setValue(value);
      })
      colorStack[value] = null;
    }
  })

  // 取出未用完的item
  const leftItem  = colorStack.reduce((pre, cur) => [...pre, ...(cur ? cur : [])], []);
  for (let i = 0; i < leftItem.length; i += 3) {
    const value = Math.ceil(Math.random() * maxCardType);
    for (let j = i; j < i + 3; j += 1 ) {
      leftItem[j].setValue(value);
    }
  }

  return cardItemList;
}

// 计算覆盖状态
export const calcuCover = ({x, y}: IConfig, cardItemList: ICardItem[]): ICardItem[] => {
  const maxWidth = (x - 1) * 2;
  const maxHeight = (y - 1) * 2 + 1;

  // 初始化覆盖数组，默认全部没有覆盖
  const coverMap = new Array(maxHeight).fill(0).map(item => new Array(maxWidth).fill(false));

  // 从顶层往底层计算
  for (let i = cardItemList.length - 1; i >= 0; i -= 1) {
    const item = cardItemList[i];
    // 如果不展示就不进行后面的了
    if (!item.show) {
      continue;
    }
    const { x, y } = item;
    // 判断是否有覆盖
    if (coverMap[y][x]) {
      item.cover = true;
    } else if (coverMap[y][x + 1]) {
      item.cover = true;
    } else if (coverMap[y + 1][x]) {
      item.cover = true;
    } else if (coverMap[y + 1][x + 1]) {
      item.cover = true;
    } else {
      item.cover = false;
    }
    coverMap[y][x] = true;
    coverMap[y + 1][x] = true;
    coverMap[y][x + 1] = true;
    coverMap[y + 1][x + 1] = true;
  }

  return cardItemList;
}

// 找到某个列表元素的索引
export const findItemIndex = (cardItem: ICardItem, itemList: ICardItem[]) => {
  return itemList.findIndex(item => item.key === cardItem.key);
}