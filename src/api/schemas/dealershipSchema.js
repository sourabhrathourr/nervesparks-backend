
export const dealershipSchema = {
  dealership_email: {
    type: String,
  },
  dealership_name: {
    type: String,
  },
  dealership_location: {
    type: String,
  },
  password: {
    type: String,
  },
  dealership_info: {
    type: Object,
  },
  cars: {
    type: Array,
  },
  deals: {
    type: Array,
  },
  sold_vehicles: {
    type: Array,
  },
};
