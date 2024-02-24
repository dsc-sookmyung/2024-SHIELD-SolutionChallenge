import styled from 'styled-components';
import '../styles/style.css';

interface Option {
    value: string;
    name: string;
}
  
interface SelectboxProps {
    docityselected: string;
    doChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    docityfilteredOptions: Option[];
    doChangeSecondSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectboxStyle = styled.div`
  height: 4vh;
  margin: 1vh;
`;

const docityList: Option[] = [
    { value: 'Choose Your Jurisdiction', name: 'Select'},
    { value: 'Seoul', name: 'Seoul' },
    { value: 'Busan', name: 'Busan' },
    { value: 'Daegu', name: 'Daegu' },
    { value: 'Incheon', name: 'Incheon' },
    { value: 'Gwangju', name: 'Gwangju' },
    { value: 'Daejeon', name: 'Daejeon' },
    { value: 'Ulsan', name: 'Ulsan' },
    // { value: "Sejong", name: "세종특별자치시" },
    { value: 'Gyeonggi-do', name: 'Gyeonggi-do' },
    { value: 'Gangwon-do', name: 'Gangwon-do' },
    { value: 'Chungcheong-do', name: 'Chungcheong-do' },
    { value: 'Jeonla-do', name: 'Jeonla-do' },
    { value: 'Gyeongsang-do', name: 'Gyeongsang-do' },
    { value: 'Jeju', name: 'Jeju' },
  ];
  
const Selectbox: React.FC<SelectboxProps> = ({
    docityselected,
    doChange,
    docityfilteredOptions,
    doChangeSecondSelect,
  }) => {
    return (
      <SelectboxStyle className='selectBox'>
        <select onChange={doChange} className='select' value={docityselected}>
          {docityList.map((item) => {
            return (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            );
          })}
        </select>
        {docityfilteredOptions && docityfilteredOptions.length > 0 && (
          <select onChange={doChangeSecondSelect} className='select'>
            {docityfilteredOptions.map((item, index) => {
              return (
                <option value={item.value} key={index}>
                  {item.name}
                </option>
              );
            })}
          </select>
        )}
      </SelectboxStyle>
    );
  };
  
  export default Selectbox;
  