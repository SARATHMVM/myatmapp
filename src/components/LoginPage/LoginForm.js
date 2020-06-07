import React, { Component } from 'react';
import { Panel, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import ServiceApp from '../ServiceApp/ServiceApp'
import {
  Route
} from 'react-router-dom';
import './LoginPage.css';




const buttonStyle = {
  marginBottom: 0
};

const ServiceAppLink= () => (
  <ServiceApp />
);


class LoginForm extends Component {
  constructor(props){
    super(props);

    this.state = {
        fields: {},
        errors: {},
        valid : false,
    }
 }

 handleValidation(){
     let fields = this.state.fields;
     let errors = {};
     let formIsValid = true;

     //Name
     if(!fields["name"]){
        formIsValid = false;
        errors["name"] = "Password Cannot be empty";
     }

     if(typeof fields["name"] !== "undefined"){
       debugger;
        if(fields["name"].length <8){
           formIsValid = false;
           errors["name"] = "Please use more than 8 characters";
        }        
     }

     //Email
     if(!fields["email"]){
        formIsValid = false;
        errors["email"] = "Email Cannot be empty";
     }

     if(typeof fields["email"] !== "undefined"){
        let lastAtPos = fields["email"].lastIndexOf('@');
        let lastDotPos = fields["email"].lastIndexOf('.');

        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
           formIsValid = false;
           errors["email"] = "Email is not valid";
         }
    }  

    this.setState({valid: formIsValid,errors:errors});
    return formIsValid;
}

contactSubmit(e){
     e.preventDefault();
     if(this.handleValidation()){
        return true;
     }else{
        return false;
     }
 }

 handleChange(field, e){         debugger;
     let fields = this.state.fields;
     fields[field] = e.target.value;        
     this.setState({fields});
 }

 render(){
     return (
      <div className='divStyle'>
        <Panel className='panelStyle'>  
        {!this.state.valid ?     
            <form name="contactform" className="contactform" onSubmit= {this.contactSubmit.bind(this)}>
                 <div className="col-md-6">
                   <fieldset>
                        <input refs="email" type="text" size="30" placeholder="Email" onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]}/>
                        {this.state.errors["email"]?<p style={{color: "red"}}>{this.state.errors["email"]}</p>:null} 
                        <input ref="name" type="text" size="30" placeholder="Password" onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]}/>
                       {this.state.errors["name"]?<p style={{color: "red"}}>{this.state.errors["name"]}</p>:null} 
                  </fieldset>
               </div>
              <Button bsStyle="primary" type="submit">
                Login
              </Button>
           </form>: null}
           {this.state.valid ?  <Route path="/login" component={ServiceAppLink} />: null}
           </Panel>
         </div>
   )
 }
}

export default LoginForm;
