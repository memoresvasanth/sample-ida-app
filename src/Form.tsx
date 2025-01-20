import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import 'primereact/resources/themes/saga-blue/theme.css';  // Theme
import 'primereact/resources/primereact.min.css';          // Core CSS
import 'primeicons/primeicons.css';                        // Icons
import 'primeflex/primeflex.css';                          // PrimeFlex
import 'bootstrap/dist/css/bootstrap.min.css';             // Bootstrap CSS
import './Form.css';  // Import your custom styles

const Form: React.FC = () => {
  return (
    <div className="form-page container-fluid">
      <div className="row mt-3 mb-3">
        <div className="col-md-6">
          <div className="p-float-label w-100">
            <InputText id="firstName" className="w-100" />
            <label htmlFor="firstName">Patient First Name</label>
          </div>
        </div>
        <div className="col-md-6">
          <div className="p-float-label w-100">
            <InputText id="lastName" className="w-100" />
            <label htmlFor="lastName">Patient Last Name</label>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-auto">
          <Button label="Submit" icon="pi pi-check" className="mr-2" />
        </div>
        <div className="col-auto">
          <Button label="Cancel" icon="pi pi-times" className="p-button-secondary" />
        </div>
      </div>
    </div>
  );
}

export default Form;