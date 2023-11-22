import React from "react";
import cls from './MyInput.module.css'

export const MyInput = (props) => {

    return (
        <input className={cls.myInput} {...props} />
    )
}



