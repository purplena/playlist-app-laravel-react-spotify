import React from "react";
import { Outlet } from "react-router-dom";

export default function Root() {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <a href="#">Test</a>
                    </li>
                    <li>
                        <a href="#">Test</a>
                    </li>
                </ul>
            </nav>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}
