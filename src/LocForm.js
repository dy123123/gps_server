import React, { Component } from 'react';

class LocForm extends Component {
  state = {
    name: '',
    lat: '',
    lon: '',
    time:'',

  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    // 페이지 리로딩 방지
    e.preventDefault();
    // 상태값을 onCreate 를 통하여 부모에게 전달
    this.props.onCreate(this.state);
    // 상태 초기화
    this.setState({
      name: '',
      lat: ''
    })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      </form>
    );
  }
}

export default LocForm;
