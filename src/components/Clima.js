import React from 'react';

const Clima = ({resultado}) => {
    const{name,main} = resultado
    if(!name) return null
    //console.table(resultado)
    return (
        <div className="card-panel white col s12">
            <div className="black-text">
                <h2>El clima de {name} es:</h2>
                <p className="temperatura">
                    {main.temp} <span>&#x2103;</span>
                </p>
                <p>Temperatura Máxima: {main.temp_max} &#x2103;</p>
                <p>Temperatura Mínima: {main.temp_min} &#x2103;</p>
            </div>
        </div>
    );
};

export default Clima;