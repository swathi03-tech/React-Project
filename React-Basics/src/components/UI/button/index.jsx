import React from "react";
const Button = ({name,onclick}) => {
    return (
        <button className="greet" onClick={onclick}>{name}</button>
    )
}

export default Button;