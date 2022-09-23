import { useState } from 'react'
import GameConfig from '../component/GameCondig/GameConfig';
import Gaming from '../component/Game/Game';
import { DEFAULT_CONFIG, CONTENT_TYPE, COLOR_TYPE, STEP_TYPE } from '../config'
import './App.css'
import GameEnd from '../component/GameEnd/GameEnd';

function App() {
  const [step, setStep] = useState(STEP_TYPE.GAMING);
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [win, setWin] = useState(false);

  const onChangeWin = (win: boolean) => {
    setWin(win);
    setStep(STEP_TYPE.END);
  }
  
  return (
    <div className='box'>
      {/* 配置阶段 */}
      {step === STEP_TYPE.CONFIG && <GameConfig />}
      {/* 游戏阶段 */}
      {step === STEP_TYPE.GAMING && <Gaming config={config} changeWin={(win: boolean) => onChangeWin(win)} />}
      {/* 游戏结束阶段 */}
      {step === STEP_TYPE.END && <GameEnd win={win} changeStep={(type: number) => setStep(type)}/>}
    </div>
  )
}

export default App
