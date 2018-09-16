import { h } from "wigly";
import xhr from "../packages/xhr";
import { animationDuration, loadGoogleMap, getUserLocation } from "../constants";
import "./neaby-map.css";

var LocationPicker = {
  data() {
    return {
      class: "nearby-map",
      map: null,
      showResearch: true
    };
  },

  mounted(el) {
    // for smooth transitions
    setTimeout(this.setupMap, animationDuration);
  },

  async setupMap() {
    var [_, pos] = await Promise.all([loadGoogleMap(), getUserLocation()]);
    var el = document.querySelector("#map");
    var map = new google.maps.Map(el, { center: pos, zoom: 18, disableDefaultUI: true });
    this.setState({ map }, () => this.getPosts(pos));
  },

  handleEvent(event) {
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
  },

  async getPosts(props) {
    var posts = await xhr({ url: "/posts/nearby", method: "post", props });
    for (let post of posts) {
      var position = { lat: post.lat, lng: post.lng };
      new google.maps.Marker({ position, map: this.state.map });
    }
  },

  onResearch() {
    var { lat, lng } = this.state.map.getCenter();
    lat = lat();
    lng = lng();
    this.getPosts({ lat, lng });
  },

  onContinue() {
    this.animateOut();
  },

  animateOut() {
    var close = () => setTimeout(this.closeModal, animationDuration);
    this.setState({ class: "nearby-map out" }, close);
  },

  closeModal() {
    document.dispatchEvent(new CustomEvent("modal:close"));
  },

  render() {
    return (
      <div class={this.state.class}>
        <div id="map" />
        <button class="close" onclick={this.animateOut}>
          <i class="material-icons">close</i>
        </button>
        {this.state.showResearch && (
          <button class="research" onclick={this.onResearch}>
            Research in this area
          </button>
        )}
      </div>
    );
  }
};

export default LocationPicker;
