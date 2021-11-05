import React, { useState } from "react";

export default function FormInterface({stateArr, pushWall }) {
    const [wall, setAtribute] = useState({
        doors: 0, windows: 0, heigth: 0, width: 0,
    });
    const onClick = () => {
        pushWall(wall);
        setAtribute({
            doors: 0, windows: 0, heigth: 0, width: 0,
        });
    };
    const onChange = (event) => {
        const { name, value } = event.target;
        setAtribute({
            ...wall,
            [name]: value,
        })
    }
    return (
        <div>
            <h1>{`Foram adicionadas ${stateArr.length} paredes`}</h1>
            <label>
                Portas
                <input type="number" onChange={ onChange } name="doors" value={ wall.doors } placeholder="Portas" />
            </label>
            <label>
                Janelas
                <input type="number" onChange={ onChange } name="windows" values={ wall.windows } placeholder="Janelas" />
            </label>
            <label>
                Altura
                <input type="number" onChange={ onChange } name="heigth" value={ wall.heigth } placeholder="Altura" />
            </label>
            <label>
                Largura
                <input type="number" onChange={ onChange } name="width" value={ wall.width } placeholder="Largura" />
            </label>
            <button type="button" onClick={ onClick }>Adicionar paredes</button>
        </div>
    )
};
