import React, { useState, useEffect } from "react";

function Bank() {
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [cities, setCities] = useState([]);
    const [centers, setCenters] = useState([]);
    const [branches, setBranches] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedCenter, setSelectedCenter] = useState("");
    const [branchDetails, setBranchDetails] = useState(null);
    const [branchError, setBranchError] = useState(false);

    // Fetch states
    useEffect(() => {
        fetch("https://bank-apis.justinclicks.com/API/V1/STATE/")
            .then((response) => response.json())
            .then((data) => setStates(data || []));
    }, []);

    // Fetch districts when state is selected
    useEffect(() => {
        if (selectedState) {
            fetch(`https://bank-apis.justinclicks.com/API/V1/STATE/${selectedState}/`)
                .then((response) => response.json())
                .then((data) => setDistricts(data || []));
        }
    }, [selectedState]);

    // Fetch cities when district is selected
    useEffect(() => {
        if (selectedState && selectedDistrict) {
            fetch(
                `https://bank-apis.justinclicks.com/API/V1/STATE/${selectedState}/${selectedDistrict}/`
            )
                .then((response) => response.json())
                .then((data) => setCities(data || []))
                .catch((error) => {
                    console.error("Error fetching cities:", error);
                    setCities([]);
                });
        }
    }, [selectedDistrict, selectedState]);

    // Fetch centers when city is selected
    useEffect(() => {
        if (selectedState && selectedDistrict && selectedCity) {
            fetch(
                `https://bank-apis.justinclicks.com/API/V1/STATE/${selectedState}/${selectedDistrict}/${selectedCity}/`
            )
                .then((response) => response.json())
                .then((data) => setCenters(data || []))
                .catch((error) => {
                    console.error("Error fetching centers:", error);
                    setCenters([]);
                });
        }
    }, [selectedCity, selectedDistrict, selectedState]);

    // Fetch branches when center is selected
    useEffect(() => {
        if (selectedState && selectedDistrict && selectedCity && selectedCenter) {
            fetch(
                `https://bank-apis.justinclicks.com/API/V1/STATE/${selectedState}/${selectedDistrict}/${selectedCity}/${selectedCenter}/${selectedCenter}/`
            )
                .then((response) => response.json())
                .then((data) => {
                    setBranches(data || []);
                    setBranchError(data.length === 0);
                })
                .catch((error) => {
                    console.error("Error fetching branches:", error);
                    setBranches([]);
                    setBranchError(true);
                });
        }
    }, [selectedCenter, selectedCity, selectedDistrict, selectedState]);

    // Fetch branch details
    const fetchBranchDetails = (branchName) => {
        if (branchName) {
            fetch(
                `https://bank-apis.justinclicks.com/API/V1/STATE/${selectedState}/${selectedDistrict}/${selectedCity}/${selectedCenter}/${branchName}.json`
            )
                .then((response) => response.json())
                .then((data) => {
                    setBranchDetails(data || null);
                    setBranchError(!data);
                })
                .catch((error) => {
                    console.error("Error fetching branch details:", error);
                    setBranchDetails(null);
                    setBranchError(true);
                });
        }
    };

    return (
        <>
            <div className="text-4xl text-emerald-800 text-slate-600">Bank</div>

            {/* State Selection */}
            <div className="mt-4">
                <label className="block font-bold">Select State</label>
                <select
                    className="border p-2 rounded"
                    onChange={(e) => {
                        setSelectedState(e.target.value);
                        setSelectedDistrict("");
                        setSelectedCity("");
                        setSelectedCenter("");
                        setBranches([]);
                        setBranchDetails(null);
                    }}
                    value={selectedState}
                >
                    <option value="">--Select State--</option>
                    {states.map((state) => (
                        <option key={state} value={state}>
                            {state}
                        </option>
                    ))}
                </select>
            </div>

            {/* District Selection */}
            {selectedState && (
                <div className="mt-4">
                    <label className="block font-bold">Select District</label>
                    <select
                        className="border p-2 rounded"
                        onChange={(e) => {
                            setSelectedDistrict(e.target.value);
                            setSelectedCity("");
                            setSelectedCenter("");
                            setBranches([]);
                            setBranchDetails(null);
                        }}
                        value={selectedDistrict}
                    >
                        <option value="">--Select District--</option>
                        {districts.map((district) => (
                            <option key={district} value={district}>
                                {district}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* City Selection */}
            {selectedDistrict && (
                <div className="mt-4">
                    <label className="block font-bold">Select City</label>
                    <select
                        className="border p-2 rounded"
                        onChange={(e) => {
                            setSelectedCity(e.target.value);
                            setSelectedCenter("");
                            setBranches([]);
                            setBranchDetails(null);
                        }}
                        value={selectedCity}
                    >
                        <option value="">--Select City--</option>
                        {cities.length > 0 ? (
                            cities.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))
                        ) : (
                            <option value="">No cities available</option>
                        )}
                    </select>
                </div>
            )}

            {/* Center Selection */}
            {selectedCity && (
                <div className="mt-4">
                    <label className="block font-bold">Select Center</label>
                    <select
                        className="border p-2 rounded"
                        onChange={(e) => {
                            setSelectedCenter(e.target.value);
                            setBranches([]);
                            setBranchDetails(null);
                        }}
                        value={selectedCenter}
                    >
                        <option value="">--Select Center--</option>
                        {centers.length > 0 ? (
                            centers.map((center) => (
                                <option key={center} value={center}>
                                    {center}
                                </option>
                            ))
                        ) : (
                            <option value="">No centers available</option>
                        )}
                    </select>
                </div>
            )}

            {/* Branch Selection */}
            {selectedCenter && (
                <div className="mt-4">
                    <label className="block font-bold">Select Branch</label>
                    <select
                        className="border p-2 rounded"
                        onChange={(e) => fetchBranchDetails(e.target.value)}
                    >
                        <option value="">--Select Branch--</option>
                        {branches.length > 0 ? (
                            branches.map((branch) => (
                                <option key={branch.BRANCH} value={branch.BRANCH}>
                                    {branch.BRANCH}
                                </option>
                            ))
                        ) : (
                            <option value="">No branches available</option>
                        )}
                    </select>
                </div>
            )}

            {/* Display Branch Details or Error */}
            {branchError && selectedCenter && (
                <div className="mt-6 text-2xl font-bold text-red-500">
                    Branch is not available.
                </div>
            )}

            {branchDetails && (
                <div className="mt-4 p-4 border bg-gray-100 rounded">
                    <h3 className="text-xl font-semibold">{branchDetails.BRANCH} Branch Details</h3>
                    <p><strong>Bank:</strong> {branchDetails.BANK}</p>
                    <p><strong>IFSC:</strong> {branchDetails.IFSC}</p>
                    <p><strong>MICR:</strong> {branchDetails.MICR}</p>
                    <p><strong>Address:</strong> {branchDetails.ADDRESS}</p>
                    <p><strong>City:</strong> {branchDetails.CITY}</p>
                    <p><strong>District:</strong> {branchDetails.DISTRICT}</p>
                    <p><strong>State:</strong> {branchDetails.STATE}</p>
                    <p><strong>Contact:</strong> {branchDetails.CONTACT}</p>
                    <p><strong>RTGS:</strong> {branchDetails.RTGS ? "Yes" : "No"}</p>
                    <p><strong>NEFT:</strong> {branchDetails.NEFT ? "Yes" : "No"}</p>
                    <p><strong>IMPS:</strong> {branchDetails.IMPS ? "Yes" : "No"}</p>
                    <p><strong>UPI:</strong> {branchDetails.UPI ? "Yes" : "No"}</p>
                    <p><strong>SWIFT:</strong> {branchDetails.SWIFT || "N/A"}</p>
                </div>
            )}
        </>
    );
}

export default Bank;
