/*
 * @Author: fu.nan
 * @Date: 2020-03-07 15:54:00
 * @LastEditors: fu.nan
 * @LastEditTime: 2020-03-07 18:43:01
 */
import React, { Component } from 'react';
import { Input } from 'antd';
const { TextArea } = Input

export default class TextareaWithTips extends Component {
  render() {
    const {
      showTips,
      tips,
      onChange,
      ...others
    } = this.props;

    return (
      <div>
        <TextArea {...others} onChange={e => { onChange(e.target.value) }} />
        {
          showTips && (
            <div style={{ color: 'red', lineHeight: '26px' }}>
              {tips}
            </div>
          )
        }
      </div>
    );
  }
}
