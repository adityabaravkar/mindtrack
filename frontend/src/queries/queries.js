import { gql } from "apollo-boost";

const QueryGetUser = gql`
  query ($_id: String) {
    getUser(_id: $_id) {
      _id
      firstName
      email
      phoneNumber
      avatarImage
      currency
      language
      groupList {
        _id
        groupId {
          _id
          groupName
          userList {
            _id
            firstName
            email
            phoneNumber
            avatarImage
            currency
            language
          }
          expenseList {
            _id
            userExpenseName
            expenseDescription
            amount
            userExpense {
              _id
            }
          }
        }
        status
        settledUp
      }
    }
  }
`;

const QueryGetGroup = gql`
  query ($_id: String) {
    getGroup(_id: $_id) {
      _id
      groupName
      userList {
        _id
        firstName
        email
        phoneNumber
        avatarImage
        currency
        language
        groupList {
          groupId {
            _id
            groupName
            userList {
              _id
              firstName
              email
              phoneNumber
              avatarImage
              currency
              language
            }
            expenseList {
              _id
              userExpenseName
              expenseDescription
              amount
              userExpense {
                _id
              }
            }
          }
          status
          settledUp
        }
      }
      expenseList {
        _id
        userExpenseName
        expenseDescription
        amount
        userExpense {
          _id
        }
      }
    }
  }
`;

const QueryGetExpense = gql`
  query ($_id: String) {
    getExpense(_id: $_id) {
      _id
      userExpenseName
      expenseDescription
      amount
      userExpense {
        _id
        firstName
        email
        phoneNumber
        avatarImage
        currency
        language
        groupList {
          groupId {
            _id
            groupName
            userList {
              _id
              firstName
            }
          }
          status
          settledUp
        }
      }
    }
  }
`;

const QueryGetOtherUser = gql`
  query ($_id: String) {
    getOtherUsers(_id: $_id) {
      status
      UserObj {
        _id
        firstName
        email
        phoneNumber
        avatarImage
        currency
        language
        groupList {
          groupId {
            _id
            groupName
            userList {
              _id
              firstName
              email
              phoneNumber
              avatarImage
              currency
              language
            }
            expenseList {
              _id
              userExpenseName
              expenseDescription
              amount
              userExpense {
                _id
              }
            }
          }
          status
          settledUp
        }
      }
    }
  }
`;

const QueryGetOtherExpense = gql`
  query ($_id: String) {
    getOtherExpenses(_id: $_id) {
      _id
      userExpenseName
      expenseDescription
      amount
      userExpense {
        _id
        firstName
        email
        phoneNumber
        avatarImage
        currency
        language
        groupList {
          groupId {
            _id
            groupName
            userList {
              _id
              firstName
            }
          }
          status
          settledUp
        }
      }
    }
  }
`;

export {
  QueryGetUser,
  QueryGetExpense,
  QueryGetOtherUser,
  QueryGetGroup,
  QueryGetOtherExpense,
};
