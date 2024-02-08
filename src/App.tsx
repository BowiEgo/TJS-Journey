import './App.css';
import { useEffect, useRef } from 'react';
import { createCore } from './core';
import Select from './Select';

function App() {
    const canvasDOM = useRef(null);
    const selectRef = useRef<Select>(null);

    useEffect(() => {
        window.core = createCore(canvasDOM.current);
        selectRef.current?.change('portal');
    });

    return (
        <>
            <canvas className="webgl" ref={canvasDOM}></canvas>
            <div className="loading-bar"></div>
            <div className="form"></div>
            <div className="point-container">
                <div className="point point-0"></div>
                <div className="point point-1"></div>
                <div className="point point-2"></div>
            </div>
            <Select ref={selectRef} />
        </>
    );
}

export default App;
