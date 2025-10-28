import axiosClient from "../api/axiosClient";

const UserAuth = {
  getAuthUser: async (endpoint: string): Promise<any> => {
    try {
      const response = await axiosClient.get(endpoint);
      return response.data;
    } catch (error: any) {
      console.log("Error getting user: ", error);
      throw error;
    }
  },

  createAuthUser: async (endpoint: string, data: any): Promise<any> => {
    try {
      const response = await axiosClient.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error("Error creating user: ", error);
      throw error;
    }
  },
};

export default UserAuth;
