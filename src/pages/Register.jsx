import React, {useEffect} from 'react';
import { useSearchParams } from "react-router-dom";

const Register = () => {
    const [searchParams] = useSearchParams();
    const query=searchParams.get("query");
    useEffect(() => {
        if (query) {
            window.location.href = `https://account.cittis.cc/?query=${query}`; // Redirect to the
        }
    }, [query]);

    return (
        <div class="flex items-center justify-center min-h-screen bg-gray-100">
            <div class="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
    )
}

export default Register
