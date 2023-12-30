import React from "react";
import cl from './MyTextArea.module.css'

const MyTextArea = (props) => {
    return (
        <textarea className={cl.myTextArea} {...props} />
    );
}

export default MyTextArea;