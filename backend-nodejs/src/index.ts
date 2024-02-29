import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

// Example to identify a user from your backend
async function identifyUser() {
  // User information -- these are custom data fields that should be relevant to your app
  const email = "sally@mail.com";
  const name = "Sally";
  const picture = "https://example.com/sally.jpg";
  const userid = "1234567890";

  // Group information -- the ID is how Userstack identifies the user to a group/team/org
  const groupId = "123456";
  const groupName = "ACME Inc.";

  const response = await fetch(`https://api.userstack.app/alpha2/identify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${process.env.API_KEY}`,
    },
    body: JSON.stringify({
      user: { email, name, picture, userid }, // Only email is required, the rest is optional
      config: {
        groupId,
        groupName,
      },
    }),
  });

  if (response.ok) {
    console.log("User identified successfully");
  } else {
    console.error("Failed to identify user:", await response.text());
  }
}

// Example to verify a user session from your backend
async function verifySession() {
  const sessionId = "abcxyz"; // This is the session ID returned by the identify API call

  const response = await fetch(`https://api.userstack.app/alpha2/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${process.env.API_KEY}`,
    },
    body: JSON.stringify({
      sessionId,
    }),
  });

  if (response.ok) {
    console.log("Session verified successfully");
  } else {
    console.error("Failed to verify session:", await response.text());
  }
}

// Example to set a new group for an existing session from your backend
async function setNewGroup() {
  const newGroupId = "654321";
  const newGroupName = "NewCo";

  const response = await fetch(`https://api.userstack.app/alpha2/setgroup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${process.env.API_KEY}`,
    },
    body: JSON.stringify({
      groupId: newGroupId,
      groupName: newGroupName,
    }),
  });

  if (response.ok) {
    console.log("Group set successfully");
  } else {
    console.error("Failed to set group:", await response.text());
  }
}
