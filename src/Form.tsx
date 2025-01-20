import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import 'primereact/resources/themes/saga-blue/theme.css';  // Theme
import 'primereact/resources/primereact.min.css';          // Core CSS
import 'primeicons/primeicons.css';                        // Icons
import 'primeflex/primeflex.css';                          // PrimeFlex
import './Form.css';  // Import your custom styles

const Form: React.FC = () => {
  return (
    <div className="form-page p-fluid p-mt-5">
      <div className="grid mt-3 p-mb-3">
        <div className="col-12 md:col-6">
          <FloatLabel>
            <InputText id="firstName" className="w-100" />
            <label htmlFor="firstName">First Name</label>
          </FloatLabel>
        </div>
        <div className="col-12 md:col-6">
          <FloatLabel>
            <InputText id="lastName" className="w-100" />
            <label htmlFor="lastName">Last Name</label>
          </FloatLabel>
        </div>
      </div>
    <div className="grid justify-content-center mt-3">
      <div className="col-auto">
        <Button label="Submit" icon="pi pi-check" className="mr-2" />
      </div>
      <div className="col-auto">
        <Button label="Cancel" icon="pi pi-times" className="ml-2 p-button-secondary" />
      </div>
    </div>
    </div>
  );
}

export default Form;