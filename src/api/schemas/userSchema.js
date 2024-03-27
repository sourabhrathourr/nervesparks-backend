export const userSchema = {
  name: {
    type: String,
  },
  user_email: {
    type: String,
    required: true,
    unique: true,
  },
  user_location: {
    type: String,
  },
  userInfo: {
    type: Object,
  },
  password: {
    type: String,
    required: true,
  },
  vehicle_info: {
    type: Array,
  },
};
