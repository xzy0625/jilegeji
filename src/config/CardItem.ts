import { COLOR_TYPE, CONTENT_TYPE } from './index';
// 卡片的配置项
export default class CardItem {
  x: number;
  y: number;
  z: number;
  key: number;
  val: number;
  content: string;
  style: object;
  show: boolean;

  constructor({ x, y, z, key, baseWidth = 20, baseHeight = 21 }: 
    Pick<ICardItem, 'x' | 'y' | 'z' | 'key'> &  Pick<IConfig, 'baseHeight' | 'baseWidth'>
  ) {
    this.x = x;
    this.y = y; 
    this.z = z;
    this.key = key;
    this.show = true; // 初始化默认都展示
    this.style = {
      top: y * baseHeight + "px",
      left: x * baseWidth + "px",
      width: baseWidth* 2 - 2 + "px",
      height: baseHeight * 2 - 8 + "px",
    };
  }

  // 设置值
  setValue(val: number) {
    this.val = val;
    this.content = CONTENT_TYPE[val];
    Object.assign(this.style, COLOR_TYPE[val]);
  }
}