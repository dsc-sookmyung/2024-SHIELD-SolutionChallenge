import styled from 'styled-components';
import Header from "../components/Header";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';

interface Report{
    id: number;
    reportFireDate: string;
    reportFireTime: string;
    reportFirePlace: string;
    cause: string;
    deathNum: number;
    injuryNum: number;
    theDead: string;
    theInjured: string;
    money: number;
    workerNum: number;
    equipNum: number;
    action: string;
    member: {
        name: string;
        department: string;
    }
}

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

const ReportdetailpageStyle = styled.div`
    width: 100%;
    height: 94vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
`

const Reportdetail = () => {
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

    const { id } = useParams<{ id: string }>();
    const [reports, setReports] = useState<Report[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
    if (id) {
        axios.get('http://localhost:8080/api/reports')
        .then(response => {
            const filteredReports = response.data.filter(
            (report: Report) => report.id === parseInt(id, 10)
            );
            setReports(filteredReports);
            console.log(filteredReports);

            setDate(filteredReports[0].reportFireDate);
            setTime(filteredReports[0].reportFireTime);
            setLocation(filteredReports[0].location);
            setCause(filteredReports[0].cause);
            setDeathnumber(filteredReports[0].deathNum)
            setInjurynumber(filteredReports[0].injuryNum)
            setDeathlist(filteredReports[0].theDead)
            setInjurylist(filteredReports[0].theInjured)
            setProperty(filteredReports[0].money)
            setNumber(filteredReports[0].workerNum)
            setEquipment(filteredReports[0].equipNum)
            setAction(filteredReports[0].action)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    }, [id]);

    const onReportFix = () => {
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

        axios.put(`http://localhost:8080/api/reports/${id}`, report)
        .then(response => {
            console.log(response.data);
            navigate("/reportlist") // 수정 후 페이지 이동
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    
    return(
        <div className="Reportpage">
            <Header />
            <ReportdetailpageStyle>
                <h3 id="page_title">Modify Report</h3>
                {reports && reports.map((report) => (
                    <>
                        <InputboxStyle>
                        <InfoNameStyle>
                            <FormDivStyle>
                                <H5Style>Writer</H5Style>
                                <InputStyle id="width_middle" defaultValue={report.member.name} readOnly/>
                            </FormDivStyle>

                            <FormDivStyle>
                                <H5Style>Competent fire station</H5Style>
                                <InputStyle id="width_middle" defaultValue={report.member.department} readOnly/>
                            </FormDivStyle>
                        </InfoNameStyle>

                        <InfoEventStyle>
                            <H4Style>Outline</H4Style>
                            <H5Style>Date and Time</H5Style>
                            <InputStyle type="date" onChange={e => setDate(e.target.value)} defaultValue={report.reportFireDate}/>
                            <InputStyle type="time" onChange={e => setTime(e.target.value)} defaultValue={report.reportFireTime} />

                            <H5Style>Place</H5Style>
                            <InputStyle defaultValue={report.reportFirePlace} readOnly/>

                            <H5Style>Cause</H5Style>
                            <InputStyle id="height_long" onChange={e => setCause(e.target.value)} defaultValue={report.cause}/>
                        </InfoEventStyle>

                        <InfoDamageStyle>
                            <H4Style>Damage Situation</H4Style>
                            <H5Style>Casualties</H5Style>
                            <InfoPeopleNum>
                                <FormDivStyle>
                                    <H5Style>The number of dead</H5Style>
                                    <ConnectDiv>
                                        <InputStyle id="width_short" onChange={e => setDeathnumber(Number(e.target.value))} defaultValue={report.deathNum}/>
                                        <H5Style>people</H5Style>
                                    </ConnectDiv>
                                </FormDivStyle>
                                <FormDivStyle>
                                    <H5Style>The number of injuries</H5Style>
                                    <ConnectDiv>
                                        <InputStyle id="width_short" onChange={e => setInjurynumber(Number(e.target.value))} defaultValue={report.injuryNum} />
                                        <H5Style>people</H5Style>
                                    </ConnectDiv>
                                </FormDivStyle>
                            </InfoPeopleNum>

                            <H5Style>A list of dead</H5Style>
                            <InputStyle id="height_long" onChange={e => setDeathlist(e.target.value)} defaultValue={report.theDead}/>

                            <H5Style>A list of injuries</H5Style>
                            <InputStyle id="height_long" onChange={e => setInjurylist(e.target.value)} defaultValue={report.theInjured}/>

                            <H5Style>Property damage</H5Style>
                            <ConnectDiv>
                                <InputStyle id="width_middle" onChange={e => setProperty(Number(e.target.value))} defaultValue={report.money}/>
                                <H5Style>KRW</H5Style>
                            </ConnectDiv>
                        </InfoDamageStyle>

                        <InfoMobilizationStyle>
                            <H4Style>Mobilization situation</H4Style>
                            <InfoPeopleNum>
                                <FormDivStyle>
                                    <H5Style>Personnel</H5Style>
                                    <ConnectDiv>
                                        <InputStyle id="width_short" onChange={e => setNumber(Number(e.target.value))} defaultValue={report.workerNum}/>
                                        <H5Style>people</H5Style>
                                    </ConnectDiv>
                                </FormDivStyle>
                                
                                <FormDivStyle>
                                    <H5Style>Equipment</H5Style>
                                    <ConnectDiv>
                                        <InputStyle id="width_short" onChange={e => setEquipment(Number(e.target.value))} defaultValue={report.equipNum}/>
                                        <H5Style>pieces</H5Style>
                                    </ConnectDiv>
                                </FormDivStyle>
                            </InfoPeopleNum>
                        </InfoMobilizationStyle>

                        <InfoActionStyle>
                            <H4Style>Action</H4Style>
                            <InputStyle id="height_long" onChange={e => setAction(e.target.value)} defaultValue={report.action}/>
                        </InfoActionStyle>
                    </InputboxStyle>
                </>
                ))}

                <InputButtonStyle>
                    <Button text="Submit" onClick={onReportFix}/>
                </InputButtonStyle>
            </ReportdetailpageStyle>
        </div>
    )
}

export default Reportdetail;