import { API } from "../../backend";

//donation Bag calls

//Create donation bag
export const createDonationBag = (userId, token, donationBag) => {
  return fetch(`${API}/user/${userId}/donationBag/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(donationBag),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//Get all donationBags
export const getAllDonationBags = () => {
  return fetch(`${API}/donationBags`, {
    method: "GET",
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

//Get all donationBags by user Id
export const getAllDonationBagsByUserId = (userId, token, status) => {
  return fetch(`${API}/user/${userId}/donationBags?status=${status}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      // console.log(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

//Get a donation bag
export const getDonationBag = (donationBagId) => {
  return fetch(`${API}/donationBag/${donationBagId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//Delete a donation bag
export const deleteDonationBag = (donationBagId, userId, token) => {
  return fetch(`${API}//user/${userId}/donationBag/${donationBagId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//Update a donation bag
export const updatedonationBag = (
  donationBagId,
  userId,
  token,
  donationBag
) => {
  return fetch(`${API}/user/${userId}/donationBag/${donationBagId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(donationBag),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//donation Request calls

//Create donation Request
export const createDonationRequest = (userId, token, donationRequest) => {
  return fetch(`${API}/user/${userId}/donationRequest/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(donationRequest),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//Get all donationRequests
export const getAllDonationRequests = () => {
  return fetch(`${API}/donationRequests`, {
    method: "GET",
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

//Delete a product
export const deleteDonationRequest = (donationRequestId, userId, token) => {
  return fetch(`${API}//user/${userId}/donationRequest/${donationRequestId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//Get all donation requests by user Id
export const getAllDonationRequestsByUserId = (userId, token, status) => {
  return fetch(`${API}/user/${userId}/donationRequests?status=${status}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log("response", response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

//Get a donation Request
export const getDonationRequest = (donationRequestId) => {
  return fetch(`${API}/donationRequest/${donationRequestId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//Update a donation Request
export const updatedonationRequest = (
  donationRequestId,
  userId,
  token,
  donationRequest
) => {
  return fetch(`${API}/user/${userId}/donationRequest/${donationRequestId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(donationRequest),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
