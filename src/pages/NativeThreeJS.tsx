import { useEffect, useRef } from 'react';
import { createCore } from '../core';
import { Selector } from '../components/StageSelector/type';
import StageSelector from '../components/StageSelector';
import { PageName, SwitchPage } from '../App';

interface Props {
  switchPage: SwitchPage;
}

export default function NativeThreeJS({ switchPage }: Props) {
  const canvasDOM = useRef(null);
  const selectRef = useRef<Selector>(null);

  useEffect(() => {
    window.core = createCore(canvasDOM.current);
    selectRef.current?.change('fireworksShader');

    // Dispose
    return () => {
      window.core.destroy();
      window.core = null;
    };
  });

  return (
    <>
      <button style={{ position: 'fixed', top: 0, left: '40%', zIndex: 9999 }} onClick={() => switchPage(PageName.R3F)}>
        SwitchToR3F
      </button>
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
