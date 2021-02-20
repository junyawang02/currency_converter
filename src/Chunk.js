import React from 'react'

export default function Chunk(props) {
    const {
        currencyOptions,
        selectCurrency,
        onChangeCurrency,
        amount,
        onChangeAmount
    } = props

    return (
        <>
        <div style= {{textAlign: "left"}}>
            <text>
                CURRENCY:
            </text>
        </div>
        <div style= {{paddingBottom:5, paddingTop:5}}>
            <select value = {selectCurrency} onChange={onChangeCurrency}>
                {currencyOptions.map (option=> (
                    <option key={option}>{option}</option>
                ))}
            </select>
        </div>
        <div style= {{textAlign: "left"}}>
            <text>
                AMOUNT:
            </text>
        </div>
        <div style= {{paddingTop:5}}>
            <input type = "number" className="input" value = {amount} onChange={onChangeAmount}/>
        </div>
        </>
    )
}
