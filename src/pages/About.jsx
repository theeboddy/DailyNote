import React from "react";
import "../styles/About.css"
import book from '../icons/book.png'
const About = () => {
    return (

        <div className="aboutPage">
            <img src={book} className='book' />
            <div className="about_block">

                <h3>
                    DailyNote - твой личный веб-дневник, в котором ты можешь оставлять
                    свои записи о прошедшем дне в виде поста, приятного пользования!
                </h3>
            </div>
        </div>
    );
}

export default About;