import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { MultiSelect } from 'primereact/multiselect';
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

  return (
    <div className="form-page p-fluid">
      <div className="grid mt-3 mb-3">
        <div className="col-12 md:col-6">
          <FloatLabel>
            <InputText id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-100" />
            <label htmlFor="firstName">First Name</label>
          </FloatLabel>
        </div>
        <div className="col-12 md:col-6">
          <FloatLabel>
            <InputText id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-100" />
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
            <InputText id="medicalRecord" value={medicalRecord} onChange={(e) => setMedicalRecord(e.target.value)} className="w-100" />
            <label htmlFor="medicalRecord">Medical Record #</label>
          </FloatLabel>
        </div>
      </div>
      <div className="grid justify-content-center">
        <div className="col-auto">
          <Button label="Save" icon="pi pi-check" className="mr-2 p-button-success" />
        </div>
        <div className="col-auto">
          <Button label="Cancel" icon="pi pi-times" className="ml-2 p-button-secondary" />
        </div>
      </div>
    </div>
  );
}

export default Form;