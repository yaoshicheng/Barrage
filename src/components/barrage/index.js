import React from 'react';
import PropTypes from 'prop-types';

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    function( callback ){
      window.setTimeout(callback, 1000 / 60);
    };
})();


export default class Barrage extends React.Component{
  constructor(props){
    super(props);
    this.myCanvas=React.createRef();
    this.FASTSPEED = 5;
    this.SLOWSPEED = 2;
    this.NORMALSPEED = 3;
    this.rtMsgList = [];
    this.rtMsgLeft = [];
    this.rtMsgTop = [];
    this.rtMsgSpeed = [];
    this.rtMsgColor = [];
  }
  componentDidMount(){
    this.initialBarrage(this.props);
  };

  // static getDerivedStateFromProps(nextProps){
  //   this.initialBarrage();
  //   return null;
  // };

  componentWillReceiveProps(nextProps) {
    const { rtMsg, customStyle: { width, height } } = nextProps;
    this.initialWith = document.body.clientWidth;
    const canvasWidth= width || this.initialWith;
    this.initialRtList(rtMsg,canvasWidth,height);
  }

  initialRtList = (rtMsg,width,height) => {
    if(rtMsg){
      this.rtMsgList.push(rtMsg);
      this.rtMsgLeft.push(width+100);
      let random = Math.random();
      if(random<0.2) {
        random = 0.2;
      }else if(random>0.8) {
        random = 0.8;
      }
      this.rtMsgTop.push(height*random);
      this.rtMsgSpeed.push(3+Math.random());
      this.rtMsgColor.push(`#${Math.floor(Math.random()*0xffffff).toString(16)}` )
    }
  };

  initialBarrage = (props) => {
    const { barrageList, rtMsg, customStyle: { width, height, font = '14px Courier New'  } } = props;
    this.initialWith = document.body.clientWidth;
    this.initialHeight = document.body.clientHeight;
    this.lineNumber = Math.ceil(height/30);
    const canvas=this.myCanvas.current;
    const ctx=canvas.getContext("2d");
    ctx.font = font;
    const canvasWidth= width || this.initialWith;

    const colors=this.getColor({random: true});
    const arrL=this.getLeft();
    const arrT=this.getTop();
    const speedArr=this.getSpeed();

    const max = arrL[arrL.length-1] - arrL[0];

    this.initialRtList(rtMsg,canvasWidth,height);

    const cb = ()=>{
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.save();
      for(let i=0;i<barrageList.length;i++){
        arrL[i] -= speedArr[i];
        ctx.fillStyle = colors[i];
        ctx.font = font;
        ctx.fillText(barrageList[i], arrL[i], arrT[i]);
        if(arrL[i] <= -max){
          arrL[i] = canvasWidth;
        }
      }
      // 绘制实时弹幕
      for(let i=0;i<this.rtMsgList.length;i++){
        if(this.rtMsgList[i]){
          this.rtMsgLeft[i] -= this.rtMsgSpeed[i];
          ctx.font = font;
          ctx.fillStyle = this.rtMsgColor[i];
          ctx.fillText(this.rtMsgList[i], this.rtMsgLeft[i], this.rtMsgTop[i]);
          if(this.rtMsgLeft[i] <= -max){
            this.rtMsgList[i] = null;
            this.rtMsgList.shift();
            this.rtMsgLeft.shift();
            this.rtMsgTop.shift();
            this.rtMsgSpeed.shift();
            this.rtMsgColor.shift();
          }
        }
      }

      ctx.restore();
      this.timer = requestAnimationFrame(cb);
    };
    this.timer = requestAnimationFrame(cb);
  };

  getTop = () =>{
    let { barrageList, lineNumber} = this.props;
    const len = barrageList.length;
    const line = lineNumber || this.lineNumber;
    console.log(line)
    const canvas = this.myCanvas.current;
    const height = canvas.height;
    const lineHeight  = Math.floor(height/line);
    const marginTops = [];
    const marginTop = (lineHeight - 30)/2;
    for(let i=0;i<line;i++){
      marginTops.push((i+0.5)*lineHeight + marginTop);
    }

    const arr= new Array(len).fill(1);
    return arr.map( (item,index) =>{
      let mo = index % line;
      return marginTops[mo]
    });
  };

  getLeft = () =>{
    const {barrageList = [], customStyle:{ width }}= this.props;
    const canvasWidth= width || this.initialWith;
    const count = Math.ceil(barrageList.length/this.lineNumber);
    let arrL = [];
    for(let i=0;i<count;i++){
      arrL = arrL.concat(new Array(this.lineNumber).fill(canvasWidth+ i*280))
    }
    return arrL
  };

  getColor = ({ random = false}) =>{
    const { barrageList } = this.props;
    const len = barrageList.length;
    const arr=new Array(len).fill(1);
    return arr.map(function(){
      return random ? `#${Math.floor(Math.random()*0xffffff).toString(16)}` : "#222"
    });
  };

  getSpeed = () =>{
    const {barrageList,speed}=this.props;
    const speedN = speed === "normal"? this.NORMALSPEED: (speed === "fast"?this.FASTSPEED:this.SLOWSPEED)
    const len = barrageList.length;
    return new Array(len).fill(speedN);
  };

  componentWillUnmount(){
    clearInterval(this.timer);
  }
  render(){
    const { customStyle: { width, height } } = this.props;
    const canvasWidth = width || this.initialWith;
    const canvasHeight = height || this.initialHeight;
    return (
      <div className="m-barrage">
        <canvas className="m-barrage-canvas" width={canvasWidth} height={canvasHeight} ref={this.myCanvas} />
      </div>
    )
  }
}

Barrage.propTypes = {
  barrageList: PropTypes.array,
  customStyle: PropTypes.object,
  speed: PropTypes.string,
  lineNumber: PropTypes.any,
  rtMsg: PropTypes.string,
};

Barrage.defaultProps = {
  barrageList: [],
  customStyle: {},
  speed: 'normal',
  lineNumber: 0,
  rtMsg:'',
};
