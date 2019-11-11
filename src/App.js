import React from 'react';
import Bullet from './components/bullet/index.js';
import Barrage from './components/barrage/index.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        "微信公众号liwusen00",
        "今晚有没有LOL的一块啊？",
        "这种烟真心不好抽",
        "星期天我想去爬长城",
        "边喝酒边看电影",
        "春天来咯一块爬山去，谁去啊？",
        "微信公众号liwusen00",
        "今晚有没有LOL的一块啊？",
        "这种烟真心不好抽",
        "星期天我想去爬长城",
        "边喝酒边看电影",
        "春天来咯一块爬山去，谁去啊？",
        "微信公众号liwusen00",
        "今晚有没有LOL的一块啊？",
        "这种烟真心不好抽",
        "星期天我想去爬长城",
        "边喝酒边看电影",
        "春天来咯一块爬山去，谁去啊？",
        "微信公众号liwusen00",
        "今晚有没有LOL的一块啊？",
        "这种烟真心不好抽",
        "星期天我想去爬长城",
        "边喝酒边看电影",
        "春天来咯一块爬山去，谁去啊？",
        "微信公众号liwusen00",
        "今晚有没有LOL的一块啊？",
        "这种烟真心不好抽",
        "星期天我想去爬长城",
        "边喝酒边看电影",
        "春天来咯一块爬山去，谁去啊？",
        "微信公众号liwusen00",
        "今晚有没有LOL的一块啊？",
        "这种烟真心不好抽",
        "星期天我想去爬长城",
        "边喝酒边看电影",
        "春天来咯一块爬山去，谁去啊？",
        "微信公众号liwusen00",
        "今晚有没有LOL的一块啊？",
        "这种烟真心不好抽",
        "星期天我想去爬长城",
        "边喝酒边看电影",
        "春天来咯一块爬山去，谁去啊？",
        "微信公众号liwusen00",
        "今晚有没有LOL的一块啊？",
        "这种烟真心不好抽",
        "星期天我想去爬长城",
        "边喝酒边看电影",
        "春天来咯一块爬山去，谁去啊？"
      ],
    }
  }

  componentDidMount() {
    // setInterval(()=>{
    //   let list = new Array(Math.ceil(Math.random()*100)).fill('测试数据：'+Math.random())
    //   this.setState({ list });
    // },5000)
  }


  render() {
    const { list } = this.state;
    const colorConfig={
      random:false,
      colorList:['red']
    };
    const customStyle = {
      font: '16px arial,sans-serif ',
      width: 1000,
      height: 500,
    };

    const style = {
      // background: '#999',
      // borderRadius: "10px",
      // width: 1000,
      // height: 500,
    };
    return (
        <Barrage barrageList={list} color={colorConfig} lineNumber={10}  speed="normal" customStyle={customStyle} />

      // <Bullet msg={msg} customStyle={{'height':'60px'}} height={60} lineNumber={2} />
    );
  }
}

export default App;

