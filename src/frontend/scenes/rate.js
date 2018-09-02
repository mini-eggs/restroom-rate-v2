import { h, component } from "wigly";
import StarInput from "../components/star-input";
import EnsureUser from "../containers/ensure-user";
import User from "../containers/users";
import xhr from "../packages/xhr";

let Rate = component({
  data() {
    return {
      name: "",
      image: undefined,
      rating: 0,
      loading: false,
      error: undefined
    };
  },

  bind(key) {
    return event => this.setState(() => ({ [key]: event.target.value }));
  },

  handleImage(event) {
    let file = event.target.files[0];
    if (!file) return this.setState(() => ({ image: undefined }));
    let reader = new FileReader();
    reader.onloadend = () => this.setState(() => ({ image: reader.result }));
    reader.readAsDataURL(file);
  },

  handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    this.setState(() => ({ loading: true }), this.createNewRate);
  },

  handleRating(rating) {
    this.setState(() => ({ rating }));
  },

  async createNewRate() {
    let props = {
      name: this.state.name,
      rating: this.state.rating,
      image: this.state.image,
      user: this.props.user.id
    };
    let { error } = await xhr({ url: "/posts", method: "post", props });
    this.setState(() => ({ name: "", image: undefined, rating: 0, loading: false, error }));
  },

  handleErrorContinue() {
    this.setState(() => ({ error: undefined }));
  },

  render() {
    let loader = (
      <div>
        <h2>Loading...</h2>
      </div>
    );

    let error = (
      <div>
        <h2>{this.state.error}</h2>
        <button onclick={this.handleErrorContinue}>Continue</button>
      </div>
    );

    let form = (
      <form onsubmit={this.handleSubmit}>
        {this.state.image && <img style={styles.image} src={this.state.image} />}
        <input style={styles.input} type="file" oninput={this.handleImage} accept=".jpeg,.jpg,.png" />
        <input style={styles.input} type="text" oninput={this.bind("name")} value={this.state.name} />
        <StarInput oninput={this.handleRating} length={5} />
        <input style={styles.input} type="button" value="Submit" onclick={this.handleSubmit} />
      </form>
    );

    let rendered = (() => {
      switch (true) {
        case this.state.loading: {
          return loader;
        }
        case this.state.error !== undefined: {
          return error;
        }
        default: {
          return form;
        }
      }
    })();

    return <div style={styles.container}>{rendered}</div>;
  }
});

let styles = {
  container: {
    padding: "15px"
  },
  input: {
    margin: "15px auto",
    width: "100%"
  },
  image: {
    maxWidth: "100%",
    margin: "0 auto 15px"
  }
};

export default EnsureUser(User(Rate));
