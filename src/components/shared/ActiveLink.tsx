import {Link, LinkProps, useMatch, useResolvedPath} from "react-router-dom";
import React from "react";

export const ActiveLink = ({children, to, ...props}: LinkProps) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({path: resolved.pathname, end: true});

    return (
        <Link
            className={match ? "active" : ""}
            to={to}
            {...props}
        >
            {children}
        </Link>
    );
};