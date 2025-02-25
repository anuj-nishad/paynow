import axios from "axios";

export async function fetchAccount(setBalance, setHistory) {
  try {
    const response = await axios.get('https://paynow-api.onrender.com/api/v1/account', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const balance = (response.data.account.balance).toFixed(2)
    setBalance(balance)

    if (setHistory)
      setHistory(response.data.account.transactions)
  } catch (err) {
    console.log(err)
  }
}