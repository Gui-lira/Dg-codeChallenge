import React, { useContext } from "react";

export default function FormInterface(stateArr) {
    const [wall, setAtribute] = useContext({
        doors: 0, windows: 0, heigth: 0, width: 0,
    });
    const onClick = () => {
        stateArr.push(wall);
        setAtribute({
            doors: 0, windows: 0, heigth: 0, width: 0,
        });
    };
    const onChange = (event) => {
        setAtribute({
            ...wall,
            [event.name]: event.value,
        })
    }
    return (
        <div>
            <input type="number" onChange={ onChange } name="doors" value={ wall.doors } placeholder="Portas" />
            <input type="number" onChange={ onChange } name="windows" values={ wall.windows } placeholder="Janelas" />
            <input type="number" onChange={ onChange } name="heigth" value={ wall.heigth } placeholder="Altura" />
            <input type="number" onChange={ onChange } name="heigth" value={ wall.width } placeholder="Largura" />
            <button type="button" onClick={ onClick }>Adicionar paredes</button>
        </div>
    )
};
