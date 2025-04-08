import axios from "axios"
import { useMutation, useQuery, } from "@tanstack/react-query";

export const getBanks=()=>{
const banks = axios.get('https://api.paystack.co/bank')
return banks
}

export const useCheckAccountNumber = () => {
   return useMutation({
    mutationFn: async (payload) => {
      return await axios.get(`https://api.paystack.co/bank/resolve?account_number=${payload.account_number}&bank_code=${payload.bank_code}&currency=NGN`, {
            headers: {
              Authorization: `Bearer sk_test_b089543969fecb2f49aa0731274c958a5d5d63a8`, // Add your token here
            },
          }).then((res) => {
       return res.data;
      });
    },
  });
};

export const useVerifyBvn = () => {
  return useMutation({
    mutationFn: (payload) => {
      return axios.post('https://lendnode.creditclan.com/myidentitypass/api/verify/bvn', payload);
    },
  });
};


export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (payload) => {
      return axios.post('http://localhost:5000/api/user/register', payload);
    },
  });
};


export const useLoginUser = () => {
  return useMutation({
    mutationFn: async(payload) => {
      const res = await axios.post("http://localhost:5000/api/user/login", payload);
    localStorage.setItem("token", res.data.token);
    return res.data.user;
    },
  });
};



export const useGetLoggedInUser = () => {
  return useQuery({
    queryKey: ["user"], // Query key should be an array
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/api/user/get-user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes (optional)
  });
};


