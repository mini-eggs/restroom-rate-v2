import { h } from "wigly";
import { loadGoogleMap } from "../constants";
import "./static-map.css";

export default {
  async mounted(el) {
    await loadGoogleMap();
    var position = this.props.position;
    var opts = { center: position, zoom: 18, disableDefaultUI: true };
    var map = new google.maps.Map(el, opts);
    new google.maps.Marker({ position, map });
  },

  render() {
    return <div class="static-map" />;
  }
};
