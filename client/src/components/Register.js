import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation, from } from "@apollo/react-hooks";

import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";
import { REGISTER_USER } from "../util/graphql";

function Register(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(addUserCallback, {
        username: "",
        password: "",
        email: "",
        confirmPassword: ""
    });

    const [addUser, { loading, error }] = useMutation(REGISTER_USER, {
        update(proxy, { data: { register: userData } }) {
            context.login(userData);
            props.history.push("/");
        },
        variables: values,
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        }
    });

    function addUserCallback() {
        addUser();
    }

    return (
        <div className="form-container">
            <Form
                onSubmit={onSubmit}
                noValidate
                className={loading ? "loading" : ""}
            >
                <h1>Register</h1>
                <Form.Input
                    label="Username"
                    placeholder="Enter your username..."
                    name="username"
                    type="text"
                    error={errors.username ? true : false}
                    value={values.username}
                    onChange={onChange}
                />
                <Form.Input
                    label="Email"
                    placeholder="Enter your email..."
                    name="email"
                    type="email"
                    error={errors.email ? true : false}
                    value={values.email}
                    onChange={onChange}
                />
                <Form.Input
                    label="Password"
                    placeholder="Enter your password..."
                    name="password"
                    type="password"
                    error={errors.password ? true : false}
                    value={values.password}
                    onChange={onChange}
                />
                <Form.Input
                    label="Confirm Password"
                    placeholder="Confirm Password..."
                    name="confirmPassword"
                    type="password"
                    error={errors.confirmPassword ? true : false}
                    value={values.confirmPassword}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Register
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map((value) => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Register;
