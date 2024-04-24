import React from 'react'
import './Car.css'
import ButtonPrimary from './ui/ButtonPrimary'
import ButtonSecondary from './ui/ButtonSecondary'

function Car({imgSrc, model, testDrive }) {
  return (
    <div className='car'>
        <div className="car__image">
            <img src={imgSrc} alt={model} />
        </div>
        <h2 className='car__model'>{model}</h2>
        <div className="car__actions">
            <ButtonPrimary name="order"/>
            {testDrive && <ButtonSecondary name="test drive"/>}
        </div>
        <div className="car__info">
            <span>Request a Call</span> to speak with a product specialist, value
        your trade-in or apply for leasing 
        </div>
    </div>
  )
}

export default Car