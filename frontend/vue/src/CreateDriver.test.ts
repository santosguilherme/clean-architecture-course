import { mount } from "@vue/test-utils";
import CreateDriverVue from "./CreateDriver.vue";
import DriverGateway from "./infra/gateway/DriverGateway";
import Driver from "./domain/Driver";

function sleep (time: number) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, time);
	})
};

test("creates a driver", async function () {
	const driverGateway: DriverGateway = {
		async save (driver: Driver): Promise<string> {
			return "98846fa9-7c06-4ad8-ac5f-9c96f50406bd";
		}
	};
	const wrapper = mount(CreateDriverVue, {
		global: {
			provide: {
				driverGateway
			}
		}
	});
	await wrapper.get(".driver-name").setValue("John Doe");
	await wrapper.get(".driver-email").setValue("john.doe@gmail.com");
	await wrapper.get(".driver-document").setValue("83432616074");
	await wrapper.get(".driver-car-plate").setValue("AAA9999");
	await wrapper.get(".create-driver-button").trigger("click");
	await sleep(200);
	expect(wrapper.get(".driver-id").text()).toHaveLength(36);
});