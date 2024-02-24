import styled from 'styled-components';
import Header from "../components/Header";
import Button from "../components/Button";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

interface DataState {
    area: string;
    department: string;
    name: string;
    phoneNo: string;
    userId: string;
  }

const ReportwritepageStyle = styled.div`
    width: 100%;
    height: 94vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
`

const InputButtonStyle = styled.div`
    width: 360px;
    height: 35px;
    display: flex;
    align-items: center;
    margin: 10px 0px;
    justify-content: center;
`

const InfoNameStyle = styled.div`
    display: flex;
`

const InfoEventStyle = styled.div`

`

const InfoDamageStyle = styled.div`

`

const InfoPeopleNum = styled.div`
    display: flex;
`

const InfoMobilizationStyle = styled.div`

`

const InfoActionStyle = styled.div`
    width: 342px;
    align-self: flex-start;
`

const InputboxStyle = styled.div`
    height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
`

const H5Style = styled.h5`
    margin: 5px 3px;
    font-size: 13px;
`

const H4Style = styled.h4`
    width: 300px;
    margin: 10px 0px 15px 0px;
    padding-top: 10px;
    border-top: 2px dotted navy;
`

const InputStyle = styled.input`
    width: 300px;
    height: 40px;
    padding-left: 10px;
    margin: 5px 0px;
    border: 1px solid navy;
    border-radius: 3px;
    justify-content: center;
`

const FormDivStyle = styled.div`
    
`

const ConnectDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const Reportwrite = () => {
    const [date, setDate] = useState<string>("");
    const [time, setTime] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [cause, setCause] = useState<string>("");
    const [deathnumber, setDeathnumber] = useState<number>(0);
    const [injurynumber, setInjurynumber] = useState<number>(0);
    const [deathlist, setDeathlist] = useState<string>("");
    const [injurylist, setInjurylist] = useState<string>("");
    const [property, setProperty] = useState<number>(0);
    const [number, setNumber] = useState<number>(0);
    const [equipment, setEquipment] = useState<number>(0);
    const [action, setAction] = useState<string>("");

    const [data, setData]= useState<DataState | null>(null);

    const navigate = useNavigate();
    const uselocation = useLocation();
    const title = uselocation.state.title;

    const report = {
        reportFireDate: date,
        reportFireTime: time,
        reportFirePlace: location,
        cause: cause,
        deathNum: deathnumber,
        injuryNum: injurynumber,
        theDead: deathlist,
        theInjured: injurylist,
        money: property,
        workerNum: number,
        equipNum: equipment,
        action: action
    }

    const onReportwrite = () => {
        // navigate("/")
        axios.post('http://localhost:8080/api/reports/create', report)
        .then(response => {
            console.log(response.data);
            navigate("/reportlist")
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        const instance = axios.create({
            baseURL: 'http://localhost:8080',
            withCredentials: true
        });

        instance.get('/api/reports/create')
        .then(response => {
            setData(response.data)
        })
        .catch(error => {
            console.error('Error:', error);
        });

        setLocation(title);
    }, []);

    return(
        <div className="Reportpage">
            <Header />
            <ReportwritepageStyle>
                <h3 id="page_title">Write Report</h3>

                <InputboxStyle>
                    <InfoNameStyle>
                        <FormDivStyle>
                            <H5Style>Writer</H5Style>
                            <InputStyle id="width_middle" value={data? data.name : ''}/>
                        </FormDivStyle>

                        <FormDivStyle>
                            <H5Style>Competent fire station</H5Style>
                            <InputStyle id="width_middle" value={data? data.department : ''}/>
                        </FormDivStyle>
                    </InfoNameStyle>

                    <InfoEventStyle>
                        <H4Style>Outline</H4Style>
                        <H5Style>Date and Time</H5Style>
                        <InputStyle type="date" onChange={e => setDate(e.target.value)}/>
                        <InputStyle type="time" onChange={e => setTime(e.target.value)}/>

                        <H5Style>Place</H5Style>
                        <InputStyle value={title}/>

                        <H5Style>Cause</H5Style>
                        <InputStyle id="height_long" onChange={e => setCause(e.target.value)}/>
                    </InfoEventStyle>

                    <InfoDamageStyle>
                        <H4Style>Damage Situation</H4Style>
                        <H5Style>Casualties</H5Style>
                        <InfoPeopleNum>
                            <FormDivStyle>
                                <H5Style>The number of dead</H5Style>
                                <ConnectDiv>
                                    <InputStyle id="width_short" onChange={e => setDeathnumber(Number(e.target.value))}/>
                                    <H5Style>people</H5Style>
                                </ConnectDiv>
                            </FormDivStyle>
                            <FormDivStyle>
                                <H5Style>The number of injuries</H5Style>
                                <ConnectDiv>
                                    <InputStyle id="width_short" onChange={e => setInjurynumber(Number(e.target.value))}/>
                                    <H5Style>people</H5Style>
                                </ConnectDiv>
                            </FormDivStyle>
                        </InfoPeopleNum>

                        <H5Style>A list of dead</H5Style>
                        <InputStyle id="height_long" onChange={e => setDeathlist(e.target.value)}/>

                        <H5Style>A list of injuries</H5Style>
                        <InputStyle id="height_long" onChange={e => setInjurylist(e.target.value)}/>

                        <H5Style>Property damage</H5Style>
                        <ConnectDiv>
                            <InputStyle onChange={e => setProperty(Number(e.target.value))}/>
                            <H5Style>KRW</H5Style>
                        </ConnectDiv>
                    </InfoDamageStyle>

                    <InfoMobilizationStyle>
                        <H4Style>Mobilization situation</H4Style>
                        <InfoPeopleNum>
                            <FormDivStyle>
                                <H5Style>Personnel</H5Style>
                                <ConnectDiv>
                                    <InputStyle id="width_short" onChange={e => setNumber(Number(e.target.value))}/>
                                    <H5Style>people</H5Style>
                                </ConnectDiv>
                            </FormDivStyle>
                            
                            <FormDivStyle>
                                <H5Style>Equipment</H5Style>
                                <ConnectDiv>
                                    <InputStyle id="width_short" onChange={e => setEquipment(Number(e.target.value))}/>
                                    <H5Style>pieces</H5Style>
                                </ConnectDiv>
                            </FormDivStyle>
                        </InfoPeopleNum>
                    </InfoMobilizationStyle>

                    <InfoActionStyle>
                        <H4Style>Action</H4Style>
                        <InputStyle id="height_long" onChange={e => setAction(e.target.value)}/>
                    </InfoActionStyle>
                </InputboxStyle>

                <InputButtonStyle>
                    <Button text="Submit" onClick={onReportwrite}/>
                </InputButtonStyle>

            </ReportwritepageStyle>
        </div>
    )
}

export default Reportwrite;