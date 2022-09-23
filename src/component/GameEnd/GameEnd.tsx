import { STEP_TYPE } from "../../config";

interface IProps {
  win: boolean;
  changeStep: (type: number) => void
}
const GameEnd = ({ win, changeStep }: IProps) => {
  return (
    <div className="card-wrap">
      {win ? '你赢了,🐔你太美' : '傻逼，输了!!!!'}
      <button style={{ margin: '0 20px' }} onClick={() => {changeStep(STEP_TYPE.CONFIG)}}>重新配置</button>
      <button onClick={() => {changeStep(STEP_TYPE.GAMING)}}>再玩一次</button>
    </div>
  )
}

export default GameEnd;