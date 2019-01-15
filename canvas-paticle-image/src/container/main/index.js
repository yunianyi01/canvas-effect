import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Container from '../../component/Container'
import { drawText } from '../../utils'
import './index.css'

export default class Request extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    let images = [
      {
        img: require('../../images/qin_1.jpg')
      },
      {
        img: require('../../images/mo_1.jpg')
      },
      {
        img: require('../../images/mo_2.jpg')
      },
      {
        img: require('../../images/mo_3.jpg')
      },
      {
        img: require('../../images/qin_1.jpg')
      },
      {
        img: require('../../images/qin_2.jpg')
      },
      {
        img: require('../../images/the-look.jpg')
      }
    ]
    this.state = {
      images,
      currentIndex: 0
    };
    this.density = 1;   // 每次取得像素密度
    this.targetPosX = 10 // 图片想要绘制在canvas中的位置X
    this.targetPosY = 10 // 图片想要绘制在canvas中的位置Y
    this.fragList = new Array() // 存放每一个图片点的数组   
    this.counter = 1            // 用来限制那些图片点可以运动
    this.isDown = false         // 图片是否已经落下
  };

  componentDidMount() {
    let mainCanvasBox = document.getElementById('mainCanvasBox');
    this.canvasBoxWidth = mainCanvasBox.clientWidth;  // 获取canvas盒子的宽度赋予canvas
    this.canvasBoxHeight = mainCanvasBox.clientHeight;   // 获取canvas盒子的高度赋予canvas
    this.drawCanvas()
  };

  // 绘制内容
  drawCanvas() {
    const { canvasBoxWidth, canvasBoxHeight } = this
    const { currentIndex = 0 } = this.state;
    let mainCanvas = document.getElementById(`mainCanvas`);
    if (!mainCanvas) {
      return
    } 
    let ctx = mainCanvas.getContext('2d');
    ctx && ctx.clearRect(0, 0, canvasBoxWidth, canvasBoxHeight)

    // canvas高度
    mainCanvas.width = canvasBoxWidth;
    mainCanvas.height = canvasBoxHeight;

    // 图片
    let imagesIndex = document.getElementById(`image_${currentIndex}`);

    imagesIndex.onload = () => {
    let imageWidth = imagesIndex.clientWidth, imageHeight = imagesIndex.clientHeight;   // 获取图片的宽高
    let imgW = imageWidth * 3, imgH = imageHeight * 3
      ctx.drawImage(imagesIndex, 0, 0, imgW, imgH);  // 图片绘制
      this.imageChip(ctx, imgW, imgH)
      return
    }
    let imageWidth = imagesIndex.clientWidth, imageHeight = imagesIndex.clientHeight;   // 获取图片的宽高
    let imgW = imageWidth * 3, imgH = imageHeight * 3
    ctx.drawImage(imagesIndex, 0, 0, imgW, imgH)
    this.imageChip(ctx, imgW, imgH)
  }


  // 将图片打散：通过 getImageData() 复制画布上指定矩形的像素数据，然后通过 putImageData() 将图像数据放回画布

  imageChip(ctx, imgW, imgH) {
    let max = Math.max(imgW, imgH)
    this.density = Math.floor(max / 70)
    const { density, targetPosX, targetPosY, canvasBoxWidth, canvasBoxHeight } = this;
    for (let w = 0; w < (imgW / density); w++) {
      this.fragList[w] = []
      for (let h = 0; h < (imgH / density); h++) {
        // 图片片段： getImageData(x,y,width,height)，
        //  x 开始复制的左上角位置的 x 坐标；
        //  y 开始复制的 左上角位置的 y 坐标。
        //  width 将要复制的矩形区域的宽度。
        //  height 将要复制的矩形区域的高度。
        let imgChip = ctx.getImageData((w * density), (h * density), density, density);
        let targetPX = w * density + targetPosX;   // 目标X位置
        let targetPY = h * density + targetPosY;   // 目标Y位置
        let canvasX = Math.random() * canvasBoxWidth;   // 随机到canvas x位置
        let canvasY = Math.random() * canvasBoxHeight;   // 随机到canvas Y位置
      
        this.fragList[w][h] = {
          img: imgChip,
          targetPosX: targetPX,
          targetPosY: targetPY,
          vx: 0.2,
          vy: 0.2,
          nx: 0,
          ny: 0,
          x: canvasX,
          y: canvasY,
        }
      }
    }
    ctx && ctx.clearRect(0, 0, canvasBoxWidth, canvasBoxHeight)
    this.drawImage(ctx, imgW, imgH)
  }

  // 绘制图片
  drawImage(ctx, imgW, imgH) {
    const {canvasBoxWidth, canvasBoxHeight, counter, isDown, fragList, density} = this
    ctx && ctx.clearRect(0, 0, canvasBoxWidth, canvasBoxHeight)
    if(counter < imgW)this.counter++;

    if(!isDown && fragList.length > 0){
      for (let w = 0; w < imgW / density; w++) {
        for (let h = 0; h < imgH / density; h++) {
          let frag = fragList[w] && fragList[w][h] || []
          if (w < counter) {
            let tx = frag['targetPosX']
            let ty = frag['targetPosY']
            let x = frag['x']
            let y = frag['y']
            let dx = tx - x
            let dy = ty - y
            if (Math.abs(dx) < 0.5) {
              frag['x'] = tx
            } else {
              frag['x'] += dx * frag['vx']*Math.random()*3
            }
            if (Math.abs(dy) < 0.5) {
              frag['y'] =  ty
            } else {
              frag['y'] += dy * frag['vy'] * Math.random() * 3
            }
          }
        
         ctx && frag && frag['img'] && frag['x'] && frag['y'] && ctx.putImageData(frag['img'], frag['x'], frag['y'])
        }
      }
    }
    window.requestAnimationFrame(() => this.drawImage(ctx, imgW, imgH))
    return
  }

  // 点击切换图片
  handleImage = (index) => {
    window.cancelAnimationFrame(this.drawImage());
    this.setState({
      currentIndex: index
    }, () => {
      this.drawCanvas()
    })
  };


  render() {
    const { images, currentIndex = 0} = this.state;
    return <Container>
      <div className="main-body">
        <div className="main-container" id="mainCanvasBox">
          <canvas className="main-canvas" id={`mainCanvas`}></canvas>
        </div>
        <div className="images-list">
          {
            images.map((img, index) => {

              return (<img src={img.img}
                id={`image_${index}`}
                key={index}
                className={`image ${index == currentIndex ? 'image-actived' : ''}`}
                onClick={() => {
                  this.handleImage(index)
                }} />)
            })
          }
        </div>
      </div>
    </Container>
  }
}

