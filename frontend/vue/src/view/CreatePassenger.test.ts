import { mount } from "@vue/test-utils";
import CreatePassengerVue from "./CreatePassenger.vue";
import PassengerGatewayHttp from "../infra/gateway/PassengerGatewayHttp";
import AxiosAdapter from "../infra/http/AxiosAdapter";


function sleep (time: number) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, time);
	})
};

test("creates a passenger", async function () {
	const wrapper = mount(CreatePassengerVue, {
		global: {
			provide: {
				passengerGateway: new PassengerGatewayHttp(new AxiosAdapter())
			}
		}
	});
	await wrapper.get(".passenger-name").setValue("John Doe");
	await wrapper.get(".passenger-email").setValue("john.doe@gmail.com");
	await wrapper.get(".passenger-document").setValue("83432616074");
	await wrapper.get(".create-passenger-button").trigger("click");
	await sleep(3000);
	expect(wrapper.get(".passenger-id").text()).toHaveLength(36);
});

test("does not create a passenger with invalid name", async function () {
	const wrapper = mount(CreatePassengerVue, {
		global: {
			provide: {
				passengerGateway: new PassengerGatewayHttp(new AxiosAdapter())
			}
		}
	});
	await wrapper.get(".passenger-name").setValue("John");
	await wrapper.get(".passenger-email").setValue("john.doe@gmail.com");
	await wrapper.get(".passenger-document").setValue("83432616074");
	await wrapper.get(".create-passenger-button").trigger("click");
	expect(wrapper.get(".error").text()).toBe("Invalid name");
});

test("does not create a passenger with invalid email", async function () {
	const wrapper = mount(CreatePassengerVue, {
		global: {
			provide: {
				passengerGateway: new PassengerGatewayHttp(new AxiosAdapter())
			}
		}
	});
	await wrapper.get(".passenger-name").setValue("John Doe");
	await wrapper.get(".passenger-email").setValue("john.doe@gmail");
	await wrapper.get(".passenger-document").setValue("83432616074");
	await wrapper.get(".create-passenger-button").trigger("click");
	expect(wrapper.get(".error").text()).toBe("Invalid email");
});

test("does not create a passenger with invalid document", async function () {
	const wrapper = mount(CreatePassengerVue, {
		global: {
			provide: {
				passengerGateway: new PassengerGatewayHttp(new AxiosAdapter())
			}
		}
	});
	await wrapper.get(".passenger-name").setValue("John Doe");
	await wrapper.get(".passenger-email").setValue("john.doe@gmail.com");
	await wrapper.get(".passenger-document").setValue("83432616075");
	await wrapper.get(".create-passenger-button").trigger("click");
	expect(wrapper.get(".error").text()).toBe("Invalid cpf");
});

test("creates a passenger after entering any invalid data", async function () {
	const wrapper = mount(CreatePassengerVue, {
		global: {
			provide: {
				passengerGateway: new PassengerGatewayHttp(new AxiosAdapter())
			}
		}
	});
	await wrapper.get(".passenger-name").setValue("John");
	await wrapper.get(".passenger-email").setValue("john.doe@gmail.com");
	await wrapper.get(".passenger-document").setValue("83432616074");
	await wrapper.get(".create-passenger-button").trigger("click");
	await wrapper.get(".passenger-name").setValue("John Doe");
	await wrapper.get(".create-passenger-button").trigger("click");
	await sleep(2000);
	expect(wrapper.get(".passenger-id").text()).toHaveLength(36);
	expect(wrapper.get(".error").text()).toBe("");
});