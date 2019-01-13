import {ipcRenderer} from 'electron';
import React, { Component } from 'react';
import axios from './axios';

import './css/App.css';
import './css/Logo.css';

import Welcome from './components/Welcome';
import Home from './components/Home';

import Clinics from './components/clinics/Clinics';
import NewClinic from './components/clinics/NewClinic';
import EditClinic from './components/clinics/EditClinic';

import Departments from './components/departments/Departments';
import NewDepartment from './components/departments/NewDepartment';
import EditDepartment from './components/departments/EditDepartment';

import Localizations from './components/localizations/Localizations';
import NewLocalization from './components/localizations/NewLocalization';
import EditLocalization from './components/localizations/EditLocalization';

import Doctors from './components/doctors/Doctors';
import NewDoctor from './components/doctors/NewDoctor';
import EditDoctor from './components/doctors/EditDoctor';

import Diseases from './components/diseases/Diseases';
import NewDisease from './components/diseases/NewDisease';
import EditDisease from './components/diseases/EditDisease';

import MedicalProcedures from './components/medical-procedures/MedicalProcedures';
import NewMedicalProcedure from './components/medical-procedures/NewMedicalProcedure';
import EditMedicalProcedure from './components/medical-procedures/EditMedicalProcedure';

const constants = require('./constants/pages');

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            panel: constants.WELCOME,
            edit: null,
            clinics: [],
            departments: [],
            localizations: [],
            doctors: [],
            medicalProcedures: [],
            diseases: [],
            patients: [],
            treatments: [],
            visits: [],
            visitors: []
        }
        this.changePanel = this.changePanel.bind(this);
        this.editItemHandler = this.editItemHandler.bind(this);

        this.getHandler = this.getHandler.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
        this.postHandler = this.postHandler.bind(this);
        this.putHandler = this.putHandler.bind(this);
    }

//----------------- DATABASE HANDLERS -----------------
    getHandler(table){
      axios.get( `/${table}/all` )
          .then( response => {
              const newData = response.data;
              switch (table){
                case constants.CLINICS:
                   this.setState({clinics: newData});
                case constants.DEPARTMENTS:
                   this.setState({departments: newData});
                case constants.LOCALIZATIONS:
                  this.setState({localizations: newData});
                case constants.DOCTORS:
                  this.setState({doctors: newData});
                case constants.DISEASES:
                  this.setState({diseases: newData});
                case constants.MEDICAL_PROCEDURES:
                  this.setState({medicalProcedures: newData});
                case constants.PATEINTS:
                  this.setState({patients: newData});
                case constants.TREATMENTS:
                 this.setState({treatments: newData});
                case constants.VISITS:
                 this.setState({visits: newData});
                case constants.VISITORS:
                 this.setState({visitors: newData});
                default:
                  break;
              }
          })
          .catch( error => {
              console.log(error);
          });
    }
    deleteHandler(table,id){
        axios.delete(`/${table}/${id}`)
            .then( response => {
                console.log(response);
                this.getHandler(table);
            })
            .catch( error => {
                console.log(error);
            });
    }
    putHandler(table, data){
        let id;
        if(table == constants.DOCTORS){
          id = data.pesel;
        }else{
          id = data.id;
        }
        axios.put(`/${table}/${id}`,data)
            .then( response => {
              console.log(response);
              this.getHandler(table);
            })
            .catch( error => {
                console.log(error);
            });
    }
    postHandler(table, data){
        axios.post(`/${table}`,data)
            .then( response => {
                console.log(response);
                this.getHandler(table);
            })
            .catch( error => {
                console.log(error);
            });
    }
