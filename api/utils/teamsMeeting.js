import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// ✅ Function to get Microsoft Graph API Access Token
export async function getAccessToken() {
    try {
        const response = await axios.post(
            `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`,
            new URLSearchParams({
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                scope: "https://graph.microsoft.com/.default",
                grant_type: "client_credentials",
            }),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        console.log("✅ Access Token Generated!");
        return response.data.access_token;
    } catch (error) {
        console.error("❌ Error Fetching Access Token:", error.response?.data || error.message);
        throw new Error("Failed to get Microsoft Graph API Access Token");
    }
}

// ✅ Function to Get Teams User ID
export async function getTeamsUserId(employeeEmail, token) {
    try {
        const response = await axios.get(
            `https://graph.microsoft.com/v1.0/users?$filter=mail eq '${employeeEmail}'`,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!response.data.value || response.data.value.length === 0) {
            console.error("❌ No Microsoft Teams User Found for Email:", employeeEmail);
            throw new Error(`No Microsoft Teams User found for ${employeeEmail}`);
        }

        return response.data.value[0].id; // ✅ Return the correct Microsoft Teams User ID
    } catch (error) {
        console.error("❌ Error Fetching Microsoft Teams User ID:", error.response?.data || error.message);
        throw new Error("Failed to retrieve Microsoft Teams User ID");
    }
}

// ✅ Function to Create a Teams Meeting
export async function createTeamsMeeting(employeeEmail, expertEmail, expertName, startDateTime, endDateTime) {
    try {
        const token = await getAccessToken();
        console.log("🔍 Token Used:", token);

        let teamsUserId;

        try {
            // ✅ Try to fetch Teams User ID
            teamsUserId = await getTeamsUserId(employeeEmail, token);
            console.log("✅ Verified Teams User ID:", teamsUserId);
        } catch (error) {
            console.warn("⚠️ Employee is not a Teams user. Creating meeting using default Admin Account.");
            teamsUserId = process.env.MICROSOFT_TEAMS_USER_ID;  // ✅ Use a default Teams account
        }

        console.log("🔹 Preparing Teams API Request...");
        console.log("✅ Request Data:", { employeeEmail, expertEmail, expertName, startDateTime, endDateTime });

        const requestBody = {
            subject: `Session with ${expertName}`,
            start: {
                dateTime: startDateTime,
                timeZone: "UTC",
            },
            end: {
                dateTime: endDateTime,
                timeZone: "UTC",
            },
            isOnlineMeeting: true,
            onlineMeetingProvider: "teamsForBusiness",
            allowNewTimeProposals: false,
            attendees: [
                { emailAddress: { address: expertEmail, name: expertName }, type: "required" },
                { emailAddress: { address: employeeEmail, name: "Employee" }, type: "required" },
            ],
        };

        console.log("✅ Request Payload:", JSON.stringify(requestBody, null, 2));

        // ✅ Use Admin Teams ID if employee email is personal
        const response = await axios.post(
            `https://graph.microsoft.com/v1.0/users/${teamsUserId}/calendar/events`,
            requestBody,
            { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
        );

        if (response.data && response.data.onlineMeeting && response.data.onlineMeeting.joinUrl) {
            console.log("✅ Teams Meeting Created Successfully:", response.data.onlineMeeting.joinUrl);
            return response.data.onlineMeeting.joinUrl;
        } else {
            console.error("❌ No meeting link found in response:", response.data);
            throw new Error("Failed to get meeting link.");
        }
    } catch (error) {
        console.error("❌ Error Creating Teams Meeting:", error.response?.data || error.message);
        throw new Error("Failed to create Teams meeting");
    }
}
