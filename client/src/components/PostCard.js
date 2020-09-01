import React from "react";
import { Card, Icon, Label, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

function PostCard({
    post: { body, createdAt, id, username, likeCount, commentCount, likes }
}) {
    function likePost() {
        console.log("like post!");
    }

    function commentOnPost() {
        console.log("comment on post");
    }
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`1/posts/${id}`}>
                    {moment(createdAt).fromNow()}
                </Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button as="div" labelPosition="right" onClick={likePost}>
                    <Button color="teal" basic>
                        <Icon name="heart" />
                        Like
                    </Button>
                    <Label as="a" basic color="teal" pointing="left">
                        {likeCount}
                    </Label>
                </Button>
                <Button as="div" labelPosition="right" onClick={commentOnPost}>
                    <Button color="blue" basic>
                        <Icon name="comments" />
                        Like
                    </Button>
                    <Label as="a" basic color="blue" pointing="left">
                        {commentCount}
                    </Label>
                </Button>
            </Card.Content>
        </Card>
    );
}

export default PostCard;
