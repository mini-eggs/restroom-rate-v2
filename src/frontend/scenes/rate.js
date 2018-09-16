import { h } from "wigly";
import FileInput from "../components/file-input";
import StarInput from "../components/star-input";
import EnsureUser from "../containers/ensure-user";
import WithRouter from "../containers/with-router";
import xhr, { upload } from "../packages/xhr";
import cache from "../packages/cache";
import "./rate.css";

var Rate = {
  data() {
    return {
      name: "",
      desc: "",
      lat: undefined,
      lng: undefined,
      image: undefined,
      uploaded: false,
      uploading: false,
      rating: 0,
      loading: false,
      error: undefined,
      user: cache.user
    };
  },

  bind(key) {
    return event => this.setState(() => ({ [key]: event.target.value }));
  },

  handleImage(event) {
    var uploaded = false;

    var file = event.target.files[0];
    if (!file) return;

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

  handleRating(rating) {
    this.setState(() => ({ rating }));
  },

  handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    if (
      this.state.name &&
      this.state.desc &&
      this.state.rating &&
      !this.state.uploading &&
      this.state.uploaded &&
      this.state.image &&
      this.state.user
    ) {
      this.openLocationModal();
    }
  },

  async openLocationModal() {
    var LocationPicker = await import("../components/location-picker");
    var component = LocationPicker.default;
    var props = { oninput: this.onLocationChange, onconfirm: this.onRequestComplete };
    document.dispatchEvent(new CustomEvent("modal:open", { detail: { component, props } }));
  },

  onLocationChange({ lat, lng }) {
    this.setState({ lat, lng });
  },

  onRequestComplete() {
    if (
      this.state.name &&
      this.state.desc &&
      this.state.rating &&
      !this.state.uploading &&
      this.state.uploaded &&
      this.state.image &&
      this.state.user &&
      this.state.lat &&
      this.state.lng
    ) {
      this.setState(() => ({ loading: true }), this.createNewRate);
    }
  },

  async createNewRate() {
    var { name, lat, lng, desc, rating, image, user } = this.state;
    var props = { name, lat, lng, desc, rating, image, token: user.token };
    var data = await xhr({ url: "/posts", method: "post", props });
    this.props.router.route(`/discover/post/${data.id}`);
  },

  handleErrorContinue() {
    this.setState(() => ({ error: undefined }));
  },

  render() {
    var { loading, error } = this.state;
    return (
      <div class="rating-container">
        {loading && this.renderLoader()}
        {!loading && error !== undefined && this.renderError()}
        {!loading && error === undefined && this.renderForm()}
      </div>
    );
  },

  renderLoader() {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  },

  renderError() {
    return (
      <div class="rate-error">
        <h2>{this.state.error}</h2>
        <button onclick={this.handleErrorContinue}>Continue</button>
      </div>
    );
  },

  renderForm() {
    return (
      <form onsubmit={this.handleSubmit}>
        <FileInput loading={this.state.uploading} image={this.state.image} oninput={this.handleImage} />
        <div style={{ position: "relative", height: "7.5px" }}>
          <div class="star-rate-container ">
            <StarInput oninput={this.handleRating} length={5} />
          </div>
        </div>
        <input type="text" oninput={this.bind("name")} value={this.state.name} placeholder="Title" />
        <textarea oninput={this.bind("desc")} value={this.state.desc} name="description" placeholder="Description" />
        <input type="button" value="Submit" onclick={this.handleSubmit} />
      </form>
    );
  }
};

export default WithRouter(EnsureUser(Rate));
