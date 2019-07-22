import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import 'mapbox-gl/dist/mapbox-gl.css';

class Mapbox {
	constructor(location) {
		this.accessToken = 'pk.eyJ1Ijoia2JveXoiLCJhIjoiY2p5NGsxYTdpMTc3bTNiczdhaHF6cGFuaiJ9.GnW4vOEe-3XN_y7f4KgFKQ';
		this.location = location;
	}

	init() {
		mapboxgl.accessToken = this.accessToken;

		const map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/kboyz/cjy4k348700im1clc3p8vn256',
			zoom: 5,
			maxZoom: 10
		});

		const bounds = new mapboxgl.LngLatBounds();

		// Create marker
		const el = document.createElement('div');
		el.className = 'marker';

		// Add marker
		new mapboxgl.Marker({
			element: el,
			anchor: 'bottom'
		})
		.setLngLat(this.location.coordinates)
		.addTo(map);

		// Add popup
		new mapboxgl.Popup({
			offset: 30
		})
		.setLngLat(this.location.coordinates)
		.setHTML(`${this.location.description}`)
		.addTo(map);

		// Extend map bounds to include current location
		bounds.extend(this.location.coordinates);

		map.fitBounds(bounds, {
			padding: {
				top: 200,
				bottom: 150,
				left: 100,
				right: 100
			}
		});
	}
}

export default Mapbox;