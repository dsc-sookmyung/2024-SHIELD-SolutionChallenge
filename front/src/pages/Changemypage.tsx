import styled from 'styled-components';
import Selectbox from '../components/Selectbox';
import Button from '../components/Button';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Option {
    value: string;
    name: string;
  }

const ChangemypageStyle = styled.div`
    width: 100%;
    height: 100vh;
    padding: 10px;
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

const InputButtonStyle = styled.div`
    width: 300px;
    height: 35px;
    display: flex;
    align-items: center;
    margin: 10px 0px;
`

const PwdivStyle = styled.div`
`

const BelongdivStyle = styled.div`
`

const AreadivStyle = styled.div`
  width: 300px;
`

const PhonedivStyle = styled.div`
`

const Changemy = () => {
    const navigate = useNavigate();

    const onChangemy = () => {
        navigate("/changemy")
    }

    const [docityselected, setdocitySelected] = useState('Seoul');
  const [docityfilteredOptions, docitysetFilteredOptions] = useState<Option[]>([]);
  // const [longitudeselected, setlongitudeSelected] = useState(127.0495556);
  // const [latitudeselected, setlatitudeSelected] = useState(37.514575);

  const fetchData = async () => {
    try {
      const response = await fetch('../../data/docity.xlsx');
      const arrayBuffer = await response.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      return XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchData().then((jsonData) => {
      const newFilteredOptions: Option[] = jsonData
        .filter((row: any[]) => row[1] === docityselected)
        .map((row: any[]) => ({
          value: row[2],
          name: row[2],
        }));

      docitysetFilteredOptions(newFilteredOptions);

      // if (newFilteredOptions.length > 0) {
      //   const selectedRow = jsonData.find((row: any[]) => row[2] === newFilteredOptions[0].value);
      //   if (selectedRow) {
      //     setlongitudeSelected(selectedRow[3]);
      //     setlatitudeSelected(selectedRow[4]);
      //   }
      // }
    });
  }, [docityselected]);

  const doChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setdocitySelected(e.target.value);
  };

  const doChangeSecondSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedValue = e.target.value;

    fetchData().then((jsonData) => {
      const selectedRow = jsonData.find((row: any[]) => row[2] === newSelectedValue);
      if (selectedRow) {
        // setlongitudeSelected(selectedRow[3]);
        // setlatitudeSelected(selectedRow[4]);
      }
    });
  };

    return(
        <ChangemypageStyle>
        <h3 id="page_title">내 정보 수정하기</h3>

        <InputboxStyle>
          <NamedivStyle>
              <H5Style>이름</H5Style> 
              <InputStyle/>
          </NamedivStyle>

          <IDdivStyle>
              <H5Style>아이디</H5Style>
              <InputButtonStyle>
                  <InputStyle/>
                  흠냐
              </InputButtonStyle>
          </IDdivStyle>

          <PwdivStyle>
              <H5Style>비밀번호</H5Style>
              <InputStyle/>
              <H5Style>비밀번호 확인</H5Style>
              <InputStyle/>
          </PwdivStyle>

          <BelongdivStyle>
              <H5Style>소속</H5Style>
              <InputStyle />
          </BelongdivStyle>

          <AreadivStyle>
              <H5Style>관할구역</H5Style>
              <SelectStyle>
              <Selectbox
                  docityselected={docityselected}
                  doChange={doChange}
                  docityfilteredOptions={docityfilteredOptions}
                  doChangeSecondSelect={doChangeSecondSelect}/>
              </SelectStyle>
          </AreadivStyle>

          <PhonedivStyle>
              <H5Style>연락처</H5Style>
              <InputStyle />
          </PhonedivStyle>

          <Button text="완료하기" onClick={onChangemy}/>
        </InputboxStyle>
      </ChangemypageStyle>
    )
}

export default Changemy;