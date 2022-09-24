import { useState } from 'react'
import GameConfig from '../component/GameCondig/GameConfig';
import Gaming from '../component/Game/Game';
import { DEFAULT_CONFIG, CONTENT_TYPE, COLOR_TYPE, STEP_TYPE } from '../config'
import GameEnd from '../component/GameEnd/GameEnd';
import './App.css'
import Ads from '../component/MyAds/Ads';

function App() {
  const [step, setStep] = useState(STEP_TYPE.CONFIG);
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [win, setWin] = useState(false);

  const onChangeWin = (win: boolean) => {
    setWin(win);
    setStep(STEP_TYPE.END);
  }
  
  return (
    <div className='box'>
      {/* 配置阶段 */}
      {step === STEP_TYPE.CONFIG && <GameConfig config={config} setConfig={setConfig} startGame={() => {setStep(STEP_TYPE.GAMING)}}/>}
      {/* 游戏阶段 */}
      {step === STEP_TYPE.GAMING && <Gaming config={config} changeWin={(win: boolean) => onChangeWin(win)} />}
      {/* 游戏结束阶段 */}
      {step === STEP_TYPE.END && <GameEnd win={win} changeStep={(type: number) => setStep(type)}/>}
      {/* 广告 */}
      <Ads />
    </div>
  )
}

export default App
