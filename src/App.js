import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Row, Col, Icon } from 'antd'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageX: '50%',
      pageY: '80px',
      diffX: '',
      diffY: '',
      moving: false
     };
     this.getPosition = this.getPosition.bind(this)
     this.onMouseDown = this.onMouseDown.bind(this)
     this.onMouseUp = this.onMouseUp.bind(this)
     this.onMouseMove = this.onMouseMove.bind(this)
  }
  // 获取鼠标点击title时的坐标、title的坐标以及两者的位移
  getPosition (e) {
    // 标题DOM元素titleDom
    const titleDom = e.target
    // titleDom的坐标(视窗)
    const X = titleDom.getBoundingClientRect().left
    // 由于Y轴出现滚动条，需要与鼠标保持一致，存储页面相对位置
    const Y = document.getElementsByClassName('group')[0].offsetTop

    // 鼠标点击的坐标(页面)
    let mouseX = e.pageX
    let mouseY = e.screenY
    // 鼠标点击位置与modal的位移
    const diffX = mouseX - X
    const diffY = mouseY - Y
    return {X, Y, mouseX, mouseY, diffX, diffY}
  }
 
  /**
   * 鼠标按下，设置modal状态为可移动，并注册鼠标移动事件
   * 计算鼠标按下时，指针所在位置与modal位置以及两者的差值
   **/
  onMouseDown (e) {
    const position = this.getPosition(e)
    window.onmousemove = this.onMouseMove
    window.onmouseup = this.onMouseUp
    this.setState({moving: true, diffX: position.diffX, diffY: position.diffY})
  }
 
  // 松开鼠标，设置modal状态为不可移动
  onMouseUp (e) {
    const { moving } = this.state
    moving && this.setState({moving: false});
  }
 
  // 鼠标移动重新设置modal的位置
  onMouseMove (e) {
    const {moving, diffX, diffY} = this.state
    if (moving) {
      // 获取鼠标位置数据
      const position = this.getPosition(e)
      // 计算modal应该随鼠标移动到的坐标
      const x = position.mouseX - diffX
      const y = position.mouseY - diffY
      // 窗口大小，结构限制，需要做调整，减去侧边栏宽度
      const { clientWidth, clientHeight } = document.documentElement
      const modal = document.getElementsByClassName("group")[0]
      if (modal) {
        // 计算modal坐标的最大值
        const maxHeight = clientHeight - modal.offsetHeight
        const maxWidth = clientWidth - modal.offsetWidth
        // 判断得出modal的最终位置，不得超出浏览器可见窗口
        const left = x > 0 ? (x < maxWidth ? x : maxWidth) : 0
        const top = y > 0 ? (y < maxHeight ? y : maxHeight) : 0
        this.setState({pageX: left, pageY: top})
      }
    }
  }
  render() {
    let { pageX, pageY, diffX, diffY } = this.state
    return (
      <div className="App">
        <header className="App-header">
        <div className='position'>
          <div>鼠标位置：（{pageX + diffX}， {pageY + diffY}）</div>
          <div>弹框位置：（{pageX}，{pageY}）</div>
        </div>
        <div
            className='group'
            style={{
              left: pageX,
              top: pageY
            }}>
            <div className='group_head'
              onMouseDown={this.onMouseDown}
            >
              <Icon type="cross" className='group_head_close' onClick={this.handleCancel} />
              集团标品信息
            </div>
            <div className='group_body'>
              <Row><Col span='6'>商品条形码：</Col><Col span='18'>89757</Col></Row>
              <Row>
                <Col span='6'>名称：</Col>
                <Col span='18'>西伯利亚大咸鱼</Col>
              </Row>
              <Row>
                <Col span='6'>品牌：</Col>
                <Col span='18'>美国圣地亚哥</Col>
              </Row>
              <Row className='group_photos'>
                <Col span='6'>图片：</Col>
                <Col span='18'><img src={logo} alt='test img' /></Col>
              </Row>
              <Row>
                <Col span='6'>重量：</Col>
                <Col span='18'>800(g)</Col>
              </Row>
              <Row>
                <Col span='6'>&emsp;长：</Col>
                <Col span='18'>777(mm)</Col>
              </Row>
              <Row>
                <Col span='6'>&emsp;宽：</Col>
                <Col span='18'>888(mm)</Col>
              </Row>
              <Row>
                <Col span='6'>&emsp;高：</Col>
                <Col span='18'>999(mm)</Col>
              </Row>
            </div>
            <div className='group_footer'>
              <Button key="submit" type="primary" size="large" className='group_footer_useAll'>
                使用全部信息
              </Button>
              <Button key="back" type="ghost" size="large" >关闭</Button>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