//----------------- END DB HANDLERS -----------------

    editItemHandler(itemData){
      this.setState({edit: itemData});
    }

    changePanel(panel){
      this.setState({panel: panel})
    }

    panelSwitch(){
      switch (this.state.panel){
          case constants.EDIT_MEDICAL_PROCEDURE:
            return <EditMedicalProcedure
              changePanel={this.changePanel}
              data={this.state.edit}
              putHandler={this.putHandler}
            />;
          case constants.NEW_MEDICAL_PROCEDURE:
            return <NewMedicalProcedure
              changePanel={this.changePanel}
              postHandler={this.postHandler}
            />;
          case constants.MEDICAL_PROCEDURES:
            return <MedicalProcedures
              medicalProcedures={this.state.medicalProcedures}
              changePanel={this.changePanel}
              getHandler={this.getHandler}
              deleteHandler={this.deleteHandler}
              editItemHandler={this.editItemHandler}
              changePanel={this.changePanel}
            />;
          case constants.EDIT_DISEASE:
            return <EditDisease
              changePanel={this.changePanel}
              data={this.state.edit}
              putHandler={this.putHandler}
            />;
          case constants.NEW_DISEASE:
            return <NewDisease
              changePanel={this.changePanel}
              postHandler={this.postHandler}
            />;
          case constants.DISEASES:
            return <Diseases
              diseases={this.state.diseases}
              changePanel={this.changePanel}
              getHandler={this.getHandler}
              deleteHandler={this.deleteHandler}
              editItemHandler={this.editItemHandler}
              changePanel={this.changePanel}
            />;
          case constants.EDIT_DOCTOR:
            return <EditDoctor
              changePanel={this.changePanel}
              data={this.state.edit}
              putHandler={this.putHandler}
            />;
          case constants.NEW_DOCTOR:
            return <NewDoctor
              changePanel={this.changePanel}
              postHandler={this.postHandler}
            />;
          case constants.DOCTORS:
            return <Doctors
              doctors={this.state.doctors}
              changePanel={this.changePanel}
              getHandler={this.getHandler}
              deleteHandler={this.deleteHandler}
              editItemHandler={this.editItemHandler}
              changePanel={this.changePanel}
            />;
          case constants.EDIT_LOCALIZATION:
            return <EditLocalization
              changePanel={this.changePanel}
              data={this.state.edit}
              putHandler={this.putHandler}
            />;
          case constants.NEW_LOCALIZATION:
            return <NewLocalization
              changePanel={this.changePanel}
              postHandler={this.postHandler}
            />;
          case constants.LOCALIZATIONS:
            return <Localizations
              localizations={this.state.localizations}
              changePanel={this.changePanel}
              getHandler={this.getHandler}
              deleteHandler={this.deleteHandler}
              editItemHandler={this.editItemHandler}
              changePanel={this.changePanel}
            />;
          case constants.EDIT_DEPARTMENT:
            return <EditDepartment
              changePanel={this.changePanel}
              data={this.state.edit}
              putHandler={this.putHandler}
            />;
          case constants.NEW_DEPARTMENT:
            return <NewDepartment
              changePanel={this.changePanel}
              postHandler={this.postHandler}
            />;
          case constants.DEPARTMENTS:
            return <Departments 
              departments={this.state.departments}
              changePanel={this.changePanel}
              getHandler={this.getHandler}
              deleteHandler={this.deleteHandler}
              editItemHandler={this.editItemHandler}
              changePanel={this.changePanel}
            />;
          case constants.EDIT_CLINIC:
            return <EditClinic 
              changePanel={this.changePanel}
              data={this.state.edit}
              putHandler={this.putHandler}
            />;
          case constants.NEW_CLINIC:
            return <NewClinic 
              changePanel={this.changePanel}
              postHandler={this.postHandler}
            />;
          case constants.CLINICS:
            return <Clinics 
              clinics={this.state.clinics}
              changePanel={this.changePanel}
              getHandler={this.getHandler}
              deleteHandler={this.deleteHandler}
              editItemHandler={this.editItemHandler}
              changePanel={this.changePanel}
            />;
          case constants.WELCOME:
            return <Welcome changePanel={this.changePanel}/>;
          case constants.HOME:
            return <Home changePanel={this.changePanel}/>;
      }
    }

    render() {
        return (
          <div className={"App " + this.state.panel}>
              {this.panelSwitch()}
          </div>
        );
    }
}

export default App;

