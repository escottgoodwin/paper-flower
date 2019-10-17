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
      art_id
      title
      link
      date
    }
  }
}
  `


export const ARTICLE_QUERY = gql`
query Article($artId:String!, $lang:String!){
  article(artId:$artId,lang:$lang){
    art_id
    article
    title
    link
    date
    translations{
      orig_text
      trans_text
    }
  }
}
`

export const LINK_RECS_QUERY = gql`
query LinkRec{
  linkRecommendations @client {
    title
    link
    recommendations{
      art_id
      link
      title
      date
    }
    }
  }
`

export const ARTICLE_REC_QUERY = gql`
query ArticleRecommendation($lang:String!){
  articleRecommendations(lang:$lang){
   recs{
    link
    title
    date
    lang
    art_id
  }
  }
}`

