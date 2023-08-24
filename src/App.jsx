import React from "react";
import { toast } from "react-hot-toast";
import { FaClipboard } from "react-icons/fa";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        length: 6,
        uppercase: true,
        lowercase: true,
        number: false,
        symbol: false,
      },
      result: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleClipboard = this.handleClipboard.bind(this);
  }
  handleOnSubmit = (e) => {
    e.preventDefault();
    let generatedPassword = "";
    const checkedFields = this.fieldsArray.filter(({ field }) => field);

    for (let i = 0; i < this.state.values.length; i++) {
      const index = Math.floor(Math.random() * checkedFields.length);
      const letter = checkedFields[index].getChar();
      if (letter) {
        generatedPassword += letter;
      }
      if (generatedPassword) {
        this.setState({
          result: generatedPassword,
        });
      }
    }
  };

  handleClipboard = async () => {
    if (this.state.result) {
      await navigator.clipboard.writeText(this.state.result);
      toast.success("Copied to your clipboard!");
    } else {
      toast.error("No password to copy.");
    }
  };
  handleInputChange = (event) => {
    const { name, type, checked, value } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    this.setState(
      (prevState) => ({
        values: {
          ...prevState.values,
          [name]: newValue,
        },
      }),
      () => {
        this.fieldsArray = [
          {
            field: this.state.values.uppercase,
            getChar: () => this.getRandomChar(65, 90),
          },
          {
            field: this.state.values.lowercase,
            getChar: () => this.getRandomChar(97, 122),
          },
          {
            field: this.state.values.number,
            getChar: () => this.getRandomChar(48, 57),
          },
          {
            field: this.state.values.symbol,
            getChar: () => this.getSymbol(),
          },
        ];
      }
    );
  };
  getSymbol = () => {
    const specialChar = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~'";
    return specialChar[Math.floor(Math.random() * specialChar.length)];
  };

  getRandomChar = (min, max) => {
    const limit = max - min + 1;
    return String.fromCharCode(Math.floor(Math.random() * limit) + min);
  };

  render() {
    const { values, result } = this.state;

    return (
      <section>
        <div className="container">
          <form id="pg-form" onSubmit={this.handleOnSubmit}>
            <div className="result">
              <input
                type="text"
                id="result"
                placeholder="Minimum of 6 character"
                readOnly
                value={result}
              />
              <div className="clipboard" onClick={this.handleClipboard}>
                <FaClipboard></FaClipboard>
              </div>
            </div>
            <div>
              <div className="field">
                <label htmlFor="length">Length</label>
                <input
                  type="number"
                  id="length"
                  min={6}
                  max={12}
                  name="length"
                  value={values.length}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="field">
                <label htmlFor="uppercase">Uppercase</label>
                <input
                  type="checkbox"
                  id="uppercase"
                  name="uppercase"
                  checked={values.uppercase}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="field">
                <label htmlFor="lowercase">Lowercase</label>
                <input
                  type="checkbox"
                  id="lowercase"
                  name="lowercase"
                  checked={values.lowercase}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="field">
                <label htmlFor="number">Number</label>
                <input
                  type="checkbox"
                  id="number"
                  name="number"
                  checked={values.number}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="field">
                <label htmlFor="symbol">Symbol</label>
                <input
                  type="checkbox"
                  id="symbol"
                  name="symbol"
                  checked={values.symbol}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <button type="submit">Generate me a password!</button>
          </form>
        </div>
      </section>
    );
  }
}
export default App;
