import React from "react";
import { toast } from "react-hot-toast";
import { FaClipboard } from "react-icons/fa";
import Field from "./Field";
import Header from "./Header";

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
      fieldsArray: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleClipboard = this.handleClipboard.bind(this);
  }
 
  handleOnSubmit = (e) => {
    e.preventDefault();
    const { values } = this.state;
  
    const charSets = [];
    if (values.uppercase) charSets.push(() => this.getRandomChar(65, 90));
    if (values.lowercase) charSets.push(() => this.getRandomChar(97, 122));
    if (values.number) charSets.push(() => this.getRandomChar(48, 57));
    if (values.symbol) charSets.push(() => this.getSymbol());
  
    const generatedPassword = Array.from({ length: values.length }, () => {
      const randomCharSet = charSets[Math.floor(Math.random() * charSets.length)];
      return randomCharSet();
    }).join('');
  
    this.setState({
      result: generatedPassword,
    });
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
        <div className="header">
           <Header/>
        </div>
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
              <div className="clipboard" onClick={this.handleClipboard} data-testid="clipboard">
                <FaClipboard></FaClipboard>
              </div>
            </div>
            <Field values={values} handleInputChange={this.handleInputChange}/>
            <button type="submit">Generate me a password!</button>
          </form>
        </div>
      </section>
    );
  }
}
export default App;
