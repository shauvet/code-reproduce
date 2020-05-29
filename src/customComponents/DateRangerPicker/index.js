/*
 * @Author: fu.nan
 * @Date: 2020-03-12 18:11:53
 * @LastEditors: fu.nan
 * @LastEditTime: 2020-03-12 20:33:38
 */
import React, { Component } from 'react';
import { Row, Col, DatePicker } from 'antd';
import style from './index.less';

class DateRangerPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: undefined,
      endTime: undefined,
    };
  }

  componentDidMount() {
    const { value } = this.props;

    this.setState({
      startTime: value[0],
      endTime: value[1],
    });
  }

  render() {
    const { startTime, endTime } = this.state;
    const { tips, onChange } = this.props;

    return (
      <div className={style['time-picker']}>
        <Row>
          <Col span={10}>
            <DatePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              placeholder="开始时间"
              value={startTime}
              style={{
                width: '100%',
              }}
              onChange={(time) => {
                this.setState({
                  startTime: time,
                });
                onChange([time, endTime]);
              }}
            />
          </Col>
          <Col span={4} style={{ textAlign: "center" }}>
            ~
          </Col>
          <Col span={10}>
            <DatePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              placeholder="结束时间"
              value={endTime}
              style={{
                width: '100%',
              }}
              onChange={((time) => {
                this.setState({
                  endTime: time,
                });
                onChange([startTime, time]);
              })}
            />
          </Col>
          <Col style={{ textAlign: "right" }}>
            {tips}
          </Col>
        </Row>
      </div>
    );
  }
}

export default DateRangerPicker;
