import React from 'react';
import ReactDOM from 'react-dom';
import { Button,
  ButtonGroup,
  ListGroup,
  ListGroupItem,
  Form,
  Label,
  ControlLabel,
  FormControl,
  Glyphicon } from 'react-bootstrap';

class Todolist extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    // 初始化state
    this.state = {
      //content内容 type状态
      content: [
        // {value: "", type: false}
      ]
    }
  }

  // 父组件改变state
  handleChange(list, check_index) {
    if(check_index) {
      list[check_index].type = !list[check_index].type;
    }
    this.setState({
      // 更新办事项
      content: list
    })
  }

  // 渲染Todolist组件
  render() {
    return (
      <div className="todo-component">
        <NewItem change={this.handleChange} todo={this.state.content} />
        <ListTodo change={this.handleChange} todo={this.state.content} />
      </div>
    );
  }
}

// 新项目item
class NewItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.keyPressAdd = this.keyPressAdd.bind(this);
  }
  // 添加事件
  handleAdd(e) {
    // this.refs.input 获取input DOM元素
    var val = ReactDOM.findDOMNode(this.input).value;
    if(val.trim() !== "") {
      // 通过props传回父组件
      this.props.todo.push({value: val.trim(), type: false});
      // 更新state
      this.props.change(this.props.todo);
    } else {
      alert("请输入内容，再进行添加");
      return;
    }
    // 清空
    val = "";
    e.preventDefault();
  }

  // 回车事件
  keyPressAdd(e) {
    if(e.keyCode === 13) {
      //alert(1);
      this.handleAdd();
    }
  }

  render() {
    return (
      <Form inline>
        <ControlLabel>待办事项</ControlLabel>
        {' '}
        <FormControl
            type="text"
            placeholder="请输入你的代办事项"
            inputRef={ref => { this.input = ref; }}
          />
        {' '}
        <Button bsStyle="primary" bsSize="small" onClick={this.handleAdd}>添加事项</Button>
      </Form>
    );
  }
}
// 展示已创建的item
class ListTodo extends React.Component {
  constructor(props) {
    super(props);
    this.handleDel = this.handleDel.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }
  // 删除事件
  handleDel(e) {
    var delIndex = e.target.getAttribute("data-key");
    // 删除选中item
    this.props.todo.splice(delIndex,1);
    // 更新state
    this.props.change(this.props.todo);
    e.preventDefault();
  }
  // 标记状态
  handleCheck(e) {
    var checkIndex = e.target.getAttribute("data-key");
    // 更新state
    this.props.change(this.props.todo, checkIndex);
    e.preventDefault();
  }

  render() {
    return (
      <div className="todo-list">
        <ListGroup>
        {
            this.props.todo.map((item,i) => (
                <ListGroupItem key={i}>
                  <Label bsStyle={item.type ? "primary" : "warning"}>
                    {item.type ? " 已完成" : " 未完成"}
                  </Label>
                  &nbsp;
                  {item.value}
                  &nbsp;
                  <ButtonGroup>
                    <Button data-key={i} bsStyle="success" bsSize="small" onClick={this.handleCheck}><Glyphicon glyph="ok" />标记</Button>
                    <Button data-key={i} bsStyle="danger" bsSize="small" onClick={this.handleDel}><Glyphicon glyph="trash" />删除</Button>
                  </ButtonGroup>
                </ListGroupItem>
            ))
        }
        </ListGroup>
      </div>
    );
  }
}

export default Todolist;
