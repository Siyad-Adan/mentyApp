import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Loader, Grid, Card, Button, Icon, Label } from "semantic-ui-react";
import moment from "moment";

import { AuthContext } from "../context/auth";
import { FETCH_POST_QUERY } from "../util/graphql";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

function SinglePost(props) {
    const postId = props.match.params.postId;

    const { user } = useContext(AuthContext);

    const { data } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    });

    function deletePostCallback() {
        props.history.push("/");
    }

    let postMarkup;

    if (!data) {
        postMarkup = <Loader active></Loader>;
    } else {
        const getPost = data.getPost;
        const {
            id,
            body,
            createdAt,
            username,
            comments,
            likes,
            likeCount,
            commentCount
        } = getPost;

        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>
                                    {moment(createdAt).fromNow()}
                                </Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton
                                    user={user}
                                    post={{ id, likeCount, likes }}
                                />
                                <Button
                                    as="div"
                                    labelPosition="right"
                                    onClick={() =>
                                        console.log("Comment on post")
                                    }
                                >
                                    <Button basic color="blue">
                                        <Icon name="comments" />
                                        {commentCount}
                                    </Button>
                                    <Label basic color="blue" pointing="left" />
                                </Button>
                                {user && user.username === username ? (
                                    <DeleteButton
                                        postId={id}
                                        callback={deletePostCallback}
                                    />
                                ) : (
                                    ""
                                )}
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    return postMarkup;
}

export default SinglePost;
