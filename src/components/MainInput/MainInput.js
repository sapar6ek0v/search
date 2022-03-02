import React, {useState, useEffect, useRef} from 'react';
import Input from "../Input/Input.js";

const MainInput = () => {
    const [text, setText] = useState('')
    const [aboutCompany, setAboutCompany] = useState([])
    const item_name_ref = useRef()

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

    // const handleInput = () => {
    //         fetch(url, options)
    //             .then(response => response.json())
    //             .then(result => {
    //
    //             })
    //             .catch(error => console.log("error", error));
    // }

    useEffect(() => {
        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                setAboutCompany(result.suggestions)
                console.log(aboutCompany)
            })
            .catch(error => console.log("error", error));
    }, [text])


    return (
        <div>
            <div>
                <input
                    // value={text}
                    onChange={(e) => setText(e.target.value)}
                    ref={item_name_ref}
                    type="text"
                    list="companyNames"
                    id="companyName"
                    name="companyName"
                />
            </div>

            <datalist id="companyNames">
                {
                    aboutCompany.map(company => {
                        return (
                            <option key={company.data?.inn} value={company.value}/>
                        )
                    })
                }
            </datalist>
            {
                !aboutCompany.length ?   <div>
                    <Input title={'Краткое наименование'} />
                    <Input title={'Полное наименование'} />
                    <Input title={'ИНН / КПП'} />
                    <Input title={'Адрес'} />
                </div>  : aboutCompany
                    .filter(company => company.value === item_name_ref.current.value )
                    .map(it => {
                        return (
                            <>
                                <Input defaultValue={it.value} title={'Краткое наименование'} />
                                <Input defaultValue={it.data?.name?.full_with_opf} title={'Полное наименование'} />
                                <Input defaultValue={`${it.data?.inn}/${it.data?.kpp}`} title={'ИНН / КПП'} />
                                <Input defaultValue={it.data?.address?.value} title={'Адрес'} />
                            </>
                        )
                    })
            }


        </div>
    );
};

export default MainInput;