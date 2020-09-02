import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button, Confirm, Icon } from "semantic-ui-react";

import {
    DELETE_POST,
    DELETE_COMMENT,
    FETCH_POSTS_QUERY
} from "../util/graphql";

import TemplatePopup from "../util/TemplatePopup";

function DeleteButton({ postId, commentId, callback }) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const mutation = commentId ? DELETE_COMMENT : DELETE_POST;

    const [deletePostOrComment] = useMutation(mutation, {
        update(proxy) {
            setConfirmOpen(false);
            if (!commentId) {
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                });
                proxy.writeQuery({
                    query: FETCH_POSTS_QUERY,
                    data: {
                        getPosts: data.getPosts.filter(
                            (post) => post.id !== postId
                        )
                    }
                });
            }

            if (callback) callback();
        },
        variables: {
            postId,
            commentId
        }
    });

    return (
        <>
            <TemplatePopup
                content={commentId ? "Delete this comment" : "Delete this post"}
            >
                <Button
                    as="div"
                    color="red"
                    floated="right"
                    onClick={() => setConfirmOpen(true)}
                >
                    <Icon name="trash" style={{ margin: 0 }} />
                </Button>
            </TemplatePopup>
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deletePostOrComment}
                confirmButton="Yes"
                content="Are you sure you want to delete this post?"
            />
        </>
    );
}

export default DeleteButton;
