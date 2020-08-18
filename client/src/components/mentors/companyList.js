import React, { Component } from "react";

class CompanyList extends Component {
  state = { show: false, redirect: false };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false, redirect: true });
  };
  render() {
    var companies = this.props.companies;
    return (
      <div>
        <div className='company-list'>
          <div className='list-header'>
            Companies
            <div className='right company-button'>
              <a
                className='btn-floating btn-small waves-effect waves-light blue'
                onClick={() => {
                  this.props.setScope("add");
                }}
              >
                <i className='material-icons'>+</i>
              </a>
            </div>
          </div>
          <div className='channel-list'>
            <span>Currently Active</span>
            <br />
            <br />
            {companies.map((item, index) => {
              if (item.isActive) {
                return (
                  <button
                    className='channel-button waves-effect'
                    key={item._id}
                    onClick={(e) => {
                      this.props.setscope(item._id);
                    }}
                  >
                    {item.name}
                  </button>
                );
              }
            })}
            <hr />
            {companies.map((item, index) => {
              if (!item.isActive) {
                return (
                  <button
                    disabled
                    className='channel-button waves-effect'
                    key={item._id}
                    onClick={(e) => {
                      this.props.setscope(item._id);
                    }}
                  >
                    {item.name}
                  </button>
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default CompanyList;
