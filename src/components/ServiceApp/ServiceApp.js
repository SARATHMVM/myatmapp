import React, { Component } from "react";


class ServiceApp extends Component {
       constructor(props){
          super(props);
          this.state = {
          value: '',
          arry: [],
          cashWithdraw: false,
          error: {}
        }}
      
        valueChange(e) {
          var value = e.target.value;
          this.setState({
            value
          });
        }
      
        priceCalculation(stateValue) {
          const divideBy = [2000, 500, 200, 100];
          this.state.error = {};
          var resultArray = []; // getting array
          var total = stateValue; // input value get
          if(total<=10000 && (total.substr(-2)==='00')){
            let error={};
            error['message'] = ''
            this.setState({
              cashWithdraw: true              
            })
          }
          else{
            let error={};
            error['message'] = 'Enter within 10000 and multiples of 100'
            this.setState({
                error : error,
                cashWithdraw: false,    
            })
          }
      
          divideBy.map(c => {
            resultArray.push(Math.floor(total / c));
            total = total % c;
          });
          this.setState({
            arry: resultArray
          });
        }
      
        render() {
          const { arry } = this.state;
          return (
            <div className="App">
              <input
                type="text"
                value={this.state.value}
                onChange={e => this.valueChange(e)}
              />
              <button onClick={() => this.priceCalculation(this.state.value)}>
                Get Price
              </button>

              { this.state.cashWithdraw ? <div>
                {arry[0] ? <p>Please collect cash 2000: - {arry[0]}</p> : null}
                {arry[1] ? <p>Please collect cash 500: - {arry[1]}</p> : null}
                {arry[2] ? <p>Please collect cash 200: - {arry[2]}</p> : null}
                {arry[3] ? <p>Please collect cash 100: - {arry[3]}</p> : null}
              </div> : null
              }
              { this.state.error['message'] ?
                <div>
                <p>{this.state.error['message']}</p>
              </div> : null
              }
            </div>
          );
        }
      }

export default ServiceApp;
