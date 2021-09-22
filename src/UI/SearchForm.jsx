import React, { useState } from "react";
import { checkData, doSearch } from "../js/diploma";
import { SUBJECTS } from "../js/constants";

function EgeSubj(props) {
    return (
        <p>
            <label htmlFor={props.id}>{props.name}</label>
            <input type="number" min="0" max="100" placeholder="60" id={props.id} />
        </p>
    );
}

function EgeForm() {
    const names = Object.keys(SUBJECTS);
    const Forma = ({ arr }) => (
        <form>{arr.map(name => (
            <EgeSubj
                key={name}
                id={SUBJECTS[name]}
                name={name}
            />
        ))}</form>
    );

    return (
        <div className="ege" onChange={() => checkData(false)} >
            <Forma arr={names.slice(0, 4)} />
            <Forma arr={names.slice(4)} />
        </div>
    );
};

function SearchForm() {
    const [disabled, Enable] = useState(true);

    const fio = [
        { id: "LN", name: "Фамилия", placeholder: "Иванов" },
        { id: "FN", name: "Имя", placeholder: "Иван" },
        { id: "MN", name: "Отчество", placeholder: "Иванович" }
    ];

    // const FioForm = () => (

    // );

    const checkFio = form => Enable(!Boolean(form[0].value && form[1].value));

    return (
        <div>
            <div className="search">
                <div className="fio" onChange={() => checkData(true)} >
                    <form id="fio_form" autoComplete="on" onKeyUp={e => checkFio(e.target.form)}>
                        {fio.map(obj => (
                            <p key={obj.id}>
                                <label htmlFor={obj.id}>{obj.name}</label>
                                <input type="text" id={obj.id} placeholder={obj.placeholder} />
                            </p>
                        ))}
                        <p>
                            <label htmlFor="BD">Дата рождения</label>
                            <input type="date" id="BD" max="2005-01-01" min="1996-01-01" defaultValue="2002-01-01" />
                        </p>
                    </form>
                </div>
                <EgeForm />
            </div>
            <button disabled={disabled} onClick={doSearch}>Проверить</button>
        </div>
    );
}

export default SearchForm;;