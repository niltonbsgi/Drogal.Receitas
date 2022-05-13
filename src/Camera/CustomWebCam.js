import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import './styles.scss'


//"environment"
 const CustomWebCam = () => {

  const videoConstraints = {
    width: 300,
    height: 300,
    facingMode: switchCam? "user": "environment"
  };

  const [isCaptureEnable, setCaptureEnable] = useState(false);
  const webcamRef = useRef(null);
  const [url, setUrl] = useState(null);
  const [switchCam, setSswitchCam] = useState(false);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
    }
  }, [webcamRef]);


  return (
    <div className="App">
      <div className="content">
        <Webcam
          audio={false}          
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />        
        <div className="conteiner">
          <div className="conteiner-item end">
            <button className="button is-success" id="btnScreenshot" onClick={capture}>
              <span className="icon is-small">
                <i className="fas fa-camera"></i>
              </span>
            </button>
          </div>
          <div className="conteiner-item start">
            <button className="button is-success" id="btnScreenshot" onClick={()=>setCaptureEnable(!switchCam)}>
              <span className="icon is-small">
                <i className="fas fa-random"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
      {url && (
        <div className="conteiner">
          <div>
            <button
              onClick={() => {
                setUrl(null);
              }}
            >
              Excluir
            </button>
          </div>
          <div className="conteiner-item">
            <img src={url} alt="Screenshot" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomWebCam;


  {/* <header>
        <h1>Aplicativo da câmera</h1>
      </header>
      {isCaptureEnable || (
        <button onClick={() => setCaptureEnable(true)}>começar</button>
      )}
      {isCaptureEnable && (
        <>
          <div>
            <button onClick={() => setCaptureEnable(false)}>capturar</button>
          </div>
          <div>
            <Webcam
              audio={false}
              width={540}
              height={360}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          </div>
          <button onClick={capture}>Capturar</button>
        </>
      )}
      {url && (
        <>
          <div>
            <button
              onClick={() => {
                setUrl(null);
              }}
            >
              Excluir
            </button>
          </div>
          <div>
            <img src={url} alt="Screenshot" />
          </div>
        </>
      )}
    </> */}