import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Container from '../../component/Container'
import {drawText} from '../../utils'
import './index.css'

export default class Request extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    let images = [
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
      images
    }
  }

  componentDidMount() {
    let answerCanvas = document.getElementById('answer-canvas');
    if (!answerCanvas) {
      return
    }
    answerCanvas.width = 750;
    answerCanvas.height = 588 * 2;
    let ctx = answerCanvas.getContext('2d');
    // this.drawCanvas(ctx, answerCanvas);
  }

  // 绘制内容
  drawCanvas(ctx, answerCanvas) {
    // 图片
    let images1 = document.getElementById('images1');
    let images2 = document.getElementById('images2');
    images1.onload = () => {
      ctx.drawImage(images1, 0, 0, 750, 933);  // 主图
      ctx.drawImage(images2, 600, 975, 116, 116);  // 二维码
      this.canvasToImage(answerCanvas)
    }
  }

  canvasToImage(canvas) {
    let strDataURI = canvas.toDataURL("image/jpg");
    this.setState({
      strDataURI
    })
  }



  render() {
    const {images, currentIndex = 0} = this.state;
    return <Container>
      <div className="main-body">
        <div className="main-container">
        </div>
        <div className="images-list">
        {
          images.map((img, index) => {
          
            return(<img src={img.img} key={index} className={`image ${index == currentIndex ? 'image-actived' : ''}`} onClick={() => {
              this.setState({
                currentIndex: index
              })
            }} />)
          })
        }
        </div>
      </div>
    </Container>
  }
}

