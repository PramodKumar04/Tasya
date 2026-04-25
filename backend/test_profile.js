const axios = require('axios');

async function testProfile() {
  try {
    const res = await axios.get("http://localhost:5000/api/users/profile/pra_kheer");
    console.log(JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.error("Error:", err.message);
  }
}
testProfile();
