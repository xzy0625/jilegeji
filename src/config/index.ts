export const DEFAULT_CONFIG: IConfig = {
  x: 6, // 横排最多六个
  y: 7, // 竖排最多七个
  z: 10, // 多少层级
  baseWidth: 20,
  baseHeight: 21, 
  cardRandom: 0.2, // 卡片密度
  maxCardType: 11, // 物品种类
  retryNumber: 3, // 撤回数
  saveNumber: 3, // 暂存数
  shuffleNumber: 3, // 洗牌数
}

export const STEP_TYPE = {
  'CONFIG': 0,
  'GAMING': 1,
  'END': 2,
}

export const COLOR_TYPE: IColorType = {
  1: { background: "#FFB7DD" },
  2: { background: "#FFCCCC" },
  3: { background: "#FFC8B4" },
  4: { background: "#FFDDAA" },
  5: { background: "#FFEE99" },
  6: { background: "#FFFFBB" },
  7: { background: "#EEFFBB" },
  8: { background: "#CCFF99" },
  9: { background: "#99FF99" },
  10: { background: "#BBFFEE" },
  11: { background: "#AAFFEE" },
  12: { background: "#99FFFF" },
  13: { background: "#CCEEFF" },
  14: { background: "#CCDDFF" },
};

export const CONTENT_TYPE: IContentType = {
  1: "🥕",
  2: "✂️",
  3: "🥦",
  4: "🥛",
  5: "🌊",
  6: "🧤",
  7: "🧵",
  8: "🌱",
  9: "🔨",
  10: "🌽",
  11: "🌾",
  12: "🐑",
  13: "🪵",
  14: "🔥",
};
