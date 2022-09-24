import { Col, InputNumber, Row, Slider } from 'antd';
import React, { useState } from 'react';
interface IProps {
  min: number;
  max: number;
  step: number;
  inputValue: number | string;
  setInputValue: (value: string | number) => void
}
const NumebrStep = ({ inputValue, setInputValue, min, max, step }: IProps) => {
  const onChange = (newValue: any) => {
    setInputValue(newValue);
  };

  return (
    <Row>
      <Col span={12}>
        <Slider
          min={min}
          max={max}
          onChange={(value) => onChange(value)}
          value={typeof inputValue === 'number' ? inputValue : 0}
          step={step}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={min}
          max={max}
          style={{
            margin: '0 16px',
          }}
          value={inputValue}
          onChange={(value) => onChange(value)}
          step={step}
        />
      </Col>
    </Row>
  );
};

export default NumebrStep;