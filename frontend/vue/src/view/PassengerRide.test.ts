import PassengerRideVue from "./PassengerRide.vue";
import RideGatewayHttp from "../infra/gateway/RideGatewayHttp";
import AxiosAdapter from "../infra/http/AxiosAdapter";
import { mount } from "@vue/test-utils";
import CreatePassengerVue from "./CreatePassenger.vue";
import PassengerGatewayHttp from "../infra/gateway/PassengerGatewayHttp";
import GeoLocation from "../infra/geolocation/GeoLocation";
import Coord from "../domain/Coord";

function sleep (time: number) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, time);
	})
};

test("the passenger calculates the ride price", async function () {
	const geoLocation: GeoLocation = {
		async getCoord (): Promise<Coord> {
			return new Coord(-27.584905257808835, -48.545022195325124);
		}
	}
	const wrapper = mount(PassengerRideVue, {
		global: {
			provide: {
				rideGateway: new RideGatewayHttp(new AxiosAdapter()),
				geoLocation
			}
		}
	});
	await wrapper.get(".ride-from-lat").setValue("-27.584905257808835");
	await wrapper.get(".ride-from-long").setValue("-48.545022195325124");
	await wrapper.get(".ride-to-lat").setValue("-27.496887588317275");
	await wrapper.get(".ride-to-long").setValue("-48.522234807851476");
	await wrapper.get(".calculate-ride-button").trigger("click");
	await sleep(2000);
	expect(wrapper.get(".ride-price").text()).toBe("21");
});

test("the passenger requests a ride", async function () {
	const wrapperCreatePassenger = mount(CreatePassengerVue, {
		global: {
			provide: {
				passengerGateway: new PassengerGatewayHttp(new AxiosAdapter())
			}
		}
	});
	await wrapperCreatePassenger.get(".passenger-name").setValue("John Doe");
	await wrapperCreatePassenger.get(".passenger-email").setValue("john.doe@gmail.com");
	await wrapperCreatePassenger.get(".passenger-document").setValue("83432616074");
	await wrapperCreatePassenger.get(".create-passenger-button").trigger("click");
	await sleep(2000);
	const passengerId = wrapperCreatePassenger.get(".passenger-id").text();
	const geoLocation: GeoLocation = {
		async getCoord (): Promise<Coord> {
			return new Coord(-27.584905257808835, -48.545022195325124);
		}
	}
	const wrapperPassengerRide = mount(PassengerRideVue, {
		global: {
			provide: {
				rideGateway: new RideGatewayHttp(new AxiosAdapter()),
				geoLocation
			}
		}
	});
	await wrapperPassengerRide.get(".ride-passenger-id").setValue(passengerId);
	await wrapperPassengerRide.get(".ride-from-lat").setValue("-27.584905257808835");
	await wrapperPassengerRide.get(".ride-from-long").setValue("-48.545022195325124");
	await wrapperPassengerRide.get(".ride-to-lat").setValue("-27.496887588317275");
	await wrapperPassengerRide.get(".ride-to-long").setValue("-48.522234807851476");
	await wrapperPassengerRide.get(".calculate-ride-button").trigger("click");
	await sleep(2000);
	await wrapperPassengerRide.get(".request-ride-button").trigger("click");
	await sleep(2000);
	expect(wrapperPassengerRide.get(".ride-id").text()).toHaveLength(36);
});