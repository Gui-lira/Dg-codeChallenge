import React from 'react'

export default function RenderInk(ink) {
    const maped = Object.keys(ink).map((key) => {
        if (ink[key] !== 0) return (
            <div>
                <p>{`Você vai precisar de ${ink[key]} toneis de ${key} litros`}</p>
            </div>
        );
        return null;
    })
    return (
        <div>
            { maped }
        </div>
    );
};