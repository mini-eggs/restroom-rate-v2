import { h } from "wigly";
import StarInput from "../components/star-input";
import EnsureUser from "../containers/ensure-user";
import User from "../containers/users";
import xhr, { upload } from "../packages/xhr";

var Rate = {
  data() {
    return {
      name: "",
      image: undefined,
      uploaded: false,
      uploading: false,
      rating: 0,
      loading: false,
      error: undefined
    };
  },

  bind(key) {
    return event => this.setState(() => ({ [key]: event.target.value }));
  },

  handleImage(event) {
    var uploaded = false;

    var file = event.target.files[0];
    if (!file) return this.setState(() => ({ image: undefined, uploaded }));

    var reader = new FileReader();

    reader.onloadend = () => {
      var image = reader.result;
      this.setState(() => ({ image, uploaded, uploading: true }), this.imgurUpload);
    };

    reader.readAsDataURL(file);
  },

  async imgurUpload() {
    var res = await upload(this.state.image);
    var image = res.data.link;

    if (!image) {
      this.setState(() => ({ image: "", uploaded: false, uploading: false }));
      return;
    }

    this.setState(() => ({ image, uploaded: true, uploading: false }));
  },

  handleSubmit(event) {
    if (this.state.uploading || !this.state.uploaded) return;

    event.preventDefault();
    event.stopPropagation();

    this.setState(() => ({ loading: true }), this.createNewRate);
  },

  handleRating(rating) {
    this.setState(() => ({ rating }));
  },

  async createNewRate() {
    var props = {
      name: this.state.name,
      rating: this.state.rating,
      image: this.state.image,
      user: this.props.user.id
    };
    var { error } = await xhr({ url: "/posts", method: "post", props });
    this.setState(() => ({ name: "", image: undefined, rating: 0, loading: false, error }));
  },

  handleErrorContinue() {
    this.setState(() => ({ error: undefined }));
  },

  render() {
    var loader = (
      <div>
        <h2>Loading...</h2>
      </div>
    );

    var error = (
      <div>
        <h2>{this.state.error}</h2>
        <button onclick={this.handleErrorContinue}>Continue</button>
      </div>
    );

    var form = (
      <form onsubmit={this.handleSubmit}>
        {this.state.image && <img style={styles.image} src={this.state.image} />}
        {this.state.uploading && <div>Uploading to Imgur...</div>}
        <input style={styles.input} type="file" onchange={this.handleImage} accept=".jpeg,.jpg,.png" />
        <input style={styles.input} type="text" oninput={this.bind("name")} value={this.state.name} />
        <StarInput oninput={this.handleRating} length={5} />
        <input style={styles.input} type="button" value="Submit" onclick={this.handleSubmit} />
      </form>
    );

    var rendered = (() => {
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
};

var styles = {
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
