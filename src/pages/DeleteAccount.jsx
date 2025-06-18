import React, { useState } from 'react'

const DeleteAccount = () => {
    const [email,setEmail]=useState("")
    const handleSubmit=()=>{

    }
    return (
        <section>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="bg-white w-full max-w-lg rounded-lg shadow-md p-8">
                    <h1 className="text-2xl font-bold text-center mb-4">Citties<span className="text-blue-700"></span></h1>
                    <p className="text-center text-gray-700 mb-6">
                        To request that your Citties account be deleted permanently, kindly enter your email address,
                        and our team will get through to you with the necessary actions.
                    </p>
                    <form onSubmit={() => handleSubmit()} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block font-semibold mb-1">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="you@example.com"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold"
                        >
                            SUBMIT
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default DeleteAccount