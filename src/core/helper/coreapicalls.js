import { API } from "../../backend";

export const getDonationBags = (userId, token, category, state, city) => {
  return fetch(
    `${API}/user/${userId}/availableDonationBags?category=${category}&state=${state}&city=${city}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getDonationRequests = (userId, token, category, state, city) => {
  return fetch(
    `${API}/user/${userId}/availableDonationRequests?category=${category}&state=${state}&city=${city}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//Accept donation bag
export const acceptDonationBag = (
  donationBagId,
  userId,
  token,
  donationBag
) => {
  console.log("donationBag:", donationBag);
  return fetch(`${API}/user/${userId}/donationBag/${donationBagId}/accept`, {
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

//Accept donation bag
export const acceptDonationRequest = (
  donationRequestId,
  userId,
  token,
  donationRequest
) => {
  console.log("donationRequest:", donationRequest);
  return fetch(
    `${API}/user/${userId}/donationRequest/${donationRequestId}/accept`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(donationRequest),
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
