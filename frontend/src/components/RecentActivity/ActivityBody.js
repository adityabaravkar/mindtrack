import React, { Component } from "react";
import "../../App.css";
import axios from "axios";

class ActivityBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupList: [],
      expenseList: [],
      name: "",
      currentPage: 1,
      itemsPerPage: 5,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log(e);
    this.setState({
      currentPage: Number(e),
    });
  }

  async componentDidMount() {
    const userId = localStorage.getItem("userId");
    const data = {
      _id: userId,
    };
    let expenseList = [];

    axios.defaults.withCredentials = true;
    this.props.getUser(data, (res) => {
      console.log(res.status);
      console.log("-------------11223344", res.data);
      if (res.status === 200) {
        res.data.groupList.forEach((element) => {
          element.groupId.expenseList.forEach((ele) => {
            expenseList.push(ele);
          });
        });
        this.setState({
          name: res.data.firstName,
          groupList: res.data.groupList,
          expenseList: expenseList,
        });
      }
      // console.log('[]]]]]]]]]]]]]', this.state.result);
    });
    // this.render();
  }

  render() {
    console.log(
      "[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]",
      this.state.expenseList
    );
    const currentPage = this.state.currentPage;
    const itemsPerPage = this.state.itemsPerPage;

    const indexOfLastTodo = currentPage * itemsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;

    const currentItems = this.state.expenseList.slice(
      indexOfFirstTodo,
      indexOfLastTodo
    );

    const pageNumbers = [];

    for (
      let i = 1;
      i <= Math.ceil(this.state.expenseList.length / itemsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    let renderPageNumbers = null;

    renderPageNumbers = (
      <nav aria-label="Page navigation example" class="pagebar">
        <ul class="pagination">
          {pageNumbers.map((i) => (
            <li class="page-item">
              <a
                key={i}
                id={i}
                onClick={() => {
                  this.handleClick(i);
                }}
                class="page-link"
                href="#"
              >
                {i}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
    return (
      <div>
        {this.state.red}
        <div id="center_column">
          <div id="expenses">
            <div id="expenses_list">
              {/* {currentItems.length > 0 ? (
                currentItems.map((value) => */}
              {
                currentItems.length > 0 ? (
                  currentItems.map((value1) => (
                    <div class="expense">
                      <div class="summary">
                        <div class="expense summary uninvolved">
                          <div class="main-block">
                            <img
                              src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png"
                              class="receipt"
                              alt="img"
                            />
                            <div class="header">
                              <span class="description">
                                <a>{value1.expenseDescription}</a>
                              </span>
                            </div>
                          </div>
                          <div class="cost">
                            {/* {this.state.name} */}
                            {value1.userExpenseName}
                            <br />
                            <span class="number">{value1.amount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <a></a>
                )
                //   )
                // ) : (
                //   <a>aaaaaa</a>
                // )}
              }
            </div>
          </div>
        </div>
        {renderPageNumbers}
      </div>
    );
  }
}

export default ActivityBody;
