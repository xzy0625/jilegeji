// 全局配置
interface IConfig {
  x: number; // 横排
  y: number; // 竖排
  z: number; // 层级
  baseWidth: number; // 一个单元格宽度
  baseHeight: number; // 一个单元格高度
  cardRandom: number; // 卡片密度
  maxCardType: number; // 卡片种类数
  retryNumber: number; // 撤回数
  saveNumber: number; // 暂存数
  shuffleNumber: number; // 洗牌数
}

type style = {
  left?: string | number;
  top?: string | number;
  [props: string]: any;
}

// 卡片配置
interface ICardItem {
  x: number; // 横坐标
  y: number; // 纵坐标
  z: number; // 层级
  content: string; // 内容
  key: number; // key值
  style: style; // 样式
  show: boolean; // 是否展示
  [props: string]: any;
}

interface IContentType {
  [key: number]: string;
}

interface IColorType {
  [key: number]: object;
}
