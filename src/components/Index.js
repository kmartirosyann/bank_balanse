import React, { Component } from "react";

class Index extends Component {
  state = {
    savings:'',
    mySaving: 1000,
    overdraft: '',
    error: '',
    sum: 0,
    overdraftSum: 0,
    savingsSum:[1000],
    story: [{ item: 0, id: 0  }],
  };

  handleChange(e) {
    this.setState({error:''})
    this.setState({ [e.target.name]: e.target.value });
  }

  hendleOnclick = async () => {
  
    if (Number(this.state.savings) + 101000 - Number(this.state.overdraft) < -101000) {
     await this.setState({
        error:
          "One cannot withdraw more than the balance on a savings account. (balance + overdraft limit)",
      });
    } else if (this.state.savings < 0 || this.state.overdraft < 0) {
     await this.setState({
        error:
          "Only positive numeric values are allowed when specifying the deposit/withdraw amount.",
      });
    } else if (this.state.savings === "" && this.state.overdraft === "") {
     await this.setState({ error: " you didnt write input value " });
    } else  if(this.state.overdraft > 0){
        this.state.story.push({
          item: this.state.overdraft,
          id: Math.random() * 1000,
        });
        this.setState({ error: "" });     
      let num = this.state.story.reduce((sum, caunt) => Number(sum) + Number(caunt.item), 0);
      this.setState({ sum: num });
   
    }
    this.state.savingsSum.push(this.state.savings)
    let savingsNum =  this.state.savingsSum.reduce((acc,col)=>acc + Number(col))
    setInterval(()=>{
      if(this.state.mySaving < savingsNum){
        this.setState({mySaving:this.state.mySaving + 1})
      }
    })
  
    
  };

  onclickDilete = (id) => {
    const filter = this.state.story.filter((item) => {
      return item.id !== id;
    });
    this.setState({ story: filter });
  };

  hendleSubmit = (e) => {
    e.preventDefault();
      this.setState({ savings: '', overdraft: '' });
  };
  render() {
    console.log(this.state);
     return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <div className="card card-body">
              <h1 className="text-center mb-3">
                <i className="fas fa-user-plus"></i>Your balance{" "}
              </h1>
              <form onSubmit={this.hendleSubmit}>
                <div className="form-group">
                  <label className="alert alert-warning alert-dismissible fade show"
                    role="alert">your savings {this.state.mySaving} $</label>
                  <br />
                  <br />
                  <label htmlFor="name">will add your savings : $ </label>
                  <input
                    className="form-control"
                    type="number"
                    name="savings"
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.savings}
                  />
                </div>
                <div className="form-group">
                  <label className="textColor">{this.state.error}</label>
                  <br />
                  <br />
                  <label>to take your overdraft : $ </label>
                  <input
                    className="form-control"
                    type="number"
                    name="overdraft"
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.overdraft}
                  />
                </div>
                <div className="form-group">
                  <label> your overdraft : {this.state.sum} $</label>
                  <br />
                  <br />
                  <input
                    type="submit"
                    value="submit"
                    className="btn btn-primary btn-block"
                    onClick={this.hendleOnclick}
                  />
                  <br />
                  <br />
                </div>
              </form>
              <div className = "hidOver">
              {this.state.story.filter(item=>item.item !== 0)
              .map((item) => {
                return (
                  <div
                    className="alert alert-warning alert-dismissible fade show"
                    role="alert"
                    key={item.id}
                  >
                    {item.item}
                    <button
                      type="button"
                      className="close"
                      data-dismiss="alert"
                      aria-label="Close"
                      onClick={() => this.onclickDilete(item.id)}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                );
              })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;