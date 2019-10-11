import gql from 'graphql-tag';

export const typeDefs = gql`
    type Query {
        linkRecommendations: ArticleRecommendations!
        }

    type ArticleRecommendation {
        link: String!
        title: String!
        art_id: String!
        lang: String!
        date: DateTime
        }

    type ArticleRecommendations {
        link: String!
        title: String!
        trans_lang: String!
        langt: String!
        recommendations: [ArticleRecommendation!]!
        }
    `
