import React, {useState, useEffect} from 'react';
import './MainInput.css'
import Input from "../Input/Input.js";

const MainInput = () => {
    const [text, setText] = useState('')
    const [aboutCompanies, setAboutCompanies] = useState([])
    const [company, setCompany] = useState({})
    const [show, setShow] = useState(false)

    const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party"
    const token = "f7c789f1f5e040a354b86ff6a437d881ded2055a"
    const query = text

    const options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({query})
    }


    useEffect(() => {
        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                setAboutCompanies(result.suggestions)
                setShow(true)
            })
            .catch(error => console.log("error", error));
    }, [text])


    const findByInn = (inn) => {
        fetch("https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token
            },
            body: JSON.stringify({query : inn, branch_type: "MAIN"})
          }).then(response => response.json())
            .then(result => {
                setCompany(result.suggestions[0])
                setShow(false)
                setText('')
            })
            .catch(error => console.log("error", error))
    }

    const handleInput = (e) => {
        setText(e)
    }

    return (
        <div className='info-page'>


            <div>
                <p className='rule-title'>Компания или ИП</p>
                <input
                    value={text}
                    onChange={(e) => handleInput(e.target.value)}
                    type="text"
                    className='rule-search-input'
                    placeholder='Введите название организации'
                />
            </div>


            <ul hidden={!show} className='ul-helper'>
                {
                    aboutCompanies.map(company => {
                        return (
                            <li
                                onClick={() => findByInn(company.data?.inn)}
                                className='li-helper'
                                key={company.data?.inn}
                            >
                                <p className='li-title'>{company.value}</p>
                                <p className='li-item'>
                                    <span>{company.data?.inn}</span>
                                    <span>{company.address?.value}</span>
                                </p>
                            </li>
                        )
                    })
                }
            </ul>

            <Input defaultValue={company.value} title={'Краткое наименование'} />
            <Input defaultValue={company.data?.name?.full_with_opf} title={'Полное наименование'} />
            <div className='input-block'>
                <div className='input-title'>ИНН / КПП</div>
                <input className='about-input' value={`${company.data?.inn ? company.data?.inn : ''}/${company.data?.kpp ? company.data?.kpp : '' }`} type="text"/>
            </div>
            <Input defaultValue={company.data?.address?.value} title={'Адрес'} />


        </div>
    );
};

export default MainInput;