import React, { useContext, useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
    Loader,
    Grid,
    Card,
    Button,
    Icon,
    Label,
    Form
} from "semantic-ui-react";
import moment from "moment";

import { AuthContext } from "../context/auth";
import { CREATE_COMMENT, FETCH_POST_QUERY } from "../util/graphql";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

function SinglePost(props) {
    const postId = props.match.params.postId;
    const { user } = useContext(AuthContext);

    const [comment, setComment] = useState("");

    const { data } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    });

    const [submitComment] = useMutation(CREATE_COMMENT, {
        update() {
            setComment("");
        },
        variables: {
            postId,
            body: comment
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
                        {user ? (
                            <Card fluid>
                                <Card.Content>
                                    <p>Post a comment</p>
                                    <Form>
                                        <Form.Input
                                            placeholder="Enter comment..."
                                            name="body"
                                            onChange={(event) =>
                                                setComment(event.target.value)
                                            }
                                            value={comment}
                                        />
                                        <Button
                                            type="submit"
                                            color="teal"
                                            disabled={comment.trim() === ""}
                                            onClick={submitComment}
                                        >
                                            Submit
                                        </Button>
                                    </Form>
                                </Card.Content>
                            </Card>
                        ) : (
                            ""
                        )}
                        {comments.map((comment) => (
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                    {user &&
                                    user.username === comment.username ? (
                                        <DeleteButton
                                            postId={id}
                                            commentId={comment.id}
                                        />
                                    ) : (
                                        ""
                                    )}
                                    <Card.Header>
                                        {comment.username}
                                    </Card.Header>
                                    <Card.Meta>
                                        {moment(comment.createdAt).fromNow()}
                                    </Card.Meta>
                                    <Card.Description>
                                        {comment.body}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        ))}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    return postMarkup;
}

export default SinglePost;
