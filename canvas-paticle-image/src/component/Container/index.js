/**
 * 头部
 * @authors runlijs (498854241@qq.com)
 * @date    2018-12-01 16:31:05
 * @version $Id$
 */


import React,{Component} from 'react';
import PropTypes from 'prop-types';
import './index.css';

export default class Container extends Component{
  static contextTypes = {
    router : PropTypes.object.isRequired,
  }

  componentDidMount(){}
  componentDidUpdate(){}

  render(){
    return(
      <div>
        {this.props.children}
      </div>
    )
  }
}

