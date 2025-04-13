import React from 'react'

const CategoryCard = ({ category }: {
    category: {
        name: string,
        comment: string,
        score: number
    }
}) => {
    const { name, comment, score } = category
    return (
        <div id="single-category">
            <div className='text-2xl text-[var(--noble--black--300)]' >{name} ({score}/20): </div>
            <div id='comment' className='text-m text-[var(--noble--black--100)]' >
                <li>{
                    comment
                }</li>
            </div>
        </div>
    )
}

export default CategoryCard