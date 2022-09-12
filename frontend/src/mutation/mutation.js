import { gql } from "apollo-boost";

const LoginMutation = gql`
  mutation userLogin($email: String, $password: String) {
    userLogin(email: $email, password: $password) {
      message
      status
      userId
      userName
      userEmail
      token
    }
  }
`;

const SignupMutation = gql`
  mutation userSignup($firstName: String, $email: String, $password: String) {
    userSignup(firstName: $firstName, email: $email, password: $password) {
      message
      status
      userId
      userName
      userEmail
      token
    }
  }
`;

const updateUserMutation = gql`
  mutation updateUser(
    $_id: String
    $email: String
    $firstName: String
    $phoneNumber: String
    $avatarImage: String
  ) {
    updateUser(
      _id: $_id
      email: $email
      firstName: $firstName
      avatarImage: $avatarImage
      phoneNumber: $phoneNumber
    ) {
      message
      status
    }
  }
`;

const settleUpGroupMutation = gql`
  mutation settleUpGroup($_id: String, $groupId: String) {
    settleUpGroup(_id: $_id, groupId: $groupId) {
      message
      status
    }
  }
`;

const leaveGroupMutation = gql`
  mutation leaveGroup($_id: String, $groupId: String) {
    leaveGroup(_id: $_id, groupId: $groupId) {
      message
      status
    }
  }
`;

const addGroupMutation = gql`
  mutation addGroup(
    $groupName: String
    $groupOwner: String
    $groupMember: String
  ) {
    addGroup(
      groupName: $groupName
      groupOwner: $groupOwner
      groupMember: $groupMember
    ) {
      message
      status
    }
  }
`;

const addExpenseMutation = gql`
  mutation addExpense(
    $_id: String
    $userName: String
    $expenseDescription: String
    $groupId: String
    $amount: String
  ) {
    addExpense(
      _id: $_id
      userName: $userName
      expenseDescription: $expenseDescription
      groupId: $groupId
      amount: $amount
    ) {
      message
      status
    }
  }
`;

const addGroupAcceptMutation = gql`
  mutation addGroupAccept($_id: String, $status: String, $groupId: String) {
    addGroupAccept(_id: $_id, status: $status, groupId: $groupId) {
      message
      status
    }
  }
`;

export {
  LoginMutation,
  SignupMutation,
  updateUserMutation,
  settleUpGroupMutation,
  leaveGroupMutation,
  addGroupMutation,
  addExpenseMutation,
  addGroupAcceptMutation,
};
