import { Button, Image } from "antd";
import { STEP_TYPE } from "../../config";
import winLogo from '../../assets/kunkun.png';
import loseLogo from '../../assets/lose.webp';
import './index.css'

interface IProps {
  win: boolean;
  changeStep: (type: number) => void
}
const GameEnd = ({ win, changeStep }: IProps) => {
  return (
    <div className="card-wrap">
      {win 
        ? 
        <div className="end-tips">
          <Image
            width={400}
            src={winLogo}
          />
          <div>你赢了,🐔你太美!!!!!</div>
        </div>
       : 
        <div className="end-tips">
          <Image
            width={400}
            src={loseLogo}
          />
          <div>太遗憾了，你输了~~~~~</div>
        </div>
      }
      <div>
        <Button type="primary" style={{ margin: '0 20px' }} onClick={() => {changeStep(STEP_TYPE.CONFIG)}}>重新配置</Button>
        <Button type="primary" onClick={() => {changeStep(STEP_TYPE.GAMING)}}>再玩一次</Button>
      </div>
    </div>
  )
}

export default GameEnd;