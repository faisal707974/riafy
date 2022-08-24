import React, { useEffect, useState } from 'react'
import './index.scss'
import axios from 'axios'

export default function Index() {

    const [suggestions, setSuggestions] = useState()
    const [text, setText] = useState()
    const [details, setDetails] = useState()

    async function searchText(e) {
        setText(e.target.value)
        if (text === '') {
            setSuggestions()
        }
        const res = await axios.get('http://localhost:4001/search/' + text)
        setSuggestions(res.data)
    }

    async function optionSelect() {
        setSuggestions()
        const res = await axios.get('http://localhost:4001/details/' + text)
        setDetails(res.data[0])
    }

    function optionChosen(value) {
        setText(value)
        optionSelect()
    }

    return (
        <>
            <div className="home">
                <div className='heading'>
                    <h1>Stocks</h1>
                </div>
                <div className='content'>
                    <div className='elements'>
                        <div className='titles'>
                            <h3>The easiest way to buy and sell stocks</h3>
                            <p>Stocks analysis and screening tool for investors in India</p>
                        </div>
                        <div className='input_field'>
                            <i className='fa fa-search' onClick={() => (optionSelect(text))}></i>
                            <input type="text" onChange={searchText} onKeyDown={(e) => e.key === 'Enter' && optionSelect(text)} value={text} />
                            <div className='suggestions'>
                                {
                                    suggestions && suggestions.map((obj, index) => {
                                        return (
                                            <p key={index} onClick={() => optionChosen(obj.Name)}> {obj.Name}</p>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        {
                            details &&
                            <div className='details'>
                                <h6>{details.Name}</h6>
                                <div className='stati'>
                                    <span>
                                        <p>Market Cap</p>
                                        <p>{details['Market Cap']}</p>
                                    </span>
                                    <span>
                                        <p>Divident Yield</p>
                                        <p>{details['Dividend Yield']}</p>
                                    </span>
                                    <span>
                                        <p>Debt Equality</p>
                                        <p>{details['Debt to Equity']}</p>
                                    </span>
                                    <span>
                                        <p>Current Price</p>
                                        <p>{details['Current Market Price']}</p>
                                    </span>
                                    <span>
                                        <p>ROCE</p>
                                        <p>{details['ROCE %']}</p>
                                    </span>
                                    <span>
                                        <p>Eps</p>
                                        <p>{details.EPS}</p>
                                    </span>
                                    <span>
                                        <p>Stock P/E</p>
                                        <p>{details['Stock P/E']}</p>
                                    </span>
                                    <span>
                                        <p>ROE</p>
                                        <p>{details['ROE Previous Annum']}</p>
                                    </span>
                                    <span>
                                        <p>Reserves</p>
                                        <p>{details.Reserves}</p>
                                    </span>
                                    <span>
                                        <p>Debt</p>
                                        <p>{details.Debt}</p>
                                    </span>
                                </div>
                            </div>
                        }
                    </div>
                </div>

            </div>
        </>
    )
}