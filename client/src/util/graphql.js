import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
    {
        getPosts {
            id
            body
            createdAt
            username
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`;

export const FETCH_POST_QUERY = gql`
    query($postId: ID!) {
        getPost(postId: $postId) {
            id
            body
            createdAt
            username
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`;

export const DELETE_POST = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`;

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
            email
            username
            createdAt
            token
        }
    }
`;

export const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id
            email
            username
            createdAt
            token
        }
    }
`;

export const LIKE_POST = gql`
    mutation likePost($postId: ID!) {
        likePost(postId: $postId) {
            id
            likes {
                id
                username
            }
            likeCount
        }
    }
`;
