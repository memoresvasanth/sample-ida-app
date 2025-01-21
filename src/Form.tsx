import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { MultiSelect } from 'primereact/multiselect';
import { Sidebar } from 'primereact/sidebar';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import 'primereact/resources/themes/saga-blue/theme.css';  // Theme
import 'primereact/resources/primereact.min.css';          // Core CSS
import 'primeicons/primeicons.css';                        // Icons
import 'primeflex/primeflex.css';                          // PrimeFlex
import './Form.css';  // Import your custom styles

const Form: React.FC = () => {
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [age, setAge] = useState<number | null>(null);
  const [race, setRace] = useState<string[]>([]);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [maritalStatus, setMaritalStatus] = useState<string | null>(null);
  const [preferredLanguage, setPreferredLanguage] = useState<string | null>(null);
  const [smokingStatus, setSmokingStatus] = useState<string | null>(null);
  const [medicalRecord, setMedicalRecord] = useState<string | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [showUpload, setShowUpload] = useState<boolean>(false);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const toast = useRef<Toast>(null);

  const genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Others', value: 'Others' }
  ];

  const raceOptions = [
    { label: 'White', value: 'White' },
    { label: 'Black Or African American', value: 'Black Or African American' },
    { label: 'Asian', value: 'Asian' },
    { label: 'None of the above', value: 'None of the above' }
  ];

  const maritalStatusOptions = [
    { label: 'Married', value: 'Married' },
    { label: 'Never Married', value: 'Never Married' },
    { label: 'Widowed', value: 'Widowed' }
  ];

  const preferredLanguageOptions = [
    { label: 'English', value: 'English' },
    { label: 'Afar', value: 'Afar' },
    { label: 'Akan', value: 'Akan' }
  ];

  const smokingStatusOptions = [
    { label: 'Smoker', value: 'Smoker' },
    { label: 'Former Smoker', value: 'Former Smoker' },
    { label: 'Heavy Smoker', value: 'Heavy Smoker' }
  ];

  const handleUploadClick = () => {
    setShowUpload(true);
  };

  const handleUpload = (event: any) => {
    setShowUpload(false);
    setShowSummary(true);
  };

  return (
    <div className="form-page p-fluid">
      <Toast ref={toast} />
      <div className="grid mt-3 mb-3">
        <div className="col-12 md:col-6">
          <h2>Patient Information</h2>
        </div>
      </div>
      <div className="grid mt-3 mb-3">
        <div className="col-12 md:col-6">
          <FloatLabel>
            <InputText id="firstName" value={firstName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)} className="w-100" />
            <label htmlFor="firstName">First Name</label>
          </FloatLabel>
        </div>
        <div className="col-12 md:col-6">
          <FloatLabel>
            <InputText id="lastName" value={lastName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)} className="w-100" />
            <label htmlFor="lastName">Last Name</label>
          </FloatLabel>
        </div>
      </div>
      <div className="grid mt-3 mb-3">
        <div className="col-12 md:col-6">
          <FloatLabel>
            <Calendar id="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.value as Date | null)} className="w-100" />
            <label htmlFor="dateOfBirth">Date of Birth</label>
          </FloatLabel>
        </div>
        <div className="col-12 md:col-6">
          <FloatLabel>
            <Dropdown id="gender" value={gender} options={genderOptions} onChange={(e) => setGender(e.value)} className="w-100" placeholder="Select Gender" />
            <label htmlFor="gender">Gender</label>
          </FloatLabel>
        </div>
      </div>
      <div className="grid mt-3 mb-3">
        <div className="col-12 md:col-6">
          <FloatLabel>
            <InputNumber id="age" value={age} onValueChange={(e) => setAge(e.value as number | null)} className="w-100" />
            <label htmlFor="age">Age</label>
          </FloatLabel>
        </div>
        <div className="col-12 md:col-6">
          <FloatLabel>
            <MultiSelect id="race" value={race} options={raceOptions} onChange={(e) => setRace(e.value)} className="w-100" placeholder="Select Race" />
            <label htmlFor="race">Race</label>
          </FloatLabel>
        </div>
      </div>
      <div className="grid mt-3 mb-3">
        <div className="col-12 md:col-6">
          <FloatLabel>
            <Dropdown id="maritalStatus" value={maritalStatus} options={maritalStatusOptions} onChange={(e) => setMaritalStatus(e.value)} className="w-100" placeholder="Select Marital Status" />
            <label htmlFor="maritalStatus">Marital Status</label>
          </FloatLabel>
        </div>
        <div className="col-12 md:col-6">
          <FloatLabel>
            <Dropdown id="preferredLanguage" value={preferredLanguage} options={preferredLanguageOptions} onChange={(e) => setPreferredLanguage(e.value)} className="w-100" placeholder="Select Preferred Language" />
            <label htmlFor="preferredLanguage">Preferred Language</label>
          </FloatLabel>
        </div>
      </div>
      <div className="grid mt-3 mb-3">
        <div className="col-12 md:col-6">
          <FloatLabel>
            <Dropdown id="smokingStatus" value={smokingStatus} options={smokingStatusOptions} onChange={(e) => setSmokingStatus(e.value)} className="w-100" placeholder="Select Smoking Status" />
            <label htmlFor="smokingStatus">Smoking Status</label>
          </FloatLabel>
        </div>
        <div className="col-12 md:col-6">
          <FloatLabel>
            <InputText id="medicalRecord" value={medicalRecord} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMedicalRecord(e.target.value)} className="w-100" />
            <label htmlFor="medicalRecord">Medical Record #</label>
          </FloatLabel>
        </div>
      </div>
      <div className="grid justify-content-center mt-4">
        <div className="col-auto">
          <Button label="Save" icon="pi pi-check" className="mr-2 p-button-success" />
        </div>
        <div className="col-auto">
          <Button label="Cancel" icon="pi pi-times" className="ml-2 p-button-secondary" />
        </div>
      </div>
      <Button icon="pi pi-comments" className="p-button-rounded p-button-info chat-button" onClick={() => setVisible(true)} />
      <Sidebar visible={visible} position="right" onHide={() => setVisible(false)} style={{ width: '400px' }}>
        <div className="sidebar-header">
          <h3>EHR Crew</h3>
        </div>
        <div className="sidebar-search">
          <span className="p-inputgroup">
            <InputText placeholder="Type a message" />
            <Button icon="pi pi-send" className="p-button-primary" />
            <FileUpload name="demo[]" accept="application/pdf" customUpload uploadHandler={handleUpload} mode="basic" auto chooseLabel="Select File" className="p-button-secondary" />
            <Button icon="pi pi-microphone" className="p-button-secondary" />
          </span>
        </div>
        {showSummary && (
            <div className="summary">
            <h4>Summary</h4>
            <p>
              <Button
              icon={firstName === 'John' ? "pi pi-check" : "pi pi-arrow-left"}
              className={`p-button-primary p-button-sm p-button-square ${firstName === 'John' ? 'p-button-success' : ''}`}
              onClick={() => setFirstName(firstName === 'John' ? null : 'John')}
              />
              <span className="summary-text" style={{ paddingLeft: '10px' }}>
              First Name: <strong>{firstName || 'John'}</strong>
              </span>
            </p>
            
            <p>
              <Button
              icon={lastName === 'Doe' ? "pi pi-check" : "pi pi-arrow-left"}
              className={`p-button-primary p-button-sm p-button-square ${lastName === 'Doe' ? 'p-button-success' : ''}`}
              onClick={() => setLastName(lastName === 'Doe' ? null : 'Doe')}
              />
              <span className="summary-text" style={{ paddingLeft: '10px' }}>
              Last Name: <strong>{lastName || 'Doe'}</strong>
              </span>
            </p>
            <p>
              <Button
              icon={dateOfBirth?.toDateString() === new Date('1986-01-01').toDateString() ? "pi pi-check" : "pi pi-arrow-left"}
              className={`p-button-primary p-button-sm p-button-square ${dateOfBirth?.toDateString() === new Date('1986-01-01').toDateString() ? 'p-button-success' : ''}`}
              onClick={() => setDateOfBirth(dateOfBirth?.toDateString() === new Date('1986-01-01').toDateString() ? null : new Date('1986-01-01'))}
              />
              <span className="summary-text" style={{ paddingLeft: '10px' }}>
              DOB: <strong>{dateOfBirth ? dateOfBirth.toDateString() : '01/01/1986'}</strong>
              </span>
            </p>
            <p>
              <Button
              icon={gender === 'Male' ? "pi pi-check" : "pi pi-arrow-left"}
              className={`p-button-primary p-button-sm p-button-square ${gender === 'Male' ? 'p-button-success' : ''}`}
              onClick={() => setGender(gender === 'Male' ? null : 'Male')}
              />
              <span className="summary-text" style={{ paddingLeft: '10px' }}>
              Gender: <strong>{gender || 'Male'}</strong>
              </span>
            </p>
            <p>
              <Button
              icon={age === 67 ? "pi pi-check" : "pi pi-arrow-left"}
              className={`p-button-primary p-button-sm p-button-square ${age === 67 ? 'p-button-success' : ''}`}
              onClick={() => setAge(age === 67 ? null : 67)}
              />
              <span className="summary-text" style={{ paddingLeft: '10px' }}>
              Age: <strong>{age !== null ? age : '67'}</strong>
              </span>
            </p>
            <p>
              <Button
              icon={race.includes('White') ? "pi pi-check" : "pi pi-arrow-left"}
              className={`p-button-primary p-button-sm p-button-square ${race.includes('White') ? 'p-button-success' : ''}`}
              onClick={() => setRace(race.includes('White') ? [] : ['White'])}
              />
              <span className="summary-text" style={{ paddingLeft: '10px' }}>
              Race: <strong>{race.includes('White') ? 'White' : 'White'}</strong>
              </span>
            </p>
            <p>
              <Button
              icon={maritalStatus === 'Married' ? "pi pi-check" : "pi pi-arrow-left"}
              className={`p-button-primary p-button-sm p-button-square ${maritalStatus === 'Married' ? 'p-button-success' : ''}`}
              onClick={() => setMaritalStatus(maritalStatus === 'Married' ? null : 'Married')}
              />
              <span className="summary-text" style={{ paddingLeft: '10px' }}>
              Marital Status: <strong>{maritalStatus || 'Married'}</strong>
              </span>
            </p>
            <p>
              <Button
              icon={preferredLanguage === 'English' ? "pi pi-check" : "pi pi-arrow-left"}
              className={`p-button-primary p-button-sm p-button-square ${preferredLanguage === 'English' ? 'p-button-success' : ''}`}
              onClick={() => setPreferredLanguage(preferredLanguage === 'English' ? null : 'English')}
              />
              <span className="summary-text" style={{ paddingLeft: '10px' }}>
              Preferred Language: <strong>{preferredLanguage || 'English'}</strong>
              </span>
            </p>
            <p>
              <Button
              icon={smokingStatus === 'Smoker' ? "pi pi-check" : "pi pi-arrow-left"}
              className={`p-button-primary p-button-sm p-button-square ${smokingStatus === 'Smoker' ? 'p-button-success' : ''}`}
              onClick={() => setSmokingStatus(smokingStatus === 'Smoker' ? null : 'Smoker')}
              />
              <span className="summary-text" style={{ paddingLeft: '10px' }}>
              Smoking Status: <strong>{smokingStatus || 'Smoker'}</strong>
              </span>
            </p>
            <p>
              <Button
              icon={medicalRecord === '12345' ? "pi pi-check" : "pi pi-arrow-left"}
              className={`p-button-primary p-button-sm p-button-square ${medicalRecord === '12345' ? 'p-button-success' : ''}`}
              onClick={() => setMedicalRecord(medicalRecord === '12345' ? null : '12345')}
              />
              <span className="summary-text" style={{ paddingLeft: '10px' }}>
              Medical Record #: <strong>{medicalRecord || '12345'}</strong>
              </span>
            </p>
            <Button 
              label={firstName === 'John' && lastName === 'Doe' && dateOfBirth?.toDateString() === new Date('1986-01-01').toDateString() && gender === 'Male' && age === 67 && race.includes('White') && maritalStatus === 'Married' && preferredLanguage === 'English' && smokingStatus === 'Smoker' && medicalRecord === '12345' ? "Revert All" : "Apply All"} 
              icon={firstName === 'John' && lastName === 'Doe' && dateOfBirth?.toDateString() === new Date('1986-01-01').toDateString() && gender === 'Male' && age === 67 && race.includes('White') && maritalStatus === 'Married' && preferredLanguage === 'English' && smokingStatus === 'Smoker' && medicalRecord === '12345' ? "pi pi-arrow-right" : "pi pi-arrow-left"} 
              className="p-button-primary" 
              style={{ marginTop: '10px' }} 
              onClick={() => {
              const allSet = firstName === 'John' && lastName === 'Doe' && dateOfBirth?.toDateString() === new Date('1986-01-01').toDateString() && gender === 'Male' && age === 67 && race.includes('White') && maritalStatus === 'Married' && preferredLanguage === 'English' && smokingStatus === 'Smoker' && medicalRecord === '12345';
              if (allSet) {
              setFirstName(null);
              setLastName(null);
              setDateOfBirth(null);
              setGender(null);
              setAge(null);
              setRace([]);
              setMaritalStatus(null);
              setPreferredLanguage(null);
              setSmokingStatus(null);
              setMedicalRecord(null);
              } else {
              setFirstName('John');
              setLastName('Doe');
              setDateOfBirth(new Date('1986-01-01'));
              setGender('Male');
              setAge(67);
              setRace(['White']);
              setMaritalStatus('Married');
              setPreferredLanguage('English');
              setSmokingStatus('Smoker');
              setMedicalRecord('12345');
              }
              }}
            />
            </div>
        )}
      </Sidebar>
    </div>
  );
}

export default Form;