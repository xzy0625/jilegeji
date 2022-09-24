import { Button, Col, InputNumber, Row, Slider } from 'antd';
import { DEFAULT_CONFIG } from '../../config';
import NumberStep from '../common/NumberStep';
import './index.css'
interface IProps {
  config: IConfig;
  setConfig: (config: IConfig) => void;
  startGame: () => void;
}

const GameConfig = ({ config, setConfig, startGame }: IProps) => {
  console.log(config, '....')
  const onValueChange = <T extends keyof IConfig>(value: number | string, type: T ) => {
    setConfig({
      ...config,
      [type]: value,
    })
  }

  // 恢复默认配置
  const reset = () => {
    setConfig(DEFAULT_CONFIG);
  }
  
  return (
    <div className='config-box'>
      <h1 style={{marginLeft: '150px'}}>🐔了个🐔小游戏</h1>
      <div>
        <span>横向卡片最大平铺长度:</span>
        <NumberStep min={1} max={10} step={1} inputValue={config.x} setInputValue={(value) => onValueChange(value, 'x')} />
      </div>
      <div>
        <span>纵向卡片最大平铺长度:</span>
        <NumberStep min={1} max={10} step={1} inputValue={config.y} setInputValue={(value) => onValueChange(value, 'y')} />
      </div>
      <div>
        <span>卡片最大层叠数: </span>
        <NumberStep min={1} max={10} step={1} inputValue={config.z} setInputValue={(value) => onValueChange(value, 'z')} />
      </div>
      <div>
        <span>卡片生成密度: </span>
        <NumberStep min={0} max={0.7} step={0.1} inputValue={config.cardRandom} setInputValue={(value) => onValueChange(value, 'cardRandom')} />
      </div>
      <div>
        <span>卡片种类数: </span>
        <NumberStep min={1} max={14} step={1} inputValue={config.maxCardType} setInputValue={(value) => onValueChange(value, 'maxCardType')} />
      </div>
      <div>
        <span>单张卡片高度: </span>
        <NumberStep min={20} max={40} step={1} inputValue={config.baseHeight} setInputValue={(value) => onValueChange(value, 'baseHeight')} />
      </div>
      <div>
        <span>单张卡片宽度: </span>
        <NumberStep min={20} max={40} step={1} inputValue={config.baseWidth} setInputValue={(value) => onValueChange(value, 'baseWidth')} />
      </div>
      <div>
        <span>撤回次数: </span>
        <NumberStep min={0} max={10} step={1} inputValue={config.retryNumber} setInputValue={(value) => onValueChange(value, 'retryNumber')} />
      </div>
      <div>
        <span>暂存次数: </span>
        <NumberStep min={0} max={10} step={1} inputValue={config.saveNumber} setInputValue={(value) => onValueChange(value, 'saveNumber')} />
      </div>
      <div>
        <span>洗牌次数: </span>
        <NumberStep min={0} max={10} step={1} inputValue={config.shuffleNumber} setInputValue={(value) => onValueChange(value, 'shuffleNumber')} />
      </div>
      <div className='btn-list'>
        <Button type="primary" onClick={reset} style={{marginRight: '30px'}}>恢复默认配置</Button>
        <Button type="primary" onClick={startGame}>开始游戏</Button>
      </div>
    </div>
  )
};

export default GameConfig;