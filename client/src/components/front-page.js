import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import SplitText from 'split-text-js'; 
gsap.registerPlugin(SplitText);

const FrontPage = () => {
    useEffect(() => {
        const titles = gsap.utils.toArray('.text-wrapper p'); 
        const tl = gsap.timeline({ repeat: -1 });

        titles.forEach((title) => {
            const splitTitle = new SplitText(title); 

            tl.from(splitTitle.chars, {
                opacity: 0,
                y: 10,
                rotateX: -90,
                stagger: .02, 
            }, "<") 

            .to(splitTitle.chars, {
                opacity: 0,
                y: -10,
                rotateX: 90,
                stagger: .02, 
            }, "<1"); 
        });

    }, []); 

    return (
        <div className='front-page'>
            <div className='text'>
                <h1>Get custom made </h1>
                <div className='text-wrapper'>
                    <p>Cups</p>
                    <p>T-shirts</p>
                    <p>Glasses</p>
                    <p>Stickers</p>
                    <p>Anything</p>
                </div>
            </div>
            <div className='front-image'>
                <img src='https://via.placeholder.com/300' alt='Placeholder' />
            </div>
        </div>
    );
}

export default FrontPage;