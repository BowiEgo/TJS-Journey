import './App.css';
import { useEffect, useRef } from 'react';
import { createCore } from './core';
import { Selector } from './components/StageSelector/type';
import StageSelector from './components/StageSelector';

function App() {
    const canvasDOM = useRef(null);
    const selectRef = useRef<Selector>(null);

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
            <StageSelector ref={selectRef} />
        </>
    );
}

export default App;
