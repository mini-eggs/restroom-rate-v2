import { h } from "wigly";
import { animationDuration, loadGoogleMap, getUserLocation } from "../constants";
import "./location-picker.css";

var LocationPicker = {
  data() {
    return { class: "location-picker" };
  },

  mounted(el) {
    // for smooth transitions
    setTimeout(this.setupMap, animationDuration);
  },

  async setupMap() {
    try {
      var [_, pos] = await Promise.all([loadGoogleMap(), getUserLocation()]);
      var el = document.querySelector("#map");
      var map = new google.maps.Map(el, { center: pos, zoom: 18, disableDefaultUI: true });
      var marker = new google.maps.Marker({ position: pos, draggable: true, map: map });
      marker.addListener("dragend", this.handleEvent);
      this.props.oninput(pos);
    } catch (e) {
      alert(e.toString());
    }
  },

  handleEvent(event) {
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    this.props.oninput({ lat, lng });
  },

  onContinue() {
    this.props.onconfirm();
    this.animateOut();
  },

  animateOut() {
    var close = () => setTimeout(this.closeModal, animationDuration);
    this.setState({ class: "location-picker out" }, close);
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
        <button class="continue" onclick={this.onContinue}>
          Continue
        </button>
      </div>
    );
  }
};

export default LocationPicker;
