import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button, Confirm, Icon } from "semantic-ui-react";

import { DELETE_POST, FETCH_POSTS_QUERY } from "../util/graphql";

function DeleteButton({ postId, callback }) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [deletePost] = useMutation(DELETE_POST, {
        update(proxy) {
            setConfirmOpen(false);

            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: {
                    getPosts: data.getPosts.filter((post) => post.id !== postId)
                }
            });

            if (callback) callback();
        },
        variables: {
            postId
        }
    });

    return (
        <>
            <Button
                as="div"
                color="red"
                floated="right"
                onClick={() => setConfirmOpen(true)}
            >
                <Icon name="trash" style={{ margin: 0 }} />
            </Button>
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deletePost}
                confirmButton="Yes"
                content="Are you sure you want to delete this post?"
            />
        </>
    );
}

export default DeleteButton;
