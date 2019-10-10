import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
mutation LoginMutation($uid: String!) {
  login(uid:$uid) {
    token
    message
  }
}
`

export const LOGOUT_MUTATION = gql`
mutation LogoutMutation($uid: String!) {
  logout(uid:$uid) {
    message
  }
}
`

export const SIGNUP_MUTATION = gql`
  mutation Signup($uid: String!,$email:String!,$password:String!,$nativeLang:String!,$name:String!){
    signup(uid:$uid, email:$email,password:$password,nativeLang:$nativeLang,name:$name){
      message
    }
  }
  `


export const SINGLE_LINK_MUTATION = gql`
  mutation SingleLink($transLang:String!,$link:String!){
  singleLinkRecommendations(transLang:$transLang,link:$link){
    title
    link
    langt
    recommendations{
      title
      link
      date
    }
  }
}
  `


export const LINK_RECS_QUERY = gql`
query {
  linkRecommendations @client{
    title
    link
    langt
    recommendations{
      title
      langt
      date
    }
  }
}
`

