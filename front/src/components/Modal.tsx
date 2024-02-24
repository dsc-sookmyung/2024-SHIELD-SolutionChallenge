import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface ModalProps{
    title: string | null | undefined;
    latlng: google.maps.LatLng | null | undefined;
    onClick? : () => void;
}

interface ImageStyleProps {
    url: string;
}

const ModalWrap = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

const ModalBackGround = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 20;
  bottom: 0;
  left: 0;
`;

const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    padding: 15px 15px;
    border: 1px solid white;
    background-color: white;
    position: relative;
    z-index: 25;
    width: 360px;
    height: 80vh;
`;

const CloseButtonStyle = styled.div`
    display: flex;
    justify-content: flex-end;

    :hover{
        cursor: pointer;
    }
`

const ButtonboxStyle = styled.div`
    width: 100%;
    height: 5vh;
    display: flex;
    justify-content: center;
    margin: 10px 0px;
`

const InfoContainerStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const WeatherContainerStyle = styled.div`
    margin: 10px
`

const InforDivStyle = styled.div`
    padding: 5px 0px 0px 0px;
`

const ImageStyle = styled.div<ImageStyleProps>`
    width: 300px;
    height: 180px;
    margin-bottom: 5px;
    background-image: url(${props => props.url});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`

const Modal = ({ title, latlng, onClick }: ModalProps) =>{
    const [weatherData, setWeatherData] = useState<any>(null);
    const [date, setDate] = useState<string>("");
    const [time, setTime] = useState<string>("");
    const [percentage, setPercentage] = useState<string>("");
    const [imgurl, setImgurl] = useState<string>("");
  
    useEffect(() => {
        if(latlng){
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng.lat()}&lon=${latlng.lng()}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`)
            .then(response => response.json())
            .then(data => setWeatherData(data))
            .catch(error => console.error('Error:', error));

            if(latlng.lat() ===  37.5455){
                axios.get("http://localhost:8080/api/fire-Info/cam1")
                .then(response => {
                    setImgurl(response.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }

            else{
                axios.get("http://localhost:8080/api/fire-Info/cam2")
                .then(response => {
                    setImgurl(response.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }
        }
    }, [latlng]);

    useEffect(() => {
        setDate(imgurl.substring(68, 76))
        setTime(imgurl.substring(77, 83))
        setPercentage(imgurl.substring(89, 91))
    }, [imgurl])

    const getWindDirection = (deg: number) => {
        const directions = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
        const value = Math.floor((deg + 22.5) / 45);
        return directions[value % 8];
     };

    const navigate = useNavigate();

    const onSubmit = (title: string) => {
        navigate('/reportwrite', { state: { title } });
    }
    
  return (
    <ModalWrap>
        <ModalBackGround onClick={onClick} />
        <ModalContainer>
            <CloseButtonStyle>
                <FontAwesomeIcon icon={faClose} onClick={onClick}/>
            </CloseButtonStyle>

            <InfoContainerStyle>
                {title && (
                    <>
                        <h5>{title}</h5>
                        <ButtonboxStyle>
                            <Button text="Write Report" onClick={() => onSubmit(title)} />
                        </ButtonboxStyle>
                    </>
                )}
                {weatherData && (
                    <WeatherContainerStyle>
                        <InforDivStyle>Current temperature : {(weatherData.main.temp - 273.15).toFixed(2)} °C</InforDivStyle>
                        <InforDivStyle>Weather Information : {weatherData.weather[0].main} - {weatherData.weather[0].description}</InforDivStyle>
                        <InforDivStyle>Humidity : {weatherData.main.humidity} %</InforDivStyle>
                        <InforDivStyle>Wind direction : {getWindDirection(weatherData.wind.deg)}</InforDivStyle>
                        <InforDivStyle>Wind Speed : {weatherData.wind.speed} m/s</InforDivStyle>
                        <InforDivStyle>Cloud : {weatherData.clouds.all} %</InforDivStyle>
                    </WeatherContainerStyle>
                )}

                <ImageStyle url={imgurl} />
                <InforDivStyle>Date : {date}</InforDivStyle>
                <InforDivStyle>Time : {time}</InforDivStyle>
                <InforDivStyle>Percentage : {percentage} %</InforDivStyle>
                
            </InfoContainerStyle>
        </ModalContainer>
    </ModalWrap>
  );
}

export default Modal;
