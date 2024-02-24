import styled from 'styled-components';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import "../styles/style.css";
import Selectbox from '../components/Selectbox';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';


interface Option {
    value: string;
    name: string;
  }
  

const SignuppageStyle = styled.div`
    width: 100%;
    height: 100vh;
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

const InputButtonStyle = styled.div`
    width: 300px;
    height: 35px;
    display: flex;
    align-items: center;
    margin: 10px 0px;
`

const PwdivStyle = styled.div`
`

const DepartmentdivStyle = styled.div`
`

const AreadivStyle = styled.div`
  width: 300px;
`

const PhonedivStyle = styled.div`
`

const TitleStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState<string>("");
    const [id, setId] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordcheck, setPasswordcheck] = useState<string>("");
    const [department, setDepartment] = useState<string>("");
    const [phonenumber, setPhonenumber] = useState<string>("");

    const [IdConfirm, setIdConfirm] = useState<boolean | null>(null);

    const onSignup = () => {
        // navigate("/")
        const currentArea = textdocityselected1 + " " + textdocityselected2;

        const user = {
          name: name,
          userId: id,
          password: password,
          passwordCheck: passwordcheck,
          department: department,
          area: currentArea,
          phoneNo: phonenumber
        };

        axios.post('http://localhost:8080/api/join', user, { withCredentials: true})
        .then(response => {
            console.log(response.data);
            navigate("/") // 회원가입 후 페이지 이동
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const idCheck = () => {
      axios.post(`http://localhost:8080/api/check/id`, { userId: id })
      .then(response => {
        setIdConfirm(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }

  const [docityselected, setdocitySelected] = useState('Select');
  const [docityfilteredOptions, docitysetFilteredOptions] = useState<Option[]>([]);
  const [textdocityselected1, setTextdocityselected1] = useState('서울특별시');
  const [textdocityselected2, setTextdocityselected2] = useState('강남구');

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
    });
  }, [docityselected]);
  

  const doChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setdocitySelected(selectedValue);
    setTextdocityselected1(e.target.options[e.target.selectedIndex].text);
  };  
  
  const doChangeSecondSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTextdocityselected2(e.target.options[e.target.selectedIndex].text);
  }
  
    
  return(
    <div className="Signuppage">
      <SignuppageStyle>
        <h3 id="page_title">Signup</h3>

        <InputboxStyle>
          <NamedivStyle>
              <H5Style>Name</H5Style> 
              <InputStyle onChange={e => setName(e.target.value)}/>
          </NamedivStyle>

          <IDdivStyle>
              <TitleStyle>
                <H5Style>Id</H5Style>
                {IdConfirm === false && <h6>The ID is duplicated.</h6>}  
                {IdConfirm === true && <h6>Available.</h6>}  
              </TitleStyle>
              <InputButtonStyle>
                  <InputStyle onChange={e => setId(e.target.value)} type='text'/>
                  <Button text="ID Check" length="short" onClick={idCheck} />
              </InputButtonStyle>
          </IDdivStyle>

          <PwdivStyle>
              <H5Style>Password</H5Style>
              <InputStyle onChange={e => setPassword(e.target.value)} type='password'/>
              <H5Style>Password Check</H5Style>
              <InputStyle onChange={e => setPasswordcheck(e.target.value)} type='password'/>
          </PwdivStyle>

          <DepartmentdivStyle>
              <H5Style>Department</H5Style>
              <InputStyle onChange={e => setDepartment(e.target.value)}/>
          </DepartmentdivStyle>

          <AreadivStyle>
              <H5Style>Jurisdiction</H5Style>
              <SelectStyle>
                <Selectbox
                    docityselected={docityselected}
                    doChange={doChange}
                    docityfilteredOptions={docityfilteredOptions}
                    doChangeSecondSelect={doChangeSecondSelect}/>
              </SelectStyle>
          </AreadivStyle>

          <PhonedivStyle>
              <H5Style>Phone Number</H5Style>
              <InputStyle onChange={e => setPhonenumber(e.target.value)}/>
          </PhonedivStyle>

          <Button text="SignUp" onClick={onSignup}/>
        </InputboxStyle>
      </SignuppageStyle>
    </div>
  )
}

export default Signup;