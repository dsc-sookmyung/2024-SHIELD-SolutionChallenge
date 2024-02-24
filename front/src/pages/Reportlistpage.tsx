import styled from 'styled-components';
import Header from "../components/Header";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Report {
    id: number,
    cause: string,
    member:{
        name: string,
    }
    reportFireDate: string,
    reportFireTime: string,
    reportFirePlace: string,
}

const ReportlistpageStyle = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    /* overflow-y: scroll; */
`

const ListboxStyle = styled.div`
    width: 100%;
    height: 77vh;
    overflow-y: scroll;
    margin-top: 2vh;
`

const ReportListStyle = styled.div`
    height: 8vh;
    padding-left: 20px;
    border: 1px solid black;
    margin: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
`

const Reportlist = () => {
    const [reports, setReports] = useState<Report[]>([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/reports')
            .then(response => {
                setReports(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);
        
    return(
        <div className="Reportpage">
            <Header />
            <ReportlistpageStyle>
                <h3 id="page_title">Report List</h3>

                <ListboxStyle>
                {reports.map((report) => (
                    <Link to={`/report/${report.id}`} key={report.id}>
                        <ReportListStyle>
                            <h5>{report.reportFireDate} / {report.reportFireTime}</h5>
                        </ReportListStyle>
                    </Link>
                ))}
                </ListboxStyle>
            </ReportlistpageStyle>
        </div>
    )
}

export default Reportlist;