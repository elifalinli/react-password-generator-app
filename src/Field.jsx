import React from "react";

class Field extends React.Component {
    constructor(props) {
        super(props);
    }
    render() { 
      const valueLength = this.props.values ? this.props.values.length : 0
        return(
        <div className="container">
              <div className="field" >
                <label htmlFor="length">Length</label>
                <input
                  type="number"
                  id="length"
                  min={6}
                  max={12}
                  name="length"
                  value={valueLength}
                  onChange={this.props.handleInputChange}
                />
              </div>
              <div className="field">
                <label htmlFor="uppercase">Uppercase</label>
                <input
                  type="checkbox"
                  id="uppercase"
                  name="uppercase"
                  checked={this.props.values.uppercase}
                  onChange={this.props.handleInputChange}
                />
              </div>
              <div className="field">
                <label htmlFor="lowercase">Lowercase</label>
                <input
                  type="checkbox"
                  id="lowercase"
                  name="lowercase"
                  checked={this.props.values.lowercase}
                  onChange={this.props.handleInputChange}
                />
              </div>
              <div className="field">
                <label htmlFor="number">Number</label>
                <input
                  type="checkbox"
                  id="number"
                  name="number"
                  checked={this.props.values.number}
                  onChange={this.props.handleInputChange}
                />
              </div>
              <div className="field">
                <label htmlFor="symbol">Symbol</label>
                <input
                  type="checkbox"
                  id="symbol"
                  name="symbol"
                  checked={this.props.values.symbol}
                  onChange={this.props.handleInputChange}
                />
              </div>
            </div>
            )
    }
}
export default Field