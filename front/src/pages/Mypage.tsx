import styled from 'styled-components';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface DataState {
    area: string;
    department: string;
    name: string;
    phoneNo: string;
    userId: string;
  }

const ChangemypageStyle = styled.div`
    width: 100%;
    height: 94vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const InputboxStyle = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`

const H5Style = styled.h5`
    margin: 5px 0px;
    font-size: 13px;
`

const InputStyle = styled.input`
    width: 300px;
    height: 40px;
    padding-left: 10px;
    margin: 5px 0px;
    border: 1px solid navy;
    border-radius: 3px;
`

const SelectStyle = styled.div`
`

const NamedivStyle = styled.div`
`

const IDdivStyle = styled.div`
    display: flex;
    flex-direction: column;
`

const BelongdivStyle = styled.div`
`

const AreadivStyle = styled.div`
  width: 300px;
`

const PhonedivStyle = styled.div`
`

const My = () => {
    const [data, setData]= useState<DataState | null>(null);

    useEffect(() => {
        const instance = axios.create({
            baseURL: 'http://localhost:8080',
            withCredentials: true
        });

        instance.post('/api/mypage')
        .then(response => {
            setData(response.data)
            console.log(response.data)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, []);

    return(
        <div className="mypage">
            <Header />
            <ChangemypageStyle>
            <h3 id="page_title">My Information</h3>

            <InputboxStyle>
            <NamedivStyle>
                <H5Style>Name</H5Style> 
                <InputStyle type="text" value={data ? data.name : ''} />
            </NamedivStyle>

            <IDdivStyle>
                <H5Style>ID</H5Style>
                <InputStyle type="text" value={data ? data.userId : ''}/>
            </IDdivStyle>

            <BelongdivStyle>
                <H5Style>Department</H5Style>
                <InputStyle type="text" value={data ? data.department : ''}/>
            </BelongdivStyle>

            <AreadivStyle>
                <H5Style>Jurisdiction</H5Style>
                <SelectStyle>
                {data ? data.area : ''}
                </SelectStyle>
            </AreadivStyle>

            <PhonedivStyle>
                <H5Style>Phone Number</H5Style>
                <InputStyle type="text" value={data ? data.phoneNo : ''}/>
            </PhonedivStyle>
            </InputboxStyle>
        </ChangemypageStyle>
      </div>
    )
}

export default My;